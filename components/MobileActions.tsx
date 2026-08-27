"use client";

import { useEffect, useState } from "react";
import { Navigation, Phone } from "lucide-react";
import { business } from "@/config/business";

export function MobileActions({ afterHero = false }: { afterHero?: boolean }) {
  const [visible, setVisible] = useState(!afterHero);

  useEffect(() => {
    if (!afterHero) return;

    const updateVisibility = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      setVisible(!hero || hero.getBoundingClientRect().bottom <= 0);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [afterHero]);

  return <div className={`mobile-action-bar ${visible ? "is-visible" : ""}`} aria-label="Acciones rápidas" aria-hidden={!visible}>
    <a href={`tel:${business.phone}`} aria-label={`Llamar a IBHOLA: ${business.phoneDisplay}`} title="Llamar a IBHOLA" tabIndex={visible ? undefined : -1}><Phone size={24} aria-hidden="true" /></a>
    <a href={business.mapsUrl} target="_blank" rel="noreferrer" aria-label="Ver cómo llegar a IBHOLA" title="Cómo llegar" tabIndex={visible ? undefined : -1}><Navigation size={24} aria-hidden="true" /></a>
  </div>;
}
