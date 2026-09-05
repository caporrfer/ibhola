"use client";

import Image from "next/image";
import { CalendarDays, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";

type Photo = readonly [string, string];

export function EventPhotoCarousel({ photos }: { photos: readonly Photo[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    photos.forEach(([image]) => {
      const preloadedImage = new window.Image();
      preloadedImage.src = image;
    });
  }, [photos]);

  const previous = () => setActive((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setActive((current) => (current + 1) % photos.length);
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) next();
    else previous();
  };

  const previews = [0, 1, 2].map((offset) => (active + offset) % photos.length);

  return <div className="event-community" aria-label="Quedadas Jueves IBHOLA">
    <div className="event-community__layout">
      <article className="event-community__card">
        <div className="event-community__viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="event-community__track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {photos.map(([image, alt], index) => <div className="event-community__slide" key={image} aria-hidden={active !== index} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${photos.length}`}>
              <Image src={image} alt={alt} fill loading="eager" sizes="(max-width: 850px) calc(100vw - 30px), 68vw" />
            </div>)}
          </div>
          <span className="event-community__badge">Todos los jueves</span>
          <span className="event-community__swipe-hint"><MoveHorizontal size={16} aria-hidden="true" />Desliza</span>
          <button className="event-community__control event-community__control--previous" type="button" onClick={previous} aria-label="Foto anterior"><ChevronLeft size={22} aria-hidden="true" /></button>
          <button className="event-community__control event-community__control--next" type="button" onClick={next} aria-label="Foto siguiente"><ChevronRight size={22} aria-hidden="true" /></button>
          <p className="event-community__counter" aria-live="polite">{String(active + 1).padStart(2, "0")} <span>/ {String(photos.length).padStart(2, "0")}</span></p>
        </div>
        <div className="event-community__card-body">
          <CalendarDays size={20} aria-hidden="true" />
          <div><h2>Quedadas Jueves IBHOLA</h2><p>Salida desde IBHOLA · 20:30 h</p></div>
        </div>
      </article>

      <aside className="event-community__copy">
        <p className="eyebrow">Una cita cada semana</p>
        <h2>Corre, conoce gente y disfruta del camino.</h2>
        <p>Todos los jueves del año nos encontramos a las 20:30 h para salir juntos desde IBHOLA. Una quedada abierta a todos los niveles, sin necesidad de inscripción.</p>
      </aside>
    </div>

    <div className="event-community__previews" role="group" aria-label="Seleccionar foto">
      {previews.map((index) => {
        const [image, alt] = photos[index];
        return <button key={image} type="button" aria-pressed={active === index} aria-label={`Ver foto ${index + 1}: ${alt}`} onClick={() => setActive(index)}>
          <Image src={image} alt="" fill loading="eager" sizes="(max-width: 600px) 33vw, 25vw" />
        </button>;
      })}
    </div>
  </div>;
}
