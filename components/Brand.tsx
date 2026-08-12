import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand ${footer ? "brand--footer" : ""}`} href="#inicio" aria-label="IBHOLA Trail Running, inicio">
      <Image src={`${basePath}/images/ibhola-logo.webp`} alt="IBHOLA Trail Running" width={360} height={144} priority={!footer} />
    </Link>
  );
}
