import { Clock, Landmark, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OpenBadge from '@/components/OpenBadge';
import ActionLink from '@/components/ActionLink';
import { addressEn, displayPhone, hasPhone, store, telHref } from '@/lib/store';
import { hoursText } from '@/lib/hours';
import ta from '@/i18n/ta.json';

function Row({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted/50 text-primary">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function VisitCard() {
  const a = store.address_ta;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{store.name_ta}</CardTitle>
        <CardDescription>{store.type_ta} · புதுக்கோட்டை</CardDescription>
        <OpenBadge className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Row icon={MapPin} title={ta.address}>
          <address className="not-italic">
            <span className="block font-medium">{a.line1}</span>
            {a.line2}, {a.city}, {a.state}
            <span className="mt-1 block text-xs text-muted-foreground">{addressEn()}</span>
          </address>
        </Row>
        <Separator />
        <Row icon={Landmark} title="அடையாளம்">
          {ta.landmark}
        </Row>
        <Row icon={Clock} title={ta.hours}>
          {hoursText()}
        </Row>
        <Row icon={Phone} title={ta.phone}>
          {hasPhone ? (
            <a href={telHref()} className="font-medium hover:underline" data-track="call">
              {displayPhone(store.phone)}
            </a>
          ) : (
            <span className="text-muted-foreground">{ta.phoneSoon}</span>
          )}
        </Row>
      </CardContent>
      <CardFooter className="mt-auto grid gap-2 sm:grid-cols-2">
        <Button asChild size="lg">
          <ActionLink kind="directions" />
        </Button>
        <Button asChild variant="outline" size="lg">
          <ActionLink kind="whatsapp" iconClassName="text-emerald-600 dark:text-emerald-400" />
        </Button>
      </CardFooter>
    </Card>
  );
}
