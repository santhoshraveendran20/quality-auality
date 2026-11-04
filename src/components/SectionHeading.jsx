import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function SectionHeading({ eyebrow, icon: Icon, title, description, align = 'center', className }) {
  const center = align === 'center';
  return (
    <div className={cn(center && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <Badge variant="outline" className="mb-3 rounded-full px-3 py-1 text-xs">
          {Icon && <Icon aria-hidden="true" className="text-gold" />}
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-balance text-muted-foreground">{description}</p>}
    </div>
  );
}
