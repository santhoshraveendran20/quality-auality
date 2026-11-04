import { useId } from 'react';
import { Leaf, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import store from '@/data/store.json';

/*
 * 25th-anniversary emblem drawn with lucide-react icons:
 * the laurel wreath is made of <Leaf /> icons placed along two curved branches,
 * the crown of stars is <Star /> icons. Vector, so it stays sharp at any size
 * and works on light and dark backgrounds.
 */

// Left laurel branch as a cubic Bézier in the 400 × 352 viewBox; the right one is its mirror.
const P = [
  [154, 294],
  [34, 268],
  [4, 150],
  [96, 54],
];
const bez = (t, i) =>
  (1 - t) ** 3 * P[0][i] + 3 * (1 - t) ** 2 * t * P[1][i] + 3 * (1 - t) * t ** 2 * P[2][i] + t ** 3 * P[3][i];
const slope = (t, i) =>
  3 * (1 - t) ** 2 * (P[1][i] - P[0][i]) + 6 * (1 - t) * t * (P[2][i] - P[1][i]) + 3 * t ** 2 * (P[3][i] - P[2][i]);
const heading = (t) => (Math.atan2(slope(t, 1), slope(t, 0)) * 180) / Math.PI;

// lucide's Leaf runs from its stalk at (2, 21) to its tip, about -48° from the x-axis.
const LEAF_AXIS = -48;
const LEAVES = [];
for (let k = 0; k < 9; k += 1) {
  const t = 0.1 + k * 0.1;
  const size = 38 - k * 1.6;
  LEAVES.push({ x: bez(t, 0), y: bez(t, 1), angle: heading(t) - 44, size }); // outer side
  LEAVES.push({ x: bez(t, 0), y: bez(t, 1), angle: heading(t) + 44, size: size * 0.8 }); // inner side
}
LEAVES.push({ x: bez(1, 0), y: bez(1, 1), angle: heading(1), size: 22 }); // tip
const STEM = `M${P[0]} C${P[1]} ${P[2]} ${P[3]}`;

const STARS = [
  { cx: 134, cy: 34, s: 18 },
  { cx: 166, cy: 34, s: 18 },
  { cx: 200, cy: 30, s: 36 },
  { cx: 234, cy: 34, s: 18 },
  { cx: 266, cy: 34, s: 18 },
];

function Branch({ fill, stroke }) {
  return (
    <g>
      <path d={STEM} fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
      {LEAVES.map((l, i) => (
        <g
          key={i}
          transform={`translate(${l.x} ${l.y}) rotate(${l.angle - LEAF_AXIS}) translate(${(-2 * l.size) / 24} ${(-21 * l.size) / 24})`}
        >
          <Leaf width={l.size} height={l.size} fill={fill} stroke={stroke} strokeWidth={1.1} />
        </g>
      ))}
    </g>
  );
}

export default function AnniversaryBadge({ className, label = 'ஆண்டு நிறைவு', title }) {
  const id = `ab${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const gold = `url(#${id}-gold)`;
  const ink = '#8a6420';
  return (
    <svg
      viewBox="0 0 400 352"
      role="img"
      aria-label={title ?? `${store.years} ${label}`}
      className={cn('h-auto w-full select-none', className)}
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe8a6" />
          <stop offset="0.45" stopColor="#e0b552" />
          <stop offset="1" stopColor="#a87a26" />
        </linearGradient>
        <linearGradient id={`${id}-num`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdeeb5" />
          <stop offset="0.5" stopColor="#d9a944" />
          <stop offset="1" stopColor="#94681e" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecc96d" />
          <stop offset="1" stopColor="#b3842c" />
        </linearGradient>
        <linearGradient id={`${id}-tail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b88a32" />
          <stop offset="1" stopColor="#7f5c1d" />
        </linearGradient>
        <path id={`${id}-arc`} d="M78 309 Q200 271 322 309" />
      </defs>

      {/* crown of stars */}
      {STARS.map((s) => (
        <Star key={s.cx} x={s.cx - s.s / 2} y={s.cy - s.s / 2} width={s.s} height={s.s} fill={gold} stroke={ink} strokeWidth={1} />
      ))}
      <path d="M128 96 H184 M216 96 H272" stroke={gold} strokeWidth="2.5" strokeLinecap="round" />
      <Star x={191} y={87} width={18} height={18} fill={gold} stroke={ink} strokeWidth={1} />

      {/* laurel wreath of lucide leaves */}
      <Branch fill={gold} stroke={ink} />
      <g transform="translate(400 0) scale(-1 1)">
        <Branch fill={gold} stroke={ink} />
      </g>

      {/* 25 + Tamil ordinal */}
      <text
        x="200"
        y="240"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="150"
        letterSpacing="-3"
        fill={`url(#${id}-num)`}
        stroke="#7a5518"
        strokeWidth="1.6"
        paintOrder="stroke"
      >
        {store.years}
      </text>
      <text x="274" y="124" fontFamily="'Noto Sans Tamil', sans-serif" fontWeight="700" fontSize="18" fill={`url(#${id}-num)`}>
        ஆம்
      </text>

      {/* ribbon */}
      <path d="M18 300 L82 292 L82 338 L18 346 L36 323 Z" fill={`url(#${id}-tail)`} />
      <path d="M382 300 L318 292 L318 338 L382 346 L364 323 Z" fill={`url(#${id}-tail)`} />
      <path d="M70 288 Q200 250 330 288 L330 330 Q200 292 70 330 Z" fill={`url(#${id}-band)`} stroke={ink} strokeWidth="1" />
      <text
        fontFamily="'Noto Sans Tamil', sans-serif"
        fontWeight="700"
        fontSize="19"
        letterSpacing="1"
        fill="#fffaf0"
        stroke="#6b4a14"
        strokeWidth="0.8"
        paintOrder="stroke"
        dy="7"
      >
        <textPath href={`#${id}-arc`} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
    </svg>
  );
}
