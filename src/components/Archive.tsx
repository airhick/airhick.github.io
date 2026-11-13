"use client";

import { useCallback, useMemo, useState } from "react";
import { kindLabel, profile, repoFilters, repos } from "@/lib/content";
import CategoryIcon, { IconScene } from "./illustrations/CategoryIcon";
import Bot from "./illustrations/Bot";
import Modal, { type ModalItem } from "./Modal";
import SectionHead from "./SectionHead";
import { ArrowUpRight, Github, Lock } from "./icons";

const TILT = [-1.2, 0.8, -0.4, 1.1, -0.9, 0.5, 1.3, -0.6];

function RepoVisual({ kind, name }: { kind: (typeof repos)[number]["kind"]; name: string }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <IconScene kind={kind} label={`${kindLabel[kind]} : ${name}`} />
      <svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
        <g filter="url(#ink-wobble-soft)">
          <Bot x={86} y={160} s={0.78} armR="point" look={0.7} bob />
          <Bot x={322} y={160} s={0.66} armL="up" face="happy" hat="beanie" bob />
        </g>
      </svg>
    </div>
  );
}

export default function Archive() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => {
    const f = repoFilters.find((x) => x.id === filter);
    const l = !f || f.kinds.length === 0 ? repos : repos.filter((r) => f.kinds.includes(r.kind));
    return [...l].sort((a, b) => Number(b.year) - Number(a.year));
  }, [filter]);

  const items: ModalItem[] = useMemo(
    () =>
      list.map((r) => ({
        key: r.name,
        title: r.name,
        meta: [kindLabel[r.kind], r.year, r.language !== "—" ? r.language : "Web"],
        story: [r.story],
        stack: r.stack,
        github: r.url,
        isPrivate: r.isPrivate,
        visual: <RepoVisual kind={r.kind} name={r.name} />,
        iconVisual: true,
      })),
    [list],
  );

  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="section" id="archive" aria-labelledby="archive-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <hr className="rule" style={{ marginBottom: "clamp(80px, 10vw, 130px)" }} />
        <SectionHead
          id="archive-title"
          num="02"
          kicker="Archive"
          title={
            <>
              Autres
              <br />
              réalisations
            </>
          }
          aside={`${repos.length} projets techniques : outils, scrapers et expérimentations.`}
        />

        <div className="filters reveal" role="toolbar" aria-label="Filtrer les repos">
          {repoFilters.map((f) => {
            const n = f.kinds.length === 0 ? repos.length : repos.filter((r) => f.kinds.includes(r.kind)).length;
            return (
              <button key={f.id} type="button" className="filter" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
                <small>{n}</small>
              </button>
            );
          })}
        </div>

        <div className="repos" key={filter}>
          {list.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className="card rcard"
              style={{ "--tilt": `${TILT[i % TILT.length]}deg`, "--i": i } as React.CSSProperties}
              onClick={() => setOpen(i)}
              aria-label={`${r.name}, ${kindLabel[r.kind]}, ${r.year}. Ouvrir la fiche`}
            >
              <span className="rcard__top">
                <span className="rcard__icon">
                  <CategoryIcon kind={r.kind} />
                </span>
                <span className="kicker" style={{ fontSize: 10, paddingTop: 4 }}>
                  {kindLabel[r.kind]}
                </span>
              </span>
              <span className="rcard__name">{r.name}</span>
              <span className="rcard__desc">{r.description}</span>
              <span className="rcard__foot">
                <span>
                  <i className="lang-dot" />
                  {r.language !== "—" ? r.language : "Web"}
                </span>
                <span>
                  {r.isPrivate && <Lock size={13} />}
                  {r.year}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="archive__more reveal">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn">
            <Github size={18} />
            Tout voir sur GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      {open !== null && <Modal items={items} index={open} label="Repo" onClose={close} onIndex={setOpen} />}
    </section>
  );
}
