import { HomePage } from "@/components/HomePage";
import { business } from "@/config/business";

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["SportingGoodsStore", "LocalBusiness"],
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: business.phone,
    image: `${business.siteUrl}/images/tienda-original.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    sameAs: [business.social.instagram, business.social.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
    },
    openingHoursSpecification: business.openingHours
      .filter((entry) => entry.ranges[0] !== "Cerrado")
      .flatMap((entry) => entry.ranges.map((range) => {
        const [opens, closes] = range.split("–");
        return { "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${entry.schemaDay}`, opens, closes };
      })),
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><HomePage /></>;
}
