"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "./Brand";

const nav = [
  ["Inicio", "#inicio"],
  ["La tienda", "#tienda"],
  ["Catálogo", "#catalogo"],
  ["Galería", "#galeria"],
  ["Agenda", "#eventos"],
  ["Opiniones", "#opiniones"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header__inner container-wide">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="button button--small header__cta" href="#contacto">Ven a vernos <span aria-hidden="true">↗</span></a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Navegación móvil">
          {nav.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
          ))}
        </nav>
        <p>Trail · Running · Corrales, Huelva</p>
      </div>
    </header>
  );
}
