import { Award, BadgeCheck, HeartHandshake, IndianRupee, Layers, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import AnniversaryBadge from '@/components/AnniversaryBadge';
import Reveal from '@/components/Reveal';
import usePageTitle from '@/hooks/usePageTitle';
import { formatTamilTime } from '@/lib/hours';
import store from '@/data/store.json';
import categories from '@/data/categories.json';
import ta from '@/i18n/ta.json';

const SIDES = ['left', 'up', 'right'];

export default function About() {
  usePageTitle(ta.nav.about);
  const stats = [
    { icon: Award, value: `${store.years}+`, label: 'ஆண்டுகள் சேவை' },
    { icon: Layers, value: categories.length, label: 'பொருள் வகைகள்' },
    { icon: Moon, value: formatTamilTime(store.hours.close).split(' ')[1], label: 'இரவு வரை திறந்திருக்கும்' },
  ];
  const values = [
    { icon: BadgeCheck, title: 'தரமான பொருட்கள்', text: 'நம்பகமான பிராண்டுகளின் தரமான பொருட்களை மட்டுமே விற்பனை செய்கிறோம்.' },
    { icon: IndianRupee, title: 'நியாயமான விலை', text: 'ஒவ்வொரு குடும்பத்திற்கும் ஏற்ற நியாயமான விலை.' },
    { icon: HeartHandshake, title: 'அன்பான சேவை', text: 'வாடிக்கையாளர்களை எங்கள் குடும்பமாகவே கருதுகிறோம்.' },
  ];
  return (
    <>
      <PageHeader title={ta.nav.about} description={store.tagline_ta} crumbs={[{ label: ta.nav.about }]} />

      <section className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
        <Reveal from="left" className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">எங்கள் கதை</h2>
          <p>
            புதுக்கோட்டை சாந்தநாதபுரம், ஜி.எச். ரோட்டில், தண்டாயுதபாணி கோவில் எதிரில், பழனியப்பா மெஸ் அருகில் அமைந்துள்ள எங்கள் {store.type_ta}{' '}
            கடந்த {store.years} ஆண்டுகளாக இப்பகுதி மக்களுக்குச் சேவை செய்து வருகிறது.
          </p>
          <p>
            தினசரி தேவையான ஆவின் பால் மற்றும் பால் பொருட்கள் முதல் குளிர் பானங்கள், மளிகை, வீட்டு உபயோகப்
            பொருட்கள், பூஜைப் பொருட்கள் வரை அனைத்தையும் ஒரே இடத்தில் வழங்குகிறோம்.
          </p>
          <p className="font-medium text-foreground">தரமான பொருட்கள், நியாயமான விலை, அன்பான சேவை — இதுவே எங்கள் அடையாளம்.</p>
        </Reveal>
        <Reveal from="right" delay={120}>
        <Card className="mx-auto w-full max-w-sm">
          <CardContent className="px-10">
            <AnniversaryBadge />
          </CardContent>
          <CardHeader className="text-center">
            <CardTitle>{store.name_ta}</CardTitle>
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
        <SectionHeading title="எங்கள் மதிப்புகள்" />
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
          <SectionHeading title="எங்கள் கடை" />
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {store.photos.map((photo) => (
              <li key={photo.src}>
                <img src={photo.src} alt={photo.alt_ta} loading="lazy" className="aspect-[4/3] w-full rounded-xl border object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
