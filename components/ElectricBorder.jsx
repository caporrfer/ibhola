"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ElectricBorder.css";

export default function ElectricBorder({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const random = useCallback(x => (Math.sin(x * 12.9898) * 43758.5453) % 1, []);

  const noise2D = useCallback((x, y) => {
    const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j;
    const a = random(i + j * 57), b = random(i + 1 + j * 57);
    const c = random(i + (j + 1) * 57), d = random(i + 1 + (j + 1) * 57);
    const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  }, [random]);

  const octavedNoise = useCallback((x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) => {
    let y = 0, amplitude = baseAmplitude, frequency = baseFrequency;
    for (let i = 0; i < octaves; i += 1) {
      y += amplitude * (i === 0 ? baseFlatness : 1) * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return y;
  }, [noise2D]);

  const getCornerPoint = useCallback((centerX, centerY, radius, startAngle, arcLength, progress) => {
    const angle = startAngle + progress * arcLength;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  }, []);

  const getRoundedRectPoint = useCallback((t, left, top, width, height, radius) => {
    const straightWidth = width - 2 * radius;
    const straightHeight = height - 2 * radius;
    const cornerArc = Math.PI * radius / 2;
    const distance = t * (2 * straightWidth + 2 * straightHeight + 4 * cornerArc);
    let accumulated = 0;
    if (distance <= accumulated + straightWidth) return { x: left + radius + (distance - accumulated) / straightWidth * straightWidth, y: top };
    accumulated += straightWidth;
    if (distance <= accumulated + cornerArc) return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, (distance - accumulated) / cornerArc);
    accumulated += cornerArc;
    if (distance <= accumulated + straightHeight) return { x: left + width, y: top + radius + (distance - accumulated) / straightHeight * straightHeight };
    accumulated += straightHeight;
    if (distance <= accumulated + cornerArc) return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, (distance - accumulated) / cornerArc);
    accumulated += cornerArc;
    if (distance <= accumulated + straightWidth) return { x: left + width - radius - (distance - accumulated) / straightWidth * straightWidth, y: top + height };
    accumulated += straightWidth;
    if (distance <= accumulated + cornerArc) return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, (distance - accumulated) / cornerArc);
    accumulated += cornerArc;
    if (distance <= accumulated + straightHeight) return { x: left, y: top + height - radius - (distance - accumulated) / straightHeight * straightHeight };
    accumulated += straightHeight;
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, (distance - accumulated) / cornerArc);
  }, [getCornerPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const displacement = 60, borderOffset = 60;
    let width = 1, height = 1;
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width + borderOffset * 2;
      height = rect.height + borderOffset * 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    updateSize();
    const draw = currentTime => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      timeRef.current += (currentTime - lastFrameTimeRef.current) / 1000 * speed;
      lastFrameTimeRef.current = currentTime;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const left = borderOffset, top = borderOffset;
      const borderWidth = width - 2 * borderOffset, borderHeight = height - 2 * borderOffset;
      const radius = Math.min(borderRadius, Math.min(borderWidth, borderHeight) / 2);
      const samples = Math.max(80, Math.floor((2 * (borderWidth + borderHeight) + 2 * Math.PI * radius) / 2));
      ctx.beginPath();
      for (let i = 0; i <= samples; i += 1) {
        const progress = i / samples;
        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
        const xNoise = octavedNoise(progress * 8, 10, 1.6, 0.7, chaos, 10, timeRef.current, 0, 0);
        const yNoise = octavedNoise(progress * 8, 10, 1.6, 0.7, chaos, 10, timeRef.current, 1, 0);
        const x = point.x + xNoise * displacement, y = point.y + yNoise * displacement;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [borderRadius, chaos, color, getRoundedRectPoint, octavedNoise, speed]);

  const vars = { "--electric-border-color": color, borderRadius };
  return <div ref={containerRef} className={`electric-border ${className ?? ""}`} style={{ ...vars, ...style }}>
    <div className="eb-canvas-container"><canvas ref={canvasRef} className="eb-canvas" /></div>
    <div className="eb-layers"><div className="eb-glow-1" /><div className="eb-glow-2" /><div className="eb-background-glow" /></div>
    <div className="eb-content">{children}</div>
  </div>;
}
