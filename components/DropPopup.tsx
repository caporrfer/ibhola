"use client";

import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./DropPopup.module.css";

const sessionKey = "ibhola:drop-odiel-2026:seen";
const views = [
  { label: "Delante", src: "/images/drop-odiel-delante.webp", alt: "Parte delantera de la camiseta del II Desafío del Odiel Sumhtec, con una locomotora y el meandro del Odiel" },
  { label: "Detrás", src: "/images/drop-odiel-detras.webp", alt: "Parte trasera de la camiseta del II Desafío del Odiel Sumhtec, con vías de tren y los colaboradores" },
];

export function DropPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);

  useEffect(() => {
    try { if (sessionStorage.getItem(sessionKey)) return; } catch { /* Storage may be unavailable in private browsers. */ }
    const timer = window.setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem(sessionKey, "1"); } catch { /* The popup still works without storage. */ }
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="odiel-drop-title" aria-describedby="odiel-drop-description" onCancel={() => setOpen(false)} onKeyDown={(event) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} onClick={(event) => {
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
    }
  }}>
    {open && <div className={styles.layout}>
      <button type="button" className={styles.close} aria-label="Cerrar novedad" onClick={() => setOpen(false)} autoFocus><X size={21} aria-hidden="true" /></button>
      <div className={styles.visual}>
        <div className={styles.photos}>{views.map((item, index) => <Image key={item.src} src={item.src} alt={item.alt} width={1000} height={1000} sizes="(max-width: 680px) 90vw, 480px" loading="eager" className={`${styles.photo} ${view === index ? styles.active : ""}`} aria-hidden={view !== index} />)}</div>
        <div className={styles.switcher} aria-label="Vistas de la camiseta">{views.map((item, index) => <button key={item.label} type="button" aria-pressed={view === index} onClick={() => setView(index)}>{item.label}</button>)}</div>
      </div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span /> Nuevo drop</p>
        <p className={styles.edition}>II Desafío del Odiel · Sumhtec</p>
        <h2 id="odiel-drop-title">Una historia{" "}<br />que se viste.</h2>
        <p id="odiel-drop-description" className={styles.description}>La nueva camiseta del Desafío del Odiel ya tiene nombre propio: nuestra tierra.</p>
        <p className={styles.story}>El rojo de su legado minero, la huella del ferrocarril y el meandro del Odiel. Huelva, en cada detalle.</p>
        <div className={styles.footer}><span>13 de diciembre · Huelva</span><button type="button" className={styles.continue} onClick={() => setOpen(false)}>Seguir explorando <ArrowRight size={17} aria-hidden="true" /></button></div>
      </div>
    </div>}
  </dialog>;
}
