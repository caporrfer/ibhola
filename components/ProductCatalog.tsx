"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const categories = [
  {
    id: "calzado",
    name: "Calzado",
    detail: "Opciones para asfalto, trail, recuperación y diferentes formas de pisar.",
    image: "/images/catalogo/calzado-hoka-trail.jpg",
    brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"],
  },
  {
    id: "textil",
    name: "Textil técnico",
    detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas para entrenar o competir.",
    image: "/images/catalogo/textil-personalizado.jpg",
    brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Shere Pro", "226ERS", "La Sportiva", "Brooks"],
  },
  {
    id: "suplementacion",
    name: "Suplementación",
    detail: "Nutrición, hidratación y recuperación para preparar cada salida y cuidar el después.",
    image: "/images/tienda/interior-16.jpeg",
    brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"],
  },
  {
    id: "complementos",
    name: "Complementos textiles",
    detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y más.",
    image: "/images/tienda/interior-01.jpeg",
    brands: ["BUFF", "Hanker Sport", "Lurbel", "Pimiento Negro", "RaidLight", "Joma", "226ERS", "Ultimate Performance", "SAXX", "Stenex", "Shere Pro"],
  },
  {
    id: "accesorios",
    name: "Accesorios",
    detail: "Frontales, gafas, relojes, bastones, imanes, mantas térmicas y material para completar tu equipo.",
    image: "/images/tienda/interior-03.jpeg",
    brands: ["Ledlenser", "COROS", "Ozirik", "Styrpe", "Ultimate Performance", "Shere Pro", "RaidLight", "La Sportiva", "Ferrino"],
  },
  {
    id: "cuidado",
    name: "Cuidado deportivo",
    detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con mayor comodidad.",
    image: "/images/tienda/interior-20.jpeg",
    brands: ["OXD Sport", "Ultimate Performance"],
  },
] as const;

const filters = ["Todo", ...categories.map((category) => category.name)] as const;

export function ProductCatalog() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todo");
  const visibleCategories = active === "Todo" ? categories : categories.filter((category) => category.name === active);

  useEffect(() => {
    const showLinkedCategory = () => {
      const id = window.location.hash.slice(1);
      const category = categories.find((item) => item.id === id);
      if (!category) return;
      setActive(category.name);
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    showLinkedCategory();
    window.addEventListener("hashchange", showLinkedCategory);
    return () => window.removeEventListener("hashchange", showLinkedCategory);
  }, []);

  return (
    <>
      <div className="catalog-intro">
        <div>
          <p className="eyebrow"><span />Selección en tienda</p>
          <h2>Material que conocemos.<br /><em>Marcas en las que confiamos.</em></h2>
        </div>
        <p>Esta guía recoge las familias y marcas representadas en IBHOLA. El surtido, las tallas y los modelos cambian: consúltanos y te ayudaremos a encontrar la opción adecuada.</p>
      </div>

      <div className="catalog-filters" role="group" aria-label="Filtrar catálogo por categoría">
        {filters.map((filter) => (
          <button key={filter} type="button" className={active === filter ? "is-active" : ""} onClick={() => setActive(filter)} aria-pressed={active === filter}>
            {filter}
          </button>
        ))}
      </div>

      <div className="catalog-grid" aria-live="polite">
        {visibleCategories.map((category) => (
          <article className="product-card" key={category.id} id={category.id}>
            <div className="product-card__image">
              <Image src={imagePath(category.image)} alt={`${category.name} disponible en IBHOLA Trail Running`} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              <span>{String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}</span>
            </div>
            <div className="product-card__body">
              <small>Trail · running · tienda física</small>
              <h3>{category.name}</h3>
              <p>{category.detail}</p>
              <ul className="brand-list" aria-label={`Marcas de ${category.name}`}>
                {category.brands.map((brand) => <li key={brand}>{brand}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <section className="personalization" id="personalizacion">
        <div className="personalization__copy">
          <p className="eyebrow"><span />Equipaciones a medida</p>
          <h2>Tu idea.<br /><em>Nuestra forma de hacerla equipo.</em></h2>
          <p>Diseñamos, personalizamos y fabricamos equipaciones para running, trail, ciclismo, fútbol, pádel, rugby, baloncesto, balonmano, fútbol sala y otros deportes.</p>
          <ul>
            {["Sin pedidos mínimos", "Plazos adaptados a cada necesidad", "Posibilidad de reposiciones", "Asesoramiento y tarifas para eventos deportivos"].map((benefit) => <li key={benefit}><Check size={16} />{benefit}</li>)}
          </ul>
          <div className="personalization__brands" aria-label="Marcas de equipaciones personalizadas">
            <span>Distribuidores oficiales</span>
            <b>Spall</b><b>Tuga Wear</b><b>BRK23</b><b>Gobik</b>
          </div>
          <a className="button" href={link("/#contacto")}>Cuéntanos tu proyecto <ArrowRight size={17} /></a>
        </div>
        <div className="personalization__visual" aria-label="Ejemplos de equipaciones personalizadas por IBHOLA">
          <div className="personalization__product personalization__product--singlet"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada para Club Trail Sierra Abuela" fill sizes="(max-width: 850px) 52vw, 28vw" /></div>
          <div className="personalization__product personalization__product--socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill sizes="(max-width: 850px) 42vw, 20vw" /></div>
        </div>
      </section>
    </>
  );
}
