import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wraps children in a 3D stage that tilts toward the pointer. Children can use
 * `[transform:translateZ(..)]` to sit at different depths for a parallax effect.
 * Touch devices and reduced-motion users get the static card.
 */
export default function Tilt3D({ className, children, max = 12 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    el.dataset.active = 'true';
  };

  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    delete el.dataset.active;
  };

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          'group/tilt relative [transform-style:preserve-3d] transition-transform duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]',
          className,
        )}
      >
        {children}
        {/* Moving glare that follows the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-data-[active]/tilt:opacity-100 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgb(255_255_255/0.35),transparent_45%)] [transform:translateZ(80px)]"
        />
      </div>
    </div>
  );
}
