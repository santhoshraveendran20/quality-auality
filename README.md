# குவாலிட்டி & குவாலிட்டி – Store Website

Tamil-first, mobile-first website for the departmental store opposite Dhandayudhapani Temple,
GH Road, Pudukkottai – 622001. Built with React 19, React Router 7,
Tailwind CSS 4 and Vite.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | முகப்பு – hero, open/closed badge, categories, Aavin and cold drinks, offers, map |
| `/about` | எங்களைப் பற்றி – story, stats, values, photo gallery (shown once photos are added) |
| `/products` | பொருட்கள் – search (Tamil or English) and all products by category |
| `/products/:category` | One category, e.g. `/products/aavin` |
| `/offers` | சலுகைகள் – current offers (expired ones hide automatically) and the store poster |
| `/contact` | தொடர்புக்கு – address, hours, phone, Google Map, directions |

Phones get a fixed bottom bar (Call · WhatsApp · Directions); tablets and desktops get a
floating WhatsApp button once a WhatsApp number is set.

## Update the content (no coding needed)

All content lives in `src/data/` and `src/i18n/ta.json`.

### Before going live, fill these in `src/data/store.json`

| Field | Now | What to put |
| --- | --- | --- |
| `name_ta`, `name_en` | "குவாலிட்டி & குவாலிட்டி" (from the poster) | Confirm the official store name |
| `phone` | empty | e.g. `"9876543210"` – until set, Call buttons open the Contact page |
| `whatsapp` | empty | WhatsApp number – until set, WhatsApp buttons open the Contact page |
| `hours.open` | `"06:00"` (placeholder) | Real opening time, 24-hour format |
| `hours.close` | `"21:45"` | 9:45 PM, as given |
| `hours.closedDays` | `[]` | Weekly holiday, 0 = Sunday … 6 = Saturday, e.g. `[0]` |
| `mapsPlaceUrl` | empty | The store's Google Maps link once the Google Business Profile exists |
| `siteUrl` | empty | Final domain, e.g. `"https://example.in"` (used for link previews) |
| `photos` | `[]` | `[{ "src": "/images/shop-front.webp", "alt_ta": "கடை முகப்பு" }]` – put files in `public/images/` |

### Products – `src/data/products.json`

The 54 products are a **sample starter list**; replace them with the real stock.

```json
{
  "id": "aavin-milk",
  "category": "aavin",
  "name_ta": "ஆவின் பால்",
  "name_en": "Aavin Milk",
  "sizes": ["500 மி.லி", "1 லி"],
  "price": null,
  "inStock": true
}
```

- `price: null` shows "விலை கேட்கவும்" (Ask for price); a number such as `28` shows ₹28.
- `category` must match a `slug` in `src/data/categories.json`.

### Offers – `src/data/offers.json`

The three entries are samples. Set `validUntil` to a date (`"2026-12-31"`) to hide an offer
automatically after that day, or `null` to keep it showing.

### Interface text – `src/i18n/ta.json`

Every button and label in Tamil (அழைக்க, வாட்ஸ்அப், வழி காட்டு, …).

## SEO and sharing

`vite.config.js` reads `store.json` at build time and writes the page title, description,
Open Graph image (`public/images/poster.jpg`) and schema.org `GroceryStore` data (address,
hours, phone) into `index.html`.

## Deploy

Static site – any static host works.

- **Vercel**: import the repo; `vercel.json` already rewrites routes to `index.html`.
- **Netlify**: build command `npm run build`, publish directory `dist`; `public/_redirects` handles routes.

## Analytics

Call, WhatsApp and Directions buttons carry `data-track`. Add the Google Analytics 4 tag to
`index.html` and each tap is sent as a `contact_tap` event (`src/lib/analytics.js`).

## Design system

The UI is built with [shadcn/ui](https://ui.shadcn.com) (new-york style, Radix UI + Tailwind CSS 4)
and [lucide-react](https://lucide.dev) icons.

- Components: `src/components/ui/` – Button, Card, Badge, Input, Separator, Sheet, Breadcrumb, Alert.
  They follow the standard shadcn source; `components.json` is set up, so more can be added with
  `npx shadcn@latest add <component>`.
- Theme: the tokens at the top of `src/index.css` (`--primary` green, `--gold` anniversary accent,
  stone neutrals) with a full dark theme under `.dark`. The sun/moon button in the header switches
  themes; the choice is remembered (`src/components/theme-provider.jsx`).
- Fonts: Inter (Latin), Noto Sans Tamil (Tamil), Playfair Display (the "25" numerals).
- 25th-anniversary emblem: `src/components/AnniversaryBadge.jsx` – a vector drawing made from lucide
  `Leaf` icons (the laurel wreath) and `Star` icons, with a gold "25" and a ribbon reading
  "ஆண்டு நிறைவு". It is used in the header, hero, anniversary section, About page and footer.

```jsx
<Button asChild size="xl">
  <ActionLink kind="call" />
</Button>
```

## Project structure

```
src/
  components/  Header, Footer, ActionLink, OpenBadge, AnniversaryBadge, CategoryGrid, CategoryIcon,
               ProductBrowser, ProductCard, OfferCard, MapEmbed, VisitCard, PageHeader,
               SectionHeading, MobileActionBar, FloatingWhatsApp, theme-provider, mode-toggle
  components/ui/  shadcn/ui components (button, card, badge, input, separator, sheet, breadcrumb, alert)
  pages/       Home, About, Products, Category, Offers, Contact, NotFound
  data/        store.json, categories.json, products.json, offers.json
  i18n/        ta.json
  hooks/       useOpenStatus (open/closed in India time), usePageTitle
  lib/         store links, hours, offers, analytics
public/        images (poster, juices), favicon, robots.txt, _redirects
```

## Not yet done (from the BRD)

- Pre-rendering each page to static HTML (NFR-05) – the site is a client-rendered SPA today.
- Phase 2: WhatsApp order basket, delivery areas, Tamil/English toggle.
- Phase 3: admin panel, UPI link, Google reviews.
