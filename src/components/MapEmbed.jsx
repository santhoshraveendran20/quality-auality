import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mapEmbedUrl } from '@/lib/store';
import { useT } from '@/i18n';

export default function MapEmbed({ className }) {
  const t = useT();
  return (
    <Card className={cn('overflow-hidden p-0', className)}>
      <iframe
        title={t.mapTitle}
        src={mapEmbedUrl()}
        className="size-full min-h-72 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </Card>
  );
}
