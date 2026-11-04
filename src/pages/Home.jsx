import { Link } from 'react-router';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Clock,
  HeartHandshake,
  IndianRupee,
  LayoutGrid,
  MapPin,
  Moon,
  PartyPopper,
  Sparkles,
  Tag,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AnniversaryBadge from '@/components/AnniversaryBadge';
import OpenBadge from '@/components/OpenBadge';
import Tilt3D from '@/components/Tilt3D';
import Reveal from '@/components/Reveal';import ActionLink from '@/components/ActionLink';
import SectionHeading from '@/components/SectionHeading';
import CategoryGrid from '@/components/CategoryGrid';
import OfferCard from '@/components/OfferCard';
import MapEmbed from '@/components/MapEmbed';
import VisitCard from '@/components/VisitCard';
import Testimonials from '@/components/Testimonials';
import usePageTitle from '@/hooks/usePageTitle';
import { activeOffers } from '@/lib/offers';
import { formatTamilTime, hoursText } from '@/lib/hours';
import store from '@/data/store.json';
import categories from '@/data/categories.json';
import products from '@/data/products.json';
import ta from '@/i18n/ta.json';

const SIDES = ['left', 'up', 'right'];

function StoreName() {
  const parts = store.name_ta.split(' & ');
  if (parts.length !== 2) return store.name_ta;
  return (
    <>
      {parts[0]} <span className="text-gold">&amp;</span> {parts[1]}
    </>
  );
}

function Hero() {
  const stats = [
    { icon: Award, value: `${store.years}+`, label: 'ஆண்டுகள் சேவை' },
    { icon: LayoutGrid, value: categories.length, label: 'பொருள் வகைகள்' },
    { icon: Moon, value: formatTamilTime(store.hours.close).split(' ')[1], label: 'இரவு வரை திறந்திருக்கும்' },
  ];
  return (
    <section className="relative overflow-hidden border-b">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="container-x relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <Reveal from="left" className="text-center lg:text-left">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            <OpenBadge />
            <Badge variant="outline" className="h-7 rounded-full bg-background/60 px-3 text-[13px]">
              <Sparkles className="text-gold" />
              {store.years} ஆண்டு நிறைவு
            </Badge>
          </div>
          <h1 className="mt-6 text-balance py-1 font-display text-5xl font-bold leading-[1.2] sm:text-6xl lg:text-[4.25rem]">
            <StoreName />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground lg:mx-0">
            {store.type_ta} · {store.tagline_ta}. ஆவின் பால் முதல் மளிகை வரை — அனைத்தும் ஒரே இடத்தில்.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              asChild
              size="xl"
              className="bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-lg shadow-emerald-600/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/40"
            >
              <ActionLink kind="call" />
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-emerald-500/40 bg-background/70 backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              <ActionLink kind="whatsapp" iconClassName="text-emerald-600 dark:text-emerald-400">
                {ta.actions.whatsappOrder}
              </ActionLink>
            </Button>
            <Button asChild size="xl" variant="ghost">
              <ActionLink kind="directions" />
            </Button>
          </div>
          <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x lg:mx-0">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-3 first:pl-0 last:pr-0 sm:flex-row sm:items-center sm:gap-3 lg:items-start">
                <Icon aria-hidden="true" className="size-5 shrink-0 text-primary sm:mt-1" />
                <div className="text-center sm:text-left">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-semibold leading-none tracking-tight">{value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal from="right" delay={150}>
        <Tilt3D className="relative mx-auto w-full max-w-sm lg:max-w-[26rem]">
          {/* Gold glow and a tilted frame behind the banner, pushed back in 3D space */}
          <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--gold)_40%,transparent),transparent_60%),radial-gradient(circle_at_80%_90%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_55%)] blur-2xl" />
          <div aria-hidden="true" className="absolute inset-0 rounded-3xl border-2 border-gold/50 [transform:translate3d(16px,16px,-50px)_rotate(3deg)]" />
          <picture className="relative block overflow-hidden rounded-3xl shadow-2xl shadow-black/30 ring-1 ring-gold/50">
            <source srcSet="/images/banner.webp" type="image/webp" />
            <img
              src="/images/banner.jpg"
              alt={`${store.name_ta} டிபார்ட்மெண்டல் ஸ்டோர் — பால், குளிர் பானங்கள், மளிகை, பழங்கள், வீட்டுப் பொருட்கள்`}
              width="1080"
              height="1446"
              fetchPriority="high"
              className="w-full"
            />
          </picture>
        </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: MapPin, title: ta.landmark, text: `${store.address_ta.line2}, புதுக்கோட்டை – 622001` },
    { icon: Clock, title: ta.hours, text: hoursText() },
    { icon: BadgeCheck, title: 'தரமான பொருட்கள்', text: 'நம்பகமான பிராண்டுகள் · நியாயமான விலை' },
    {
      icon: PartyPopper,
      title: 'திருமண ஆர்டர்கள் ஏற்கப்படும்',
      text: 'திருமணம் மற்றும் விசேஷங்களுக்கான மொத்த ஆர்டர்கள் — 24 மணி நேரமும் ஆர்டர் செய்யலாம், டெலிவரியும் செய்து தரப்படும்',
      badge: '24 மணி நேரம்',
    },
    { icon: Truck, title: 'வீட்டுக்கே டெலிவரி', text: '₹1000-க்கு மேல் வாங்கினால் வீட்டுக்கே டெலிவரி செய்யப்படும்' },
  ];
  return (
    <section className="container-x py-12">
      {/* 3 + 2 on large screens; the last card spans the full row on tablets */}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {items.map(({ icon: Icon, title, text, badge }, i) => (
          <Reveal
            as="li"
            key={title}
            from={SIDES[i % 3]}
            delay={(i % 3) * 100}
            className={i < 3 ? 'lg:col-span-2' : i === items.length - 1 ? 'md:col-span-2 lg:col-span-3' : 'lg:col-span-3'}
          >
            <Card className="h-full gap-0 py-5">
              <CardHeader className="grid-cols-[auto_1fr] grid-rows-1 items-center gap-4 px-5">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px]">
                    {title}
                    {badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold-foreground dark:text-gold">
                        <Clock aria-hidden="true" className="size-3" />
                        {badge}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{text}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Highlights() {
  const aavin = products.filter((p) => p.category === 'aavin');
  const drinks = products.filter((p) => p.category === 'cold-drinks');
  return (
    <section className="container-x py-12 sm:py-16">
      <SectionHeading eyebrow="எங்கள் சிறப்பு" icon={Sparkles} title="ஆவின் பால் & குளிர் பானங்கள்" description="தினசரி தேவைக்கும், வெயில் காலக் குளிர்ச்சிக்கும் — ஒரே இடத்தில்." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal from="left" className="flex">
        <Card className="w-full overflow-hidden pt-0">
          {/* Same 16:7 header height as the drinks photo card beside it */}
          <div className="grid aspect-[16/7] place-items-center bg-gradient-to-br from-sky-50 via-white to-lime-50 p-6 dark:from-sky-950/40 dark:via-card dark:to-lime-950/30">
            <img
              src="/images/aavin-logo.webp"
              alt="Aavin"
              width="600"
              height="298"
              loading="lazy"
              className="h-full max-h-36 w-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">ஆவின் பால் பொருட்கள்</CardTitle>
            <CardDescription className="text-[15px]">
              பால், தயிர், நெய், வெண்ணெய், பன்னீர், மோர், ஐஸ்கிரீம் — அனைத்தும் இங்கு கிடைக்கும்.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {aavin.map((p) => (
                <li key={p.id}>
                  <Badge variant="secondary" className="px-2.5 py-1 text-[13px] font-normal">
                    {p.name_ta.replace('ஆவின் ', '')}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild>
              <Link to="/products/aavin">
                ஆவின் பொருட்கள்
                <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        </Reveal>

        <Reveal from="right" delay={120} className="flex">
        <Card className="w-full overflow-hidden pt-0">
          <img
            src="/images/juices.webp"
            alt="குளிர் பானங்கள்"
            width="680"
            height="720"
            loading="lazy"
            className="aspect-[16/7] w-full object-cover"
          />
          <CardHeader>
            <CardTitle className="text-xl">குளிர் பானங்கள்</CardTitle>
            <CardDescription className="text-[15px]">குளிரூட்டப்பட்ட முன்னணி குளிர் பானங்கள் — எப்போதும் சில்லென்று.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {drinks.map((p) => (
                <li key={p.id}>
                  <Badge variant="outline" className="px-2.5 py-1 text-[13px] font-normal">
                    {p.name_en}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto gap-2">
            <Button asChild>
              <Link to="/products/cold-drinks">
                குளிர் பானங்கள்
                <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        </Reveal>
      </div>
    </section>
  );
}

function Anniversary() {
  const values = [
    { icon: BadgeCheck, title: 'தரமான பொருட்கள்', text: 'நம்பகமான பிராண்டுகளின் தரமான பொருட்கள் மட்டுமே.' },
    { icon: IndianRupee, title: 'நியாயமான விலை', text: 'அனைவருக்கும் ஏற்ற நியாயமான விலையில்.' },
    { icon: HeartHandshake, title: 'அன்பான சேவை', text: `${store.years} ஆண்டுகளாக குடும்பம் போல் உங்களுடன்.` },
  ];
  return (
    <section className="border-y bg-muted/40">
      <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <Reveal from="left">
          <AnniversaryBadge className="mx-auto max-w-72 lg:max-w-none" />
        </Reveal>
        <Reveal from="right" delay={120}>
          <SectionHeading
            align="left"
            eyebrow={`${store.years} ஆண்டு நிறைவு`}
            icon={Sparkles}
            title={`${store.years} ஆண்டுகால நம்பிக்கை`}
            description="புதுக்கோட்டை மக்களின் அன்போடும் ஆதரவோடும் 25 ஆண்டுகளை நிறைவு செய்கிறோம். நன்றி!"
            className="text-center lg:text-left"
          />
          <Separator className="my-8" />
          <ul className="grid gap-4 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 sm:flex-col">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle(null);
  const offers = activeOffers().slice(0, 3);
  return (
    <>
      <Hero />
      <Features />

      <section className="container-x py-12 sm:py-16">
        <SectionHeading eyebrow={ta.nav.products} icon={LayoutGrid} title="எங்கள் பொருட்கள்" description="உங்களுக்குத் தேவையான அனைத்தும் ஒரே இடத்தில்" />
        <div className="mt-10">
          <CategoryGrid />
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/products">
              {ta.actions.viewAll}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <Highlights />
      <Anniversary />

      {offers.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <SectionHeading eyebrow={ta.nav.offers} icon={Tag} title="சலுகைகள் & சிறப்புகள்" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal as="li" key={o.id} from={SIDES[i % 3]} delay={i * 100}>
                <OfferCard offer={o} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <Testimonials />

      <section className="border-t bg-muted/30 py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading eyebrow={ta.nav.contact} icon={MapPin} title="எங்கள் கடைக்கு வாருங்கள்" description={ta.landmark} />
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <Reveal from="left" className="flex lg:col-span-3">
              <MapEmbed className="aspect-[4/3] w-full lg:aspect-auto" />
            </Reveal>
            <Reveal from="right" delay={120} className="lg:col-span-2">
              <VisitCard />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
