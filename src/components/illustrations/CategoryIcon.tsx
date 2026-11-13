import type { RepoKind } from "@/lib/content";
import { INK, WHITE, YELLOW } from "./Bot";

const S = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function cog(cx: number, cy: number, r1: number, r2: number, teeth: number) {
  const pts: string[] = [];
  const n = teeth * 4;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const r = i % 4 < 2 ? r2 : r1;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function hex(cx: number, cy: number, r: number) {
  const p: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    p.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${p.join(" L")} Z`;
}

const ICONS: Record<RepoKind, () => React.JSX.Element> = {
  tool: () => (
    <g>
      <path d="M30.5 7.5c4.5-1.4 9 .4 10.6 3.2l-5.9 5.7.8 4.1 4.1 1 5.5-5.7c1.6 4.3-.4 8.8-4.5 10.6-2.5 1.2-5.3 1-7.6 0-5.9 6.3-12 12.2-18 17.8-2.2.6-4.1-.2-5.3-1.8-1-1.6-1.2-3.5 0-5.1 5.9-5.9 11.8-12 17.8-17.6-1.2-5.1 1-10.6 2.5-12.2Z" transform="translate(-4 -2) scale(0.92)" fill={WHITE} {...S} />
      <circle cx={10.5} cy={38} r={2.2} fill={INK} />
    </g>
  ),
  scraping: () => (
    <g>
      <path d="M24 4 V13" {...S} strokeWidth={2.4} />
      {[
        "M15 20 Q7 15 4 22",
        "M14 25 Q6 25 4 32",
        "M15 30 Q9 34 9 41",
        "M33 20 Q41 15 44 22",
        "M34 25 Q42 25 44 32",
        "M33 30 Q39 34 39 41",
      ].map((d) => (
        <path key={d} d={d} fill="none" {...S} strokeWidth={2.8} />
      ))}
      <circle cx={24} cy={25} r={11} fill={WHITE} {...S} />
      <circle cx={20} cy={24} r={1.9} fill={INK} />
      <circle cx={28} cy={24} r={1.9} fill={INK} />
      <path d="M20.5 29 q3.5 2.5 7 0" fill="none" {...S} strokeWidth={2.2} />
    </g>
  ),
  web: () => (
    <g>
      <rect x={5} y={8} width={38} height={32} rx={6} fill={WHITE} {...S} />
      <path d="M5 16 H43" {...S} strokeWidth={2.6} />
      <circle cx={10} cy={12} r={1.6} fill={INK} />
      <circle cx={15} cy={12} r={1.6} fill={INK} />
      <rect x={10} y={21} width={14} height={12} rx={2} fill={YELLOW} {...S} strokeWidth={2.2} />
      <path d="M28 23 H37 M28 28 H35 M28 33 H37" {...S} strokeWidth={2.2} opacity={0.5} />
    </g>
  ),
  backend: () => (
    <g>
      <path d="M9 12 V36 C9 40 39 40 39 36 V12" fill={WHITE} {...S} />
      <path d="M9 24 C9 28 39 28 39 24" fill="none" {...S} strokeWidth={2.6} />
      <ellipse cx={24} cy={12} rx={15} ry={5} fill={YELLOW} {...S} />
      <circle cx={14} cy={31} r={1.6} fill={INK} />
      <circle cx={14} cy={19.5} r={1.6} fill={INK} />
    </g>
  ),
  api: () => (
    <g>
      <path d="M18 6 V14 M30 6 V14" {...S} strokeWidth={3.4} />
      <path d="M12 14 H36 V22 C36 30 31 34 24 34 C17 34 12 30 12 22 Z" fill={WHITE} {...S} />
      <path d="M24 34 V38 C24 44 32 44 36 42" fill="none" {...S} />
      <path d="M19 23 h10" {...S} strokeWidth={2.4} opacity={0.5} />
    </g>
  ),
  automation: () => (
    <g>
      <path d={cog(19, 21, 10, 13.5, 8)} fill={WHITE} {...S} strokeWidth={2.6} />
      <circle cx={19} cy={21} r={4.2} fill={YELLOW} {...S} strokeWidth={2.4} />
      <path d={cog(34, 34, 5.5, 8, 6)} fill={WHITE} {...S} strokeWidth={2.4} />
      <circle cx={34} cy={34} r={2.2} fill={INK} />
    </g>
  ),
  data: () => (
    <g>
      <path d={hex(15, 16, 9)} fill={WHITE} {...S} strokeWidth={2.6} />
      <path d={hex(28.5, 23.8, 9)} fill={YELLOW} {...S} strokeWidth={2.6} />
      <path d={hex(15, 31.6, 9)} fill={WHITE} {...S} strokeWidth={2.6} />
      <path d={hex(28.5, 39.4, 9)} fill={WHITE} {...S} strokeWidth={2.6} opacity={0.35} />
      <circle cx={28.5} cy={23.8} r={2} fill={INK} />
    </g>
  ),
  education: () => (
    <g>
      <path d="M5 12 C12 9 19 10 24 14 C29 10 36 9 43 12 V38 C36 35 29 36 24 40 C19 36 12 35 5 38 Z" fill={WHITE} {...S} />
      <path d="M24 14 V40" {...S} strokeWidth={2.6} />
      <path d="M10 19 C13 18 16 18 19 19.5 M10 25 C13 24 16 24 19 25.5 M29 19.5 C32 18 35 18 38 19" fill="none" {...S} strokeWidth={2} opacity={0.5} />
      <text x={33.5} y={33} textAnchor="middle" fontFamily="Rubik Variable, Rubik, sans-serif" fontWeight={900} fontSize={10} fill={INK}>
        π
      </text>
    </g>
  ),
  ai: () => (
    <g>
      <path d="M24 10 V5" {...S} strokeWidth={2.6} />
      <circle cx={24} cy={4.5} r={3} fill={YELLOW} {...S} strokeWidth={2.2} />
      <rect x={8} y={11} width={32} height={26} rx={10} fill={WHITE} {...S} />
      <circle cx={18} cy={23} r={3.2} fill={INK} />
      <circle cx={30} cy={23} r={3.2} fill={INK} />
      <path d="M19 30.5 q5 3 10 0" fill="none" {...S} strokeWidth={2.4} />
      <path d="M8 22 H4 M40 22 H44" {...S} strokeWidth={3} />
    </g>
  ),
};

export default function CategoryIcon({ kind, size = 34 }: { kind: RepoKind; size?: number }) {
  const C = ICONS[kind];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <C />
    </svg>
  );
}

export function IconScene({ kind, label }: { kind: RepoKind; label: string }) {
  const C = ICONS[kind];
  return (
    <svg viewBox="0 0 400 175" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
      <rect width={400} height={175} fill="#fdfcf9" />
      <g filter="url(#ink-wobble-soft)">
        <ellipse cx={206} cy={156} rx={70} ry={7} fill={INK} opacity={0.08} />
        <g transform="translate(152 28) scale(2.4)">
          <C />
        </g>
      </g>
    </svg>
  );
}
