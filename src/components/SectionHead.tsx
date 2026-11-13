import type { ReactNode } from "react";

export default function SectionHead({
  num,
  kicker,
  title,
  aside,
  id,
}: {
  num: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  id: string;
}) {
  return (
    <div className="section__head">
      <div className="reveal">
        <p className="kicker section__num">
          <b>{num}</b>
          {kicker}
        </p>
        <h2 id={id} className="display section__title wobble">
          {title}
        </h2>
      </div>
      {aside && (
        <div className="section__aside reveal" style={{ "--d": "140ms" } as React.CSSProperties}>
          <span className="bubble bubble--big bubble--left">{aside}</span>
        </div>
      )}
    </div>
  );
}
