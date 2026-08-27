import { ArrowUpRight } from "lucide-react";
import { business } from "@/config/business";
import googleReviews from "@/config/google-reviews.generated.json";

const rating = Number.isFinite(googleReviews.rating) ? googleReviews.rating : business.rating;
const reviewCount = Number.isInteger(googleReviews.reviewCount) ? googleReviews.reviewCount : business.reviewCount;
const filledStars = Math.round(Math.min(5, Math.max(0, rating)));
const stars = `${"★".repeat(filledStars)}${"☆".repeat(5 - filledStars)}`;

export function GoogleReviewScore() {
  return <a className="reviews__score" href={business.googleReviewsUrl} target="_blank" rel="noreferrer" aria-label={`Ver ${reviewCount} reseñas de IBHOLA en Google; valoración ${rating.toFixed(1)} de 5`}>
    <span className="reviews__score-mark">{rating.toFixed(1)}<small>/ 5</small></span>
    <span className="reviews__stars" aria-hidden="true">{stars}<small>{reviewCount} reseñas en Google</small></span>
    <ArrowUpRight size={18} aria-hidden="true" />
  </a>;
}
