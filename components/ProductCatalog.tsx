"use client";

import Image from "next/image";
import { ArrowRight, Check, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const categories = [
  { id: "calzado", name: "Calzado", short: "Pisada y terreno", detail: "Asfalto, trail y recuperación. Te ayudamos a comparar ajuste, amortiguación, estabilidad, respuesta y agarre.", image: "/images/catalogo/calzado-hoka-trail.jpg", brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"] },
  { id: "textil", name: "Textil técnico", short: "Capas y rendimiento", detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas para entrenar, competir o disfrutar.", image: "/images/catalogo/textil-personalizado.jpg", brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Sphere Pro", "226ERS", "La Sportiva", "Brooks"] },
  { id: "suplementacion", name: "Suplementación", short: "Energía y recuperación", detail: "Nutrición, hidratación y recuperación para preparar cada salida y cuidar lo que ocurre después.", image: "/images/tienda/interior-16.jpeg", brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"] },
  { id: "complementos", name: "Complementos", short: "Comodidad al detalle", detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y ropa interior técnica.", image: "/images/tienda/interior-01.jpeg", brands: ["BUFF", "Hanker Sport", "Lurbel", "Pimiento Negro", "RaidLight", "Joma", "226ERS", "Ultimate Performance", "SAXX", "Stenex", "Sphere Pro"] },
  { id: "accesorios", name: "Accesorios", short: "Tecnología y seguridad", detail: "Frontales, gafas, relojes, bastones, imanes, mantas térmicas y material para completar tu equipo.", image: "/images/tienda/interior-03.jpeg", brands: ["Ledlenser", "COROS", "Ozirik", "Styrpe", "Ultimate Performance", "Sphere Pro", "RaidLight", "La Sportiva", "Ferrino"] },
  { id: "cuidado", name: "Cuidado deportivo", short: "Prevención y soporte", detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con más comodidad.", image: "/images/tienda/interior-20.jpeg", brands: ["OXD Sport", "Ultimate Performance"] },
] as const;

const sports = ["Running", "Trail", "Ciclismo", "Fútbol", "Tenis", "Pádel", "Rugby", "Baloncesto", "Balonmano", "Fútbol sala"];
const garments = ["Manga corta", "Tirantes", "Manga larga", "Cortavientos", "Chaquetas", "Sudaderas", "Calzonas", "Mallas", "Monos de ciclismo"];
const serviceProcess = [
  ["01", "Idea", "Deporte, diseño, unidades y presupuesto."],
  ["02", "Elección", "Prenda, calidad y marca adecuadas."],
  ["03", "Diseño", "Colores, nombres, escudos y detalles."],
  ["04", "Entrega", "Producción, entrega y reposiciones."],
] as const;

const brandLogos: Record<string, string> = {
  "226ERS": "/images/marcas/226ers.png", "AML Sport": "/images/marcas/aml-sport.png", "ASICS": "/images/marcas/asics.png", "Ana María Lajusticia": "/images/marcas/ana-maria-lajusticia.png", "Atom": "/images/marcas/atom.png", "BRK23": "/images/marcas/brk23.png", "BUFF": "/images/marcas/buff.png", "Brooks": "/images/marcas/brooks.png", "COROS": "/images/marcas/coros.png", "Ferrino": "/images/marcas/ferrino.png", "Gobik": "/images/marcas/gobik.png", "HOKA": "/images/marcas/hoka.png", "Hanker Sport": "/images/marcas/hanker-sport.png", "Joma": "/images/marcas/joma.png", "La Sportiva": "/images/marcas/la-sportiva.png", "Ledlenser": "/images/marcas/ledlenser.png", "Lurbel": "/images/marcas/lurbel.png", "Nedao": "/images/marcas/nedao.png", "OOFOS": "/images/marcas/oofos.png", "OXD Sport": "/images/marcas/oxd-sport.png", "Quinton Sport": "/images/marcas/quinton-sport.png", "RaidLight": "/images/marcas/raidlight.png", "SAXX": "/images/marcas/saxx.png", "Scientific Nutrition": "/images/marcas/scientiffic-nutrition.png", "Sphere Pro": "/images/marcas/sphere-pro.jpg", "Spall": "/images/marcas/spall.png", "Styrpe": "/images/marcas/styrpe.png", "Tuga Wear": "/images/marcas/tuga-wear.png", "Ultimate Performance": "/images/marcas/ultimate-performance.jpg",
};

function BrandLogo({ brand }: { brand: string }) {
  const logo = brandLogos[brand];
  const initials = brand.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  return <span className="cx-brand"><span>{logo ? <Image src={imagePath(logo)} alt="" width={72} height={48} unoptimized /> : <i>{initials}</i>}</span><b>{brand}</b></span>;
}

export function ProductCatalog() {
  const [activeId, setActiveId] = useState<(typeof categories)[number]["id"]>("calzado");
  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (categories.some((category) => category.id === id)) setActiveId(id as (typeof categories)[number]["id"]);
      if (id === "personalizacion") window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const chooseCategory = (id: (typeof categories)[number]["id"]) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return <div className="catalog-explorer">
    <section className="cx-hero" id="catalogo">
      <div className="container-wide cx-hero__layout">
        <div className="cx-hero__copy">
          <p className="cx-kicker">IBHOLA / Selección 2026</p>
          <h1>Encuentra<br />tu próximo<br /><em>kilómetro.</em></h1>
          <p>No vendemos por vender. Preguntamos, comparamos y te ayudamos a elegir el material que responde a tu deporte y a tus objetivos.</p>
          <a href="#explorador">Abrir explorador <ArrowRight size={17} /></a>
        </div>
        <div className="cx-hero__media"><Image src={imagePath("/images/tienda/interior-28.jpeg")} alt="Interior de IBHOLA Trail Running" fill priority sizes="(max-width: 800px) 100vw, 52vw" /><span>Equipamiento / Asesoramiento / Corrales</span></div>
        <div className="cx-hero__metric"><strong>06</strong><span>Familias<br />de producto</span></div>
        <div className="cx-hero__metric"><strong>30+</strong><span>Marcas<br />especializadas</span></div>
      </div>
    </section>

    <section className="cx-finder" id="explorador">
      <div className="container-wide">
        <header className="cx-finder__header"><div><p className="cx-kicker">Explorador de material</p><h2>¿Qué necesitas hoy?</h2></div><p>Elige una familia para ver de un vistazo qué encontrarás y con qué marcas trabajamos.</p></header>
        <div className="cx-finder__layout">
          <div className="cx-tabs" role="tablist" aria-label="Familias de producto">{categories.map((category, index) => <button key={category.id} type="button" role="tab" aria-selected={activeId === category.id} className={activeId === category.id ? "is-active" : ""} onClick={() => chooseCategory(category.id)}><span>{String(index + 1).padStart(2, "0")}</span><b>{category.name}</b><small>{category.short}</small><MoveRight size={20} /></button>)}</div>
          <article className="cx-result" id={active.id} key={active.id} role="tabpanel">
            <div className="cx-result__image"><Image src={imagePath(active.image)} alt={`${active.name} disponible en IBHOLA Trail Running`} fill sizes="(max-width: 900px) 100vw, 58vw" /><span>Selección IBHOLA</span></div>
            <div className="cx-result__body">
              <div><p>{active.short}</p><h3>{active.name}</h3><p>{active.detail}</p></div>
              <div className="cx-result__brands" aria-label={`Marcas de ${active.name}`}>{active.brands.map((brand) => <BrandLogo brand={brand} key={brand} />)}</div>
              <a href={link("/preguntas-frecuentes/#contacto")}>Consultar disponibilidad <ArrowRight size={16} /></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="cx-custom" id="personalizacion">
      <div className="container-wide">
        <header><p className="cx-kicker">Personalización integral</p><h2>Tu equipo.<br />Vuestras reglas.</h2><p>Desde una prenda especial hasta 1.200 camisetas para un evento. Diseñamos, fabricamos y facilitamos las reposiciones.</p></header>
        <div className="cx-bento">
          <div className="cx-bento__product"><span>Diseño exclusivo / 001</span><div className="cx-bento__shirt"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada" fill sizes="(max-width: 700px) 74vw, 35vw" /></div><div className="cx-bento__socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill sizes="(max-width: 700px) 46vw, 20vw" /></div></div>
          <div className="cx-bento__number"><strong>1→1.200</strong><span>De una unidad a grandes tiradas</span></div>
          <div className="cx-bento__number"><strong>Sin mínimos*</strong><span>En las marcas que lo permiten</span></div>
          <div className="cx-bento__list"><span>10 deportes</span><p>{sports.join(" / ")}</p></div>
          <div className="cx-bento__list"><span>9 tipos de prenda</span><p>{garments.join(" / ")}</p></div>
          <div className="cx-bento__logos">{["Spall", "Tuga Wear", "BRK23", "Gobik"].map((brand) => <BrandLogo brand={brand} key={brand} />)}</div>
          <a className="cx-bento__cta" href={link("/preguntas-frecuentes/#contacto")}><span>Empezar un proyecto</span><ArrowRight size={28} /></a>
        </div>
      </div>
    </section>

    <section className="cx-process">
      <div className="container-wide">
        <header><p className="cx-kicker">Cómo trabajamos</p><h2>Cuatro pasos. Cero complicaciones.</h2></header>
        <div className="cx-process__steps">{serviceProcess.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="cx-process__note"><Check size={17} /> Los mínimos dependen de la marca y del tipo de prenda. Buscamos la alternativa que encaja con cada proyecto.</p>
      </div>
    </section>
  </div>;
}
