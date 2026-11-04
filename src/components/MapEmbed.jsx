import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mapEmbedUrl } from '@/lib/store';

export default function MapEmbed({ className }) {
  return (
    <Card className={cn('overflow-hidden p-0', className)}>
      <iframe
        title="கடை அமைவிடம் – Google Maps"
        src={mapEmbedUrl()}
        className="size-full min-h-72 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </Card>
  );
}
