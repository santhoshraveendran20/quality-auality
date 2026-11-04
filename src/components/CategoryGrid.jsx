import { Link } from 'react-router';
import { ArrowRight, ShoppingBasket } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/components/CategoryIcon';
import Reveal from '@/components/Reveal';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import { useLang } from '@/i18n';

const countFor = (slug) => products.filter((p) => p.category === slug).length;

// Every card sets its accent colour as --tone; the classes below tint from it, so one set themes all cards.
const toneText = 'text-(--tone) dark:text-[color-mix(in_oklch,var(--tone)_55%,white)]';

export default function CategoryGrid() {
  const { t: ta, pick, pickOther } = useLang();
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {categories.map((c, i) => {
        const Icon = CATEGORY_ICONS[c.slug] ?? ShoppingBasket;
        return (
          <Reveal as="li" key={c.slug} from={i % 2 ? 'right' : 'left'} delay={(i % 4) * 80}>
            <Link
              to={`/products/${c.slug}`}
              style={{ '--tone': CATEGORY_COLORS[c.slug] ?? 'var(--primary)' }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-4 shadow-sm outline-none transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-5"
            >
              {/* Tinted wash, watermark icon and hover glow */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[color-mix(in_oklch,var(--tone)_14%,transparent)] to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--tone)_18%,transparent)] via-[color-mix(in_oklch,var(--tone)_6%,transparent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[color-mix(in_oklch,var(--tone)_45%,transparent)]" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_22px_45px_-18px_color-mix(in_oklch,var(--tone)_60%,transparent)] transition-opacity duration-300 group-hover:opacity-100" />
              <Icon
                aria-hidden="true"
                strokeWidth={1.25}
                className="pointer-events-none absolute -right-5 -top-5 size-28 rotate-12 text-[color-mix(in_oklch,var(--tone)_10%,transparent)] transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-125 sm:size-32"
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 dark:via-white/10" />

              <span
                className="relative grid size-12 place-items-center rounded-2xl bg-(--tone) text-white shadow-lg shadow-[color-mix(in_oklch,var(--tone)_40%,transparent)] ring-4 ring-[color-mix(in_oklch,var(--tone)_12%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-8 group-hover:scale-110"
              >
                <Icon aria-hidden="true" className="size-6" />
              </span>

              <h3 className="relative mt-4 text-[15px] font-semibold leading-snug sm:text-base">{pick(c, 'name')}</h3>
              <p className={`relative mt-0.5 text-xs font-medium ${toneText}`}>{pickOther(c, 'name')}</p>
              <p className="relative mt-3 hidden text-sm leading-relaxed text-muted-foreground sm:block">{pick(c, 'desc')}</p>

              <div className="relative mt-auto flex items-center justify-between pt-5">
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklch,var(--tone)_12%,transparent)] px-2.5 py-1 text-xs font-semibold ${toneText}`}>
                  <span className="size-1.5 rounded-full bg-(--tone)" />
                  {countFor(c.slug)} {ta.items}
                </span>
                <span className="grid size-8 place-items-center rounded-full border bg-background text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-transparent group-hover:bg-(--tone) group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </div>

              {/* Accent bar that grows along the bottom on hover */}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-(--tone) transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
