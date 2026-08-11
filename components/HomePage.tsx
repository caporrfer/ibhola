import Image from "next/image";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, CircleGauge, Clock3,
  AtSign, Compass, Droplets, Footprints, MapPin, MessageCircleMore,
  Mountain, Navigation, Phone, Route, Ruler, ShieldCheck, Shirt, Star,
  Store, Target, UsersRound, Zap,
} from "lucide-react";
import { business, fullAddress } from "@/config/business";
import { Brand } from "./Brand";
import { ContactForm } from "./ContactForm";
import { Header } from "./Header";
import { RevealObserver } from "./Reveal";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const benefits = [
  { icon: BadgeCheck, title: "Asesoramiento experto", text: "Te ayudamos a elegir según tu pisada, terreno y objetivos." },
  { icon: Mountain, title: "Material especializado", text: "Trail y running seleccionados para corredores exigentes." },
  { icon: Footprints, title: "Pruébalo en tienda", text: "Encuentra el ajuste y las sensaciones que buscas." },
  { icon: MessageCircleMore, title: "Atención cercana", text: "Experiencia y trato personal antes, durante y después." },
];

const categories = [
  { title: "Zapatillas Trail", tag: "Agarre · Protección", image: imagePath("/images/corredor.webp"), icon: Mountain, className: "category--wide" },
  { title: "Zapatillas Running", tag: "Asfalto · Ritmo", image: imagePath("/images/singlet.webp"), icon: Zap, className: "category--portrait" },
  { title: "Ropa técnica", tag: "Ligereza · Confort", image: imagePath("/images/equipacion.webp"), icon: Shirt, className: "category--portrait" },
  { title: "Hidratación", tag: "Autonomía · Distancia", image: imagePath("/images/corredor.webp"), icon: Droplets, className: "category--landscape" },
  { title: "Accesorios", tag: "Detalles que cuentan", image: imagePath("/images/tienda.webp"), icon: Compass, className: "category--landscape" },
  { title: "Nutrición y carrera", tag: "Energía · Preparación", image: imagePath("/images/equipacion.webp"), icon: CircleGauge, className: "category--landscape" },
];

const reviews = [
  "Buen trato, siempre atentas, geniales!!!",
  "Te atienden y te explican lo que necesites, las dudas que tengas, etc.",
  "Gran surtido en ropa y calzado trail, magnífica atención.",
  "Fantástico! La calidad comienza nada más entrar, si quieres el mejor asesoramiento y un lugar de confianza, este es tu sitio.",
];

export function HomePage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <section className="hero" id="inicio">
          <Topography className="hero__topography" />
          <div className="hero__grid container-wide">
            <div className="hero__copy">
              <p className="eyebrow"><span /> Trail · Running · Huelva</p>
              <h1>CORRE MÁS LEJOS.<br /><em>EQUÍPATE MEJOR.</em></h1>
              <p className="hero__lead">Especialistas en trail running y running en Corrales. Material técnico y asesoramiento personalizado para encontrar el equipo que realmente necesitas.</p>
              <div className="hero__actions">
                <a className="button" href="#asesoramiento">Descubre IBHOLA <ArrowDown size={18} /></a>
                <a className="button button--ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a>
              </div>
              <div className="hero__proof" aria-label={`${business.rating} de 5, ${business.reviewCount} reseñas en Google`}>
                <div><strong>{business.rating.toFixed(1)}</strong><span>★★★★★</span></div>
                <p><b>{business.reviewCount} reseñas</b><br />en Google</p>
                <p className="hero__proof-location"><MapPin size={15} /> Corrales · Huelva</p>
              </div>
            </div>
            <div className="hero__visual" aria-label="Corredor de IBHOLA en carrera">
              <Image src={imagePath("/images/corredor.webp")} alt="Corredor con camiseta de IBHOLA Trail Running durante una carrera" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
              <div className="hero__scrim" />
              <div className="hero__coordinate"><span>37°16&apos; N</span><span>06°59&apos; W</span></div>
              <div className="hero__vertical">ESPECIALISTAS EN TRAIL &amp; RUNNING</div>
              <div className="hero__altitude"><Route size={17} /><span>SENDEROS / ASFALTO / OBJETIVOS</span></div>
            </div>
          </div>
          <div className="hero__marquee" aria-hidden="true">
            <div>TRAIL RUNNING <span>✦</span> ASESORAMIENTO <span>✦</span> CORRALES · HUELVA <span>✦</span> MATERIAL TÉCNICO <span>✦</span> TRAIL RUNNING <span>✦</span></div>
          </div>
        </section>

        <section className="benefits" aria-label="Por qué elegir IBHOLA">
          <div className="benefits__grid container-wide">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="benefit reveal" style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                <div className="benefit__icon"><Icon size={23} strokeWidth={1.6} /></div>
                <div><h2>{title}</h2><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="categories section" id="categorias">
          <div className="container">
            <div className="section-heading reveal">
              <div><p className="eyebrow"><span /> Equipamiento</p><h2>TODO LO QUE NECESITAS<br /><em>PARA EL PRÓXIMO RETO.</em></h2></div>
              <p>Una selección pensada para correr con confianza. Ven a la tienda, cuéntanos tu objetivo y pruébate las opciones que mejor encajan contigo.</p>
            </div>
            <div className="category-grid">
              {categories.map(({ title, tag, image, icon: Icon, className }, index) => (
                <a className={`category-card reveal ${className}`} href="#contacto" key={title} style={{ "--delay": `${(index % 3) * 70}ms` } as React.CSSProperties}>
                  <Image src={image} alt={`${title} en IBHOLA Trail Running`} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  <div className="category-card__shade" />
                  <div className="category-card__top"><Icon size={20} /><span>0{index + 1}</span></div>
                  <div className="category-card__content"><small>{tag}</small><h3>{title}</h3><span>Descubrir en tienda <ArrowUpRight size={17} /></span></div>
                </a>
              ))}
            </div>
            <p className="catalog-note"><span>ESCAPARATE / 01</span> Consulta disponibilidad y opciones directamente en tienda. No mostramos stock ni precios online.</p>
          </div>
        </section>

        <section className="advice section" id="asesoramiento">
          <Topography className="advice__topography" />
          <div className="advice__grid container">
            <div className="advice__visual reveal">
              <div className="advice__image">
                <Image src={imagePath("/images/corredor.webp")} alt="Corredor de IBHOLA en un entorno natural" fill sizes="(max-width: 900px) 100vw, 48vw" />
              </div>
              <div className="advice__data"><span><Ruler size={16} /> DISTANCIA</span><span><Mountain size={16} /> TERRENO</span><span><Target size={16} /> OBJETIVO</span></div>
              <div className="advice__mark">IBHOLA<br /><span>FIT / 360°</span></div>
            </div>
            <div className="advice__copy reveal">
              <p className="eyebrow"><span /> No todas las zapatillas son para todos</p>
              <h2>ASESORAMIENTO QUE SE NOTA <em>EN CADA KILÓMETRO.</em></h2>
              <p>Elegir unas zapatillas de trail no consiste únicamente en escoger una marca o un color. Terreno, distancia, amortiguación, drop, estabilidad, ajuste y sensaciones importan.</p>
              <p>En IBHOLA te escuchamos, resolvemos tus dudas y te ayudamos a comparar opciones para encontrar el material más adecuado para ti.</p>
              <div className="advice__steps">
                <div><b>01</b><span>Cuéntanos<br />cómo corres</span></div><i />
                <div><b>02</b><span>Comparamos<br />opciones</span></div><i />
                <div><b>03</b><span>Encuentra<br />tu equipo</span></div>
              </div>
              <a className="text-link" href="#contacto">Ven a conocernos <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>

        <section className="story section" id="ibhola">
          <div className="container-wide story__grid">
            <div className="story__copy reveal">
              <p className="eyebrow"><span /> Nuestra tienda</p>
              <h2>MÁS QUE UNA TIENDA.<br /><em>UNA FORMA DE VIVIR EL TRAIL.</em></h2>
              <p className="story__large">IBHOLA nace de la pasión por correr, descubrir nuevos caminos y compartir kilómetros.</p>
              <p>Desde Corrales, ayudamos a corredores de Huelva y alrededores a encontrar material de trail y running con algo que para nosotros es imprescindible: asesoramiento de verdad.</p>
              <div className="story__tags"><span>Corrales</span><span>Huelva</span><span>Trail Running</span><span>Running</span></div>
            </div>
            <div className="story__visual reveal">
              <div className="story__image"><Image src={imagePath("/images/tienda.webp")} alt="Fachada real de la tienda IBHOLA Trail Running en Corrales" fill sizes="(max-width: 900px) 100vw, 55vw" /></div>
              <div className="story__caption"><Store size={20} /><span>Tu punto de encuentro<br /><b>en Corrales</b></span></div>
              <span className="story__index">02 — IBHOLA</span>
            </div>
          </div>
        </section>

        <section className="community section" id="comunidad">
          <div className="container">
            <div className="community__heading reveal">
              <div><p className="eyebrow"><span /> IBHOLA Community</p><h2>LA MONTAÑA SE DISFRUTA MÁS <em>EN COMPAÑÍA.</em></h2></div>
              <a className="button button--ghost" href={business.social.instagram} target="_blank" rel="noreferrer"><AtSign size={18} /> Síguenos en Instagram</a>
            </div>
            <div className="community__gallery reveal">
              <figure className="community__photo community__photo--a"><Image src={imagePath("/images/corredor.webp")} alt="Corredor representando a la comunidad IBHOLA" fill sizes="(max-width: 800px) 100vw, 44vw" /><figcaption><span>01</span> Kilómetros compartidos</figcaption></figure>
              <figure className="community__photo community__photo--b"><Image src={imagePath("/images/equipacion.webp")} alt="Camisetas técnicas de IBHOLA Trail Running" fill sizes="(max-width: 800px) 50vw, 25vw" /><figcaption><span>02</span> Identidad IBHOLA</figcaption></figure>
              <figure className="community__photo community__photo--c"><Image src={imagePath("/images/singlet.webp")} alt="Camiseta singlet de IBHOLA" fill sizes="(max-width: 800px) 50vw, 25vw" /><figcaption><span>03</span> Trail &amp; running</figcaption></figure>
            </div>
            <div className="community__statement reveal"><UsersRound size={28} /><p>Un punto de encuentro para quienes suman senderos, carreras, retos y ganas de seguir corriendo.</p><span>{business.social.instagramHandle}</span></div>
          </div>
        </section>

        <section className="reviews section" id="opiniones">
          <Topography className="reviews__topography" />
          <div className="container">
            <div className="reviews__header reveal">
              <div><p className="eyebrow"><span /> Lo dicen quienes ya nos conocen</p><h2>CORREDORES QUE<br /><em>CONFÍAN EN IBHOLA.</em></h2></div>
              <div className="rating-block"><strong>{business.rating.toFixed(1)}</strong><div><span>★★★★★</span><p>sobre 5 · {business.reviewCount} reseñas</p></div></div>
            </div>
            <div className="reviews__grid">
              {reviews.map((review, index) => (
                <article className={`review-card reveal ${index === 3 ? "review-card--featured" : ""}`} key={review} style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}>
                  <div className="review-card__top"><span>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</span><b>0{index + 1}</b></div>
                  <blockquote>“{review}”</blockquote>
                  <footer>Reseña de Google <BadgeCheck size={16} /></footer>
                </article>
              ))}
            </div>
            <a className="text-link reviews__link" href={business.googleReviewsUrl} target="_blank" rel="noreferrer">Ver opiniones en Google <ArrowUpRight size={18} /></a>
          </div>
        </section>

        <section className="visit-cta">
          <Image src={imagePath("/images/corredor.webp")} alt="" fill sizes="100vw" aria-hidden="true" />
          <div className="visit-cta__overlay" /><Topography className="visit-cta__topography" />
          <div className="visit-cta__content container reveal">
            <p className="eyebrow"><span /> Déjate asesorar</p>
            <h2>¿NO SABES QUÉ<br /><em>ZAPATILLA ELEGIR?</em></h2>
            <p>Ven a IBHOLA. Cuéntanos qué buscas y te ayudaremos a encontrar la opción adecuada.</p>
            <div><a className="button" href="#contacto">Visítanos en Corrales <MapPin size={18} /></a><a className="button button--ghost" href={`tel:${business.phone}`}>Llamar al {business.phoneDisplay} <Phone size={17} /></a></div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="container">
            <div className="contact__heading reveal"><p className="eyebrow"><span /> La tienda</p><h2>VEN A <em>VERNOS.</em></h2><p>Estamos en Corrales, a pocos minutos de Huelva. Pasa por la tienda y hablemos de tu próximo reto.</p></div>
            <div className="contact__grid">
              <div className="contact__info reveal">
                <div className="contact__primary">
                  <div><MapPin size={22} /><span><small>Dirección</small><a href={business.mapsUrl} target="_blank" rel="noreferrer">{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</a></span></div>
                  <div><Phone size={22} /><span><small>Teléfono</small><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></span></div>
                </div>
                <div className="hours"><div className="hours__title"><Clock3 size={20} /><h3>Horario habitual</h3><span>Editable</span></div>
                  <div className="hours__list">{business.openingHours.map(({ day, ranges }) => <div key={day} className={ranges[0] === "Cerrado" ? "is-closed" : ""}><b>{day}</b><span>{ranges.join(" / ")}</span></div>)}</div>
                  <p>Los horarios pueden variar en festivos. Si tienes dudas, llámanos antes de venir.</p>
                </div>
                <div className="contact__actions"><a className="button" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={18} /></a><a className="button button--dark" href={`tel:${business.phone}`}>Llamar <Phone size={18} /></a></div>
              </div>
              <div className="contact__map reveal">
                <iframe src={business.mapEmbedUrl} title={`Mapa de ${business.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="contact__store-image"><Image src={imagePath("/images/tienda.webp")} alt="Exterior de IBHOLA Trail Running" fill sizes="(max-width: 800px) 50vw, 22vw" /><span><Store size={17} /> Aquí nos encontrarás</span></div>
              </div>
            </div>

            <div className="contact-form-section reveal">
              <div><p className="eyebrow"><span /> Tu consulta</p><h2>CUÉNTANOS<br /><em>QUÉ NECESITAS.</em></h2><p>¿Buscas unas zapatillas concretas, quieres comparar opciones o tienes dudas con el material? Escríbenos.</p></div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Topography className="footer__topography" />
        <div className="container footer__grid">
          <div><Brand footer /><p>Especialistas en Trail &amp; Running<br />Corrales, Huelva</p></div>
          <div><h2>Navegación</h2><a href="#inicio">Inicio</a><a href="#categorias">Calzado</a><a href="#categorias">Equipamiento</a><a href="#ibhola">IBHOLA</a><a href="#contacto">Contacto</a></div>
          <div><h2>Encuéntranos</h2><p>{fullAddress}</p><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={business.mapsUrl} target="_blank" rel="noreferrer">Abrir en Maps ↗</a></div>
          <div><h2>Comunidad</h2><a href={business.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div>
        </div>
        <div className="container footer__bottom"><p>© {new Date().getFullYear()} IBHOLA TRAIL RUNNING</p><div><a href={`${basePath}/aviso-legal/`}>Aviso legal</a><a href={`${basePath}/privacidad/`}>Privacidad</a><a href={`${basePath}/cookies/`}>Cookies</a></div><span>HECHO PARA EL SENDERO</span></div>
      </footer>

      <div className="mobile-action-bar"><a href={`tel:${business.phone}`}><Phone size={18} />Llamar</a><a href={business.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} />Cómo llegar</a></div>
    </>
  );
}
