"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const scenes = [
  { src: "/images/constellation-runner-v2.png", label: "CORRER", alt: "Corredor construido con partículas luminosas" },
  { src: "/images/constellation-shoe-v2.png", label: "EQUIPARTE", alt: "Zapatilla técnica construida con partículas luminosas" },
  { src: "/images/constellation-bike-v2.png", label: "RODAR", alt: "Bicicleta construida con partículas luminosas" },
] as const;

export function MotionConstellation() {
  const [active, setActive] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % scenes.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let tick = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["201,242,124", "128,82,255", "255,184,41", "255,255,255", "69,203,176"];
    const motes = Array.from({ length: 150 }, (_, i) => ({
      x: ((i * 83) % 997) / 997,
      y: ((i * 47) % 991) / 991,
      speed: .08 + (i % 7) * .025,
      size: .45 + (i % 5) * .3,
      phase: i * .73,
      color: colors[i % colors.length],
    }));
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = rect.width * ratio; canvas.height = rect.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      motes.forEach((mote, i) => {
        const drift = reduced ? 0 : tick * mote.speed;
        const x = ((mote.x * w + drift * 2.8 + w) % (w + 80)) - 40;
        const y = mote.y * h + Math.sin(tick * .012 + mote.phase) * 12;
        const pulse = .18 + .42 * (.5 + .5 * Math.sin(tick * .018 + mote.phase));
        ctx.save(); ctx.translate(x, y); ctx.rotate(.75 + tick * .002 + i);
        ctx.strokeStyle = `rgba(${mote.color},${pulse})`; ctx.lineWidth = .7;
        ctx.beginPath(); ctx.moveTo(-mote.size * 3, 0); ctx.lineTo(mote.size * 3, 0); ctx.lineTo(0, mote.size * 1.8); ctx.closePath(); ctx.stroke(); ctx.restore();
        if (i % 8 === 0) { ctx.strokeStyle = `rgba(${mote.color},${pulse * .18})`; ctx.beginPath(); ctx.moveTo(x - 65, y); ctx.lineTo(x, y); ctx.stroke(); }
      });
      tick += 1; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <div className="motion-constellation" aria-label="Secuencia animada de corredor, zapatilla y bicicleta">
    <div className="motion-constellation__halo" aria-hidden="true" />
    <div className="motion-constellation__scenes">
      {scenes.map((scene, index) => <figure className={`motion-scene ${active === index ? "is-active" : ""} ${index === (active + scenes.length - 1) % scenes.length ? "is-previous" : ""}`} key={scene.src}>
        <Image src={scene.src} alt={scene.alt} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 58vw" />
      </figure>)}
    </div>
    <canvas ref={canvasRef} aria-hidden="true" />
    <div className="motion-constellation__status"><span className="motion-constellation__counter">0{active + 1}</span><div><i key={active} /><b>{scenes[active].label}</b></div><span>03</span></div>
  </div>;
}
