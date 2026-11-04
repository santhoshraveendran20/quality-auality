import store from '../data/store.json';

const digits = (value) => (value || '').replace(/\D/g, '');

// 10-digit Indian numbers get the 91 country code; anything longer is used as-is.
const intl = (value) => {
  const d = digits(value);
  return d.length === 10 ? `91${d}` : d;
};

export const hasPhone = digits(store.phone).length >= 10;
export const hasWhatsApp = digits(store.whatsapp).length >= 10;

// Every valid shop number; the first one is the main number used by the Call buttons.
export const phones = [store.phone, store.phone2].filter((n) => digits(n).length >= 10);

export const telHref = (value = store.phone) => (digits(value).length >= 10 ? `tel:+${intl(value)}` : null);

export const waHref = (message = '') =>
  hasWhatsApp ? `https://wa.me/${intl(store.whatsapp)}${message ? `?text=${encodeURIComponent(message)}` : ''}` : null;

export const directionsUrl = () =>
  store.mapsPlaceUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.mapQuery)}`;

export const mapEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`;

export const addressEn = () => {
  const a = store.address_en;
  return `${a.line1}, ${a.line2}, ${a.city} – ${a.pincode}, ${a.state}`;
};

export const displayPhone = (value) => {
  const d = digits(value).slice(-10);
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : value;
};

export { store };
