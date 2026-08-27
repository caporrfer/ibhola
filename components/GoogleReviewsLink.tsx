import { ArrowUpRight } from "lucide-react";
import { business } from "@/config/business";

export function GoogleReviewsLink() {
  return <a className="reviews__score" href={business.googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="Ver las reseñas de IBHOLA en Google">
    <span className="reviews__score-google" aria-hidden="true">G</span>
    <span className="reviews__score-copy">
      <small>Opiniones en Google</small>
      <strong>Lee lo que cuentan</strong>
      <span aria-hidden="true">★★★★★</span>
    </span>
    <ArrowUpRight size={19} aria-hidden="true" />
  </a>;
}
