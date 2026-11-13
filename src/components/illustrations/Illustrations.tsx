import type { IllustrationId } from "@/lib/content";
import Bot, { Browser, GRAY, Ground, INK, Lines, Shadow, Sheet, SHEET, Star, WHITE, YELLOW } from "./Bot";

const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* ── GoReview ─────────────────────────────────────────────────── */
function GoReview() {
  // modules QR pseudo-aléatoires mais stables
  const mods: [number, number][] = [];
  const seed = [0b10110, 0b01101, 0b11010, 0b00111, 0b10101, 0b01011, 0b11100];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) if ((seed[r] >> c) & 1) mods.push([c, r]);
  return (
    <>
      <Ground y={224} />
      {/* comptoir */}
      <Shadow x={214} y={225} rx={96} ry={7} />
      <rect x={122} y={176} width={168} height={48} rx={6} fill={WHITE} {...S} />
      <rect x={122} y={176} width={168} height={48} rx={6} fill="url(#hatch-light)" />
      <path d="M118 176 H294" {...S} strokeWidth={4} />
      {/* plaque */}
      <path d="M190 176 L196 164 H214 L220 176 Z" fill={WHITE} {...S} />
      <rect x={160} y={40} width={90} height={126} rx={11} fill={WHITE} {...S} />
      <Star x={186} y={57} r={6.5} />
      <Star x={205} y={54} r={8} />
      <Star x={224} y={57} r={6.5} />
      <g transform="translate(176 71)">
        <rect width={58} height={58} rx={4} fill={WHITE} {...S} strokeWidth={2.4} />
        {[
          [5, 5],
          [37, 5],
          [5, 37],
        ].map(([fx, fy]) => (
          <g key={`${fx}-${fy}`}>
            <rect x={fx} y={fy} width={16} height={16} rx={2} fill={INK} />
            <rect x={fx + 3.5} y={fy + 3.5} width={9} height={9} rx={1} fill={WHITE} />
            <rect x={fx + 6} y={fy + 6} width={4} height={4} fill={INK} />
          </g>
        ))}
        {mods.map(([c, r]) => (
          <rect key={`${c}-${r}`} x={24 + c * 6} y={24 + r * 4.6} width={5} height={4} fill={INK} />
        ))}
      </g>
      {/* ondes NFC */}
      <g fill="none" {...S} strokeWidth={2.6}>
        <path d="M196 146 q-4 6 0 12" />
        <path d="M203 142 q-7 10 0 20" />
        <path d="M210 138 q-10 14 0 28" opacity={0.5} />
      </g>
      {/* rayon de scan */}
      <path d="M128 157 L176 112" stroke={INK} strokeWidth={2.2} strokeDasharray="4 6" strokeLinecap="round" />
      <path d="M128 162 L176 128" stroke={INK} strokeWidth={2.2} strokeDasharray="4 6" strokeLinecap="round" opacity={0.5} />
      <Bot
        x={82}
        y={224}
        s={1}
        armR="point"
        hat="cap"
        bob
        front={
          <g transform="translate(43 -62) rotate(-14)">
            <rect x={-7} y={-13} width={14} height={25} rx={3.5} fill={WHITE} {...S} strokeWidth={2.6} />
            <rect x={-3.5} y={-8} width={7} height={13} rx={1.5} fill={YELLOW} />
          </g>
        }
      />
      <Bot x={336} y={224} s={0.92} fill={YELLOW} face="happy" armL="raise" bob />
      {/* bulle 5 étoiles */}
      <g transform="translate(268 34)">
        <rect width={98} height={32} rx={11} fill={WHITE} {...S} strokeWidth={2.6} />
        <path d="M58 31 L64 41 L68 31" fill={WHITE} {...S} strokeWidth={2.6} />
        <path d="M59 30.5 H67" stroke={WHITE} strokeWidth={4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} x={17 + i * 16} y={16} r={6} fill={i < 5 ? YELLOW : WHITE} />
        ))}
      </g>
      <g className="float">
        <Star x={120} y={66} r={7} fill={WHITE} />
      </g>
      <g className="float" style={{ animationDelay: "-1.4s" }}>
        <Star x={282} y={108} r={5} fill={WHITE} />
      </g>
    </>
  );
}


const DISPLAY = "Rubik Variable, Rubik, sans-serif";
const BODYF = "Nunito Variable, Nunito, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* chaussure vue de profil, pointe à gauche — boîte 0..124 × 0..70 */
export function Sneaker({ x, y, s = 1, fill = WHITE }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M4 52 C2 38 12 32 26 30 L48 26 C56 16 64 8 74 4 L92 0 C102 -2 110 4 112 14 L116 36 C118 44 118 50 116 52 Z" fill={fill} {...S} />
      <path d="M2 52 Q0 66 12 66 L112 66 Q124 66 120 52 Z" fill={WHITE} {...S} />
      <path d="M6 59 H116" stroke={INK} strokeWidth={2} opacity={0.4} />
      <path d="M30 42 Q66 32 104 20" fill="none" {...S} strokeWidth={4} />
      <path d="M12 40 Q18 34 30 32" fill="none" {...S} strokeWidth={2.4} />
      <g {...S} strokeWidth={2.4}>
        <path d="M56 22 L64 30" />
        <path d="M64 15 L72 23" />
        <path d="M72 9 L80 17" />
      </g>
      <path d="M106 4 L114 -6 L118 8" fill={WHITE} {...S} strokeWidth={2.6} />
    </g>
  );
}

function Box({ x, y, w, h, label = false, rot = 0 }: { x: number; y: number; w: number; h: number; label?: boolean; rot?: number }) {
  const d = 11;
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <path d={`M${x} ${y} L${x + d} ${y - d} H${x + w + d} L${x + w} ${y} Z`} fill={WHITE} {...S} />
      <path d={`M${x + w} ${y} L${x + w + d} ${y - d} V${y + h - d} L${x + w} ${y + h} Z`} fill={GRAY} {...S} />
      <rect x={x} y={y} width={w} height={h} fill={WHITE} {...S} />
      <rect x={x + w / 2 - 6} y={y} width={12} height={h * 0.42} fill="url(#hatch-light)" stroke={INK} strokeWidth={2} />
      <path d={`M${x + w / 2 - 6 + d * 0.5} ${y - d * 0.5} h12`} stroke={INK} strokeWidth={2} />
      {label && (
        <g transform={`translate(${x + 8} ${y + h - 26})`}>
          <rect width={w - 16} height={18} rx={3} fill={SHEET} stroke={INK} strokeWidth={2} />
          {[3, 6, 8, 12, 14, 18, 21, 23, 27, 30, 34, 36, 40].filter((v) => v < w - 22).map((v, i) => (
            <path key={v} d={`M${4 + v} 4 V14`} stroke={INK} strokeWidth={i % 3 === 0 ? 2.4 : 1.2} />
          ))}
        </g>
      )}
    </g>
  );
}

/* ── MDCrawler ────────────────────────────────────────────────── */
function Crawler() {
  return (
    <>
      <Ground y={226} />
      <Browser x={22} y={44} w={138} h={116}>
        <rect x={12} y={32} width={68} height={9} rx={4} fill={INK} />
        <Lines x={12} y={54} widths={[110, 92, 102]} gap={11} />
        <rect x={12} y={86} width={46} height={20} rx={3} fill="url(#hatch)" stroke={INK} strokeWidth={2} />
        <Lines x={66} y={91} widths={[54, 40]} gap={10} />
      </Browser>
      <path d="M164 104 Q178 104 186 112" fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="3 6" strokeLinecap="round" />
      {/* l'araignée-robot */}
      <path d="M208 0 V88" stroke={INK} strokeWidth={2} />
      <g className="float">
        <Sheet x={194} y={124} w={32} h={42} rot={7}>
          <Lines x={6} y={14} widths={[16, 20, 12]} gap={7} sw={2.4} opacity={0.35} />
        </Sheet>
        {[
          "M193 100 Q176 88 166 102",
          "M191 108 Q172 104 164 118",
          "M192 116 Q178 122 176 136",
          "M196 122 Q190 132 196 142",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
            <path d={d} stroke={WHITE} strokeWidth={3.6} strokeLinecap="round" fill="none" />
            <path d={d.replace(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (_, a, b) => `${416 - parseFloat(a)} ${b}`)} stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
            <path d={d.replace(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (_, a, b) => `${416 - parseFloat(a)} ${b}`)} stroke={WHITE} strokeWidth={3.6} strokeLinecap="round" fill="none" />
          </g>
        ))}
        <circle cx={208} cy={110} r={21} fill={WHITE} {...S} />
        <path d="M196 98 Q208 90 220 98" fill="none" stroke={INK} strokeWidth={2.4} opacity={0.4} />
        <circle cx={201} cy={110} r={2.6} fill={INK} />
        <circle cx={215} cy={110} r={2.6} fill={INK} />
        <path d="M203 118 q5 3.5 10 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      </g>
      <path d="M236 150 Q250 148 258 140" fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="3 6" strokeLinecap="round" />
      <path d="M252 136 L260 139 L256 147" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {/* pile de .md */}
      <Sheet x={284} y={70} w={64} h={82} rot={8} />
      <Sheet x={270} y={66} w={64} h={82} rot={-5} />
      <Sheet x={276} y={60} w={64} h={82} rot={1}>
        <text x={9} y={27} fontFamily={DISPLAY} fontWeight={900} fontSize={20} fill={INK}>#</text>
        <Lines x={24} y={20} widths={[26]} sw={3.4} opacity={0.8} />
        <Lines x={9} y={38} widths={[44, 36, 40]} gap={8} sw={2.4} opacity={0.3} />
        <text x={9} y={73} fontFamily={DISPLAY} fontWeight={900} fontSize={13} fill={INK}>##</text>
        <Lines x={28} y={69} widths={[22]} sw={3} opacity={0.7} />
      </Sheet>
      <g transform="rotate(-6 306 176)">
        <rect x={286} y={166} width={42} height={22} rx={7} fill={YELLOW} {...S} strokeWidth={2.6} />
        <text x={307} y={182} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={13} fill={INK}>.md</text>
      </g>
      <Bot x={92} y={226} s={0.62} walk={4} armL="hold" armR="hold" bob front={<Sheet x={-16} y={-60} w={32} h={24} />} />
      <Bot x={362} y={226} s={0.58} face="happy" armL="up" shirt bob />
    </>
  );
}

/* ── MiniPalantir ─────────────────────────────────────────────── */
function Globe() {
  const cx = 200;
  const cy = 118;
  return (
    <>
      <Ground y={226} />
      {/* avion + traînée */}
      <path d="M22 98 Q52 58 92 52" fill="none" stroke={INK} strokeWidth={2.2} strokeDasharray="2 6" strokeLinecap="round" />
      <g transform="translate(100 48) rotate(-18)"><g className="float">
        <path d="M-14 0 H12 Q18 0 18 3 Q18 6 12 6 H-14 Z" fill={WHITE} {...S} strokeWidth={2.4} />
        <path d="M-2 0 L-10 -12 H-4 L6 0 Z M-2 6 L-10 18 H-4 L6 6 Z M-14 0 L-18 -6 H-14 L-10 0 Z" fill={WHITE} {...S} strokeWidth={2.2} />
      </g></g>
      {/* orbite (arrière) */}
      <g transform={`rotate(-13 ${cx} ${cy})`}>
        <path d={`M${cx - 150} ${cy} A150 36 0 0 1 ${cx + 150} ${cy}`} fill="none" stroke={INK} strokeWidth={2.2} strokeDasharray="5 6" opacity={0.6} />
      </g>
      {/* socle */}
      <Shadow x={212} y={222} rx={62} ry={7} />
      <path d="M186 206 H214 L218 218 H182 Z" fill={WHITE} {...S} />
      <ellipse cx={200} cy={219} rx={44} ry={7} fill={WHITE} {...S} />
      <path d={`M${cx} ${cy - 88} A88 88 0 0 1 ${cx} ${cy + 88}`} fill="none" {...S} strokeWidth={4} />
      {/* globe */}
      <circle cx={cx} cy={cy} r={76} fill={WHITE} {...S} />
      <clipPath id="globe-clip">
        <circle cx={cx} cy={cy} r={74} />
      </clipPath>
      <g clipPath="url(#globe-clip)">
        <path d="M146 86 q20 -30 50 -16 q14 10 4 26 q-16 10 -10 30 q-6 18 -26 8 q-16 -14 -18 -48 Z" fill="url(#hatch)" stroke={INK} strokeWidth={2.4} />
        <path d="M222 64 q26 -6 36 14 q6 18 -8 24 q-22 2 -28 -12 q-4 -14 0 -26 Z" fill="url(#hatch)" stroke={INK} strokeWidth={2.4} />
        <path d="M214 138 q22 -6 32 8 q4 24 -16 32 q-20 -2 -16 -40 Z" fill="url(#hatch)" stroke={INK} strokeWidth={2.4} />
        <g fill="none" stroke={INK} strokeWidth={2} opacity={0.3}>
          <ellipse cx={cx} cy={cy} rx={30} ry={76} />
          <ellipse cx={cx} cy={cy} rx={58} ry={76} />
          <path d={`M${cx - 76} ${cy - 26} Q${cx} ${cy - 12} ${cx + 76} ${cy - 26}`} />
          <path d={`M${cx - 76} ${cy + 26} Q${cx} ${cy + 40} ${cx + 76} ${cy + 26}`} />
          <path d={`M${cx - 76} ${cy + 6} H${cx + 76}`} />
        </g>
        {/* séisme */}
        <g fill="none" stroke={INK} strokeWidth={2.2}>
          <circle cx={160} cy={150} r={5} fill={INK} />
          <circle cx={160} cy={150} r={11} opacity={0.6} />
          <circle cx={160} cy={150} r={18} opacity={0.3} />
        </g>
      </g>
      {/* épingles */}
      {[
        [178, 98, WHITE],
        [240, 82, WHITE],
        [232, 150, YELLOW],
      ].map(([px, py, f]) => (
        <g key={`${px}`} transform={`translate(${px} ${py})`}>
          <path d="M0 0 C-8 -8 -9 -14 -9 -17 A9 9 0 0 1 9 -17 C9 -14 8 -8 0 0 Z" fill={f as string} {...S} strokeWidth={2.6} />
          <circle cx={0} cy={-17} r={3} fill={INK} />
        </g>
      ))}
      {/* orbite (avant) + ISS */}
      <g transform={`rotate(-13 ${cx} ${cy})`}>
        <path d={`M${cx + 150} ${cy} A150 36 0 0 1 ${cx - 150} ${cy}`} fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="5 6" />
      </g>
      <g transform="translate(318 112) rotate(-13)"><g className="float">
        <rect x={-24} y={-5} width={15} height={10} fill="url(#hatch)" stroke={INK} strokeWidth={2.2} />
        <rect x={9} y={-5} width={15} height={10} fill="url(#hatch)" stroke={INK} strokeWidth={2.2} />
        <path d="M-9 0 H9" stroke={INK} strokeWidth={2.2} />
        <rect x={-6} y={-7} width={12} height={14} rx={3} fill={WHITE} {...S} strokeWidth={2.4} />
      </g></g>
      <Bot x={64} y={226} s={0.74} armR="up" look={0.6} bob />
      <Bot x={344} y={226} s={0.66} armL="up" look={-0.6} hat="beanie" face="wow" bob />
    </>
  );
}

/* ── AI Web Agent ─────────────────────────────────────────────── */
function Agent() {
  return (
    <>
      <Ground y={226} />
      <Browser x={128} y={26} w={244} h={172}>
        <rect x={16} y={40} width={156} height={28} rx={9} fill={WHITE} {...S} strokeWidth={2.6} />
        <text x={28} y={59} fontFamily={BODYF} fontWeight={800} fontSize={12} fill={INK} opacity={0.75}>trouve-moi un vol…</text>
        <path d="M140 47 V61" stroke={INK} strokeWidth={2.4} className="blink" />
        <rect x={180} y={40} width={48} height={28} rx={9} fill={INK} />
        <text x={204} y={59} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={12} fill={WHITE}>GO</text>
        {[
          ["naviguer", true],
          ["chercher", true],
          ["cliquer", false],
        ].map(([t, done], i) => (
          <g key={t as string} transform={`translate(18 ${92 + i * 26})`}>
            <rect width={16} height={16} rx={4} fill={done ? YELLOW : WHITE} {...S} strokeWidth={2.4} />
            {done && <path d="M3.5 8.5 L7 12 L13 4.5" fill="none" {...S} strokeWidth={2.6} />}
            <text x={26} y={13} fontFamily={BODYF} fontWeight={800} fontSize={12} fill={INK}>{t as string}</text>
            <Lines x={96} y={8} widths={[90 - i * 18]} sw={3} opacity={0.18} />
          </g>
        ))}
      </Browser>
      {/* curseur */}
      <g transform="translate(326 82)">
        <g stroke={INK} strokeWidth={2.6} strokeLinecap="round">
          <path d="M-8 -10 L-14 -16" />
          <path d="M0 -13 V-21" />
          <path d="M8 -10 L14 -16" />
        </g>
        <path d="M0 0 L1 36 L10 28 L17 42 L24 38 L17 25 L29 24 Z" fill={WHITE} {...S} />
      </g>
      {/* pensée */}
      <g>
        <path
          d="M30 80 C14 80 12 62 26 58 C24 44 40 38 50 46 C56 34 76 34 82 46 C94 40 110 48 106 62 C118 66 114 84 100 82 C96 92 80 94 72 86 C62 94 44 92 40 84 C36 86 32 84 30 80 Z"
          fill={WHITE}
          {...S}
        />
        <text x={64} y={64} textAnchor="middle" fontFamily={BODYF} fontWeight={800} fontSize={11.5} fill={INK}>clic, tape,</text>
        <text x={64} y={78} textAnchor="middle" fontFamily={BODYF} fontWeight={800} fontSize={11.5} fill={INK}>scrolle…</text>
        <circle cx={84} cy={102} r={5} fill={WHITE} {...S} strokeWidth={2.4} />
        <circle cx={90} cy={116} r={3} fill={WHITE} {...S} strokeWidth={2.2} />
      </g>
      <Bot x={74} y={226} s={0.86} face="dots" look={0.7} armR="point" bob />
    </>
  );
}

/* ── Inventory ────────────────────────────────────────────────── */
function Inventory() {
  return (
    <>
      <Ground y={226} />
      <Shadow x={300} y={226} rx={92} ry={7} />
      <Box x={222} y={168} w={66} h={58} label />
      <Box x={290} y={168} w={66} h={58} />
      <Box x={250} y={112} w={66} h={56} />
      <Box x={264} y={64} w={46} h={48} rot={4} />
      {/* poste synchronisé */}
      <g transform="translate(26 30)">
        <rect width={84} height={56} rx={8} fill={WHITE} {...S} />
        <rect x={8} y={8} width={68} height={40} rx={4} fill={SHEET} stroke={INK} strokeWidth={2} />
        <path d="M24 28 L34 37 L54 18" fill="none" {...S} strokeWidth={3.2} />
        <path d="M36 56 L32 68 H52 L48 56" fill={WHITE} {...S} strokeWidth={2.6} />
      </g>
      <path d="M116 52 Q196 18 262 70" fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="3 7" strokeLinecap="round" />
      <g transform="translate(190 34)"><g className="spin">
        <circle r={11} fill={YELLOW} {...S} strokeWidth={2.4} />
        <path d="M-5 -2 A5.5 5.5 0 0 1 5 -1 M5 -1 l1 -4 M5 -1 l-4 -0.6 M5 2 A5.5 5.5 0 0 1 -5 1 M-5 1 l-1 4 M-5 1 l4 0.6" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      </g></g>
      {/* faisceau de scan */}
      <path d="M140 162 L230 190 L230 206 Z" fill={YELLOW} opacity={0.75} />
      <path d="M140 162 L230 198" stroke={INK} strokeWidth={2} strokeDasharray="3 5" />
      <Bot
        x={94}
        y={226}
        s={0.98}
        armR="point"
        bob
        front={
          <g transform="translate(42 -61)">
            <path d="M-6 -8 H12 Q16 -8 16 -4 V2 Q16 6 12 6 H4 L2 18 H-6 Z" fill={INK} />
            <rect x={14} y={-6} width={5} height={10} rx={1.5} fill={YELLOW} stroke={INK} strokeWidth={2} />
          </g>
        }
      />
    </>
  );
}

/* ── Grille hexagonale Genève ─────────────────────────────────── */
function HexGrid() {
  const r = 19;
  const w = r * 1.5;
  const h = Math.sqrt(3) * r;
  const hexes: { x: number; y: number; k: string }[] = [];
  for (let c = -1; c < 16; c++) {
    for (let rr = -1; rr < 9; rr++) {
      const x = c * w;
      const y = rr * h + (c % 2 ? h / 2 : 0);
      hexes.push({ x, y, k: `${c}:${rr}` });
    }
  }
  const hexPath = (x: number, y: number) => {
    const p: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      p.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`);
    }
    return `M${p.join(" L")} Z`;
  };
  const picked = new Set(["9:1", "10:1", "10:2", "11:2", "9:2"]);
  const focus = { x: 10 * w, y: 2 * h };
  return (
    <>
      <g fill="none" stroke={INK} strokeWidth={1.6} opacity={0.26}>
        {hexes.map(({ x, y, k }) => (
          <path key={k} d={hexPath(x, y)} />
        ))}
      </g>
      {hexes
        .filter((hx) => picked.has(hx.k))
        .map(({ x, y, k }) => (
          <path key={k} d={hexPath(x, y)} fill={YELLOW} stroke={INK} strokeWidth={2.4} />
        ))}
      <path d={hexPath(focus.x, focus.y)} fill="none" stroke={INK} strokeWidth={3.4} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i;
        return <circle key={i} cx={focus.x + r * Math.cos(a)} cy={focus.y + r * Math.sin(a)} r={3.6} fill={INK} />;
      })}
      {/* le lac et le jet d'eau */}
      <path d="M-10 160 Q58 126 138 150 Q196 168 232 206 Q246 232 236 260 L-10 260 Z" fill={SHEET} />
      <path d="M-10 160 Q58 126 138 150 Q196 168 232 206 Q246 232 236 260 L-10 260 Z" fill="url(#hatch-light)" stroke={INK} strokeWidth={2.8} />
      <g fill="none" stroke={INK} strokeWidth={2} opacity={0.45} strokeLinecap="round">
        <path d="M30 196 q10 -5 20 0 t20 0" />
        <path d="M96 216 q10 -5 20 0 t20 0" />
        <path d="M150 190 q8 -4 16 0" />
      </g>
      <path d="M182 186 Q188 120 194 58 Q197 50 200 58 Q208 120 206 186 Z" fill={WHITE} {...S} strokeWidth={2.8} />
      <path d="M192 170 Q194 120 196 72" stroke={INK} strokeWidth={1.8} opacity={0.35} fill="none" />
      <g className="float">
        <path d="M190 70 C180 44 200 26 220 34 C238 40 248 58 240 80 C236 92 228 98 222 92 C224 78 214 66 200 74 C196 76 192 74 190 70 Z" fill={WHITE} {...S} strokeWidth={2.6} />
        <path d="M204 44 Q220 42 230 58" fill="none" stroke={INK} strokeWidth={2} opacity={0.4} strokeLinecap="round" />
        {[
          [246, 92, 3],
          [236, 104, 2.4],
          [250, 108, 2],
        ].map(([dx, dy, rr]) => (
          <circle key={`${dx}-${dy}`} cx={dx} cy={dy} r={rr} fill={WHITE} stroke={INK} strokeWidth={2} />
        ))}
      </g>
      <ellipse cx={194} cy={186} rx={20} ry={5} fill={WHITE} stroke={INK} strokeWidth={2.6} />
      {/* drapeau CH1903+ */}
      <g transform="translate(320 54)">
        <path d="M0 0 V66" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <path d="M0 2 H58 L50 13 L58 24 H0 Z" fill={WHITE} {...S} strokeWidth={2.6} />
        <text x={6} y={18} fontFamily={DISPLAY} fontWeight={900} fontSize={10.5} fill={INK}>CH1903+</text>
      </g>
      <Shadow x={330} y={226} rx={28} ry={5} />
      <Bot x={334} y={226} s={0.8} armL="point" look={-0.7} bob shirt />
    </>
  );
}

/* ── API Finder ───────────────────────────────────────────────── */
function ApiFinder() {
  const nodes = [
    [34, 52],
    [82, 30],
    [70, 96],
    [118, 64],
    [28, 128],
    [104, 132],
  ];
  return (
    <>
      <Ground y={226} />
      <g stroke={INK} strokeWidth={2} opacity={0.35}>
        <path d="M34 52 L82 30 L118 64 L70 96 L34 52 M70 96 L28 128 M70 96 L104 132 M118 64 L104 132" fill="none" />
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 7 : 5.5} fill={i === 3 ? YELLOW : WHITE} stroke={INK} strokeWidth={2.4} />
      ))}
      <g transform="translate(146 40)">
        <rect x={6} y={7} width={206} height={146} rx={12} fill={INK} opacity={0.08} />
        <rect width={206} height={146} rx={12} fill={WHITE} {...S} />
        {[
          ["GET", "/api/v1/users", "200"],
          ["GET", "/api/v2/orders", "401"],
          ["POST", "/graphql", "200"],
          ["GET", "/internal/debug", "500"],
        ].map(([m, path, code], i) => (
          <g key={path} transform={`translate(14 ${28 + i * 27})`}>
            <rect x={-4} y={-13} width={36} height={18} rx={5} fill={i === 3 ? YELLOW : SHEET} stroke={INK} strokeWidth={2} />
            <text x={14} y={0} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={9.5} fill={INK}>{m}</text>
            <text x={40} y={0} fontFamily={MONO} fontWeight={700} fontSize={11} fill={INK}>{path}</text>
            <text x={176} y={0} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={10.5} fill={INK} opacity={0.6}>{code}</text>
          </g>
        ))}
      </g>
      {/* loupe */}
      <g className="float">
        <path d="M268 148 L300 176" stroke={INK} strokeWidth={15} strokeLinecap="round" />
        <circle cx={240} cy={120} r={42} fill={WHITE} fillOpacity={0.92} />
        <clipPath id="lens-clip">
          <circle cx={240} cy={120} r={39} />
        </clipPath>
        <g clipPath="url(#lens-clip)">
          <text x={240} y={130} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={30} fill={INK}>/api</text>
          <path d="M206 142 H274" stroke={INK} strokeWidth={4} opacity={0.15} />
        </g>
        <circle cx={240} cy={120} r={42} fill="none" stroke={INK} strokeWidth={5.5} />
        <path d="M214 100 Q222 88 236 86" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" opacity={0.45} />
      </g>
      <Bot x={336} y={226} s={0.86} armL="raise" look={-0.6} hat="beanie" bob />
      {/* alerte */}
      <g transform="translate(112 176)">
        <path d="M0 -18 L17 12 H-17 Z" fill={YELLOW} {...S} strokeWidth={2.6} />
        <path d="M0 -7 V2" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <circle cx={0} cy={7} r={1.8} fill={INK} />
      </g>
      <Bot x={56} y={226} s={0.62} face="wow" look={0.4} armL="up" armR="up" />
    </>
  );
}

/* ── StockX Monitor ───────────────────────────────────────────── */
function StockX() {
  const line = "M168 70 L190 62 L212 76 L236 70 L258 94 L278 126 L298 114 L320 120 L342 98 L360 92";
  return (
    <>
      <Ground y={226} />
      <g>
        <rect x={160} y={36} width={214} height={130} rx={12} fill={INK} opacity={0.08} transform="translate(6 7)" />
        <rect x={156} y={30} width={214} height={130} rx={12} fill={WHITE} {...S} />
        <g stroke={INK} strokeWidth={1.6} opacity={0.18} strokeDasharray="3 5">
          <path d="M168 66 H358 M168 96 H358 M168 126 H358" />
        </g>
        <path d={`${line} L360 148 L168 148 Z`} fill="url(#hatch-light)" />
        <path d={line} fill="none" {...S} strokeWidth={3.4} />
        <circle cx={278} cy={126} r={7} fill={YELLOW} {...S} strokeWidth={2.6} />
        <g transform="translate(290 132)">
          <rect width={50} height={20} rx={6} fill={INK} />
          <text x={25} y={14.5} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={11.5} fill={WHITE}>−12 %</text>
        </g>
        <text x={170} y={52} fontFamily={DISPLAY} fontWeight={900} fontSize={10} letterSpacing={1.2} fill={INK} opacity={0.5}>416 000 RÉFS · 30 MIN</text>
      </g>
      {/* cloche */}
      <g transform="translate(346 22) rotate(12)"><g className="float">
        <path d="M-11 10 Q-11 -6 0 -8 Q11 -6 11 10 L14 14 H-14 Z" fill={YELLOW} {...S} strokeWidth={2.6} />
        <circle cx={0} cy={17} r={3} fill={INK} />
        <path d="M-17 -4 q-4 6 0 12 M17 -4 q4 6 0 12" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      </g></g>
      {/* boîte à chaussures + sneaker */}
      <Shadow x={110} y={226} rx={78} ry={7} />
      <rect x={34} y={178} width={142} height={48} rx={3} fill={WHITE} {...S} />
      <rect x={34} y={178} width={142} height={48} rx={3} fill="url(#hatch-light)" />
      <rect x={28} y={168} width={154} height={14} rx={3} fill={WHITE} {...S} />
      <Sneaker x={44} y={102} s={1.04} />
      {/* étiquette */}
      <path d="M118 112 Q126 96 140 92" fill="none" stroke={INK} strokeWidth={2} />
      <g transform="translate(140 76) rotate(16)">
        <path d="M0 6 L8 0 H32 V24 H8 Z" fill={WHITE} {...S} strokeWidth={2.4} />
        <circle cx={8} cy={12} r={2.4} fill={INK} />
        <text x={21} y={17} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={12} fill={INK}>$</text>
      </g>
      <Bot x={214} y={226} s={0.7} armR="up" face="wow" look={0.6} bob />
      <Bot x={348} y={226} s={0.64} hat="cap" face="happy" armL="up" bob />
    </>
  );
}

/* ── Stage en agence ──────────────────────────────────────────── */
function Heart({ x, y, s = 1, fill = WHITE, className }: { x: number; y: number; s?: number; fill?: string; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>
        <path d="M0 6 C-10 -2 -12 -10 -6 -13 C-2 -15 0 -12 0 -10 C0 -12 2 -15 6 -13 C12 -10 10 -2 0 6 Z" fill={fill} {...S} strokeWidth={2.4} />
      </g>
    </g>
  );
}

function Stage() {
  return (
    <>
      <Ground y={226} />
      {/* calendrier */}
      <g transform="translate(24 28) rotate(-5)">
        <rect width={74} height={66} rx={8} fill={WHITE} {...S} />
        <path d="M0 18 H74" stroke={INK} strokeWidth={2.6} />
        <rect x={1.5} y={1.5} width={71} height={15} rx={6} fill={INK} />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={8 + (i % 4) * 16} y={24 + Math.floor(i / 4) * 13} width={10} height={8} rx={2} fill={i === 6 ? YELLOW : GRAY} stroke={i === 6 ? INK : "none"} strokeWidth={1.8} />
        ))}
      </g>
      {/* téléphone */}
      <Shadow x={212} y={224} rx={58} ry={6} />
      <rect x={156} y={22} width={104} height={198} rx={18} fill={WHITE} {...S} strokeWidth={3.2} />
      <rect x={192} y={30} width={32} height={7} rx={3.5} fill={INK} />
      <circle cx={176} cy={56} r={8} fill={GRAY} stroke={INK} strokeWidth={2} />
      <Lines x={190} y={53} widths={[40, 24]} gap={7} sw={2.6} opacity={0.3} />
      <rect x={168} y={72} width={80} height={70} rx={7} fill="url(#hatch)" stroke={INK} strokeWidth={2.4} />
      <circle cx={190} cy={94} r={9} fill={WHITE} stroke={INK} strokeWidth={2.2} />
      <path d="M170 136 L196 112 L214 126 L230 110 L246 128" fill="none" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
      <Heart x={178} y={160} s={0.9} fill={YELLOW} />
      <path d="M194 156 q6 -4 10 0 q2 6 -6 8 l-4 3 v-4 q-4 -2 0 -7 Z" fill={WHITE} stroke={INK} strokeWidth={2} />
      <Lines x={170} y={180} widths={[70, 52, 60]} gap={9} sw={2.6} opacity={0.2} />
      {/* cœurs qui s'envolent */}
      <Heart x={276} y={60} s={1.1} className="float" />
      <Heart x={294} y={34} s={0.8} fill={YELLOW} className="float" />
      <Heart x={140} y={40} s={0.7} className="float" />
      {/* dashboard */}
      <g transform="translate(272 112) rotate(4)">
        <rect width={106} height={84} rx={10} fill={WHITE} {...S} />
        <text x={10} y={18} fontFamily={DISPLAY} fontWeight={900} fontSize={8.5} letterSpacing={1.2} fill={INK} opacity={0.55}>REPORTING</text>
        {[18, 30, 26, 42, 52].map((hgt, i) => (
          <rect key={i} x={12 + i * 18} y={74 - hgt} width={12} height={hgt} rx={2} fill={i === 4 ? YELLOW : INK} stroke={INK} strokeWidth={2} />
        ))}
        <path d="M10 76 H96" stroke={INK} strokeWidth={2.2} />
      </g>
      {/* mégaphone */}
      <Bot
        x={84}
        y={226}
        s={0.98}
        armR="point"
        hat="beanie"
        bob
        front={
          <g transform="translate(40 -60)">
            <path d="M0 -6 L26 -18 V18 L0 6 Z" fill={WHITE} {...S} strokeWidth={2.8} />
            <ellipse cx={26} cy={0} rx={4} ry={18} fill={WHITE} {...S} strokeWidth={2.6} />
            <rect x={-5} y={-6} width={7} height={12} rx={2} fill={INK} />
          </g>
        }
      />
      <g fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round">
        <path d="M140 150 q6 8 0 16" />
        <path d="M148 144 q10 14 0 28" opacity={0.6} />
      </g>
    </>
  );
}

/* ── Convention Sneaker ───────────────────────────────────────── */
function Convention() {
  const n = 6;
  const sw = 36;
  const x0 = 26;
  return (
    <>
      <Ground y={226} />
      {/* bannière */}
      <g transform="rotate(-2 136 30)">
        <rect x={62} y={12} width={150} height={30} rx={8} fill={WHITE} {...S} />
        <text x={137} y={33} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={15} letterSpacing={0.6} fill={INK}>SNEAKER CON</text>
        <path d="M84 42 V52 M190 42 V52" stroke={INK} strokeWidth={2.6} />
      </g>
      {/* poteaux */}
      <path d={`M${x0 + 12} 76 V224 M${x0 + n * sw - 12} 76 V224`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <path d={`M${x0 + 12} 76 V224 M${x0 + n * sw - 12} 76 V224`} stroke={WHITE} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
      {/* auvent rayé */}
      {Array.from({ length: n }).map((_, i) => {
        const x = x0 + i * sw;
        const f = i % 2 ? WHITE : INK;
        return (
          <g key={i}>
            <rect x={x} y={52} width={sw} height={24} fill={f} />
            <path d={`M${x} 76 a${sw / 2} 11 0 0 0 ${sw} 0 Z`} fill={f} stroke={INK} strokeWidth={2.6} />
          </g>
        );
      })}
      <rect x={x0} y={52} width={n * sw} height={24} fill="none" {...S} />
      {/* table */}
      <Shadow x={140} y={226} rx={104} ry={7} />
      <rect x={48} y={176} width={176} height={50} fill={WHITE} {...S} />
      <rect x={48} y={176} width={176} height={50} fill="url(#hatch-light)" />
      <path d="M40 176 H232" {...S} strokeWidth={4.4} />
      <Sneaker x={58} y={148} s={0.42} />
      <Sneaker x={110} y={148} s={0.42} fill={YELLOW} />
      <Sneaker x={162} y={148} s={0.42} />
      {/* billets qui volent */}
      {[
        [256, 60, -14],
        [292, 34, 10],
      ].map(([tx, ty, rot]) => (
        <g key={tx} transform={`translate(${tx} ${ty}) rotate(${rot})`}><g className="float">
          <path d="M0 0 H34 V6 A4 4 0 0 0 34 14 V20 H0 V14 A4 4 0 0 0 0 6 Z" fill={WHITE} {...S} strokeWidth={2.4} />
          <path d="M24 2 V18" stroke={INK} strokeWidth={1.8} strokeDasharray="2 3" />
        </g></g>
      ))}
      {/* la file d'attente */}
      <Bot
        x={278}
        y={226}
        s={0.8}
        fill={YELLOW}
        face="happy"
        armL="point"
        look={-0.6}
        bob
        front={
          <g transform="translate(-48 -64) rotate(-8)">
            <path d="M0 0 H26 V5 A3.5 3.5 0 0 0 26 12 V17 H0 V12 A3.5 3.5 0 0 0 0 5 Z" fill={WHITE} {...S} strokeWidth={2.6} />
          </g>
        }
      />
      <Bot x={324} y={226} s={0.72} hat="cap" look={-0.7} bob />
      <Bot x={366} y={226} s={0.66} shirt look={-0.7} armR="hips" bob />
    </>
  );
}

/* ── WAsender ─────────────────────────────────────────────────── */
function WaSender() {
  const groups: [number, number, string][] = [
    [262, 36, "Resell CH"],
    [282, 92, "Sneakers FR"],
    [262, 148, "WTB / WTS"],
  ];
  return (
    <>
      <Ground y={226} />
      {/* téléphone */}
      <Shadow x={150} y={226} rx={46} ry={6} />
      <rect x={104} y={30} width={96} height={190} rx={16} fill={WHITE} {...S} />
      <rect x={112} y={48} width={80} height={152} rx={6} fill={SHEET} stroke={INK} strokeWidth={2.2} />
      <rect x={138} y={36} width={28} height={6} rx={3} fill={INK} />
      {/* message à diffuser */}
      <g transform="translate(120 60)">
        <rect width={64} height={70} rx={8} fill={WHITE} {...S} strokeWidth={2.4} />
        <Sneaker x={6} y={12} s={0.42} fill={YELLOW} />
        <Lines x={8} y={52} widths={[44, 30]} gap={8} sw={2.6} opacity={0.3} />
      </g>
      <g transform="translate(120 140)">
        <rect width={64} height={22} rx={8} fill={INK} />
        <text x={32} y={15} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={10} fill={WHITE}>/send</text>
      </g>
      <g transform="translate(126 170)">
        <rect width={52} height={18} rx={9} fill={YELLOW} stroke={INK} strokeWidth={2.2} />
        <text x={26} y={13} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={9} fill={INK}>×12</text>
      </g>
      {/* diffusion vers les groupes */}
      {groups.map(([gx, gy, name], i) => (
        <g key={name}>
          <path d={`M200 ${110 + (i - 1) * 8} Q232 ${110 + (i - 1) * 30} ${gx - 4} ${gy + 16}`} fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="5 6" strokeLinecap="round" />
          <g transform={`translate(${gx} ${gy})`}>
            <g className="float" style={{ animationDelay: `${-i * 0.7}s` }}>
              <rect width={108} height={34} rx={10} fill={i === 1 ? YELLOW : WHITE} {...S} strokeWidth={2.6} />
              <circle cx={17} cy={17} r={9} fill={WHITE} stroke={INK} strokeWidth={2.2} />
              <circle cx={14} cy={15} r={2.4} fill={INK} />
              <circle cx={20} cy={15} r={2.4} fill={INK} />
              <text x={32} y={21} fontFamily={BODYF} fontWeight={800} fontSize={11} fill={INK}>{name}</text>
            </g>
          </g>
        </g>
      ))}
      <Bot x={56} y={226} s={0.86} hat="cap" armR="point" look={0.6} bob />
      <g className="float">
        <Star x={232} y={208} r={6} fill={WHITE} />
      </g>
    </>
  );
}

/* ── Aurora ───────────────────────────────────────────────────── */
function Aurora() {
  return (
    <>
      <Ground y={226} />
      {/* bureau */}
      <Shadow x={200} y={227} rx={130} ry={7} />
      <rect x={70} y={176} width={260} height={50} rx={6} fill={WHITE} {...S} />
      <rect x={70} y={176} width={260} height={50} rx={6} fill="url(#hatch-light)" />
      <path d="M62 176 H338" {...S} strokeWidth={4} />
      {/* téléphone qui sonne */}
      <g transform="translate(92 140)">
        <path d="M0 36 L8 8 H58 L66 36 Z" fill={WHITE} {...S} />
        <path d="M-4 6 Q33 -14 70 6 L64 14 Q33 0 2 14 Z" fill={INK} />
        <g fill={INK}>
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={22 + c * 11} cy={17 + r * 6} r={2} />))}
        </g>
        <g fill="none" {...S} strokeWidth={2.6} className="blink">
          <path d="M-12 -8 L-20 -16" />
          <path d="M33 -14 V-24" />
          <path d="M78 -8 L86 -16" />
        </g>
      </g>
      {/* onde vocale */}
      <g transform="translate(196 74)">
        <rect width={150} height={58} rx={14} fill={WHITE} {...S} />
        <path d="M30 57 L22 70 L44 57" fill={WHITE} {...S} />
        <path d="M24 56 H42" stroke={WHITE} strokeWidth={4} />
        {[8, 18, 30, 16, 26, 38, 22, 12, 28, 18, 10, 20, 8].map((h, i) => (
          <rect key={i} x={14 + i * 10} y={29 - h / 2} width={5} height={h} rx={2.5} fill={i % 4 === 1 ? YELLOW : INK} stroke={INK} strokeWidth={i % 4 === 1 ? 1.6 : 0} />
        ))}
      </g>
      {/* agenda avec rendez-vous confirmé */}
      <g transform="translate(250 146) rotate(4)">
        <rect width={62} height={46} rx={5} fill={WHITE} {...S} strokeWidth={2.6} />
        <rect width={62} height={12} rx={4} fill={INK} />
        <rect x={10} y={20} width={42} height={16} rx={4} fill={YELLOW} stroke={INK} strokeWidth={2} />
        <path d="M24 28 L29 33 L38 23" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      </g>
      {/* réceptionniste avec casque */}
      <Bot
        x={196}
        y={176}
        s={0.92}
        face="happy"
        armL="hold"
        bob
        front={
          <g>
            <path d="M-26 -60 Q-26 -96 0 -96 Q26 -96 26 -60" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <rect x={-32} y={-66} width={12} height={20} rx={5} fill={YELLOW} stroke={INK} strokeWidth={2.6} />
            <rect x={20} y={-66} width={12} height={20} rx={5} fill={YELLOW} stroke={INK} strokeWidth={2.6} />
            <path d="M-26 -48 Q-24 -32 -8 -32" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
            <circle cx={-6} cy={-32} r={3.6} fill={INK} />
          </g>
        }
      />
      <g className="float">
        <Star x={56} y={70} r={7} />
      </g>
      <g className="float" style={{ animationDelay: "-1.3s" }}>
        <Star x={362} y={36} r={5} fill={WHITE} />
      </g>
    </>
  );
}

/* ── Agence Mooo ──────────────────────────────────────────────── */
function Agency() {
  return (
    <>
      <Ground y={226} />
      {/* pile de sites générés */}
      {[0, 1, 2].map((i) => (
        <Browser key={i} x={150 + i * 26} y={22 + i * 22} w={170} h={118} fill={i === 2 ? WHITE : SHEET}>
          {i === 2 && (
            <>
              <rect x={12} y={32} width={146} height={42} rx={5} fill="url(#hatch-light)" stroke={INK} strokeWidth={2} />
              <rect x={22} y={44} width={70} height={9} rx={4} fill={INK} />
              <rect x={22} y={58} width={40} height={9} rx={4} fill={YELLOW} stroke={INK} strokeWidth={1.6} />
              <Lines x={12} y={86} widths={[60, 44]} gap={10} />
              <Lines x={86} y={86} widths={[60, 50]} gap={10} />
            </>
          )}
        </Browser>
      ))}
      {/* compteur */}
      <g transform="translate(300 18) rotate(6)">
        <rect width={80} height={30} rx={9} fill={INK} />
        <text x={40} y={20} textAnchor="middle" fontFamily={DISPLAY} fontWeight={900} fontSize={13} fill={WHITE}>250+ sites</text>
      </g>
      {/* email qui part */}
      <g transform="translate(66 52) rotate(-10)">
        <g className="float">
          <rect width={70} height={46} rx={5} fill={WHITE} {...S} />
          <path d="M2 4 L35 26 L68 4" fill="none" {...S} strokeWidth={2.6} />
          <circle cx={58} cy={36} r={8} fill={YELLOW} stroke={INK} strokeWidth={2.2} />
        </g>
      </g>
      <path d="M140 92 Q122 112 104 108" fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="4 6" strokeLinecap="round" />
      {/* liste de leads */}
      <Sheet x={36} y={140} w={56} h={70} rot={-6}>
        <Lines x={10} y={16} widths={[34, 28, 36, 22]} gap={12} sw={2.6} opacity={0.3} />
      </Sheet>
      <Bot x={128} y={226} s={0.82} fill={YELLOW} face="happy" armR="point" look={0.5} bob />
    </>
  );
}

const MAP: Record<IllustrationId, () => React.JSX.Element> = {
  goreview: GoReview,
  wasender: WaSender,
  aurora: Aurora,
  agency: Agency,
  crawler: Crawler,
  globe: Globe,
  agent: Agent,
  inventory: Inventory,
  hexgrid: HexGrid,
  apifinder: ApiFinder,
  stockx: StockX,
  stage: Stage,
  convention: Convention,
};

export default function Illustration({ id, label }: { id: IllustrationId; label: string }) {
  const C = MAP[id];
  return (
    <svg viewBox="0 0 400 250" className="illus" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width={400} height={250} fill={SHEET} />
      <g filter="url(#ink-wobble-soft)">
        <C />
      </g>
    </svg>
  );
}
