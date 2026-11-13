import Bot, { INK, Star, WHITE, YELLOW } from "./Bot";

const S = { stroke: INK, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* petit diplômé, pour la carte Formation */
export function GradDoodle() {
  return (
    <svg viewBox="0 0 300 130" className="card-doodle illus" aria-hidden="true">
      <g filter="url(#ink-wobble-soft)">
        <path d="M20 124 Q150 128 280 123" fill="none" {...S} strokeWidth={2.4} opacity={0.18} />
        <Bot
          x={150}
          y={124}
          s={0.8}
          armL="hold"
          armR="up"
          face="happy"
          antenna={false}
          bob
          front={
            <g>
              {/* mortier */}
              <path d="M-30 -104 L0 -116 L30 -104 L0 -92 Z" fill={INK} />
              <path d="M-14 -100 V-92 Q0 -86 14 -92 V-100" fill={INK} />
              <path d="M24 -106 Q30 -96 28 -86" fill="none" stroke={INK} strokeWidth={2.4} />
              <circle cx={28} cy={-84} r={3.4} fill={YELLOW} stroke={INK} strokeWidth={2} />
              {/* diplôme */}
              <g transform="translate(-14 -44) rotate(-20)">
                <rect x={-20} y={-6} width={40} height={12} rx={6} fill={WHITE} stroke={INK} strokeWidth={2.6} />
                <rect x={-4} y={-6.5} width={7} height={13} fill={YELLOW} stroke={INK} strokeWidth={2} />
              </g>
            </g>
          }
        />
        <g className="float">
          <Star x={86} y={50} r={8} />
        </g>
        <g className="float" style={{ animationDelay: "-1.2s" }}>
          <Star x={222} y={34} r={6} fill={WHITE} />
        </g>
      </g>
    </svg>
  );
}

/* petit mécano, pour la carte Stack */
export function ToolDoodle() {
  return (
    <svg viewBox="0 0 300 130" className="card-doodle illus" aria-hidden="true">
      <g filter="url(#ink-wobble-soft)">
        <path d="M20 124 Q150 128 280 123" fill="none" {...S} strokeWidth={2.4} opacity={0.18} />
        {/* caisse à outils */}
        <g transform="translate(176 92)">
          <path d="M14 0 V-10 Q14 -16 20 -16 H40 Q46 -16 46 -10 V0" fill="none" stroke={INK} strokeWidth={3.4} />
          <rect x={0} y={0} width={60} height={32} rx={4} fill={WHITE} stroke={INK} strokeWidth={3} />
          <rect x={0} y={0} width={60} height={10} fill={YELLOW} stroke={INK} strokeWidth={3} />
          <rect x={25} y={6} width={10} height={8} rx={2} fill={INK} />
        </g>
        <Bot
          x={118}
          y={124}
          s={0.8}
          armR="raise"
          hat="cap"
          bob
          front={
            <g transform="translate(36 -78) rotate(30)">
              <path d="M-3 0 V26" stroke={INK} strokeWidth={9} strokeLinecap="round" />
              <path d="M-3 0 V26" stroke={WHITE} strokeWidth={3.6} strokeLinecap="round" />
              <path d="M-11 -4 Q-11 -14 -3 -14 Q5 -14 5 -4 L1 -2 V-9 H-7 V-2 Z" fill={WHITE} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
            </g>
          }
        />
        <g className="spin" style={{ transformOrigin: "50% 50%" }}>
          <circle cx={64} cy={52} r={10} fill="none" stroke={INK} strokeWidth={6} strokeDasharray="4.5 3.4" />
          <circle cx={64} cy={52} r={7} fill={WHITE} stroke={INK} strokeWidth={2.6} />
          <circle cx={64} cy={52} r={2.4} fill={INK} />
        </g>
      </g>
    </svg>
  );
}
