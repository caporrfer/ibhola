"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const categories = [
  { id: "calzado", name: "Calzado", detail: "Ajuste, amortiguación, estabilidad, respuesta y agarre. Te ayudamos a comparar sensaciones y terreno para elegir con criterio.", image: "/images/catalogo/calzado-hoka-trail.jpg", brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"] },
  { id: "textil", name: "Textil técnico", detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas para entrenar, competir o simplemente disfrutar.", image: "/images/catalogo/textil-personalizado.jpg", brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Sphere Pro", "226ERS", "La Sportiva", "Brooks"] },
  { id: "suplementacion", name: "Suplementación", detail: "Nutrición, hidratación y recuperación para preparar cada salida, mantener la energía y cuidar el cuerpo al terminar.", image: "/images/tienda/interior-16.jpeg", brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"] },
  { id: "complementos", name: "Complementos", detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y ropa interior técnica.", image: "/images/tienda/interior-01.jpeg", brands: ["BUFF", "Hanker Sport", "Lurbel", "Pimiento Negro", "RaidLight", "Joma", "226ERS", "Ultimate Performance", "SAXX", "Stenex", "Sphere Pro"] },
  { id: "accesorios", name: "Accesorios", detail: "Frontales, gafas, relojes, bastones, imanes, mantas térmicas y material para completar tu equipo.", image: "/images/tienda/interior-03.jpeg", brands: ["Ledlenser", "COROS", "Ozirik", "Styrpe", "Ultimate Performance", "Sphere Pro", "RaidLight", "La Sportiva", "Ferrino"] },
  { id: "cuidado", name: "Cuidado deportivo", detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con más comodidad.", image: "/images/tienda/interior-20.jpeg", brands: ["OXD Sport", "Ultimate Performance"] },
] as const;

const brandLogos: Record<string, string> = {
  "226ERS": "/images/marcas/226ers.png", "AML Sport": "/images/marcas/aml-sport.png", "ASICS": "/images/marcas/asics.png", "Ana María Lajusticia": "/images/marcas/ana-maria-lajusticia.png", "Atom": "/images/marcas/atom.png", "BUFF": "/images/marcas/buff.png", "Brooks": "/images/marcas/brooks.png", "COROS": "/images/marcas/coros.png", "Ferrino": "/images/marcas/ferrino.png", "HOKA": "/images/marcas/hoka.png", "Hanker Sport": "/images/marcas/hanker-sport.png", "Joma": "/images/marcas/joma.png", "La Sportiva": "/images/marcas/la-sportiva.png", "Ledlenser": "/images/marcas/ledlenser.png", "Lurbel": "/images/marcas/lurbel.png", "Nedao": "/images/marcas/nedao.png", "OOFOS": "/images/marcas/oofos.png", "OXD Sport": "/images/marcas/oxd-sport.png", "Quinton Sport": "/images/marcas/quinton-sport.png", "RaidLight": "/images/marcas/raidlight.png", "SAXX": "/images/marcas/saxx.png", "Scientific Nutrition": "/images/marcas/scientiffic-nutrition.png", "Sphere Pro": "/images/marcas/sphere-pro.jpg", "Styrpe": "/images/marcas/styrpe.png", "Ultimate Performance": "/images/marcas/ultimate-performance.jpg",
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

  const selectCategory = (id: string) => {
    if (!id) return;
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div className="catalog-showroom">
    <section className="cs-hero" id="catalogo">
      <div className="cs-hero__image"><Image src={imagePath("/images/corredor-enhanced.webp")} alt="Corredor de trail en plena montaña" fill priority sizes="100vw" /></div>
      <div className="container-wide cs-hero__content">
        <p className="cs-kicker">IBHOLA · Trail &amp; Running · Corrales</p>
        <h1>Equípate<br />para <em>salir.</em></h1>
        <div className="cs-hero__bottom"><p>Material que conocemos. Marcas en las que confiamos. Asesoramiento pensado para tu forma de moverte.</p><a href="#calzado">Ver colección <ArrowDown size={18} /></a></div>
      </div>
      <nav className="cs-hero__nav" aria-label="Familias del catálogo">{categories.map((category, index) => <a href={`#${category.id}`} key={category.id}><span>{String(index + 1).padStart(2, "0")}</span>{category.name}</a>)}</nav>
      <div className="cs-mobile-filter">
        <label htmlFor="catalog-category">Explora por categoría</label>
        <div><select id="catalog-category" defaultValue="" onChange={(event) => selectCategory(event.target.value)}><option value="" disabled>Selecciona una familia</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select><ChevronDown size={19} aria-hidden="true" /></div>
      </div>
    </section>

    <section className="cs-chapters" aria-label="Catálogo por familias">
      {categories.map((category, index) => <article className={`cs-chapter cs-chapter--${index + 1}`} id={category.id} key={category.id}>
        <div className="cs-chapter__image"><Image src={imagePath(category.image)} alt={`${category.name} disponible en IBHOLA Trail Running`} fill sizes="100vw" /></div>
        <div className="cs-chapter__shade" />
        <div className="container-wide cs-chapter__content">
          <div className="cs-chapter__heading" data-long-title={!category.name.includes(" ") && category.name.length >= 10}><h2>{category.name}</h2></div>
          <div className="cs-chapter__info"><p>{category.detail}</p><a href={link("/preguntas-frecuentes/#contacto")}>Consultar disponibilidad <ArrowRight size={16} /></a></div>
          <div className="cs-chapter__brands-wrap"><p className="cs-chapter__brands-hint">Desliza para ver todas las marcas <span aria-hidden="true">→</span></p><div className="cs-chapter__brands" aria-label={`Marcas de ${category.name}`}>{category.brands.map((brand) => <BrandLogo brand={brand} key={brand} />)}</div></div>
        </div>
      </article>)}
    </section>
  </div>;
}
