import {
  Baby,
  Bath,
  Carrot,
  Citrus,
  Coffee,
  Cookie,
  CookingPot,
  CupSoda,
  Egg,
  Flame,
  Milk,
  Nut,
  PencilLine,
  ShoppingBasket,
  Soup,
  SprayCan,
  Wheat,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const CATEGORY_ICONS = {
  aavin: Milk,
  'cold-drinks': CupSoda,
  juices: Citrus,
  groceries: Wheat,
  vegetables: Carrot,
  bakery: Egg,
  'instant-food': Soup,
  'health-drinks': Coffee,
  'dry-fruits': Nut,
  snacks: Cookie,
  household: SprayCan,
  kitchenware: CookingPot,
  'personal-care': Bath,
  'baby-care': Baby,
  pooja: Flame,
  stationery: PencilLine,
};

const TONES = {
  aavin: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'cold-drinks': 'bg-red-500/10 text-red-600 dark:text-red-400',
  juices: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  groceries: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  vegetables: 'bg-green-500/10 text-green-700 dark:text-green-400',
  bakery: 'bg-orange-400/10 text-orange-700 dark:text-orange-300',
  'instant-food': 'bg-red-400/10 text-red-700 dark:text-red-300',
  'health-drinks': 'bg-stone-500/10 text-stone-700 dark:text-stone-300',
  'dry-fruits': 'bg-amber-700/10 text-amber-800 dark:text-amber-300',
  snacks: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  household: 'bg-teal-500/10 text-teal-700 dark:text-teal-400',
  kitchenware: 'bg-slate-500/10 text-slate-700 dark:text-slate-300',
  'personal-care': 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  'baby-care': 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
  pooja: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  stationery: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
};

// Solid accent per category, exposed as the CSS variable --tone on themed cards.
export const CATEGORY_COLORS = {
  aavin: '#2563eb',
  'cold-drinks': '#dc2626',
  juices: '#ea580c',
  groceries: '#d97706',
  vegetables: '#16a34a',
  bakery: '#c2410c',
  'instant-food': '#e11d48',
  'health-drinks': '#78350f',
  'dry-fruits': '#a16207',
  snacks: '#ca8a04',
  household: '#0d9488',
  kitchenware: '#475569',
  'personal-care': '#7c3aed',
  'baby-care': '#db2777',
  pooja: '#be123c',
  stationery: '#4f46e5',
};

export default function CategoryIcon({ slug, className, iconClassName }) {
  const Icon = CATEGORY_ICONS[slug] ?? ShoppingBasket;
  return (
    <span className={cn('inline-grid size-10 shrink-0 place-items-center rounded-lg', TONES[slug] ?? 'bg-muted text-foreground', className)}>
      <Icon aria-hidden="true" className={cn('size-5', iconClassName)} />
    </span>
  );
}
