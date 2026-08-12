import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, AtSign, BadgeCheck, CalendarDays,
  Clock3, Compass, Footprints, Mail, MapPin, Mountain,
  Navigation, Phone, Quote, Route, ShieldCheck, Store, UsersRound,
} from "lucide-react";
import { business, fullAddress } from "@/config/business";
import { Brand } from "./Brand";
import { ContactForm } from "./ContactForm";
import { Header } from "./Header";
import { LaunchScreen } from "./LaunchScreen";
import { ProductCatalog } from "./ProductCatalog";
import { RevealObserver } from "./Reveal";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const reviews = [
  "Buen trato, siempre atentas, geniales.",
  "Te atienden y te explican lo que necesites y las dudas que tengas.",
  "Gran surtido en ropa y calzado trail, magnífica atención.",
  "La calidad comienza nada más entrar. Si quieres el mejor asesoramiento y un lugar de confianza, este es tu sitio.",
];

const notes = [
  {
    number: "01",
    title: "Trail o asfalto: qué cambia de verdad en una zapatilla",
    text: "Agarre, estabilidad, protección y ajuste: cuatro diferencias que conviene entender antes de elegir.",
  },
  {
    number: "02",
    title: "Hidratación según distancia y temperatura",
    text: "No necesitas cargar lo mismo en una salida corta que en una carrera larga. Te ayudamos a calcularlo.",
  },
  {
    number: "03",
    title: "Qué llevar a una carrera sin llenar la mochila",
    text: "Una lista breve para revisar material obligatorio, nutrición y esos pequeños detalles que suelen olvidarse.",
  },
];

const faqs = [
  {
    question: "¿Puedo consultar disponibilidad antes de desplazarme?",
    answer: `Sí. Llámanos al ${business.phoneDisplay} o escríbenos a ${business.email} y te confirmamos las opciones disponibles en tienda.`,
  },
  {
    question: "¿Trabajáis material para trail y para asfalto?",
    answer: "Sí. Encontrarás calzado, textil y accesorios tanto para montaña como para running en asfalto.",
  },
  {
    question: "¿Cómo me ayudáis a elegir unas zapatillas?",
    answer: "Hablamos de dónde corres, las distancias que haces, el ajuste que prefieres y tus sensaciones. Después comparamos contigo las opciones que mejor encajan.",
  },
  {
    question: "¿Dónde publicáis las próximas actividades?",
    answer: "Las salidas, pruebas de material y novedades de la tienda se anuncian en Instagram y Facebook. La agenda de esta web se irá actualizando con los próximos eventos.",
  },
  {
    question: "¿El catálogo muestra todo el stock?",
    answer: "No. Es una guía de las familias de producto que trabajamos. Para modelos, tallas y disponibilidad, consúltanos directamente.",
  },
];

export function HomePage() {
  return (
    <>
      <LaunchScreen />
      <RevealObserver />
      <Header />

      <main>
        <section className="hero" id="inicio">
          <Topography className="hero__topography" />
          <div className="hero__layout container-wide">
            <div className="hero__copy">
              <p className="eyebrow"><span /> Desde Corrales, Huelva</p>
              <h1>Cada ruta pide algo distinto. <em>También tus pies.</em></h1>
              <p className="hero__lead">Calzado, textil y material técnico para trail y running. En IBHOLA hablamos de terreno, distancia y sensaciones antes de hablar de modelos.</p>
              <div className="hero__actions">
                <a className="button" href="#catalogo">Ver catálogo <ArrowDown size={18} /></a>
                <a className="button button--ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a>
              </div>
              <div className="hero__rating" aria-label={`${business.rating} de 5 en Google`}>
                <span>{business.rating.toFixed(1)}</span>
                <div><b>★★★★★</b><small>{business.reviewCount} opiniones en Google</small></div>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__photo">
                <Image src={imagePath("/images/hero-guadiana-junio-2025.webp")} alt="Corredor ascendiendo un tramo de roca en la IX CXM del Guadiana" fill priority sizes="(max-width: 900px) 100vw, 54vw" />
              </div>
              <div className="hero__terrain" aria-hidden="true"><Mountain size={22} /><span>Terreno / distancia / sensaciones</span></div>
              <div className="hero__coordinates" aria-hidden="true">37°16′ N<br />06°59′ W</div>
              <a className="hero__caption" href="https://www.instagram.com/ibhola/p/DLTHRsio1B6/" target="_blank" rel="noreferrer"><span>IX CXM DEL GUADIANA · 24.06.25</span> El terreno también forma parte de la carrera. <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <a className="hero__scroll" href="#tienda"><span>Desliza para conocer la tienda</span><ArrowDown size={15} /></a>
        </section>

        <section className="principles" aria-label="Qué encontrarás en IBHOLA">
          <div className="container-wide principles__grid">
            <div><Footprints size={21} /><span><b>Trail &amp; running</b>Material específico</span></div>
            <div><Compass size={21} /><span><b>Elección con criterio</b>Según cómo y dónde corres</span></div>
            <div><Store size={21} /><span><b>Trato en tienda</b>En Corrales, cerca de Huelva</span></div>
          </div>
        </section>

        <section className="about section" id="tienda">
          <div className="container about__intro">
            <div className="about__copy reveal">
              <p className="eyebrow"><span /> La tienda</p>
              <h2>Correr se aprende corriendo. <em>Elegir, preguntando.</em></h2>
              <p className="about__lead">IBHOLA es una tienda deportiva especializada en running y trail. Nace para reunir material técnico y una atención cercana en un mismo lugar.</p>
              <p>Desde Corrales acompañamos a corredores de Huelva que empiezan, vuelven a correr o preparan su siguiente reto. Sin discursos complicados: escuchamos, comparamos y buscamos el ajuste que tenga sentido para ti.</p>
              <a className="text-link" href="#contacto">Cuéntanos qué necesitas <ArrowRight size={18} /></a>
            </div>
            <div className="about__visual reveal">
              <div className="about__image"><Image src={imagePath("/images/tienda.webp")} alt="Fachada de la tienda IBHOLA Trail Running en Corrales" fill sizes="(max-width: 850px) 100vw, 52vw" /></div>
              <div className="about__address"><MapPin size={18} /><span>{business.address.street}<br /><b>{business.address.locality}, {business.address.region}</b></span></div>
              <span className="about__number">02</span>
            </div>
          </div>

          <div className="container services" aria-label="Servicios de IBHOLA">
            {[
              { icon: Compass, title: "Asesoramiento", text: "Terreno, distancia, experiencia y sensaciones. Empezamos por entender cómo corres." },
              { icon: Footprints, title: "Ajuste y elección", text: "Compara opciones y encuentra el equilibrio entre comodidad, respuesta y estabilidad." },
              { icon: ShieldCheck, title: "Material técnico", text: "Una selección de calzado, ropa, hidratación, nutrición y accesorios para correr." },
            ].map(({ icon: Icon, title, text }, index) => (
              <article className="service reveal" key={title} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                <span>0{index + 1}</span><Icon size={24} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog section" id="catalogo">
          <Topography className="catalog__topography" />
          <div className="container">
            <div className="section-heading reveal">
              <div><p className="eyebrow"><span /> Catálogo de producto</p><h2>Lo que necesitas, <em>sin llenar estanterías por llenar.</em></h2></div>
              <p>Una vista de las categorías que trabajamos. El catálogo no sustituye la prueba en tienda: consúltanos modelos, tallas y disponibilidad.</p>
            </div>
            <ProductCatalog />
          </div>
        </section>

        <section className="gallery section" id="galeria">
          <div className="container-wide">
            <div className="gallery__heading reveal">
              <div><p className="eyebrow"><span /> Galería</p><h2>La tienda. La equipación. <em>Los kilómetros.</em></h2></div>
              <a href={business.social.instagram} target="_blank" rel="noreferrer"><AtSign size={18} /> Ver el día a día en Instagram <ArrowUpRight size={16} /></a>
            </div>
            <div className="gallery__grid reveal">
              <figure className="gallery__item gallery__item--runner"><Image src={imagePath("/images/corredor.webp")} alt="Corredor con camiseta IBHOLA" fill sizes="(max-width: 700px) 100vw, 50vw" /><figcaption><span>01</span> En carrera</figcaption></figure>
              <figure className="gallery__item gallery__item--kit"><Image src={imagePath("/images/equipacion.webp")} alt="Equipaciones técnicas de IBHOLA" fill sizes="(max-width: 700px) 50vw, 25vw" /><figcaption><span>02</span> Equipación IBHOLA</figcaption></figure>
              <figure className="gallery__item gallery__item--store"><Image src={imagePath("/images/tienda.webp")} alt="Tienda IBHOLA Trail Running" fill sizes="(max-width: 700px) 100vw, 50vw" /><figcaption><span>03</span> Nuestra casa en Corrales</figcaption></figure>
              <figure className="gallery__item gallery__item--singlet"><Image src={imagePath("/images/singlet.webp")} alt="Singlet de competición de IBHOLA" fill sizes="(max-width: 700px) 50vw, 25vw" /><figcaption><span>04</span> Hecha para correr</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="reviews section" id="opiniones">
          <div className="container">
            <div className="reviews__heading reveal">
              <div><p className="eyebrow"><span /> Opiniones</p><h2>Quien entra buscando material, <em>vuelve por el trato.</em></h2></div>
              <div className="reviews__score"><strong>{business.rating.toFixed(1)}</strong><span>★★★★★<small>{business.reviewCount} reseñas</small></span></div>
            </div>
            <div className="reviews__grid">
              {reviews.map((review, index) => (
                <article className={`review reveal ${index === 3 ? "review--wide" : ""}`} key={review} style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
                  <div><Quote size={22} /><span>0{index + 1}</span></div>
                  <blockquote>{review}</blockquote>
                  <footer>Opinión de Google <BadgeCheck size={15} /></footer>
                </article>
              ))}
            </div>
            <a className="text-link" href={business.googleReviewsUrl} target="_blank" rel="noreferrer">Ver todas las opiniones <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="events section" id="eventos">
          <Topography className="events__topography" />
          <div className="container events__grid">
            <div className="events__visual reveal">
              <Image src={imagePath("/images/corredor.webp")} alt="Comunidad IBHOLA participando en una carrera" fill sizes="(max-width: 850px) 100vw, 48vw" />
              <span><UsersRound size={18} /> Comunidad IBHOLA</span>
            </div>
            <div className="events__copy reveal">
              <p className="eyebrow"><span /> Eventos y comunidad</p>
              <h2>Hay kilómetros que se disfrutan más <em>en compañía.</em></h2>
              <p>Este será el punto de encuentro para próximas salidas, pruebas de material y citas de la comunidad. El calendario está en preparación; mientras tanto, publicamos las novedades en redes.</p>
              <div className="events__types">
                <span><Route size={18} /> Salidas</span>
                <span><Footprints size={18} /> Pruebas de material</span>
                <span><CalendarDays size={18} /> Carreras y avisos</span>
              </div>
              <div className="events__status"><span>Agenda</span><b>Próximas fechas en preparación</b></div>
              <a className="button" href={business.social.instagram} target="_blank" rel="noreferrer"><AtSign size={17} /> Seguir a IBHOLA</a>
            </div>
          </div>
        </section>

        <section className="journal section" id="cuaderno">
          <div className="container">
            <div className="section-heading reveal">
              <div><p className="eyebrow"><span /> Cuaderno de ruta</p><h2>Consejos cortos para <em>decidir mejor.</em></h2></div>
              <p>Apuntes prácticos de material, preparación y carrera. Sin fórmulas universales: lo útil es lo que encaja contigo.</p>
            </div>
            <div className="journal__grid">
              {notes.map((note, index) => (
                <article className="journal-card reveal" key={note.number} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                  <span>{note.number}</span><h3>{note.title}</h3><p>{note.text}</p><a href="#contacto">Pregúntanos en tienda <ArrowRight size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section" id="preguntas">
          <div className="container faq__grid">
            <div className="faq__heading reveal"><p className="eyebrow"><span /> Preguntas frecuentes</p><h2>Antes de venir, quizá quieras saber esto.</h2><p>Si tu duda no aparece aquí, llámanos o escríbenos. Te responderemos con la misma claridad que en tienda.</p></div>
            <div className="faq__list reveal">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary><span>0{index + 1}</span>{faq.question}<i /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="container">
            <div className="contact__heading reveal">
              <p className="eyebrow"><span /> Contacto</p>
              <h2>Ven con tus dudas. <em>Sal con una decisión.</em></h2>
              <p>Estamos en Corrales, a pocos minutos de Huelva. Puedes venir a la tienda, llamar o escribirnos antes de desplazarte.</p>
            </div>

            <div className="contact__main">
              <div className="contact__details reveal">
                <div className="contact__detail"><MapPin size={20} /><span><small>Dirección</small><a href={business.mapsUrl} target="_blank" rel="noreferrer">{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</a></span></div>
                <div className="contact__detail"><Phone size={20} /><span><small>Teléfono</small><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></span></div>
                <div className="contact__detail"><Mail size={20} /><span><small>Correo</small><a href={`mailto:${business.email}`}>{business.email}</a></span></div>
                <div className="hours">
                  <div className="hours__title"><Clock3 size={19} /><h3>Horario habitual</h3></div>
                  {business.openingHours.map(({ day, ranges }) => <div className="hours__row" key={day}><b>{day}</b><span>{ranges.join(" / ")}</span></div>)}
                  <p>Los horarios pueden cambiar en festivos. Confírmalos antes de venir.</p>
                </div>
                <div className="contact__buttons"><a className="button" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a><a className="button button--dark" href={`tel:${business.phone}`}>Llamar <Phone size={17} /></a></div>
              </div>
              <div className="contact__map reveal">
                <iframe src={business.mapEmbedUrl} title={`Mapa de ${business.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="contact__map-label"><Store size={17} /> Aquí nos encontrarás</div>
              </div>
            </div>

            <div className="contact-form-section reveal">
              <div><p className="eyebrow"><span /> Escríbenos</p><h2>¿Qué estás buscando?</h2><p>Cuéntanos por dónde corres, qué distancia haces o qué material necesitas. El formulario abrirá tu aplicación de correo con la consulta preparada.</p></div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Topography className="footer__topography" />
        <div className="container footer__grid">
          <div><Brand footer /><p>Material y asesoramiento para trail &amp; running.<br />Corrales, Huelva.</p></div>
          <div><h2>Explora</h2><a href="#tienda">La tienda</a><a href="#catalogo">Catálogo</a><a href="#galeria">Galería</a><a href="#eventos">Agenda</a><a href="#preguntas">Preguntas</a></div>
          <div><h2>Encuéntranos</h2><p>{fullAddress}</p><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
          <div><h2>Comunidad</h2><a href={business.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div>
        </div>
        <div className="container footer__bottom"><p>© {new Date().getFullYear()} IBHOLA TRAIL RUNNING</p><div><a href={`${basePath}/aviso-legal/`}>Aviso legal</a><a href={`${basePath}/privacidad/`}>Privacidad</a><a href={`${basePath}/cookies/`}>Cookies</a></div><span>Corrales · Huelva</span></div>
      </footer>

      <div className="mobile-action-bar"><a href={`tel:${business.phone}`}><Phone size={18} />Llamar</a><a href={business.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} />Cómo llegar</a></div>
    </>
  );
}
