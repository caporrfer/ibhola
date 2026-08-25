"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LaunchScreen() {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (screenRef.current) screenRef.current.style.display = "none";
      return;
    }

    let leaveTimer = 0;
    let hideTimer = 0;
    const play = () => {
      const screen = screenRef.current;
      if (!screen) return;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      screen.classList.remove("is-leaving");
      screen.style.display = "grid";
      document.body.classList.add("intro-active");
      screen.getAnimations({ subtree: true }).forEach((animation) => {
        animation.cancel();
        animation.play();
      });
      leaveTimer = window.setTimeout(() => screen.classList.add("is-leaving"), 1350);
      hideTimer = window.setTimeout(() => {
        screen.style.display = "none";
        document.body.classList.remove("intro-active");
      }, 2250);
    };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) play(); };
    play();
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("pageshow", onPageShow);
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
