import { buttonVariants } from '@/components/ui/button';
import ActionLink from '@/components/ActionLink';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n';

const item = cn(buttonVariants({ variant: 'ghost' }), 'h-auto flex-1 flex-col gap-1 rounded-none py-2 text-xs font-medium');

// Fixed bottom bar on phones: Call · WhatsApp · Directions always one tap away.
export default function MobileActionBar() {
  const t = useT();
  return (
    <nav
      aria-label={t.quickContact}
      className="fixed inset-x-0 bottom-0 z-40 flex divide-x border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
    >
      <ActionLink kind="call" className={item} iconClassName="size-5 text-primary" />
      <ActionLink kind="whatsapp" className={item} iconClassName="size-5 text-emerald-600 dark:text-emerald-400" />
      <ActionLink kind="directions" className={item} iconClassName="size-5 text-primary" />
    </nav>
  );
}
