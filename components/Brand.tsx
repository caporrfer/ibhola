import Image from "next/image";
import Link from "next/link";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand ${footer ? "brand--footer" : ""}`} href="/" aria-label="IBHOLA Trail Running, ir al inicio">
      <Image src="/images/ibhola-logo-transparent.webp" alt="IBHOLA Trail Running" width={1283} height={624} priority={!footer} />
    </Link>
  );
}
