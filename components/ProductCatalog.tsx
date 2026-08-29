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
    detail: "Asfalto, trail y recuperación. Te ayudamos a comparar ajuste, amortiguación, estabilidad, respuesta y agarre.",
    image: "/images/catalogo/calzado-hoka-trail.jpg",
    brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"],
  },
  {
    id: "textil",
    name: "Textil técnico",
    detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas para entrenar, competir o disfrutar.",
    image: "/images/catalogo/textil-personalizado.jpg",
    brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Shere Pro", "226ERS", "La Sportiva", "Brooks"],
  },
  {
    id: "suplementacion",
    name: "Suplementación",
    detail: "Nutrición, hidratación y recuperación para preparar cada salida y cuidar lo que ocurre después.",
    image: "/images/tienda/interior-16.jpeg",
    brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"],
  },
  {
    id: "complementos",
    name: "Complementos textiles",
    detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y ropa interior técnica.",
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
    detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con más comodidad.",
    image: "/images/tienda/interior-20.jpeg",
    brands: ["OXD Sport", "Ultimate Performance"],
  },
] as const;

const filters = ["Todo", ...categories.map((category) => category.name)] as const;
const sports = ["Running", "Trail", "Ciclismo", "Fútbol", "Tenis", "Pádel", "Rugby", "Baloncesto", "Balonmano", "Fútbol sala"];
const garments = ["Manga corta", "Tirantes", "Manga larga", "Cortavientos", "Chaquetas", "Sudaderas", "Calzonas", "Mallas", "Monos de ciclismo"];
const serviceProcess = [
  ["01", "La idea", "Cuéntanos el deporte, el diseño, las unidades y el presupuesto."],
  ["02", "La elección", "Te orientamos entre prendas, calidades y marcas que encajen de verdad."],
  ["03", "El diseño", "Adaptamos colores, nombres, escudos y cada detalle a vuestra identidad."],
  ["04", "La entrega", "Fabricamos la tirada y gestionamos futuras reposiciones cuando hagan falta."],
] as const;

export function ProductCatalog() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todo");
  const visibleCategories = active === "Todo" ? categories : categories.filter((category) => category.name === active);

  useEffect(() => {
    const showLinkedSection = () => {
      const id = window.location.hash.slice(1);
      const category = categories.find((item) => item.id === id);
      if (category) setActive(category.name);
      if (!category && id !== "personalizacion") return;
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    showLinkedSection();
    window.addEventListener("hashchange", showLinkedSection);
    return () => window.removeEventListener("hashchange", showLinkedSection);
  }, []);

  return (
    <>
      <section className="catalog-feature" id="personalizacion">
        <div className="container catalog-feature__layout">
          <div className="catalog-feature__copy">
            <p className="catalog-kicker">Diseño · fabricación · eventos</p>
            <h1>Una prenda única o 1.200 camisetas. <em>Diseñadas para representaros.</em></h1>
            <p className="catalog-feature__lead">Partimos de vuestra idea, el deporte, el presupuesto y la cantidad. Después recomendamos la prenda, la calidad y la marca que mejor encajan: desde una camiseta especial hasta la equipación completa de un club o un gran evento.</p>

            <div className="catalog-feature__stats" aria-label="Ventajas del servicio de personalización">
              <div><strong>1 → 1.200</strong><span>De una unidad a grandes tiradas</span></div>
              <div><strong>Sin mínimos</strong><span>En las marcas que lo permiten</span></div>
              <div><strong>Reposiciones</strong><span>Para nuevas altas y necesidades futuras</span></div>
            </div>

            <div className="catalog-feature__actions">
              <a className="button" href={link("/#contacto")}>Cuéntanos tu proyecto <ArrowRight size={17} /></a>
              <p>Clubes · equipos · empresas · regalos · eventos deportivos</p>
            </div>
          </div>

          <div className="catalog-feature__visual" aria-label="Ejemplos de equipaciones deportivas personalizadas">
            <span className="catalog-feature__label">Diseño exclusivo / 001</span>
            <div className="catalog-feature__product catalog-feature__product--singlet"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada para un club de trail" fill priority sizes="(max-width: 850px) 58vw, 29vw" /></div>
            <div className="catalog-feature__product catalog-feature__product--socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill sizes="(max-width: 850px) 46vw, 21vw" /></div>
            <p className="catalog-feature__caption">La prenda no existe hasta que la hacemos vuestra.</p>
          </div>
        </div>

        <div className="container catalog-feature__scope">
          <div><span>Deportes</span>{sports.map((sport) => <b key={sport}>{sport}</b>)}</div>
          <div><span>Prendas</span>{garments.map((garment) => <b key={garment}>{garment}</b>)}</div>
          <div className="catalog-feature__brands"><span>Marcas representadas</span><b>Spall</b><b>Tuga Wear</b><b>BRK23</b><b>Gobik</b></div>
        </div>
      </section>

      <section className="catalog-process">
        <div className="container">
          <header><p className="catalog-kicker">Servicio completo</p><h2>Del primer boceto<br />a la línea de salida.</h2><p>No trabajamos con una solución cerrada. Ajustamos el proyecto a las personas, al uso y al presupuesto.</p></header>
          <div className="catalog-process__grid">
            {serviceProcess.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <p className="catalog-process__note"><Check size={17} />Los mínimos dependen de la marca y del tipo de prenda. Trabajamos con varias firmas para poder ofrecer desde piezas individuales hasta equipaciones y eventos de gran volumen.</p>
        </div>
      </section>

      <section className="catalog-index" id="catalogo">
        <div className="container">
          <header className="catalog-index__heading">
            <div><p className="catalog-kicker">Tienda física · Corrales</p><h2>Marcas para cada<br />forma de moverse.</h2></div>
            <p>Consulta las familias y marcas representadas en IBHOLA. El surtido, los modelos y las tallas cambian; en tienda te ayudamos a elegir con criterio.</p>
          </header>

          <div className="catalog-filterbar" role="group" aria-label="Filtrar catálogo por categoría">
            {filters.map((filter) => <button key={filter} type="button" className={active === filter ? "is-active" : ""} onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}</button>)}
          </div>

          <div className="catalog-category-grid" aria-live="polite">
            {visibleCategories.map((category) => (
              <article className="catalog-category" key={category.id} id={category.id}>
                <div className="catalog-category__image">
                  <Image src={imagePath(category.image)} alt={`${category.name} disponible en IBHOLA Trail Running`} fill sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" />
                  <span>{String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}</span>
                </div>
                <div className="catalog-category__body">
                  <h3>{category.name}</h3>
                  <p>{category.detail}</p>
                  <div className="catalog-category__brands" aria-label={`Marcas de ${category.name}`}>{category.brands.map((brand) => <b key={brand}>{brand}</b>)}</div>
                  <a href={link("/#contacto")}>Consultar disponibilidad <ArrowRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
