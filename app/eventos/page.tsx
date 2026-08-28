import Image from "next/image";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { InteriorPage } from "@/components/InteriorPage";

export const metadata = { title: "Eventos | IBHOLA Trail Running" };

type Event = {
  date: string;
  title: string;
  place: string;
  image: string;
  alt: string;
  source: string;
};

const past: Event[] = [
  {
    date: "28 MAY 2025",
    title: "Reconocimiento en la IV Gala del Deporte",
    place: "Club de Golf Bellavista · Aljaraque",
    image: "/images/eventos/gala-deporte-ibhola-2025.webp",
    alt: "Representantes premiados durante la IV Gala del Deporte de Aljaraque",
    source: "https://www.ayto-aljaraque.es/es/ayuntamiento/sala-de-prensa/noticia-en-detalle/Aljaraque-rinde-honores-a-la-excelencia-deportiva-en-su-IV-Gala-del-Deporte/",
  },
  {
    date: "22 SEP 2024",
    title: "IX Trail Marismas de Corrales",
    place: "Corrales · Aljaraque",
    image: "/images/eventos/ix-trail-marismas-2024.webp",
    alt: "Organización del IX Trail Marismas de Corrales en el entorno de la prueba",
    source: "https://huelvaya.es/2024/09/23/vencedores-ix-trail-marismas-de-corrales/",
  },
  {
    date: "08 JUL 2023",
    title: "VIII Trail Marismas de Corrales",
    place: "Marismas del Odiel · Corrales",
    image: "/images/eventos/viii-trail-marismas-2023.webp",
    alt: "Corredoras atravesando el agua durante el VIII Trail Marismas de Corrales",
    source: "https://www.ayto-aljaraque.es/es/ayuntamiento/sala-de-prensa/noticia-en-detalle/El-VIII-Trail-Marismas-de-Corrales-volvio-a-dejar-momentos-espectaculares/",
  },
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
        <a className="event-card__source" href={event.source} target="_blank" rel="noreferrer">Ver fuente <ExternalLink size={13} aria-hidden="true" /></a>
      </div>
    </article>
  )}</div>;
}

export default function Page() {
  return <InteriorPage title="Disfruta de nuestros eventos." intro="Carreras, encuentros y reconocimientos que forman parte de la historia real de la comunidad IBHOLA en Huelva.">
    <section className="content-section events-page">
      <div className="container">
        <div className="subheading"><h2>Eventos anteriores</h2></div>
        <Cards items={past} />
        <p className="event-photo-credits">Fechas e imágenes contrastadas con publicaciones del <a href="https://www.ayto-aljaraque.es/" target="_blank" rel="noreferrer">Ayuntamiento de Aljaraque</a>. La crónica del IX Trail procede de HuelvaYa.</p>
      </div>
    </section>
  </InteriorPage>;
}
