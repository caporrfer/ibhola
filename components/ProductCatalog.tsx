"use client";

import Image from "next/image";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const items = [
  { name: "Terra Grip 2", detail: "Agarre · protección · montaña", type: "Calzado", image: "/images/catalogo-calzado.png", price: "129,90 €" },
  { name: "Road Flow", detail: "Asfalto · entrenamiento diario", type: "Calzado", image: "/images/producto-road-flow.png", price: "109,90 €" },
  { name: "Camiseta Aero", detail: "Tejido ligero y transpirable", type: "Textil", image: "/images/catalogo-textil.png", price: "34,90 €" },
  { name: "Pantalón Tempo", detail: "Libertad de movimiento · secado rápido", type: "Textil", image: "/images/catalogo-textil.png", price: "39,90 €" },
  { name: "Cortavientos Sierra", detail: "Ligero · compacto · resistente al viento", type: "Textil", image: "/images/producto-cortavientos.png", price: "74,90 €" },
  { name: "Chaleco Hydro 5L", detail: "Ajuste cómodo · dos soft flasks", type: "Accesorios", image: "/images/producto-chaleco.png", price: "79,90 €" },
  { name: "Gorra Brisa", detail: "Ligera · transpirable · ajuste trasero", type: "Accesorios", image: "/images/producto-gorra.png", price: "24,90 €" },
  { name: "Calcetines Trail Pro", detail: "Protección y control de humedad", type: "Accesorios", image: "/images/catalogo-accesorios.png", price: "16,90 €" },
  { name: "Soft Flask 500 ml", detail: "Hidratación flexible y ligera", type: "Accesorios", image: "/images/catalogo-accesorios.png", price: "19,90 €" },
  { name: "Gel Energy 40", detail: "Energía rápida para entrenar y competir", type: "Nutrición", image: "/images/producto-gel.png", price: "2,50 €" },
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
