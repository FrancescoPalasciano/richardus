import type { Locale } from "./locale";

export const restaurant = {
  phone: "+393290090918",
  phoneLabel: "329 009 0918",
  address: "Via San Giovanni 15, Francavilla Fontana",
  maps: "https://www.google.com/maps/place/Richardus+Mangia+%26+Bevi/@40.5316484,17.583126,17z/data=!3m1!4b1!4m6!3m5!1s0x1346f5001900ac99:0x80ebb7ef34627967!8m2!3d40.5316484!4d17.583126!16s%2Fg%2F11mlbtjzlh",
  reviews: "https://share.google/mfaCnrlgZuCyMWie5",
};

const bookingMessages: Record<Locale, string> = {
  it: "Buongiorno, vorrei prenotare un tavolo da Richardus. Potete aiutarmi con la disponibilità?",
  en: "Hello, I would like to book a table at Richardus. Could you help me with availability?",
  fr: "Bonjour, je voudrais réserver une table chez Richardus. Pouvez-vous m’aider avec les disponibilités ?",
  de: "Guten Tag, ich möchte einen Tisch bei Richardus reservieren. Können Sie mir bei der Verfügbarkeit helfen?",
  es: "Hola, me gustaría reservar una mesa en Richardus. ¿Podrían ayudarme con la disponibilidad?",
};

export const whatsappForLocale = (locale: Locale) =>
  `https://wa.me/393290090918?text=${encodeURIComponent(bookingMessages[locale])}`;
