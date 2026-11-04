import { ShoppingBasket } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/components/CategoryIcon';
import ActionLink from '@/components/ActionLink';
import { cn } from '@/lib/utils';
import { fill, useLang } from '@/i18n';

// Same --tone theming as CategoryGrid: the card sets its category colour, the classes tint from it.
const toneText = 'text-(--tone) dark:text-[color-mix(in_oklch,var(--tone)_55%,white)]';

export default function ProductCard({ product }) {
  const { t: ta, pick, pickOther, size } = useLang();
  const { name_ta, name_en, sizes = [], price, inStock, category } = product;
  const Icon = CATEGORY_ICONS[category] ?? ShoppingBasket;
  return (
    <article
      style={{ '--tone': CATEGORY_COLORS[category] ?? 'var(--primary)' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Tinted wash, hover glow, border, watermark icon and shine */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color-mix(in_oklch,var(--tone)_12%,transparent)] to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--tone)_16%,transparent)] via-[color-mix(in_oklch,var(--tone)_5%,transparent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-[color-mix(in_oklch,var(--tone)_45%,transparent)]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_22px_45px_-18px_color-mix(in_oklch,var(--tone)_60%,transparent)] transition-opacity duration-300 group-hover:opacity-100" />
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className="pointer-events-none absolute -bottom-6 -right-6 size-28 -rotate-12 text-[color-mix(in_oklch,var(--tone)_9%,transparent)] transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-125"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 dark:via-white/10" />

      <div className="relative flex items-start justify-between gap-2">
        <span className="grid size-10 place-items-center rounded-xl bg-(--tone) text-white shadow-md shadow-[color-mix(in_oklch,var(--tone)_40%,transparent)] ring-4 ring-[color-mix(in_oklch,var(--tone)_12%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-8 group-hover:scale-110">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
            inStock ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-red-500/10 text-red-700 dark:text-red-400',
          )}
        >
          <span className="relative flex size-1.5">
            {inStock && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />}
            <span className={cn('relative size-1.5 rounded-full', inStock ? 'bg-emerald-500' : 'bg-red-500')} />
          </span>
          {inStock ? ta.inStock : ta.outOfStock}
        </span>
      </div>

      <h3 className="relative mt-4 text-[15px] font-semibold leading-snug">{pick(product, 'name')}</h3>
      <p className={`relative mt-0.5 text-xs font-medium ${toneText}`}>{pickOther(product, 'name')}</p>

      {sizes.length > 0 && (
        <ul className="relative mt-3 flex flex-wrap gap-1.5" aria-label={ta.sizes}>
          {sizes.map((s) => (
            <li
              key={s}
              className="rounded-full border border-[color-mix(in_oklch,var(--tone)_25%,transparent)] bg-background/70 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors group-hover:border-[color-mix(in_oklch,var(--tone)_45%,transparent)]"
            >
              {size(s)}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto space-y-2.5 pt-4">
        <p className={cn('text-sm font-bold', price ? toneText : 'text-foreground')}>{price ? `₹${price}` : ta.askPrice}</p>
        <ActionLink
          kind="whatsapp"
          message={fill(ta.askProduct, { name: `${name_ta} (${name_en})` })}
          iconClassName="size-4 text-emerald-600 transition-colors group-hover/btn:text-white dark:text-emerald-400"
          className="group/btn inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-background/80 text-sm font-medium transition-all duration-300 hover:border-transparent hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/30 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="lg:hidden">{ta.actions.whatsapp}</span>
          <span className="hidden lg:inline">{ta.actions.ask}</span>
        </ActionLink>
      </div>

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-(--tone) transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}
