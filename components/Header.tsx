"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { business } from "@/config/business";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const link = (path: string) => `${basePath}${path}`;
const nav = [
  ["Inicio", "/"], ["Catálogo", "/catalogo/"],
  ["Diseño personalizado", "/diseno-personalizado/"],
  ["Comunidad & eventos", "/eventos/"], ["Preguntas frecuentes", "/preguntas-frecuentes/"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;
    if (!open) { if (menu.open) menu.close(); return; }
    // Native modal semantics make everything outside the dialog inert.
    const previousOverflow = document.body.style.overflow;
    menu.showModal();
    document.body.style.overflow = "hidden";
    menu.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    menu.addEventListener("keydown", trapFocus);
    return () => {
      menu.removeEventListener("keydown", trapFocus);
      menu.close();
      document.body.style.overflow = previousOverflow;
      if (!window.matchMedia("(min-width: 1100px)").matches) trigger.current?.focus();
    };
  }, [open]);

  return <header className="site-header">
    <a className="skip-link" href="#main-content">Ir al contenido</a>
    <div className="header__inner container-wide">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegación principal">
        {nav.slice(1).map(([label, href]) => <a key={href} href={link(href)} aria-current={isCurrent(href) ? "page" : undefined}>{label}</a>)}
      </nav>
      <a className="header__visit" href={link("/#contacto")}>La tienda <ArrowUpRight size={16} /></a>
      <button ref={trigger} className="menu-button" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" aria-label="Abrir menú"><Menu size={23} /></button>
    </div>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label="Navegación móvil" onCancel={(event) => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)}>
      <div className="mobile-menu__top"><span>IBHOLA / Explora</span><button type="button" className="menu-button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={24} /></button></div>
      <nav aria-label="Navegación móvil">{nav.map(([label, href], index) => <a key={href} href={link(href)} aria-current={isCurrent(href) ? "page" : undefined} onClick={() => setOpen(false)}><small>0{index + 1}</small><span>{label}</span><ArrowUpRight size={21} /></a>)}</nav>
      <div className="mobile-menu__foot"><p>Tu punto de salida.<br />Corrales, Huelva.</p><a href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Cómo llegar <ArrowUpRight size={16} /></a><a href={link("/preguntas-frecuentes/#contacto")} onClick={() => setOpen(false)}>Contacta con nosotros <ArrowUpRight size={16} /></a></div>
    </dialog>
  </header>;
}
