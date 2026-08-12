"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LaunchScreen() {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem("ibhola-intro-seen") === "1";
    if (reducedMotion || alreadySeen) {
      if (screenRef.current) screenRef.current.style.display = "none";
      return;
    }

    document.body.classList.add("intro-active");
    const leaveTimer = window.setTimeout(() => screenRef.current?.classList.add("is-leaving"), 1350);
    const hideTimer = window.setTimeout(() => {
      if (screenRef.current) screenRef.current.style.display = "none";
      document.body.classList.remove("intro-active");
      window.sessionStorage.setItem("ibhola-intro-seen", "1");
    }, 2250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("intro-active");
    };
  }, []);

  return (
    <div ref={screenRef} className="launch-screen" aria-label="Presentación de IBHOLA">
      <div className="launch-screen__mark">
        <Image src={`${basePath}/images/ibhola-logo-transparent.webp`} alt="IBHOLA Trail Running" width={1283} height={624} priority />
        <div className="launch-screen__rule"><span /></div>
        <p><span>Trail</span><i />Corrales · Huelva<i /><span>Running</span></p>
      </div>
    </div>
  );
}
