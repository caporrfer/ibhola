"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const categories = [
  { id: "calzado", name: "Calzado", label: "Del asfalto a la montaña", detail: "Ajuste, amortiguación, estabilidad, respuesta y agarre. Te ayudamos a comparar sensaciones y terreno para elegir con criterio.", image: "/images/catalogo/calzado-hoka-trail.jpg", brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"] },
  { id: "textil", name: "Textil técnico", label: "Capas que trabajan contigo", detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas para entrenar, competir o simplemente disfrutar.", image: "/images/catalogo/textil-personalizado.jpg", brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Sphere Pro", "226ERS", "La Sportiva", "Brooks"] },
  { id: "suplementacion", name: "Suplementación", label: "Antes, durante y después", detail: "Nutrición, hidratación y recuperación para preparar cada salida, mantener la energía y cuidar el cuerpo al terminar.", image: "/images/tienda/interior-16.jpeg", brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"] },
  { id: "complementos", name: "Complementos", label: "La diferencia está en los detalles", detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y ropa interior técnica.", image: "/images/tienda/interior-01.jpeg", brands: ["BUFF", "Hanker Sport", "Lurbel", "Pimiento Negro", "RaidLight", "Joma", "226ERS", "Ultimate Performance", "SAXX", "Stenex", "Sphere Pro"] },
  { id: "accesorios", name: "Accesorios", label: "Tecnología para llegar más lejos", detail: "Frontales, gafas, relojes, bastones, imanes, mantas térmicas y material para completar tu equipo.", image: "/images/tienda/interior-03.jpeg", brands: ["Ledlenser", "COROS", "Ozirik", "Styrpe", "Ultimate Performance", "Sphere Pro", "RaidLight", "La Sportiva", "Ferrino"] },
  { id: "cuidado", name: "Cuidado deportivo", label: "Muévete con confianza", detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con más comodidad.", image: "/images/tienda/interior-20.jpeg", brands: ["OXD Sport", "Ultimate Performance"] },
] as const;

const sports = ["Running", "Trail", "Ciclismo", "Fútbol", "Tenis", "Pádel", "Rugby", "Baloncesto", "Balonmano", "Fútbol sala"];
const garments = ["Manga corta", "Tirantes", "Manga larga", "Cortavientos", "Chaquetas", "Sudaderas", "Calzonas", "Mallas", "Monos de ciclismo"];
const serviceProcess = [
  ["01", "La idea", "Deporte, diseño, unidades y presupuesto."],
  ["02", "La elección", "Prendas, calidades y marcas que encajan."],
  ["03", "El diseño", "Colores, nombres, escudos y cada detalle."],
  ["04", "La entrega", "Fabricación y futuras reposiciones."],
] as const;

const brandLogos: Record<string, string> = {
  "226ERS": "/images/marcas/226ers.png", "AML Sport": "/images/marcas/aml-sport.png", "ASICS": "/images/marcas/asics.png", "Ana María Lajusticia": "/images/marcas/ana-maria-lajusticia.png", "Atom": "/images/marcas/atom.png", "BRK23": "/images/marcas/brk23.png", "BUFF": "/images/marcas/buff.png", "Brooks": "/images/marcas/brooks.png", "COROS": "/images/marcas/coros.png", "Ferrino": "/images/marcas/ferrino.png", "Gobik": "/images/marcas/gobik.png", "HOKA": "/images/marcas/hoka.png", "Hanker Sport": "/images/marcas/hanker-sport.png", "Joma": "/images/marcas/joma.png", "La Sportiva": "/images/marcas/la-sportiva.png", "Ledlenser": "/images/marcas/ledlenser.png", "Lurbel": "/images/marcas/lurbel.png", "Nedao": "/images/marcas/nedao.png", "OOFOS": "/images/marcas/oofos.png", "OXD Sport": "/images/marcas/oxd-sport.png", "Quinton Sport": "/images/marcas/quinton-sport.png", "RaidLight": "/images/marcas/raidlight.png", "SAXX": "/images/marcas/saxx.png", "Scientific Nutrition": "/images/marcas/scientiffic-nutrition.png", "Sphere Pro": "/images/marcas/sphere-pro.jpg", "Spall": "/images/marcas/spall.png", "Styrpe": "/images/marcas/styrpe.png", "Tuga Wear": "/images/marcas/tuga-wear.png", "Ultimate Performance": "/images/marcas/ultimate-performance.jpg",
};

function BrandLogo({ brand }: { brand: string }) {
  const logo = brandLogos[brand];
  const initials = brand.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  return <span className="cs-brand"><span>{logo ? <Image src={imagePath(logo)} alt="" width={66} height={44} unoptimized /> : <i>{initials}</i>}</span><b>{brand}</b></span>;
}

export function ProductCatalog() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, []);

  return <div className="catalog-showroom">
    <section className="cs-hero" id="catalogo">
      <div className="cs-hero__image"><Image src={imagePath("/images/corredor-enhanced.webp")} alt="Corredor de trail en plena montaña" fill priority sizes="100vw" /></div>
      <div className="container-wide cs-hero__content">
        <p className="cs-kicker">IBHOLA · Trail &amp; Running · Corrales</p>
        <h1>Equípate<br />para <em>salir.</em></h1>
        <div className="cs-hero__bottom"><p>Material que conocemos. Marcas en las que confiamos. Asesoramiento pensado para tu forma de moverte.</p><a href="#calzado">Ver colección <ArrowDown size={18} /></a></div>
      </div>
      <nav className="cs-hero__nav" aria-label="Familias del catálogo">{categories.map((category, index) => <a href={`#${category.id}`} key={category.id}><span>{String(index + 1).padStart(2, "0")}</span>{category.name}</a>)}</nav>
    </section>

    <section className="cs-chapters" aria-label="Catálogo por familias">
      {categories.map((category, index) => <article className={`cs-chapter cs-chapter--${index + 1}`} id={category.id} key={category.id}>
        <div className="cs-chapter__image"><Image src={imagePath(category.image)} alt={`${category.name} disponible en IBHOLA Trail Running`} fill sizes="100vw" /></div>
        <div className="cs-chapter__shade" />
        <div className="container-wide cs-chapter__content">
          <div className="cs-chapter__heading"><span>{String(index + 1).padStart(2, "0")} / 06</span><p>{category.label}</p><h2>{category.name}</h2></div>
          <div className="cs-chapter__info"><p>{category.detail}</p><a href={link("/preguntas-frecuentes/#contacto")}>Consultar disponibilidad <ArrowRight size={16} /></a></div>
          <div className="cs-chapter__brands" aria-label={`Marcas de ${category.name}`}>{category.brands.map((brand) => <BrandLogo brand={brand} key={brand} />)}</div>
        </div>
      </article>)}
    </section>

    <section className="cs-atelier" id="personalizacion">
      <div className="container-wide cs-atelier__intro">
        <p className="cs-kicker">Atelier deportivo / Personalización</p>
        <h2>No es una prenda.<br />Es <em>vuestra</em> prenda.</h2>
        <p>Una unidad especial, la equipación de un club o 1.200 camisetas para un evento. Convertimos vuestra identidad en material listo para moverse.</p>
      </div>
      <div className="container-wide cs-atelier__stage">
        <span className="cs-atelier__word" aria-hidden="true">EQUIPO</span>
        <div className="cs-atelier__shirt"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada" fill sizes="(max-width: 800px) 76vw, 42vw" /></div>
        <div className="cs-atelier__socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill sizes="(max-width: 800px) 48vw, 23vw" /></div>
        <div className="cs-atelier__stat cs-atelier__stat--one"><strong>1 → 1.200</strong><span>Unidades</span></div>
        <div className="cs-atelier__stat cs-atelier__stat--two"><strong>Sin mínimos*</strong><span>Según marca</span></div>
      </div>
      <div className="container-wide cs-atelier__details">
        <div><span>Deportes</span><p>{sports.join(" · ")}</p></div>
        <div><span>Prendas</span><p>{garments.join(" · ")}</p></div>
        <div className="cs-atelier__brands"><span>Marcas representadas</span>{["Spall", "Tuga Wear", "BRK23", "Gobik"].map((brand) => <BrandLogo brand={brand} key={brand} />)}</div>
      </div>
      <div className="container-wide cs-atelier__action"><a className="button" href={link("/preguntas-frecuentes/#contacto")}>Cuéntanos tu proyecto <ArrowRight size={17} /></a></div>
    </section>

    <section className="cs-route">
      <div className="container-wide">
        <header><p className="cs-kicker">La ruta del proyecto</p><h2>De la primera idea<br />a la línea de salida.</h2></header>
        <div className="cs-route__line">{serviceProcess.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="cs-route__note"><Check size={17} /> Los mínimos dependen de la marca y del tipo de prenda. Trabajamos con distintas firmas para encontrar una solución real.</p>
      </div>
    </section>
  </div>;
}
