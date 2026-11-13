/**
 * Filtres SVG partagés : contours « tracés à la main ».
 * ink-wobble : déformation fixe. ink-boil-1..3 : même chose avec des graines
 * différentes, alternées en boucle pour l'effet « ligne qui bout » des dessins animés.
 */
export default function InkDefs() {
  const boil = [11, 23, 37];
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id="ink-wobble" x="-4%" y="-8%" width="108%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="1" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="ink-wobble-soft" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {boil.map((seed, i) => (
          <filter key={seed} id={`ink-boil-${i + 1}`} x="-4%" y="-8%" width="108%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="1" seed={seed} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#14140f" strokeWidth="1.6" strokeOpacity="0.55" />
        </pattern>
        <pattern id="hatch-light" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#14140f" strokeWidth="1.2" strokeOpacity="0.28" />
        </pattern>
        <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#14140f" fillOpacity="0.32" />
        </pattern>
      </defs>
    </svg>
  );
}
