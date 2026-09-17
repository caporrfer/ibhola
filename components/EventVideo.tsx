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
    {failed && <p className="event-video__error" role="status">No se ha podido reproducir este vídeo en el navegador.</p>}
  </div>;
}
