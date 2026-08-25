"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./Scanner.css";

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const directionToFloat = dir => (dir === "horizontal" ? 1 : dir === "diagonal" ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime, uSpeed, uSweepSpeed, uSweepWidth, uSweepFalloff, uScale, uFrequency, uRipple;
uniform float uBandDensity, uLineSharpness, uGlow, uColorSpread, uBrightness, uContrast, uSoftness;
uniform float uVignette, uOpacity, uScanline, uGrain, uGrainIntensity, uDirection;
uniform vec2 uMouse;
uniform float uMouseEnabled, uMouseRadius, uMouseStrength, uMouseActive;
uniform vec3 uColor1, uColor2, uColor3;
out vec4 fragColor;
const float TAU = 6.2831853;

float signalField(vec2 p, float t) {
  float w = sin(p.x * 1.3 + t * 0.7);
  w += sin(p.y * 1.7 - t * 0.52) * 0.8;
  w += sin((p.x + p.y) * 0.9 + t * 0.91) * 0.6;
  w += sin((p.x - p.y) * 1.53 - t * 0.63) * 0.42;
  return w * 0.35;
}

vec3 palette(float f) {
  f = pow(clamp(f, 0.0, 1.0), uContrast);
  vec3 c = mix(uColor1, uColor2, smoothstep(0.08, 0.6, f));
  return mix(c, uColor3, smoothstep(0.68, 1.0, f));
}

float scanBand(float x, float aa, float sharp) {
  float v = mix(0.5, 0.5 + 0.5 * cos(x * TAU), aa);
  return pow(v, sharp);
}

void main() {
  float aspect = iResolution.x / iResolution.y;
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 p = uv0 / max(uScale, 0.001);
  float t = iTime * uSpeed;
  float mouseBoost = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mUv = vec2((uMouse.x * 2.0 - 1.0) * aspect, uMouse.y * 2.0 - 1.0);
    vec2 md = uv0 - mUv;
    float r = max(uMouseRadius, 0.001);
    mouseBoost = exp(-dot(md, md) / (r * r)) * uMouseStrength * uMouseActive;
  }
  float axis;
  if (uDirection < 0.5) axis = p.y;
  else if (uDirection < 1.5) axis = p.x;
  else axis = (p.x + p.y) * 0.70710678;
  float sig = signalField(p * uFrequency, t);
  float coord = axis + sig * uRipple;
  float phase = coord / max(uSweepWidth, 0.05) - t * uSweepSpeed;
  float sweep = pow(0.5 + 0.5 * cos(phase * TAU), max(uSweepFalloff, 0.1));
  float lc = coord * uBandDensity;
  float aa = clamp((1.0 / (1.0 + uSoftness * fwidth(lc) * 3.0)) * (1.0 + mouseBoost * 0.6), 0.0, 1.0);
  float bodyBase = clamp(0.5 + 0.5 * sig, 0.0, 1.0);
  float body = bodyBase * bodyBase * uGlow * sweep;
  float sharp = max(uLineSharpness, 0.1);
  float split = uColorSpread * 0.16;
  float fr = clamp(scanBand(lc + split, aa, sharp) * sweep + body, 0.0, 1.0);
  float fg = clamp(scanBand(lc, aa, sharp) * sweep + body, 0.0, 1.0);
  float fb = clamp(scanBand(lc - split, aa, sharp) * sweep + body, 0.0, 1.0);
  vec3 col = vec3(palette(fr).r, palette(fg).g, palette(fb).b);
  float inten = (fr + fg + fb) * 0.3333333 * uBrightness * (1.0 + mouseBoost * 0.9);
  if (uScanline > 0.5) inten *= 1.0 - 0.18 * (0.5 + 0.5 * cos(gl_FragCoord.y * 1.7));
  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    inten += (g - 0.5) * uGrainIntensity;
  }
  inten *= clamp(1.0 - uVignette * smoothstep(0.55, 1.65, length(uv0)), 0.0, 1.0);
  inten = clamp(inten, 0.0, 1.0);
  float a = clamp(inten * uOpacity, 0.0, 1.0);
  fragColor = vec4(clamp(col, 0.0, 1.0) * a, a);
}
`;

const ctxMap = new WeakMap();

export default function Scanner({
  color1 = "#080b07", color2 = "#5f8732", color3 = "#c9f27c", speed = 0.22,
  sweepSpeed = 0.12, sweepWidth = 1.9, sweepFalloff = 5.5, scale = 1.25, frequency = 1.7,
  ripple = 0.18, bandDensity = 8, lineSharpness = 4.5, glow = 0.3, scanDirection = "diagonal",
  colorSpread = 0.2, brightness = 0.72, contrast = 1.2, softness = 1.8, vignette = 0.35,
  scanline = false, grain = true, grainIntensity = 0.025, opacity = 0.82,
  mouseInteraction = false, mouseRadius = 0.5, mouseStrength = 0.35, className = ""
}) {
  const containerRef = useRef(null);
  const mouseEnabledRef = useRef(mouseInteraction);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let renderer;
    try {
      renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    } catch { return; }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
    container.appendChild(canvas);
    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex, fragment, uniforms: {
      iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) },
      uSpeed: { value: speed }, uSweepSpeed: { value: sweepSpeed }, uSweepWidth: { value: sweepWidth },
      uSweepFalloff: { value: sweepFalloff }, uScale: { value: scale }, uFrequency: { value: frequency },
      uRipple: { value: ripple }, uBandDensity: { value: bandDensity }, uLineSharpness: { value: lineSharpness },
      uGlow: { value: glow }, uColorSpread: { value: colorSpread }, uBrightness: { value: brightness },
      uContrast: { value: contrast }, uSoftness: { value: softness }, uVignette: { value: vignette },
      uOpacity: { value: opacity }, uScanline: { value: scanline ? 1 : 0 }, uGrain: { value: grain ? 1 : 0 },
      uGrainIntensity: { value: grainIntensity }, uDirection: { value: directionToFloat(scanDirection) },
      uMouse: { value: new Float32Array([0.5, 0.5]) }, uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseRadius: { value: mouseRadius }, uMouseStrength: { value: mouseStrength }, uMouseActive: { value: 0 },
      uColor1: { value: new Float32Array(hexToRgb(color1)) }, uColor2: { value: new Float32Array(hexToRgb(color2)) },
      uColor3: { value: new Float32Array(hexToRgb(color3)) }
    }});
    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { program });
    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
    };
    const ro = new ResizeObserver(setSize); ro.observe(container); setSize();
    let raf = 0, visible = true, pageVisible = !document.hidden, start = performance.now();
    const loop = now => { program.uniforms.iTime.value = (now - start) * 0.001; renderer.render({ scene: mesh }); raf = requestAnimationFrame(loop); };
    const startLoop = () => { if (visible && pageVisible && !raf) raf = requestAnimationFrame(loop); };
    const stopLoop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? startLoop() : stopLoop(); });
    io.observe(container);
    const onVisibility = () => { pageVisible = !document.hidden; pageVisible ? startLoop() : stopLoop(); };
    document.addEventListener("visibilitychange", onVisibility); startLoop();
    return () => {
      stopLoop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVisibility);
      ctxMap.delete(container); canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    const ctx = containerRef.current && ctxMap.get(containerRef.current);
    if (!ctx) return;
    const u = ctx.program.uniforms;
    Object.entries({ uSpeed: speed, uSweepSpeed: sweepSpeed, uSweepWidth: sweepWidth, uSweepFalloff: sweepFalloff,
      uScale: scale, uFrequency: frequency, uRipple: ripple, uBandDensity: bandDensity, uLineSharpness: lineSharpness,
      uGlow: glow, uColorSpread: colorSpread, uBrightness: brightness, uContrast: contrast, uSoftness: softness,
      uVignette: vignette, uOpacity: opacity, uGrainIntensity: grainIntensity, uMouseRadius: mouseRadius,
      uMouseStrength: mouseStrength }).forEach(([key, value]) => { u[key].value = value; });
    u.uScanline.value = scanline ? 1 : 0; u.uGrain.value = grain ? 1 : 0;
    u.uDirection.value = directionToFloat(scanDirection); u.uMouseEnabled.value = mouseInteraction ? 1 : 0;
    [["uColor1", color1], ["uColor2", color2], ["uColor3", color3]].forEach(([key, color]) => u[key].value.set(hexToRgb(color)));
    mouseEnabledRef.current = mouseInteraction;
  }, [color1, color2, color3, speed, sweepSpeed, sweepWidth, sweepFalloff, scale, frequency, ripple, bandDensity,
    lineSharpness, glow, scanDirection, colorSpread, brightness, contrast, softness, vignette, scanline, grain,
    grainIntensity, opacity, mouseInteraction, mouseRadius, mouseStrength]);

  return <div ref={containerRef} className={`scanner-container ${className}`.trim()} aria-hidden="true" />;
}
