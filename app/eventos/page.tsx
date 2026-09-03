import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3, ExternalLink, MapPin } from "lucide-react";
import { InteriorPage } from "@/components/InteriorPage";

export const metadata = { title: "Eventos | IBHOLA Trail Running" };

type Event = {
  date: string;
  title: string;
  place: string;
  image: string;
  alt: string;
  source?: string;
};

const weeklyEvents: Event[] = [
  {
    date: "TODOS LOS JUEVES",
    title: "Quedadas Jueves IBHOLA",
    place: "Salida desde IBHOLA · 20:30 h",
    image: "/images/eventos/quedadas-jueves/01-grupo-tienda.jpg",
    alt: "Grupo de corredores reunido frente a IBHOLA",
  },
];

const weeklyPhotos = [
  ["/images/eventos/quedadas-jueves/02-grupo-tienda.jpg", "Grupo de corredores frente a IBHOLA"],
  ["/images/eventos/quedadas-jueves/04-salida-nocturna.jpg", "Grupo de corredores durante una salida nocturna"],
  ["/images/eventos/quedadas-jueves/06-grupo-atardecer.jpg", "Grupo de corredores en la montaña"],
] as const;

const past: Event[] = [
  {
    date: "28 MAY 2025",
    title: "IBHOLA, reconocida en la IV Gala del Deporte",
    place: "Club de Golf Bellavista · Aljaraque",
    image: "/images/eventos/gala-deporte-ibhola-2025.webp",
    alt: "Intervención institucional durante la IV Gala del Deporte de Aljaraque",
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
        {event.source && <a className="event-card__source" href={event.source} target="_blank" rel="noreferrer">Ver fuente <ExternalLink size={13} aria-hidden="true" /></a>}
      </div>
    </article>
  )}</div>;
}

export default function Page() {
  return <InteriorPage title="Disfruta de nuestros eventos." intro="Carreras, encuentros y reconocimientos que forman parte de la historia real de la comunidad IBHOLA en Huelva.">
    <section className="content-section events-page">
      <div className="container">
        <div className="subheading"><h2>Únete a la comunidad</h2></div>
        <article className="event-spotlight">
          <div className="event-spotlight__visual">
            <Image src={weeklyEvents[0].image} alt={weeklyEvents[0].alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
            <div className="event-spotlight__stamp"><span>IBHOLA</span><strong>JUEVES</strong><small>20:30 H</small></div>
            <p className="event-spotlight__count">01 <span>/ comunidad</span></p>
          </div>
          <div className="event-spotlight__body">
            <p className="eyebrow">Una cita cada semana</p>
            <h3>Quedadas<br /><em>Jueves IBHOLA</em></h3>
            <p className="event-spotlight__lead">Corre, conoce gente y disfruta del camino.</p>
            <p className="event-spotlight__description">Todos los jueves del año nos encontramos para salir juntos desde IBHOLA. Una quedada abierta a todos los niveles y sin necesidad de inscripción.</p>
            <div className="event-spotlight__details">
              <div><CalendarDays size={18} aria-hidden="true" /><span>Todos los jueves</span></div>
              <div><Clock3 size={18} aria-hidden="true" /><span>20:30 horas</span></div>
              <div><MapPin size={18} aria-hidden="true" /><span>Salida desde IBHOLA</span></div>
            </div>
            <a className="event-spotlight__link" href="/preguntas-frecuentes/#contacto">Quiero apuntarme <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </article>
        <div className="event-gallery" aria-label="Galería de las Quedadas Jueves IBHOLA">
          {weeklyPhotos.map(([image, alt], index) => <div className={`event-gallery__item event-gallery__item--${index + 1}`} key={image}><Image src={image} alt={alt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 33vw, 25vw" /></div>)}
        </div>
        <div className="subheading"><h2>Eventos anteriores</h2></div>
        <Cards items={past} />
        <p className="event-photo-credits">Fechas e imágenes contrastadas con publicaciones del <a href="https://www.ayto-aljaraque.es/" target="_blank" rel="noreferrer">Ayuntamiento de Aljaraque</a>. La crónica del IX Trail procede de HuelvaYa.</p>
      </div>
    </section>
  </InteriorPage>;
}
