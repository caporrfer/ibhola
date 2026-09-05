"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function SiteEnhancements() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <button className={`back-to-top ${showTop ? "is-visible" : ""}`} type="button" tabIndex={showTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} aria-label="Volver arriba"><ArrowUp size={20} /></button>;
}
