"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "./Brand";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const link = (path: string) => `${basePath}${path}`;

const nav = [
  ["Inicio", "/"],
  ["Catálogo / Tienda", "/catalogo/"],
  ["Eventos", "/eventos/"],
  ["Preguntas", "/preguntas-frecuentes/"],
] as const;

const categories = [
  ["Calzado", "calzado"],
  ["Textil", "textil"],
  ["Suplementación", "suplementacion"],
  ["Complementos", "complementos"],
  ["Accesorios", "accesorios"],
  ["Personalización", "personalizacion"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="header__inner container-wide">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegación principal">
        {nav.map(([label, href]) => label === "Catálogo / Tienda" ? <div className="nav-dropdown" key={label}><a href={link(href)}>{label} <ChevronDown size={13} /></a><div className="nav-dropdown__menu">{categories.map(([category, id]) => <a key={id} href={link(`/catalogo/#${id}`)}>{category}</a>)}</div></div> : <a key={label} href={link(href)}>{label}</a>)}
      </nav>
      <a className="button button--small header__cta" href={link("/preguntas-frecuentes/#contacto")}>Contacto <span aria-hidden>↗</span></a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X /> : <Menu />}</button>
    </div>
    <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Navegación móvil">
        {nav.map(([label, href], index) => <a key={label} href={link(href)} onClick={() => setOpen(false)}><span>{index + 1}</span>{label}</a>)}
      </nav>
      <p>Trail · Running · Corrales, Huelva</p>
    </div>
  </header>;
}
