import Link from "next/link";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand ${footer ? "brand--footer" : ""}`} href="#inicio" aria-label="IBHOLA Trail Running, inicio">
      <span className="brand__name">IBHOLA<span>.</span></span>
      <span className="brand__sub">TRAIL RUNNING</span>
    </Link>
  );
}
