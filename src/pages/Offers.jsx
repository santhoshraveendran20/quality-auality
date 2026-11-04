import { BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import OfferCard from '@/components/OfferCard';
import ActionLink from '@/components/ActionLink';
import Reveal from '@/components/Reveal';
import usePageTitle from '@/hooks/usePageTitle';
import { activeOffers } from '@/lib/offers';
import ta from '@/i18n/ta.json';

export default function Offers() {
  usePageTitle(ta.nav.offers);
  const offers = activeOffers();
  return (
    <>
      <PageHeader title="சலுகைகள் & சிறப்புகள்" description="இந்த வாரச் சிறப்புச் சலுகைகள் மற்றும் கடை அறிவிப்புகள்" crumbs={[{ label: ta.nav.offers }]} />
      <div className="container-x grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.5fr_1fr]">
        <Reveal as="section" from="left" aria-label={ta.nav.offers} className="space-y-6">
          {offers.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {offers.map((o) => (
                <li key={o.id}>
                  <OfferCard offer={o} />
                </li>
              ))}
            </ul>
          ) : (
            <Card className="border-dashed shadow-none">
              <CardContent className="py-6 text-center text-muted-foreground">புதிய சலுகைகள் விரைவில்! வாட்ஸ்அப்பில் கேளுங்கள்.</CardContent>
            </Card>
          )}
          <Card className="bg-muted/40">
            <CardHeader>
              <span className="mb-2 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <BellRing aria-hidden="true" className="size-5" />
              </span>
              <CardTitle className="text-lg">சலுகைகளை முதலில் தெரிந்துகொள்ள</CardTitle>
              <CardDescription>வாட்ஸ்அப்பில் எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <ActionLink kind="whatsapp" message="வணக்கம்! புதிய சலுகைகளை எனக்குத் தெரிவியுங்கள்.">
                  {ta.actions.whatsapp}
                </ActionLink>
              </Button>
            </CardFooter>
          </Card>
        </Reveal>
        <Reveal from="right" delay={120}>
        <Card className="mx-auto w-full max-w-md gap-0 overflow-hidden p-0 lg:max-w-none">
          <img
            src="/images/poster.webp"
            alt="கடை அறிவிப்பு: ஆவின் பால், குளிர் பானங்கள் இங்கு கிடைக்கும்"
            width="1086"
            height="1448"
            loading="lazy"
            className="w-full"
          />
          <p className="border-t px-4 py-3 text-center text-sm text-muted-foreground">கடை அறிவிப்பு</p>
        </Card>
        </Reveal>
      </div>
    </>
  );
}
