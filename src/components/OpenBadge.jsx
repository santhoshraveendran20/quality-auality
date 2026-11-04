import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useOpenStatus from '@/hooks/useOpenStatus';

export default function OpenBadge({ className }) {
  const { isOpen, text } = useOpenStatus();
  return (
    <Badge
      variant="outline"
      role="status"
      className={cn('h-auto min-h-7 gap-2 whitespace-normal rounded-full bg-background/60 px-3 py-1 text-center text-[13px] font-medium leading-snug backdrop-blur', className)}
    >
      <span className="relative flex size-2 shrink-0">
        {isOpen && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={cn('relative size-2 rounded-full', isOpen ? 'bg-emerald-500' : 'bg-red-500')} />
      </span>
      {text}
    </Badge>
  );
}
