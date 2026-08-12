"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LaunchScreen() {
  const [state, setState] = useState<"showing" | "leaving" | "hidden">("showing");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem("ibhola-intro-seen") === "1";
    if (reducedMotion || alreadySeen) {
      setState("hidden");
      return;
    }

    document.body.classList.add("intro-active");
    const leaveTimer = window.setTimeout(() => setState("leaving"), 1900);
    const hideTimer = window.setTimeout(() => {
      setState("hidden");
      document.body.classList.remove("intro-active");
      window.sessionStorage.setItem("ibhola-intro-seen", "1");
    }, 2550);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("intro-active");
    };
  }, []);

  const dismiss = () => {
    setState("leaving");
    window.setTimeout(() => setState("hidden"), 500);
    document.body.classList.remove("intro-active");
    window.sessionStorage.setItem("ibhola-intro-seen", "1");
  };

  if (state === "hidden") return null;

  return (
    <div className={`launch-screen ${state === "leaving" ? "is-leaving" : ""}`} aria-label="Presentación de IBHOLA">
      <div className="launch-screen__mark">
        <Image src={`${basePath}/images/ibhola-logo.webp`} alt="IBHOLA Trail Running" width={900} height={360} priority />
        <div className="launch-screen__rule"><span /></div>
        <p>Corrales · Huelva</p>
      </div>
      <button type="button" onClick={dismiss}>Saltar introducción</button>
    </div>
  );
}
