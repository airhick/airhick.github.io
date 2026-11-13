"use client";

import { useEffect, useRef, useState } from "react";
import { hero, profile } from "@/lib/content";
import { ArrowDown, Mail } from "../icons";
import type { CrowdScene } from "./CrowdScene";
import CrowdFallback from "./CrowdFallback";

const LIMIT = 54;

/* légères irrégularités, comme du lettrage découpé à la main */
const TITLE = [
  { word: "ERIC", rot: [-3.5, 2, -1.5, 3], dy: [0.01, -0.025, 0.015, -0.01] },
  { word: "AELLEN", rot: [2.5, -2, 1.5, -3, 2, -1.5], dy: [-0.015, 0.02, -0.01, 0.015, -0.02, 0.01] },
];

function Antenna() {
  return (
    <svg className="hero__antenna" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 40 Q23 26 20 16" stroke="#14140f" strokeWidth={5.5} strokeLinecap="round" fill="none" />
      <circle cx={20} cy={11} r={7.5} fill="#f8e08a" stroke="#14140f" strokeWidth={4.5} />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const crowd = useRef<CrowdScene | null>(null);
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    let disposed = false;
    let scene: CrowdScene | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 860px)").matches;
    const initial = small ? 18 : 30;

    import("./CrowdScene").then(({ CrowdScene }) => {
      if (disposed || !sceneRef.current || !bubblesRef.current || !sectionRef.current) return;
      try {
        scene = new CrowdScene({
          container: sceneRef.current,
          bubbles: bubblesRef.current,
          events: sectionRef.current,
          count: initial,
          limit: LIMIT,
          reducedMotion: reduced,
          onReady: () => requestAnimationFrame(() => setReady(true)),
        });
        crowd.current = scene;
      } catch {
        setWebgl(false);
      }
    });

    const io = new IntersectionObserver(([e]) => crowd.current?.setActive(e.isIntersecting), { threshold: 0 });
    if (sectionRef.current) io.observe(sectionRef.current);

    return () => {
      disposed = true;
      io.disconnect();
      scene?.dispose();
      crowd.current = null;
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="top" aria-label="Introduction">
      <div ref={sceneRef} className={`hero__scene${ready ? " is-ready" : ""}`} aria-hidden="true" />
      {!webgl && <CrowdFallback />}
      <div ref={bubblesRef} className="hero__bubbles" aria-hidden="true" />
      <div className="hero__veil" />

      <div className="hero__content">
        <p className="kicker hero__kicker">{hero.kicker}</p>
        <h1 className="display hero__title boil" aria-label={profile.name}>
          {TITLE.map(({ word, rot, dy }) => (
            <span className="line" key={word} aria-hidden="true">
              {word.split("").map((ch, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ "--rot": `${rot[i]}deg`, "--dy": `${dy[i]}em` } as React.CSSProperties}
                >
                  {ch}
                  {word === "ERIC" && ch === "I" && <Antenna />}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__lead">
          <span>{hero.lead}</span>
          <span>{hero.leadSecond}</span>
        </p>
        <div className="hero__ctas">
          <a href="#projets" className="btn btn--ink">
            Voir les projets
            <ArrowDown size={18} />
          </a>
          <a href={`mailto:${profile.email}`} className="btn">
            <Mail size={18} />
            Me contacter
          </a>
        </div>
      </div>

      <div className="kicker hero__hint" aria-hidden="true">
        <span className="hint-desk">Survolez la scène · cliquez pour interagir</span>
        <span className="hint-touch">Touchez la scène pour interagir</span>
        <br />
        <span className="hero__scroll">
          <ArrowDown size={16} />
        </span>
      </div>
    </section>
  );
}
