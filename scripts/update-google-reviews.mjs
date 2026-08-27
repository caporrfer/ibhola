import { readFile, writeFile } from "node:fs/promises";

const outputPath = new URL("../config/google-reviews.generated.json", import.meta.url);
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!apiKey || !placeId) {
  console.log("Google Reviews: faltan GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID; se conserva el fallback.");
  process.exit(0);
}

try {
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount",
    },
  });

  if (!response.ok) {
    throw new Error(`Places API respondió ${response.status}: ${await response.text()}`);
  }

  const place = await response.json();
  if (typeof place.rating !== "number" || !Number.isInteger(place.userRatingCount)) {
    throw new Error("Places API no devolvió rating y userRatingCount válidos");
  }

  const data = {
    rating: Math.min(5, Math.max(0, place.rating)),
    reviewCount: Math.max(0, place.userRatingCount),
    updatedAt: new Date().toISOString(),
    source: "google-places",
  };

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Google Reviews: ${data.rating}/5 · ${data.reviewCount} reseñas.`);
} catch (error) {
  const fallback = JSON.parse(await readFile(outputPath, "utf8"));
  console.warn(`Google Reviews: no se pudieron actualizar los datos; se conserva ${fallback.rating}/5 · ${fallback.reviewCount}.`);
  console.warn(error instanceof Error ? error.message : error);
}
