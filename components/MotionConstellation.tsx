"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
const COLORS = ["#c9f27c", "#8052ff", "#ffb829", "#45cbb0", "#ffffff", "#d86baa"];
const COUNT = 520;

function line(a: Point, b: Point, count: number): Point[] {
  return Array.from({ length: count }, (_, i) => { const t = count === 1 ? 0 : i / (count - 1); return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; });
}
function ellipse(cx: number, cy: number, rx: number, ry: number, count: number): Point[] {
  return Array.from({ length: count }, (_, i) => { const t = Math.PI * 2 * i / Math.max(1, count - 1); return { x: cx + Math.cos(t) * rx, y: cy + Math.sin(t) * ry }; });
}
function fill(points: Point[]): Point[] {
  const result = [...points]; let seed = 91;
  while (result.length < COUNT) { seed = (seed * 16807) % 2147483647; const p = points[seed % points.length]; const a = ((seed % 1000) / 1000) * Math.PI * 2; const d = 2 + (seed % 19); result.push({ x: p.x + Math.cos(a) * d, y: p.y + Math.sin(a) * d }); }
  return result.slice(0, COUNT);
}
function runner(): Point[] { return fill([...ellipse(306, 92, 34, 34, 64), ...line({ x: 292, y: 130 }, { x: 250, y: 260 }, 80), ...line({ x: 260, y: 160 }, { x: 165, y: 212 }, 62), ...line({ x: 277, y: 151 }, { x: 375, y: 191 }, 62), ...line({ x: 250, y: 258 }, { x: 342, y: 331 }, 78), ...line({ x: 342, y: 331 }, { x: 438, y: 326 }, 50), ...line({ x: 250, y: 258 }, { x: 190, y: 340 }, 72), ...line({ x: 190, y: 340 }, { x: 91, y: 344 }, 52)]); }
function shoe(): Point[] { return fill([...line({ x: 92, y: 260 }, { x: 178, y: 185 }, 70), ...line({ x: 178, y: 185 }, { x: 275, y: 260 }, 82), ...line({ x: 275, y: 260 }, { x: 450, y: 287 }, 108), ...line({ x: 450, y: 287 }, { x: 472, y: 321 }, 38), ...line({ x: 472, y: 321 }, { x: 118, y: 327 }, 150), ...line({ x: 118, y: 327 }, { x: 92, y: 260 }, 46), ...line({ x: 175, y: 223 }, { x: 279, y: 276 }, 65), ...line({ x: 151, y: 267 }, { x: 250, y: 267 }, 60)]); }
function bike(): Point[] { return fill([...ellipse(151, 286, 78, 78, 118), ...ellipse(421, 286, 78, 78, 118), ...line({ x: 151, y: 286 }, { x: 246, y: 165 }, 60), ...line({ x: 246, y: 165 }, { x: 310, y: 286 }, 58), ...line({ x: 310, y: 286 }, { x: 151, y: 286 }, 72), ...line({ x: 310, y: 286 }, { x: 421, y: 286 }, 55), ...line({ x: 310, y: 286 }, { x: 376, y: 157 }, 62), ...line({ x: 376, y: 157 }, { x: 421, y: 286 }, 55), ...line({ x: 218, y: 155 }, { x: 273, y: 155 }, 32), ...line({ x: 359, y: 151 }, { x: 405, y: 142 }, 30)]); }

const SHAPES = [runner(), shoe(), bike()];
const LABELS = ["CORRER", "EQUIPARTE", "RODAR"];

export function MotionConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null); const labelRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    let frame = 0; let raf = 0; const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = SHAPES[0].map((p, i) => ({ ...p, vx: 0, vy: 0, color: COLORS[i % COLORS.length], size: 1 + (i % 3) * .45 }));
    const resize = () => { const rect = canvas.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = rect.width * ratio; canvas.height = rect.height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
      const cycle = reduced ? 0 : (frame / 360) % SHAPES.length; const index = Math.floor(cycle), next = (index + 1) % SHAPES.length; const local = cycle - index; const morph = local < .58 ? 0 : Math.min(1, (local - .58) / .42); const eased = morph * morph * (3 - 2 * morph);
      if (labelRef.current) labelRef.current.textContent = LABELS[morph > .55 ? next : index];
      const scale = Math.min(w / 560, h / 430) * .92, ox = (w - 560 * scale) / 2, oy = (h - 430 * scale) / 2;
      particles.forEach((p, i) => { const a = SHAPES[index][i], b = SHAPES[next][i], tx = a.x + (b.x - a.x) * eased, ty = a.y + (b.y - a.y) * eased; p.vx = (p.vx + (tx - p.x) * .025) * .82; p.vy = (p.vy + (ty - p.y) * .025) * .82; p.x += p.vx; p.y += p.vy; const x = ox + p.x * scale, y = oy + p.y * scale; ctx.save(); ctx.translate(x, y); ctx.rotate((i + frame * .18) * .035); ctx.strokeStyle = p.color; ctx.globalAlpha = .48 + (i % 5) * .1; ctx.lineWidth = .8; ctx.beginPath(); const s = p.size * scale; ctx.moveTo(0, -s * 1.7); ctx.lineTo(s * 1.5, s); ctx.lineTo(-s * 1.5, s); ctx.closePath(); ctx.stroke(); ctx.restore(); });
      frame += 1; raf = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <div className="motion-constellation" aria-label="Constelación animada: corredor, zapatilla y bicicleta"><canvas ref={canvasRef} aria-hidden="true" /><div className="motion-constellation__status"><i /><span ref={labelRef}>CORRER</span><b>01—03</b></div></div>;
}
