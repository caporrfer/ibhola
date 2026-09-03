"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type TouchEvent } from "react";

type Photo = readonly [string, string];

export function EventPhotoCarousel({ photos }: { photos: readonly Photo[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

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

  return <div className="event-gallery" aria-label="Galería de las Quedadas Jueves IBHOLA">
    <div className="event-gallery__viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="event-gallery__track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {photos.map(([image, alt], index) => <div className="event-gallery__item" key={image} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${photos.length}`}>
          <Image src={image} alt={alt} fill sizes="(max-width: 600px) calc(100vw - 30px), 70vw" />
        </div>)}
      </div>
      <button className="event-gallery__control event-gallery__control--previous" type="button" onClick={previous} aria-label="Foto anterior"><ChevronLeft size={22} aria-hidden="true" /></button>
      <button className="event-gallery__control event-gallery__control--next" type="button" onClick={next} aria-label="Foto siguiente"><ChevronRight size={22} aria-hidden="true" /></button>
      <p className="event-gallery__counter" aria-live="polite">{String(active + 1).padStart(2, "0")} <span>/ {String(photos.length).padStart(2, "0")}</span></p>
    </div>
    <div className="event-gallery__dots" role="tablist" aria-label="Seleccionar foto">
      {photos.map(([image, alt], index) => <button key={image} type="button" role="tab" aria-selected={active === index} aria-label={`Ver foto ${index + 1}: ${alt}`} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} />)}
    </div>
  </div>;
}
