import { Award, BadgeCheck, HeartHandshake, IndianRupee, Layers, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import AnniversaryBadge from '@/components/AnniversaryBadge';
import Reveal from '@/components/Reveal';
import usePageTitle from '@/hooks/usePageTitle';
import { formatClock } from '@/lib/hours';
import store from '@/data/store.json';
import categories from '@/data/categories.json';
import { fill, useLang } from '@/i18n';

const SIDES = ['left', 'up', 'right'];

export default function About() {
  const { lang, t: ta, pick } = useLang();
  usePageTitle(ta.nav.about);
  const stats = [
    { icon: Award, value: `${store.years}+`, label: ta.stats.years },
    { icon: Layers, value: categories.length, label: ta.stats.categories },
    { icon: Moon, value: formatClock(store.hours.close), label: ta.stats.openTill },
  ];
  const values = [
    { icon: BadgeCheck, title: ta.values.quality, text: ta.about.qualityText },
    { icon: IndianRupee, title: ta.values.price, text: ta.about.priceText },
    { icon: HeartHandshake, title: ta.values.service, text: ta.about.serviceText },
  ];
  const type = pick(store, 'type');
  return (
    <>
      <PageHeader title={ta.nav.about} description={pick(store, 'tagline')} crumbs={[{ label: ta.nav.about }]} />

      <section className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
        <Reveal from="left" className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{ta.about.storyTitle}</h2>
          <p>{fill(ta.about.story1, { type: lang === 'en' ? type.toLowerCase() : type, years: store.years })}</p>
          <p>{ta.about.story2}</p>
          <p className="font-medium text-foreground">{ta.about.story3}</p>
        </Reveal>
        <Reveal from="right" delay={120}>
        <Card className="mx-auto w-full max-w-sm">
          <CardContent className="px-10">
            <AnniversaryBadge />
          </CardContent>
          <CardHeader className="text-center">
            <CardTitle>{pick(store, 'name')}</CardTitle>
            <CardDescription>{ta.footerTagline}</CardDescription>
          </CardHeader>
        </Card>
        </Reveal>
      </section>

      <section className="border-y bg-muted/40 py-10">
        <ul className="container-x grid gap-4 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal as="li" key={label} from={SIDES[i % 3]} delay={i * 100}>
              <Card className="flex-row items-center gap-4 px-5 py-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-foreground dark:text-gold">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-x py-12 sm:py-16">
        <SectionHeading title={ta.about.valuesTitle} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} from={SIDES[i % 3]} delay={i * 100}>
              <Card className="h-full">
                <CardHeader>
                  <span className="mb-2 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-[15px]">{text}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>
      </section>

      {store.photos.length > 0 && (
        <section className="container-x pb-16">
          <SectionHeading title={ta.about.shopTitle} />
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {store.photos.map((photo) => (
              <li key={photo.src}>
                <img src={photo.src} alt={pick(photo, 'alt')} loading="lazy" className="aspect-[4/3] w-full rounded-xl border object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
