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
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]"));
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
        <p className={styles.eyebrow}><span /> La camiseta de la carrera</p>
        <p className={styles.edition}>II Desafío del Odiel SUMHTEC</p>
        <h2 id="odiel-drop-title">Una historia{" "}<br />que se viste.</h2>
        <p id="odiel-drop-description" className={styles.description}>Os presentamos la camiseta que lucirán los participantes del II Desafío del Odiel SUMHTEC el próximo domingo 13 de diciembre.</p>
        <p className={styles.story}>Su color rojizo evoca la riqueza minera de Huelva y su diseño recuerda el legado del ferrocarril. En el frontal, el meandro del Odiel dibuja un árbol: nuestra tierra y sus raíces.</p>
        <p className={styles.tagline}>Una historia que se viste. Un desafío que se vive.</p>
        <div className={styles.footer}><span>¡Nos vemos el 13 de diciembre!</span><a className={styles.continue} href="https://www.facebook.com/61574004722441/posts/122203583444800157/#1d1d1d" target="_blank" rel="noopener noreferrer">Ver publicación en Facebook <ArrowRight size={17} aria-hidden="true" /></a><button type="button" className={styles.dismiss} onClick={() => setOpen(false)}>Seguir explorando</button></div>
      </div>
    </div>}
  </dialog>;
}
