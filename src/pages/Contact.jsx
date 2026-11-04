import PageHeader from '@/components/PageHeader';
import MapEmbed from '@/components/MapEmbed';
import VisitCard from '@/components/VisitCard';
import Reveal from '@/components/Reveal';
import usePageTitle from '@/hooks/usePageTitle';
import { fill, useT } from '@/i18n';

export default function Contact() {
  const ta = useT();
  usePageTitle(ta.nav.contact);
  return (
    <>
      <PageHeader title={ta.nav.contact} description={fill(ta.contactPage.text, { landmark: ta.landmark })} crumbs={[{ label: ta.nav.contact }]} />
      <div className="container-x grid gap-6 py-10 sm:py-14 lg:grid-cols-5">
        <Reveal from="left" className="lg:col-span-2">
          <VisitCard />
        </Reveal>
        <Reveal from="right" delay={120} className="flex lg:col-span-3">
          <MapEmbed className="aspect-square w-full sm:aspect-[4/3] lg:aspect-auto" />
        </Reveal>
      </div>
    </>
  );
}
