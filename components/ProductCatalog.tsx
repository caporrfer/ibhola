"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const categories = [
  { id: "calzado", name: "Calzado", overline: "Asfalto · Trail · Recuperación", detail: "Comparamos contigo ajuste, amortiguación, estabilidad, respuesta y agarre para encontrar el par que encaja con tu forma de correr.", image: "/images/catalogo/calzado-hoka-trail.jpg", brands: ["Joma", "La Sportiva", "HOKA", "OOFOS", "Brooks", "ASICS", "Atom", "RaidLight"] },
  { id: "textil", name: "Textil técnico", overline: "Entrenamiento · Competición", detail: "Calzonas, mallas, camisetas, pantalones, chaquetas y sudaderas pensadas para sumar kilómetros con comodidad.", image: "/images/catalogo/textil-personalizado.jpg", brands: ["Lurbel", "Hanker Sport", "Pimiento Negro", "Nedao", "RaidLight", "Joma", "BUFF", "Sphere Pro", "226ERS", "La Sportiva", "Brooks"] },
  { id: "suplementacion", name: "Suplementación", overline: "Nutrición · Hidratación · Recuperación", detail: "Soluciones para preparar cada salida, sostener el esfuerzo y cuidar lo que ocurre después del entrenamiento.", image: "/images/tienda/interior-16.jpeg", brands: ["226ERS", "Quinton Sport", "Scientific Nutrition", "Ana María Lajusticia", "AML Sport"] },
  { id: "complementos", name: "Complementos textiles", overline: "Detalles que cuentan", detail: "Gorras, viseras, calcetines, cordones, manguitos, cintas, cinturones, mochilas y ropa interior técnica.", image: "/images/tienda/interior-01.jpeg", brands: ["BUFF", "Hanker Sport", "Lurbel", "Pimiento Negro", "RaidLight", "Joma", "226ERS", "Ultimate Performance", "SAXX", "Stenex", "Sphere Pro"] },
  { id: "accesorios", name: "Accesorios", overline: "Tecnología · Seguridad · Montaña", detail: "Frontales, gafas, relojes, bastones, imanes, mantas térmicas y material para completar tu equipo.", image: "/images/tienda/interior-03.jpeg", brands: ["Ledlenser", "COROS", "Ozirik", "Styrpe", "Ultimate Performance", "Sphere Pro", "RaidLight", "La Sportiva", "Ferrino"] },
  { id: "cuidado", name: "Cuidado deportivo", overline: "Prevención · Confort", detail: "Cremas, tobilleras, rodilleras y soluciones de apoyo para entrenar con más seguridad y comodidad.", image: "/images/tienda/interior-20.jpeg", brands: ["OXD Sport", "Ultimate Performance"] },
] as const;

const sports = ["Running", "Trail", "Ciclismo", "Fútbol", "Tenis", "Pádel", "Rugby", "Baloncesto", "Balonmano", "Fútbol sala"];
const garments = ["Manga corta", "Tirantes", "Manga larga", "Cortavientos", "Chaquetas", "Sudaderas", "Calzonas", "Mallas", "Monos de ciclismo"];
const serviceProcess = [
  ["01", "La idea", "Cuéntanos el deporte, el diseño, las unidades y el presupuesto."],
  ["02", "La elección", "Te orientamos entre prendas, calidades y marcas que encajen de verdad."],
  ["03", "El diseño", "Adaptamos colores, nombres, escudos y cada detalle a vuestra identidad."],
  ["04", "La entrega", "Fabricamos la tirada y gestionamos futuras reposiciones."],
] as const;

const brandLogos: Record<string, string> = {
  "226ERS": "/images/marcas/226ers.png", "AML Sport": "/images/marcas/aml-sport.png", "ASICS": "/images/marcas/asics.png", "Ana María Lajusticia": "/images/marcas/ana-maria-lajusticia.png", "Atom": "/images/marcas/atom.png", "BRK23": "/images/marcas/brk23.png", "BUFF": "/images/marcas/buff.png", "Brooks": "/images/marcas/brooks.png", "COROS": "/images/marcas/coros.png", "Ferrino": "/images/marcas/ferrino.png", "Gobik": "/images/marcas/gobik.png", "HOKA": "/images/marcas/hoka.png", "Hanker Sport": "/images/marcas/hanker-sport.png", "Joma": "/images/marcas/joma.png", "La Sportiva": "/images/marcas/la-sportiva.png", "Ledlenser": "/images/marcas/ledlenser.png", "Lurbel": "/images/marcas/lurbel.png", "Nedao": "/images/marcas/nedao.png", "OOFOS": "/images/marcas/oofos.png", "OXD Sport": "/images/marcas/oxd-sport.png", "Quinton Sport": "/images/marcas/quinton-sport.png", "RaidLight": "/images/marcas/raidlight.png", "SAXX": "/images/marcas/saxx.png", "Scientific Nutrition": "/images/marcas/scientiffic-nutrition.png", "Sphere Pro": "/images/marcas/sphere-pro.jpg", "Spall": "/images/marcas/spall.png", "Styrpe": "/images/marcas/styrpe.png", "Tuga Wear": "/images/marcas/tuga-wear.png", "Ultimate Performance": "/images/marcas/ultimate-performance.jpg",
};

function BrandMark({ brand }: { brand: string }) {
  const logo = brandLogos[brand];
  const initials = brand.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  return <span className="ce-brand"><span>{logo ? <Image src={imagePath(logo)} alt="" width={64} height={44} unoptimized /> : <i>{initials}</i>}</span><b>{brand}</b></span>;
}

export function ProductCatalog() {
  return <div className="catalog-editorial">
    <section className="ce-hero" id="catalogo">
      <div className="container-wide ce-hero__grid">
        <div className="ce-hero__copy">
          <p className="ce-kicker">Catálogo IBHOLA · Edición 01</p>
          <h1>Material elegido<br />con <em>criterio.</em></h1>
          <p className="ce-hero__lead">Una selección para correr, entrenar y disfrutar del deporte. Marcas que conocemos y asesoramiento de tienda real en Corrales.</p>
          <a href="#familias">Descubrir la selección <ArrowDown size={17} /></a>
        </div>
        <div className="ce-hero__visual" aria-hidden="true">
          <div className="ce-hero__photo ce-hero__photo--main"><Image src={imagePath("/images/tienda/interior-12.jpeg")} alt="" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
          <div className="ce-hero__photo ce-hero__photo--detail"><Image src={imagePath("/images/catalogo/calzado-hoka-trail.jpg")} alt="" fill sizes="28vw" /></div>
          <span>Corrales, Huelva<br />37°16′N · 6°58′O</span>
        </div>
      </div>
    </section>

    <section className="ce-catalog" id="familias">
      <div className="container-wide ce-catalog__layout">
        <aside className="ce-index">
          <p>Explora por familia</p>
          <nav>{categories.map((category, index) => <a href={`#${category.id}`} key={category.id}><span>{String(index + 1).padStart(2, "0")}</span>{category.name}</a>)}</nav>
          <p className="ce-index__note">El surtido, los modelos y las tallas cambian. Escríbenos o visítanos para consultar disponibilidad.</p>
        </aside>
        <div className="ce-stories">
          {categories.map((category, index) => <article className="ce-story" id={category.id} key={category.id}>
            <div className="ce-story__image"><Image src={imagePath(category.image)} alt={`${category.name} disponible en IBHOLA Trail Running`} fill sizes="(max-width: 800px) 100vw, 55vw" /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className="ce-story__copy">
              <p>{category.overline}</p><h2>{category.name}</h2><p>{category.detail}</p>
              <div className="ce-story__brands" aria-label={`Marcas de ${category.name}`}>{category.brands.map((brand) => <BrandMark brand={brand} key={brand} />)}</div>
              <a href={link("/preguntas-frecuentes/#contacto")}>Consultar disponibilidad <ArrowRight size={16} /></a>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="ce-custom" id="personalizacion">
      <div className="container-wide ce-custom__grid">
        <div className="ce-custom__visual">
          <span>Hecho para vuestro equipo</span>
          <div className="ce-custom__shirt"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada" fill sizes="(max-width: 800px) 65vw, 34vw" /></div>
          <div className="ce-custom__socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill sizes="(max-width: 800px) 45vw, 20vw" /></div>
        </div>
        <div className="ce-custom__copy">
          <p className="ce-kicker">Personalización / De 1 a 1.200 unidades</p>
          <h2>Vuestra identidad,<br /><em>en movimiento.</em></h2>
          <p>Diseñamos y fabricamos desde una prenda única hasta la equipación completa de un club, empresa o gran evento. Elegimos juntos la prenda, calidad y marca que mejor encajan.</p>
          <div className="ce-custom__lists"><div><span>Deportes</span><p>{sports.join(" · ")}</p></div><div><span>Prendas</span><p>{garments.join(" · ")}</p></div></div>
          <div className="ce-custom__brands">{["Spall", "Tuga Wear", "BRK23", "Gobik"].map((brand) => <BrandMark brand={brand} key={brand} />)}</div>
          <a className="button" href={link("/preguntas-frecuentes/#contacto")}>Cuéntanos tu proyecto <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>

    <section className="ce-process">
      <div className="container-wide">
        <header><p className="ce-kicker">Del boceto a la línea de salida</p><h2>Un proceso cercano,<br />de principio a fin.</h2></header>
        <div className="ce-process__steps">{serviceProcess.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <p className="ce-process__note"><Check size={17} /> Los mínimos dependen de la marca y el tipo de prenda. Buscamos la opción adecuada para cada proyecto.</p>
      </div>
    </section>
  </div>;
}
