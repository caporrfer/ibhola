import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { InteriorPage } from "@/components/InteriorPage";

export const metadata = { title: "Eventos | IBHOLA Trail Running" };

type Event = {
  date: string;
  title: string;
  place: string;
  image: string;
  alt: string;
};

const upcoming: Event[] = [
  { date: "18 SEP", title: "Quedada nocturna Marismas del Odiel", place: "Punta Umbría · 20:00", image: "/images/eventos/marismas-odiel-atardecer.webp", alt: "Atardecer sobre las Marismas del Odiel" },
  { date: "04 OCT", title: "Prueba de calzado trail", place: "Corrales · 10:00", image: "/images/eventos/corrales-marismas.webp", alt: "Vista de Corrales y las marismas de Huelva" },
  { date: "25 OCT", title: "Salida por los Pinares de Aljaraque", place: "Aljaraque · 09:00", image: "/images/eventos/aljaraque-entorno.webp", alt: "Entorno natural de Aljaraque" },
];

const past: Event[] = [
  { date: "14 JUN", title: "Ruta del Conquero", place: "Huelva", image: "/images/eventos/parque-moret-camino.webp", alt: "Camino entre árboles en el Parque Moret de Huelva" },
  { date: "18 MAY", title: "Entrenamiento técnico en cuesta", place: "San Juan del Puerto", image: "/images/eventos/parque-moret-vegetacion.webp", alt: "Vegetación del Parque Moret de Huelva" },
  { date: "06 ABR", title: "Salida por la Dehesa de Corrales", place: "Corrales", image: "/images/eventos/marismas-odiel-huelva.webp", alt: "Marismas del Odiel con Huelva al fondo" },
];

function Cards({ items }: { items: Event[] }) {
  return <div className="event-grid">{items.map((event) =>
    <article key={event.title}>
      <div className="event-card__image">
        <Image src={event.image} alt={event.alt} fill sizes="(max-width: 600px) calc(100vw - 30px), (max-width: 850px) 50vw, 33vw" />
        <span>{event.date}</span>
      </div>
      <div className="event-card__body">
        <CalendarDays size={23} aria-hidden="true" />
        <h3>{event.title}</h3>
        <p><MapPin size={15} aria-hidden="true" />{event.place}</p>
      </div>
    </article>
  )}</div>;
}

export default function Page() {
  return <InteriorPage title="Disfruta de nuestros eventos." intro="Consulta las próximas salidas, pruebas de material y encuentros de la comunidad IBHOLA en Huelva.">
    <section className="content-section events-page">
      <div className="container">
        <div className="subheading"><h2>Próximos eventos</h2></div>
        <Cards items={upcoming} />
        <div className="subheading subheading--past"><h2>Eventos anteriores</h2></div>
        <Cards items={past} />
        <p className="event-photo-credits">Fotografías de <a href="https://commons.wikimedia.org/wiki/User:FJavier_G%C3%B3mezL" target="_blank" rel="noreferrer">FJavier GómezL</a> (<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>) y <a href="https://commons.wikimedia.org/wiki/File:Camino_-_Parque_Moret_(Huelva).jpg" target="_blank" rel="noreferrer">Jose A.</a> (<a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a>), vía Wikimedia Commons.</p>
      </div>
    </section>
  </InteriorPage>;
}
