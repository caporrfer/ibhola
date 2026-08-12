"use client";

import Image from "next/image";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const items = [
  { name: "Terra Grip 2", detail: "Agarre · protección · montaña", type: "Calzado", image: "/images/catalogo-calzado.png", price: "129,90 €" },
  { name: "Road Flow", detail: "Asfalto · entrenamiento diario", type: "Calzado", image: "/images/catalogo-calzado.png", price: "109,90 €" },
  { name: "Conjunto Aero", detail: "Camiseta y pantalón técnico", type: "Textil", image: "/images/catalogo-textil.png", price: "64,90 €" },
  { name: "Chaleco Hydro 5L", detail: "Ajuste cómodo · dos soft flasks", type: "Accesorios", image: "/images/catalogo-accesorios.png", price: "79,90 €" },
  { name: "Pack Trail Essentials", detail: "Gorra · calcetines · accesorios", type: "Accesorios", image: "/images/catalogo-accesorios.png", price: "39,90 €" },
  { name: "Pack Energía", detail: "Geles y sales para entrenar", type: "Nutrición", image: "/images/catalogo-accesorios.png", price: "24,90 €" },
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
          <article className="product-card" key={item.name} id={visibleItems.findIndex((product) => product.type === item.type) === index ? item.type.toLowerCase() : undefined}>
            <div className="product-card__image">
              <Image src={imagePath(item.image)} alt={`${item.name} en IBHOLA Trail Running`} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              <span>0{index + 1}</span>
            </div>
            <div className="product-card__body">
              <small>{item.type}</small>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <strong className="product-card__price">{item.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
