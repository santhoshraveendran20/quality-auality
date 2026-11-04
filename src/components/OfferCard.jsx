import { Link } from 'react-router';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fill, useLang } from '@/i18n';

const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(lang === 'en' ? 'en-IN' : 'ta-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  );

export default function OfferCard({ offer }) {
  const { lang, t: ta, pick } = useLang();
  return (
    <Card className="h-full gap-4">
      <CardHeader className="gap-3">
        <Badge variant="outline" className="rounded-full">
          <Tag className="text-gold" />
          {pick(offer, 'tag')}
        </Badge>
        <CardTitle className="text-lg">{pick(offer, 'title')}</CardTitle>
        <CardDescription className="text-[15px] leading-relaxed">{pick(offer, 'text')}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap justify-between gap-2">
        {offer.validUntil ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-4" />
            {fill(ta.until, { date: formatDate(offer.validUntil, lang) })}
          </span>
        ) : (
          <span />
        )}
        {offer.category && (
          <Button asChild variant="link" size="sm" className="px-0">
            <Link to={`/products/${offer.category}`}>
              {ta.actions.viewAll}
              <ArrowRight />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
