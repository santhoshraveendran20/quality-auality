import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const store = JSON.parse(readFileSync(new URL('./src/data/store.json', import.meta.url), 'utf8'));

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Fills the page title, description, social preview and schema.org data from store.json,
// so search engines and WhatsApp link previews read them without running JavaScript.
function storeSeo() {
  const siteUrl = (store.siteUrl || '').replace(/\/$/, '');
  const title = `${store.name_ta} | ${store.type_ta}, புதுக்கோட்டை`;
  const description =
    `${store.name_ta} – புதுக்கோட்டை, ${store.address_ta.line1}. ${store.years} ஆண்டுகளாக ஆவின் பால், ` +
    `குளிர் பானங்கள், மளிகைப் பொருட்கள். ${store.name_en}, departmental store in Pudukkottai.`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    name: `${store.name_en} (${store.name_ta})`,
    description,
    image: `${siteUrl}/images/poster.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address_en.street,
      addressLocality: store.address_en.city,
      postalCode: store.address_en.pincode,
      addressRegion: store.address_en.state,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS.filter((_, i) => !store.hours.closedDays.includes(i)),
        opens: store.hours.open,
        closes: store.hours.close,
      },
    ],
    ...(store.phone ? { telephone: store.phone } : {}),
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return {
    name: 'store-seo',
    transformIndexHtml(html) {
      const script = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
      return html
        .replaceAll('__STORE_TITLE__', escapeHtml(title))
        .replaceAll('__STORE_DESCRIPTION__', escapeHtml(description))
        .replaceAll('__STORE_OG_IMAGE__', `${siteUrl}/images/poster.jpg`)
        .replace('</head>', `  ${script}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), storeSeo()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
