import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/Logo';
import OpenBadge from '@/components/OpenBadge';
import ActionLink from '@/components/ActionLink';
import { ModeToggle } from '@/components/mode-toggle';
import LanguageToggle from '@/components/LanguageToggle';
import { cn } from '@/lib/utils';
import store from '@/data/store.json';
import { useLang } from '@/i18n';

/** Main navigation links in the current language. */
export function useNav() {
  const { t } = useLang();
  return [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.about },
    { to: '/products', label: t.nav.products },
    { to: '/offers', label: t.nav.offers },
    { to: '/contact', label: t.nav.contact },
  ];
}

function Brand() {
  const { t, pick } = useLang();
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${pick(store, 'name')} – ${t.nav.home}`}>
      <Logo size="sm" alt="" className="w-16" />
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[15px] font-semibold sm:text-base">{pick(store, 'name')}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {pick(store, 'type')} · {t.city}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { t: ta, pick } = useLang();
  const NAV = useNav();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Brand />

        <nav aria-label={ta.mainNav} className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'sm' }),
                  !isActive && 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <ModeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <ActionLink kind="call" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={ta.menu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" closeLabel={ta.close} className="w-[85%] gap-0">
              <SheetHeader className="flex-row items-center gap-3 border-b pr-12">
                <Logo size="sm" alt="" className="w-16" />
                <div className="min-w-0">
                  <SheetTitle className="truncate">{pick(store, 'name')}</SheetTitle>
                  <SheetDescription className="truncate">
                    {pick(store, 'type')} · {ta.city}
                  </SheetDescription>
                </div>
              </SheetHeader>
              <nav aria-label={ta.mobileNav} className="flex flex-col gap-1 p-4">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'lg' }), 'justify-start text-base')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="px-4">
                <Separator className="mb-4" />
                <OpenBadge />
              </div>
              <SheetFooter>
                <Button asChild size="lg">
                  <ActionLink kind="call" />
                </Button>
                <Button asChild variant="outline" size="lg">
                  <ActionLink kind="whatsapp" iconClassName="text-emerald-600 dark:text-emerald-400">
                    {ta.actions.whatsappOrder}
                  </ActionLink>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
