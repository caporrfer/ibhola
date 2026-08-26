"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function SiteEnhancements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 620);
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a");
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || (destination.pathname === window.location.pathname && destination.search === window.location.search)) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => { window.location.href = destination.href; }, 180);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <button className={`back-to-top ${showTop ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba"><ArrowUp size={19} /><span>Arriba</span></button>;
}
