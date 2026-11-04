import { MessageSquareHeart, Quote, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ReviewForm from '@/components/ReviewForm';
import { cn } from '@/lib/utils';
import testimonials from '@/data/testimonials.json';

const AVATAR_TONES = [
  'from-emerald-500 to-green-700',
  'from-amber-400 to-orange-600',
  'from-sky-500 to-blue-700',
  'from-rose-500 to-pink-700',
  'from-violet-500 to-purple-700',
  'from-teal-400 to-cyan-700',
];

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className={cn('size-4', i < rating ? 'fill-gold text-gold' : 'fill-muted text-muted')} />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  return (
    <figure className="group relative flex w-[19rem] shrink-0 flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 sm:w-[22rem]">
      <Quote aria-hidden="true" className="absolute -right-2 -top-2 size-20 rotate-180 text-gold/10 transition-transform duration-500 group-hover:scale-110" />
      <Stars rating={t.rating} />
      <blockquote className="relative mt-3 flex-1 text-[15px] leading-relaxed text-foreground/90">“{t.text}”</blockquote>
      <figcaption className="relative mt-5 flex items-center gap-3 border-t pt-4">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-base font-bold text-white shadow-md',
            AVATAR_TONES[index % AVATAR_TONES.length],
          )}
        >
          {t.name.charAt(0)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * One endlessly scrolling row. The list is repeated until it is wider than large screens,
 * then rendered twice so the loop is seamless. Repeats are hidden from screen readers.
 */
function MarqueeRow({ items, reverse = false, offset = 0 }) {
  const repeat = Math.max(1, Math.ceil(6 / items.length));
  const track = Array.from({ length: repeat }, () => items).flat();
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={cn(
            'flex shrink-0 gap-4 py-3 pr-4 group-hover/row:[animation-play-state:paused] motion-reduce:animate-none',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            copy === 1 && 'motion-reduce:hidden',
          )}
        >
          {track.map((t, i) => (
            <li key={`${copy}-${i}`} className="flex" aria-hidden={i >= items.length || undefined}>
              <TestimonialCard t={t} index={(i % items.length) + offset} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const items = testimonials.items;
  if (!items.length) return null;
  const half = Math.ceil(items.length / 2);
  return (
    <section className="relative overflow-hidden border-t py-12 sm:py-16">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <Reveal className="container-x relative">
        <SectionHeading
          eyebrow="வாடிக்கையாளர் கருத்துகள்"
          icon={MessageSquareHeart}
          title="எங்கள் வாடிக்கையாளர்கள் சொல்வது"
          description="புதுக்கோட்டை மக்களின் அன்பும் நம்பிக்கையுமே எங்கள் பலம்."
        />
        <div className="mt-6 flex justify-center">
          <ReviewForm />
        </div>
      </Reveal>
      <div className="relative mt-10 space-y-2">
        <MarqueeRow items={items.slice(0, half)} />
        <MarqueeRow items={items.slice(half)} offset={half} reverse />
      </div>
    </section>
  );
}
