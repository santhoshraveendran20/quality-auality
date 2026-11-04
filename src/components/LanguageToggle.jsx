import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLang } from '@/i18n';

const OPTIONS = [
  { value: 'ta', label: 'தமிழ்' },
  { value: 'en', label: 'EN' },
];

/** தமிழ் | EN segmented switch. The choice is remembered in localStorage. */
export default function LanguageToggle({ className }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label="மொழி / Language" title={t.switchTo} className={cn('flex items-center rounded-full border bg-muted/50 p-0.5', className)}>
      <Languages aria-hidden="true" className="mx-1.5 hidden size-4 text-muted-foreground sm:block" />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
            lang === o.value ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
