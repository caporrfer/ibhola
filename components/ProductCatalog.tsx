"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const items = [
  { name: "Zapatillas de trail", detail: "Agarre · protección · montaña", type: "Calzado", image: "/images/corredor.webp", position: "54% 50%" },
  { name: "Zapatillas de running", detail: "Asfalto · entrenamiento · competición", type: "Calzado", image: "/images/singlet.webp", position: "50% 28%" },
  { name: "Textil técnico", detail: "Camisetas · pantalones · cortavientos", type: "Textil", image: "/images/equipacion.webp", position: "50% 46%" },
  { name: "Hidratación", detail: "Chalecos · bidones · soft flasks", type: "Accesorios", image: "/images/corredor.webp", position: "35% 50%" },
  { name: "Accesorios", detail: "Gorras · calcetines · bastones", type: "Accesorios", image: "/images/tienda.webp", position: "50% 55%" },
  { name: "Nutrición deportiva", detail: "Energía para entrenar y competir", type: "Nutrición", image: "/images/equipacion.webp", position: "72% 45%" },
] as const;

const filters = ["Todo", "Calzado", "Textil", "Accesorios", "Nutrición"] as const;

export function ProductCatalog() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todo");
  const visibleItems = active === "Todo" ? items : items.filter((item) => item.type === active);

  return (
    <>
      <div className="catalog-filters" role="group" aria-label="Filtrar catálogo por categoría">
        {filters.map((filter) => (
          <button key={filter} type="button" className={active === filter ? "is-active" : ""} onClick={() => setActive(filter)} aria-pressed={active === filter}>
            {filter}
          </button>
        ))}
      </div>
      <div className="catalog-grid" aria-live="polite">
        {visibleItems.map((item, index) => (
          <article className="product-card" key={item.name}>
            <div className="product-card__image">
              <Image src={imagePath(item.image)} alt={`${item.name} en IBHOLA Trail Running`} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ objectPosition: item.position }} />
              <span>0{index + 1}</span>
            </div>
            <div className="product-card__body">
              <small>{item.type}</small>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <a href="#contacto" aria-label={`Consultar ${item.name}`}>Consultar en tienda <ArrowUpRight size={17} /></a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
