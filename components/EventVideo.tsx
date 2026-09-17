"use client";

import { useState } from "react";

type EventVideoProps = {
  src: string;
  poster: string;
  title: string;
};

export function EventVideo({ src, poster, title }: EventVideoProps) {
  const [failed, setFailed] = useState(false);

  return <div className="event-video">
    <video controls playsInline preload="none" poster={poster} aria-label={title} onError={() => setFailed(true)}>
      <source src={src} type="video/mp4" />
      Tu navegador no puede reproducir este vídeo.
    </video>
    <a href={src} target="_blank" rel="noreferrer">Abrir vídeo</a>
    {failed && <p className="event-video__error" role="status">No se ha podido reproducir aquí. Ábrelo en una pestaña nueva.</p>}
  </div>;
}
