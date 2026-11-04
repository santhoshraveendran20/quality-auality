import { cn } from '@/lib/utils';
import store from '@/data/store.json';

/** The Q&Q store emblem. `size="sm"` loads the small file for header-sized use. */
export default function Logo({ className, size = 'lg', alt = `${store.name_en} logo` }) {
  return (
    <img
      src={size === 'sm' ? '/images/logo-sm.webp' : '/images/logo.webp'}
      alt={alt}
      width="1886"
      height="1259"
      decoding="async"
      className={cn('h-auto shrink-0 object-contain', className)}
    />
  );
}
