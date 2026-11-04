import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hasWhatsApp, waHref } from '@/lib/store';
import ta from '@/i18n/ta.json';

// Tablet/desktop only, and only once a WhatsApp number is set; phones use the bottom bar.
export default function FloatingWhatsApp() {
  if (!hasWhatsApp) return null;
  return (
    <Button
      asChild
      size="icon-lg"
      className="fixed bottom-6 right-6 z-40 hidden size-14 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-600/90 md:inline-flex"
    >
      <a href={waHref()} target="_blank" rel="noopener noreferrer" data-track="whatsapp" aria-label={ta.actions.whatsappOrder}>
        <MessageCircle className="size-6" />
      </a>
    </Button>
  );
}
