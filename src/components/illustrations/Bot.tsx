import type { ReactNode } from "react";

export const INK = "#14140f";
export const WHITE = "#ffffff";
export const YELLOW = "#f8e08a";
export const SHEET = "#fdfcf9";
export const GRAY = "#e8e6df";

export type Arm = "down" | "up" | "wave" | "point" | "hold" | "hips" | "raise";

export interface BotProps {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  fill?: string;
  hat?: "beanie" | "cap" | null;
  shirt?: boolean;
  antenna?: boolean;
  face?: "dots" | "happy" | "wow" | "none";
  look?: number;
  armL?: Arm;
  armR?: Arm;
  walk?: number;
  bob?: boolean;
  shadow?: boolean;
  className?: string;
  waveClass?: string;
  children?: ReactNode;
  front?: ReactNode;
}

/* membre « boudin » : un trait encre large + un trait blanc par-dessus */
export function Limb({ d, w = 8, fill = WHITE, className }: { d: string; w?: number; fill?: string; className?: string }) {
  return (
    <g className={className}>
      <path d={d} stroke={INK} strokeWidth={w + 5.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

const ARM: Record<Arm, string> = {
  down: "M-17 -57 Q-25 -48 -24 -35",
  up: "M-17 -60 Q-27 -70 -27 -84",
  raise: "M-17 -60 Q-30 -64 -36 -76",
  wave: "M-17 -60 Q-29 -66 -31 -80",
  point: "M-17 -58 Q-30 -60 -42 -60",
  hold: "M-17 -57 Q-22 -44 -9 -42",
  hips: "M-17 -58 Q-33 -50 -21 -40",
};

function mirror(d: string) {
  return d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (_, a, b) => `${-parseFloat(a)} ${b}`);
}

export const BODY = "M-20 -52 C-20 -70 -12 -75 0 -75 C12 -75 20 -70 20 -52 L21 -33 C21 -21 12 -17 0 -17 C-12 -17 -21 -21 -21 -33 Z";

export default function Bot({
  x,
  y,
  s = 1,
  flip = false,
  fill = WHITE,
  hat = null,
  shirt = false,
  antenna = true,
  face = "dots",
  look = 0,
  armL = "down",
  armR = "down",
  walk = 0,
  bob = false,
  shadow = true,
  className,
  waveClass = "wave",
  children,
  front,
}: BotProps) {
  const lx = look * 4;
  const armLeft = ARM[armL];
  const armRight = mirror(ARM[armR]);
  const legL = `M-8 -24 L${-9 - walk} -4`;
  const legR = `M8 -24 L${9 + walk} -4`;

  return (
    <g transform={`translate(${x} ${y})`}>
      {shadow && <ellipse cx={9 * s} cy={1} rx={30 * s} ry={5.5 * s} fill={INK} opacity={0.09} />}
      <g className={className}>
      <g transform={`scale(${flip ? -s : s} ${s})`}>
        <g className={bob ? "bob" : undefined}>
          {children}
          <Limb d={legL} w={10} fill={fill} />
          <Limb d={legR} w={10} fill={fill} />
          {/* les bras le long du corps passent derrière, ceux qui tiennent un objet devant */}
          {armL !== "hold" && <Limb d={armLeft} fill={fill} className={armL === "wave" ? waveClass : undefined} />}
          {armR !== "hold" && <Limb d={armRight} fill={fill} className={armR === "wave" ? waveClass : undefined} />}
          <path d={BODY} fill={fill} />
          {shirt && <path d="M-20.4 -62 L20.4 -62 L21 -39 L-21 -39 Z" fill={INK} />}
          <path d={BODY} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          {armL === "hold" && <Limb d={armLeft} fill={fill} />}
          {armR === "hold" && <Limb d={armRight} fill={fill} />}
          {antenna && (
            <g>
              <path d="M0 -106 Q1 -114 0 -119" stroke={INK} strokeWidth={2.6} strokeLinecap="round" fill="none" />
              <circle cx={0} cy={-122.5} r={4.4} fill={fill === WHITE ? WHITE : fill} stroke={INK} strokeWidth={2.6} />
            </g>
          )}
          <circle cx={0} cy={-88} r={19} fill={fill} stroke={INK} strokeWidth={3} />
          {hat === "beanie" && (
            <g>
              <path d="M-19.6 -89 C-19.5 -110 19.5 -110 19.6 -89 C8 -91.5 -8 -91.5 -19.6 -89 Z" fill={INK} />
            </g>
          )}
          {hat === "cap" && (
            <g>
              <path d="M-18.6 -95 C-17 -111 17 -111 18.6 -95 C8 -96.5 -8 -96.5 -18.6 -95 Z" fill={INK} />
              <path d="M5 -96.5 Q27 -99.5 32 -94 Q21 -92 5 -93.5 Z" fill={INK} />
            </g>
          )}
          {face === "dots" && (
            <g fill={INK}>
              <circle cx={-6.5 + lx} cy={-86} r={2.4} />
              <circle cx={6.5 + lx} cy={-86} r={2.4} />
            </g>
          )}
          {face === "wow" && (
            <g fill={INK}>
              <circle cx={-6.5 + lx} cy={-87} r={2.5} />
              <circle cx={6.5 + lx} cy={-87} r={2.5} />
              <ellipse cx={lx} cy={-78.5} rx={2.4} ry={2.8} />
            </g>
          )}
          {face === "happy" && (
            <g stroke={INK} strokeWidth={2.3} strokeLinecap="round" fill="none">
              <path d={`M${-10 + lx} -85.5 q3.5 -4.5 7 0`} />
              <path d={`M${3 + lx} -85.5 q3.5 -4.5 7 0`} />
              <path d={`M${-4 + lx} -79.5 q4 3.6 8 0`} />
            </g>
          )}
          {front}
        </g>
      </g>
      </g>
    </g>
  );
}

/* éléments de décor réutilisables ─────────────────────────────── */

export function Star({ x, y, r = 8, fill = YELLOW, className }: { x: number; y: number; r?: number; fill?: string; className?: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.48;
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" className={className} />;
}

export function Browser({
  x,
  y,
  w,
  h,
  children,
  fill = WHITE,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: ReactNode;
  fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={6} y={7} width={w} height={h} rx={10} fill={INK} opacity={0.08} />
      <rect width={w} height={h} rx={10} fill={fill} stroke={INK} strokeWidth={3} />
      <path d={`M0 22 H${w}`} stroke={INK} strokeWidth={2.6} />
      <circle cx={13} cy={11} r={3.2} fill={INK} />
      <circle cx={24} cy={11} r={3.2} fill={WHITE} stroke={INK} strokeWidth={2} />
      <circle cx={35} cy={11} r={3.2} fill={WHITE} stroke={INK} strokeWidth={2} />
      <rect x={46} y={6.5} width={Math.max(20, w - 60)} height={9} rx={4.5} fill={GRAY} />
      {children}
    </g>
  );
}

export function Lines({ x, y, widths, gap = 10, sw = 3, color = INK, opacity = 0.22 }: { x: number; y: number; widths: number[]; gap?: number; sw?: number; color?: string; opacity?: number }) {
  return (
    <g stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={opacity}>
      {widths.map((w, i) => (
        <path key={i} d={`M${x} ${y + i * gap} h${w}`} />
      ))}
    </g>
  );
}

export function Sheet({ x, y, w = 60, h = 76, rot = 0, children }: { x: number; y: number; w?: number; h?: number; rot?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path
        d={`M0 0 H${w - 14} L${w} 14 V${h} H0 Z`}
        fill={WHITE}
        stroke={INK}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />
      <path d={`M${w - 14} 0 V14 H${w}`} fill={GRAY} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
      {children}
    </g>
  );
}

export function Ground({ y = 226, x1 = 18, x2 = 382 }: { y?: number; x1?: number; x2?: number }) {
  return <path d={`M${x1} ${y} Q200 ${y + 3} ${x2} ${y - 1}`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" opacity={0.18} fill="none" />;
}

export function Shadow({ x, y, rx = 30, ry = 6, o = 0.09 }: { x: number; y: number; rx?: number; ry?: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={INK} opacity={o} />;
}
