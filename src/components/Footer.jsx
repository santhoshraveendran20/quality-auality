import { Link } from 'react-router';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import { NAV } from '@/components/Header';
import { addressEn, displayPhone, phones, store, telHref } from '@/lib/store';
import { hoursText } from '@/lib/hours';
import ta from '@/i18n/ta.json';

export default function Footer() {
  const a = store.address_ta;
  return (
    <footer className="border-t bg-muted/40">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo alt="" className="w-24" />
            <div className="leading-tight">
              <p className="text-lg font-semibold">{store.name_ta}</p>
              <p className="text-sm text-muted-foreground">{store.type_ta}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{store.tagline_ta}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">பக்கங்கள்</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-semibold">{ta.nav.contact}</h2>
          <p className="flex gap-2 text-muted-foreground">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {a.line1}, {a.line2}, {a.city}
              <span className="mt-1 block text-xs">{addressEn()}</span>
            </span>
          </p>
          <p className="flex gap-2 text-muted-foreground">
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {hoursText()}
          </p>
          {phones.map((n) => (
            <a key={n} href={telHref(n)} className="flex gap-2 font-medium" data-track="call">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {displayPhone(n)}
            </a>
          ))}
        </div>
      </div>
      <Separator />
      <p className="container-x py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {store.name_ta} · {ta.footerTagline}
      </p>
    </footer>
  );
}
