import Bot, { YELLOW } from "../illustrations/Bot";

/* Si WebGL n'est pas disponible : une foule dessinée, immobile. */
const PEOPLE: [number, number, number, Partial<Parameters<typeof Bot>[0]>][] = [
  [90, 210, 0.7, { hat: "beanie" }],
  [210, 330, 0.8, {}],
  [130, 520, 0.9, { shirt: true }],
  [340, 640, 1, { armL: "up" }],
  [1260, 200, 0.7, {}],
  [1120, 360, 0.85, { hat: "cap" }],
  [1330, 480, 0.95, { fill: YELLOW, face: "happy" }],
  [1180, 640, 1.05, { shirt: true }],
  [560, 170, 0.65, {}],
  [900, 150, 0.62, { hat: "beanie" }],
  [470, 760, 1.1, {}],
  [1000, 770, 1.1, { armR: "wave" }],
];

export default function CrowdFallback() {
  return (
    <svg className="hero__fallback" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g filter="url(#ink-wobble-soft)">
        {PEOPLE.map(([x, y, s, p], i) => (
          <Bot key={i} x={x} y={y} s={s} {...p} />
        ))}
      </g>
    </svg>
  );
}
