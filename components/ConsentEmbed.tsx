"use client";

import { useEffect, useState, type IframeHTMLAttributes } from "react";
import { EMBED_CONSENT_KEY } from "./embedConsent";

export type EmbedService = "google-maps" | "instagram";

const CHANGE_EVENT = "ibhola-embeds-change";

const services: Record<EmbedService, { provider: string; content: string; action: string }> = {
  "google-maps": { provider: "Google Maps", content: "el mapa", action: "Mostrar mapa" },
  instagram: { provider: "Instagram (Meta)", content: "las publicaciones", action: "Mostrar publicaciones" },
};

function readConsent(): EmbedService[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(EMBED_CONSENT_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeConsent(value: EmbedService[]) {
  try {
    if (value.length) window.localStorage.setItem(EMBED_CONSENT_KEY, JSON.stringify(value));
    else window.localStorage.removeItem(EMBED_CONSENT_KEY);
  } catch {
    // Sin almacenamiento disponible la elección solo dura hasta recargar la página.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function useConsent() {
  const [consent, setConsent] = useState<EmbedService[]>([]);
  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return consent;
}

/** Iframe de terceros que no se carga hasta que el visitante lo acepta. */
export function ConsentEmbed({ service, title, ...iframe }: IframeHTMLAttributes<HTMLIFrameElement> & { service: EmbedService; title: string }) {
  const consent = useConsent();
  const [acceptedNow, setAcceptedNow] = useState(false);
  const { provider, content, action } = services[service];

  if (acceptedNow || consent.includes(service)) return <iframe title={title} {...iframe} />;

  function accept() {
    setAcceptedNow(true);
    writeConsent([...new Set([...readConsent(), service])]);
  }

  return (
    <div className="consent-embed">
      <strong>Contenido de {provider}</strong>
      <p>Para ver {content} se cargará contenido de {provider}, que puede instalar sus propias cookies y recibir datos de tu navegación. <a href="/cookies/">Más información</a></p>
      <button className="button" type="button" onClick={accept}>{action}</button>
    </div>
  );
}

/** Permite retirar desde la política de cookies el permiso dado a los contenidos de terceros. */
export function EmbedConsentControls() {
  const consent = useConsent();
  return (
    <div className="consent-controls">
      <p>{consent.length ? `Has permitido: ${consent.map((service) => services[service].provider).join(" y ")}.` : "No has permitido la carga de contenidos de terceros."}</p>
      {consent.length > 0 && <button className="button" type="button" onClick={() => writeConsent([])}>Retirar consentimiento</button>}
    </div>
  );
}
