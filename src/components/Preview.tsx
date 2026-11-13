"use client";

import Image from "next/image";
import { useState } from "react";
import type { Figure, Shot } from "@/lib/content";

/* une capture réelle, présentée dans une fenêtre de navigateur dessinée */
export function ShotFrame({ shot, live = false, sizes }: { shot: Shot; live?: boolean; sizes: string }) {
  return (
    <div className="shot">
      <div className="shot__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="shot__url">{shot.url}</span>
      </div>
      <div className="shot__img">
        <Image src={shot.src} alt={shot.alt} width={1440} height={900} sizes={sizes} />
      </div>
      {live && (
        <span className="shot__live" aria-hidden="true">
          <b /> En ligne
        </span>
      )}
    </div>
  );
}

/* chiffres clés, lisibles en un coup d'œil */
export function Figures({ items, className = "" }: { items: Figure[]; className?: string }) {
  return (
    <dl className={`figs ${className}`}>
      {items.map((f, i) => (
        <div key={f.label} className={`fig${i === 0 ? " fig--hi" : ""}`}>
          <dt>{f.label}</dt>
          <dd className="display">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* galerie de la fiche projet : grande capture + miniatures */
export function Gallery({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const cur = shots[Math.min(i, shots.length - 1)];
  return (
    <div className="gallery">
      <div className="frame gallery__main">
        <ShotFrame shot={cur} live sizes="(max-width: 700px) 100vw, 640px" />
      </div>
      {shots.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Captures">
          {shots.map((s, k) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={`gallery__thumb${k === i ? " is-on" : ""}`}
              onClick={() => setI(k)}
            >
              <Image src={s.src} alt="" width={1440} height={900} sizes="160px" />
              <span>{s.url}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
