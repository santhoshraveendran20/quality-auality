import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ArrowRight, Info, Search, SearchX, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import CategoryIcon from '@/components/CategoryIcon';
import ActionLink from '@/components/ActionLink';
import { cn } from '@/lib/utils';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import ta from '@/i18n/ta.json';

const norm = (s) => s.normalize('NFC').toLowerCase().trim();

const chip = ({ isActive }) =>
  cn(buttonVariants({ variant: isActive ? 'default' : 'outline', size: 'sm' }), 'rounded-full');

export default function ProductBrowser({ category = null }) {
  const [query, setQuery] = useState('');
  const q = norm(query);

  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (!category || p.category === category.slug) &&
          (!q || norm(p.name_ta).includes(q) || norm(p.name_en).includes(q)),
      ),
    [category, q],
  );

  const groups = category
    ? [{ cat: category, items: visible }]
    : categories.map((cat) => ({ cat, items: visible.filter((p) => p.category === cat.slug) })).filter((g) => g.items.length);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b bg-background/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:-mx-6 sm:px-6">
        <label htmlFor="product-search" className="sr-only">
          {ta.searchLabel}
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ta.searchPlaceholder}
            className="h-10 bg-background pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setQuery('')}
              aria-label={ta.clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X />
            </Button>
          )}
        </div>
        <nav aria-label="பொருள் வகைகள்" className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
          <NavLink to="/products" end className={chip}>
            {ta.all}
          </NavLink>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/products/${c.slug}`} className={chip}>
              {c.name_ta}
            </NavLink>
          ))}
        </nav>
      </div>

      <Alert className="mt-6">
        <Info />
        <AlertTitle>
          {ta.priceNoteTitle} · <span className="font-normal text-muted-foreground" aria-live="polite">{visible.length} {ta.items}</span>
        </AlertTitle>
        <AlertDescription>{ta.priceNoteText}</AlertDescription>
      </Alert>

      {groups.length === 0 ? (
        <Card className="mt-6 border-dashed shadow-none">
          <CardContent className="flex flex-col items-center py-6 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-muted">
              <SearchX aria-hidden="true" className="size-6 text-muted-foreground" />
            </span>
            <p className="mt-4 text-lg font-semibold">{ta.noResults}</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{ta.noResultsHint}</p>
            <Button asChild className="mt-5">
              <ActionLink kind="whatsapp" message={`வணக்கம்! "${query}" கிடைக்குமா?`}>
                {ta.actions.ask}
              </ActionLink>
            </Button>
          </CardContent>
        </Card>
      ) : (
        groups.map(({ cat, items }) => (
          <section
            key={cat.slug}
            className="mt-8"
            {...(category ? { 'aria-label': cat.name_ta } : { 'aria-labelledby': `cat-${cat.slug}` })}
          >
            {!category && (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <h2 id={`cat-${cat.slug}`} className="flex items-center gap-3 text-lg font-semibold tracking-tight sm:text-xl">
                  <CategoryIcon slug={cat.slug} className="size-8" iconClassName="size-4" />
                  {cat.name_ta}
                  <Badge variant="secondary">{items.length}</Badge>
                </h2>
                <Button asChild variant="link" size="sm" className="px-0">
                  <Link to={`/products/${cat.slug}`}>
                    {ta.actions.viewAll}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            )}
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {items.map((p, i) => (
                <Reveal as="li" key={p.id} from="up" delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
