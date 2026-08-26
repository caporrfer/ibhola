"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LaunchScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("hidden");
      return;
    }

    document.body.classList.add("intro-active");
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), 1350);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.classList.remove("intro-active");
    }, 2250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("intro-active");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`launch-screen ${phase === "leaving" ? "is-leaving" : ""}`} aria-label="Presentación de IBHOLA">
      <div className="launch-screen__mark">
        <Image src={`${basePath}/images/ibhola-logo-transparent.webp`} alt="IBHOLA Trail Running" width={1283} height={624} priority />
        <div className="launch-screen__rule"><span /></div>
        <p><span>Trail</span><i />Corrales · Huelva<i /><span>Running</span></p>
      </div>
    </div>
  );
}
