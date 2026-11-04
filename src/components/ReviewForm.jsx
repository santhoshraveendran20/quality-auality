import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { CheckCircle2, MessageCirclePlus, Send, Star, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { hasWhatsApp, waHref } from '@/lib/store';

const MAX = 300;
const RATING_WORDS = ['', 'பரவாயில்லை', 'சுமார்', 'நன்று', 'மிக நன்று', 'அருமை!'];

/**
 * "Share your review" dialog. The site has no backend, so a review is sent to the shop's
 * WhatsApp; the owner approves it and adds it to src/data/testimonials.json to publish it.
 */
export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');

  if (!hasWhatsApp) return null;

  const valid = name.trim().length >= 2 && text.trim().length >= 10;

  const reset = () => {
    setSent(false);
    setName('');
    setPlace('');
    setRating(5);
    setText('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const message = [
      'புதிய வாடிக்கையாளர் கருத்து (இணையதளம்)',
      `பெயர்: ${name.trim()}`,
      place.trim() && `ஊர்: ${place.trim()}`,
      `மதிப்பீடு: ${'⭐'.repeat(rating)} (${rating}/5)`,
      `கருத்து: ${text.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(waHref(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const shown = hover || rating;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <Dialog.Trigger asChild>
        <Button size="lg" className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl">
          <MessageCirclePlus />
          உங்கள் கருத்தைப் பகிருங்கள்
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="மூடு">
            <XIcon className="size-5" />
          </Dialog.Close>

          {sent ? (
            <div className="py-4 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-8" />
              </span>
              <Dialog.Title className="mt-4 text-xl font-semibold">நன்றி, {name.trim()}!</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                வாட்ஸ்அப்பில் உங்கள் கருத்தை அனுப்பி முடிக்கவும். சரிபார்த்த பின் இணையதளத்தில் வெளியிடப்படும்.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button className="mt-6 w-full">சரி</Button>
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="pr-8">
                <Dialog.Title className="text-xl font-semibold">உங்கள் கருத்தைப் பகிருங்கள்</Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                  எங்கள் கடையைப் பற்றிய உங்கள் அனுபவத்தைச் சொல்லுங்கள்.
                </Dialog.Description>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium">மதிப்பீடு</legend>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-label={`${n} / 5`}
                        aria-pressed={rating === n}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        className="rounded-md p-0.5 transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <Star className={cn('size-8 transition-colors', n <= shown ? 'fill-gold text-gold' : 'fill-muted text-muted-foreground/40')} />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gold-foreground dark:text-gold">{RATING_WORDS[shown]}</span>
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">உங்கள் பெயர் *</span>
                  <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required autoComplete="name" />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">ஊர் / பகுதி</span>
                  <Input value={place} onChange={(e) => setPlace(e.target.value)} maxLength={40} placeholder="புதுக்கோட்டை" />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="flex justify-between text-sm font-medium">
                  உங்கள் கருத்து *<span className="font-normal text-muted-foreground">{text.length}/{MAX}</span>
                </span>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  rows={4}
                  required
                  minLength={10}
                  placeholder="எங்கள் பொருட்கள், விலை, சேவை பற்றி…"
                  className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                />
              </label>

              <Button type="submit" size="lg" disabled={!valid} className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                <Send />
                வாட்ஸ்அப் மூலம் அனுப்பு
              </Button>
              <p className="text-center text-xs text-muted-foreground">சரிபார்த்த பின் உங்கள் கருத்து இணையதளத்தில் வெளியிடப்படும்.</p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
