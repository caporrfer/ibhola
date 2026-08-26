"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 13000;
const sources = [
  { src: "/images/constellation-runner-v2.png", label: "CORRER", cropStart: .34 },
  { src: "/images/constellation-shoe-v2.png", label: "EQUIPARTE", cropStart: 0 },
  { src: "/images/constellation-bike-v2.png", label: "RODAR", cropStart: 0 },
] as const;

type Cloud = { positions: Float32Array; luminance: Float32Array };

function random(seed: number) {
  let value = seed;
  return () => { value = (value * 16807) % 2147483647; return (value - 1) / 2147483646; };
}

async function imageCloud(source: typeof sources[number], index: number): Promise<Cloud> {
  const image = new Image(); image.crossOrigin = "anonymous"; image.src = source.src;
  await image.decode();
  const width = 480, height = Math.round(width * image.height / image.width);
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D unavailable");
  context.drawImage(image, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const candidates: { x: number; y: number; light: number }[] = [];
  const startX = Math.floor(width * source.cropStart);
  for (let y = 2; y < height - 2; y += 2) for (let x = startX; x < width - 2; x += 2) {
    const offset = (y * width + x) * 4;
    const light = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]) / 255;
    if (light > .09) candidates.push({ x, y, light });
  }
  const rand = random(7301 + index * 991); const positions = new Float32Array(COUNT * 3); const luminance = new Float32Array(COUNT);
  const scale = index === 0 ? 6.8 : 7.5;
  for (let i = 0; i < COUNT; i++) {
    let candidate = candidates[Math.floor(rand() * candidates.length)];
    for (let attempt = 0; attempt < 4 && rand() > candidate.light; attempt++) candidate = candidates[Math.floor(rand() * candidates.length)];
    const normalizedX = ((candidate.x - startX) / (width - startX) - .5) * scale;
    const normalizedY = (.5 - candidate.y / height) * scale * (height / width);
    const depth = (rand() - .5) * (.18 + candidate.light * .9) + Math.sin(candidate.x * .08) * .09;
    positions[i * 3] = normalizedX + (rand() - .5) * .025;
    positions[i * 3 + 1] = normalizedY + (rand() - .5) * .025;
    positions[i * 3 + 2] = depth;
    luminance[i] = candidate.light;
  }
  return { positions, luminance };
}

export function MotionConstellation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current; if (!mount) return;
    const page = mount.closest(".neo-home") as HTMLElement | null; if (!page) return;
    let disposed = false, raf = 0, smoothProgress = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100); camera.position.set(0, 0, 8.7);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7)); renderer.setClearColor(0x000000, 0); mount.appendChild(renderer.domElement);
    const pointer = new THREE.Vector2();

    const onScroll = () => {
      const max = Math.max(1, page.offsetHeight - innerHeight);
      progressRef.current = Math.min(1, Math.max(0, -page.getBoundingClientRect().top / max));
    };
    const onPointer = (event: PointerEvent) => { pointer.x = event.clientX / innerWidth - .5; pointer.y = event.clientY / innerHeight - .5; };
    const onResize = () => { const { width, height } = mount.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(1, height); camera.updateProjectionMatrix(); };
    onResize(); onScroll(); window.addEventListener("resize", onResize); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("pointermove", onPointer, { passive: true });

    Promise.all(sources.map(imageCloud)).then(clouds => {
      if (disposed) return;
      const geometry = new THREE.BufferGeometry();
      const current = new Float32Array(clouds[0].positions); const colors = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        const band = i % 17; const light = .42 + clouds[0].luminance[i] * .8;
        const color = band === 0 ? new THREE.Color("#8052ff") : band === 1 ? new THREE.Color("#ffb829") : band === 2 ? new THREE.Color("#45cbb0") : new THREE.Color("#c9f27c");
        colors[i * 3] = color.r * light; colors[i * 3 + 1] = color.g * light; colors[i * 3 + 2] = color.b * light;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(current, 3)); geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({ size: .024, vertexColors: true, transparent: true, opacity: .92, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
      const points = new THREE.Points(geometry, material); points.position.x = 1.55; scene.add(points); setReady(true);
      const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      const animate = () => {
        smoothProgress += (progressRef.current - smoothProgress) * .055;
        const scaled = smoothProgress * 2; const from = Math.min(1, Math.floor(scaled)); const to = Math.min(2, from + 1); const raw = scaled - from; const t = raw * raw * (3 - 2 * raw);
        const a = clouds[from].positions, b = clouds[to].positions;
        for (let i = 0; i < current.length; i += 3) {
          const pointIndex = i / 3; const turbulence = Math.sin(pointIndex * 2.41 + raw * Math.PI) * Math.sin(raw * Math.PI) * .12;
          current[i] = a[i] + (b[i] - a[i]) * t + turbulence;
          current[i + 1] = a[i + 1] + (b[i + 1] - a[i + 1]) * t + Math.cos(pointIndex * 1.73 + raw * 4) * Math.sin(raw * Math.PI) * .08;
          current[i + 2] = a[i + 2] + (b[i + 2] - a[i + 2]) * t + Math.sin(raw * Math.PI) * Math.sin(pointIndex) * .75;
        }
        attribute.needsUpdate = true;
        const mobileScale = innerWidth < 540 ? .56 : innerWidth < 900 ? .7 : 1;
        points.position.x = innerWidth < 900 ? 0 : 1.55;
        points.position.y = innerWidth < 900 ? -1.05 : 0;
        points.rotation.y += ((pointer.x * .16 + Math.sin(performance.now() * .00018) * .035) - points.rotation.y) * .035;
        points.rotation.x += ((pointer.y * .1) - points.rotation.x) * .035;
        points.scale.setScalar(mobileScale * (1 + Math.sin(raw * Math.PI) * .025));
        renderer.render(scene, camera); const currentStage = smoothProgress < .25 ? 0 : smoothProgress < .75 ? 1 : 2; setStage(previous => previous === currentStage ? previous : currentStage);
        raf = requestAnimationFrame(animate);
      };
      animate();
    });

    return () => { disposed = true; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onPointer); renderer.dispose(); renderer.domElement.remove(); };
  }, []);

  return <div ref={mountRef} className={`motion-constellation motion-constellation--3d ${ready ? "is-ready" : ""}`} aria-label="Modelo 3D de partículas que se transforma al desplazarse entre un corredor, una zapatilla y una bicicleta">
    <div className="motion-constellation__halo" aria-hidden="true" />
    <div className="motion-constellation__status"><span>0{stage + 1}</span><div><i style={{ transform: `scaleX(${stage === 0 ? .18 : stage === 1 ? .58 : 1})` }} /><b>{sources[stage].label}</b></div><span>03</span></div>
    {!ready && <span className="motion-constellation__loading">CONSTRUYENDO MOVIMIENTO…</span>}
  </div>;
}
