import Image from "next/image";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { EventPhotoCarousel } from "@/components/EventPhotoCarousel";
import { EventVideo } from "@/components/EventVideo";
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

const weeklyPhotos = [
  ["/images/eventos/quedadas-jueves/01-grupo-tienda.jpg", "Grupo de corredores frente a IBHOLA"],
  ["/images/eventos/quedadas-jueves/02-grupo-tienda.jpg", "Corredores reunidos frente a IBHOLA"],
  ["/images/eventos/quedadas-jueves/03-atardecer-playa.jpg", "Corredores junto al mar al atardecer"],
  ["/images/eventos/quedadas-jueves/04-salida-nocturna.jpg", "Grupo de corredores durante una salida nocturna"],
  ["/images/eventos/quedadas-jueves/05-grupo-playa.jpg", "Grupo de corredores en la playa"],
  ["/images/eventos/quedadas-jueves/06-grupo-atardecer.jpg", "Grupo de corredores al atardecer"],
  ["/images/eventos/quedadas-jueves/07-caminata-playa.jpg", "Corredores caminando por la playa"],
  ["/images/eventos/quedadas-jueves/08-grupo-mirador.jpg", "Grupo de corredores en la montaña"],
  ["/images/eventos/quedadas-jueves/09-grupo-noche.jpg", "Grupo de corredores durante una salida nocturna"],
  ["/images/eventos/quedadas-jueves/10-grupo-tienda-noche.jpg", "Corredores frente a IBHOLA por la noche"],
  ["/images/eventos/quedadas-jueves/11-grupo-tienda.jpg", "Grupo de corredores frente a la tienda"],
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
  return <InteriorPage title="Nuestros eventos" intro="" showHero={false}>
    <section className="content-section events-page">
      <div className="container">
        <div className="subheading"><h1>Eventos anteriores</h1></div>
        <article className="event-latest" aria-labelledby="xi-trail-title">
          <div className="event-latest__header">
            <p className="eyebrow">Último evento</p>
            <h3 id="xi-trail-title">XI Trail Marismas de Corrales</h3>
            <p className="event-latest__meta"><CalendarDays size={17} aria-hidden="true" />12 SEP 2026 <span aria-hidden="true">·</span><MapPin size={17} aria-hidden="true" />Corrales · Aljaraque</p>
            <h4>El reflejo del alma</h4>
            <p className="event-latest__copy">Una prueba diferente, hecha posible por meses de trabajo y por la confianza de quienes participaron y colaboraron. Tras la intensidad de la jornada queda el agradecimiento por cada gesto de apoyo, por el tiempo compartido y por el respeto recibido. El rostro refleja la tensión; el recuerdo, la satisfacción de haberlo vivido juntos.</p>
            <a className="event-latest__source" href="https://inscripciones.croniussport.es/inscripcion/xi-trail-cxm-marismas-de-corrales/" target="_blank" rel="noreferrer">Ver ficha del evento <ExternalLink size={13} aria-hidden="true" /></a>
          </div>
          <div className="event-latest__media">
            <figure className="event-latest__photo">
              <Image src="/images/eventos/xi-trail-marismas-2026.webp" alt="Corredor del XI Trail Marismas de Corrales atravesando una zona de agua" width={1365} height={2048} sizes="(max-width: 850px) calc(100vw - 42px), 40vw" />
            </figure>
            <EventVideo src="/videos/xi-trail-marismas-2026.mp4" poster="/images/eventos/xi-trail-marismas-2026-video-poster.webp" title="Vídeo resumen del XI Trail Marismas de Corrales" />
          </div>
        </article>
        <div className="subheading subheading--past subheading--community"><h2>Únete a la comunidad</h2></div>
        <EventPhotoCarousel photos={weeklyPhotos} />
        <Cards items={past} />
        <p className="event-photo-credits">Texto, fotografía y vídeo del XI Trail Marismas de Corrales aportados por IBHOLA. Fechas e imágenes de los eventos anteriores contrastadas con publicaciones del <a href="https://www.ayto-aljaraque.es/" target="_blank" rel="noreferrer">Ayuntamiento de Aljaraque</a>. La crónica del IX Trail procede de HuelvaYa.</p>
      </div>
    </section>
  </InteriorPage>;
}
