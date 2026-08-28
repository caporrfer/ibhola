export const business = {
  name: "IBHOLA Trail Running",
  legalName: "IBHOLA TRAIL RUNNING",
  shortName: "IBHOLA",
  description:
    "Tienda especializada en trail running y running en Corrales, Huelva. Material técnico y asesoramiento personalizado.",
  contactName: "Miguel Angel Pereira Marcelino",
  email: "ibholahuelva@gmail.com",
  phoneDisplay: "678 28 12 38",
  phone: "+34678281238",
  address: {
    street: "Alcalde José Rodríguez González, 14",
    postalCode: "21120",
    locality: "Corrales",
    municipality: "Aljaraque",
    region: "Huelva",
    country: "ES",
  },
  social: {
    instagramHandle: "@ibhola",
    instagram: "https://www.instagram.com/ibhola/",
    facebook: "https://www.facebook.com/ibholahuelva",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=IBHOLA+Trail+Running%2C+Alcalde+Jos%C3%A9+Rodr%C3%ADguez+Gonz%C3%A1lez+14%2C+Corrales%2C+Huelva",
  mapEmbedUrl:
    "https://www.google.com/maps?q=IBHOLA+Trail+Running%2C+Alcalde+Jos%C3%A9+Rodr%C3%ADguez+Gonz%C3%A1lez+14%2C+Corrales%2C+Huelva&output=embed",
  googleReviewsUrl:
    "https://www.google.com/maps/place/IBHOLA+TRAIL+RUNNING/@37.2749467,-6.9915571,17z/data=!4m8!3m7!1s0xd11ce112907a211:0x29395f1600c7f524!8m2!3d37.2749467!4d-6.9915571!9m1!1b1",
  rating: 4.8,
  reviewCount: 116,
  openingHours: [
    { day: "Lunes", ranges: ["09:30–13:30", "17:30–20:30"], schemaDay: "Monday" },
    { day: "Martes", ranges: ["09:30–13:30", "17:30–20:30"], schemaDay: "Tuesday" },
    { day: "Miércoles", ranges: ["09:30–13:30", "17:30–20:30"], schemaDay: "Wednesday" },
    { day: "Jueves", ranges: ["09:30–13:30", "17:30–20:30"], schemaDay: "Thursday" },
    { day: "Viernes", ranges: ["09:30–13:30", "17:30–20:30"], schemaDay: "Friday" },
    { day: "Sábado", ranges: ["10:00–13:30"], schemaDay: "Saturday" },
    { day: "Domingo", ranges: ["Cerrado"], schemaDay: "Sunday" },
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8183",
} as const;

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.locality}, ${business.address.region}`;
