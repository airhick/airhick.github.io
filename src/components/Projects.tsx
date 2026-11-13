"use client";

import { useCallback, useMemo, useState } from "react";
import { projects } from "@/lib/content";
import Illustration from "./illustrations/Illustrations";
import Modal, { type ModalItem } from "./Modal";
import { Figures, ShotFrame } from "./Preview";
import SectionHead from "./SectionHead";
import { ArrowRight, Github, ArrowUpRight } from "./icons";

const TILT = [0, -0.9, 0.7, -0.5, 0.9, -0.7, 0.5, -1, 0.8, -0.6];

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);

  const items: ModalItem[] = useMemo(
    () =>
      projects.map((p) => ({
        key: p.id,
        title: p.title,
        meta: [p.category, p.year],
        story: p.story,
        stack: p.stack,
        tags: p.tags,
        github: p.github,
        link: p.link,
        shots: p.shots,
        figures: p.figures,
        visual: <Illustration id={p.illustration} label={p.title} />,
      })),
    [],
  );

  const close = useCallback(() => setOpen(null), []);
  const total = String(projects.length).padStart(2, "0");

  return (
    <section className="section" id="projets" aria-labelledby="projets-title">
      <div className="wrap">
        <SectionHead
          id="projets-title"
          num="01"
          kicker="Projets phares"
          title={
            <>
              Projets
              <br />
              sélectionnés
            </>
          }
          aside="Des produits en ligne, avec de vrais utilisateurs."
        />

        <div className="projects">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`card pcard reveal${i === 0 ? " pcard--wide" : ""}`}
              style={{ "--tilt": `${TILT[i % TILT.length]}deg`, "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) return;
                setOpen(i);
              }}
            >
              <div className={`frame${p.shots ? " frame--shot" : ""}`}>
                {p.shots ? (
                  <ShotFrame shot={p.shots[0]} live sizes={i === 0 ? "(max-width: 860px) 100vw, 660px" : "(max-width: 640px) 100vw, 400px"} />
                ) : (
                  <Illustration id={p.illustration} label={`Illustration : ${p.title}`} />
                )}
              </div>
              <div className="pcard__body">
                <div className="pcard__meta">
                  <span className="kicker">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                  <span style={{ display: "flex", gap: 6 }}>
                    <span className="chip">{p.category}</span>
                    <span className="chip chip--dark">{p.year}</span>
                  </span>
                </div>
                <h3 className="display pcard__title">{p.title}</h3>
                <p className="pcard__desc">{p.description}</p>
                {p.figures && <Figures items={p.figures} />}
                <div className="pcard__stack">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="chip chip--ghost">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 4 && <span className="chip chip--ghost">+{p.stack.length - 4}</span>}
                </div>
                <div className="pcard__actions">
                  <button type="button" className="btn btn--ink btn--sm" onClick={() => setOpen(i)}>
                    Voir le détail
                    <ArrowRight size={16} />
                  </button>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="btn btn--icon btn--sm" aria-label={`Site de ${p.title}`}>
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn--icon btn--sm" aria-label={`${p.title} sur GitHub`}>
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {open !== null && <Modal items={items} index={open} label="Projet" onClose={close} onIndex={setOpen} />}
    </section>
  );
}
