import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;

const sports = ["Running", "Trail", "Ciclismo", "Fútbol", "Tenis", "Pádel", "Rugby", "Baloncesto", "Balonmano", "Fútbol sala"];
const garments = ["Manga corta", "Tirantes", "Manga larga", "Cortavientos", "Chaquetas", "Sudaderas", "Calzonas", "Mallas", "Monos de ciclismo"];
const serviceProcess = [
  ["01", "La idea", "Deporte, diseño, unidades y presupuesto."],
  ["02", "La elección", "Prendas, calidades y marcas que encajan."],
  ["03", "El diseño", "Colores, nombres, escudos y cada detalle."],
  ["04", "La entrega", "Fabricación y futuras reposiciones."],
] as const;

const brands = [
  ["Spall", "/images/marcas/spall.png"],
  ["Tuga Wear", "/images/marcas/tuga-wear.png"],
  ["BRK23", "/images/marcas/brk23.png"],
  ["Gobik", "/images/marcas/gobik.png"],
] as const;

function BrandLogo({ brand, logo }: { brand: string; logo: string }) {
  return <span className="cs-brand"><span><Image src={imagePath(logo)} alt="" width={66} height={44} unoptimized /></span><b>{brand}</b></span>;
}

export function CustomDesign() {
  return <div className="catalog-showroom custom-design-page">
    <section className="cs-atelier">
      <div className="container-wide cs-atelier__intro">
        <p className="cs-kicker">Diseño y fabricación / Equipaciones deportivas</p>
        <h1>No es una prenda.<br />Es <em>vuestra</em> prenda.</h1>
        <p>Running, trail, ciclismo, fútbol, pádel y mucho más. Diseñamos desde una unidad especial hasta la equipación completa de un club o un gran evento.</p>
      </div>
      <div className="container-wide cs-atelier__stage">
        <span className="cs-atelier__word" aria-hidden="true">EQUIPO</span>
        <div className="cs-atelier__shirt"><Image src={imagePath("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta técnica personalizada" fill priority sizes="(max-width: 800px) 76vw, 42vw" /></div>
        <div className="cs-atelier__socks"><Image src={imagePath("/images/catalogo/personalizacion-calcetines.png")} alt="Calcetines deportivos personalizados" fill priority sizes="(max-width: 800px) 48vw, 23vw" /></div>
        <div className="cs-atelier__stat cs-atelier__stat--one"><strong>1 → 1.200</strong><span>Unidades</span></div>
        <div className="cs-atelier__stat cs-atelier__stat--two"><strong>Sin mínimos*</strong><span>Según marca</span></div>
      </div>
      <div className="container-wide cs-atelier__manifesto">
        <p className="cs-kicker">Vuestra idea, nuestra experiencia</p>
        <h2>Una equipación que dice quiénes sois.</h2>
        <div>
          <p>Tú traes la idea y el plan; nosotros les damos forma y los adaptamos a la prenda y al deporte que necesitéis, con la calidad ajustada a cada proyecto.</p>
          <p>No se trata solo de darle color a una prenda, sino de darle significado: crear una equipación técnica que represente aquello que cada deportista quiere transmitir.</p>
        </div>
      </div>
      <div className="container-wide cs-atelier__details">
        <div><span>Deportes</span><p>{sports.join(" · ")}</p></div>
        <div><span>Prendas</span><p>{garments.join(" · ")}</p></div>
        <div className="cs-atelier__brands"><span>Marcas representadas</span>{brands.map(([brand, logo]) => <BrandLogo brand={brand} logo={logo} key={brand} />)}</div>
      </div>
      <div className="container-wide cs-atelier__action"><p>¿Organizas un evento deportivo? Consúltanos. Buscaremos entre distintas marcas, prendas y servicios la opción que mejor encaje.</p><a className="button" href={link("/preguntas-frecuentes/#contacto")}>Cuéntanos tu proyecto <ArrowRight size={17} /></a></div>
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
