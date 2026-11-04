import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const HIDDEN = {
  left: '-translate-x-16 scale-95',
  right: 'translate-x-16 scale-95',
  up: 'translate-y-12 scale-95',
};

/**
 * Pops its children in when they first scroll into view: sliding from the left, the
 * right or from below, with a slight springy overshoot. Pages remount on every route
 * change, so the animation replays each time a nav tab is opened.
 * Reduced-motion users get the content immediately (see the global rule in index.css).
 */
export default function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className, children, ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setShown(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.34,1.45,0.64,1)] will-change-transform',
        shown ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : cn('opacity-0', HIDDEN[from]),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
