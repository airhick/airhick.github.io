"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, Github, Lock } from "./icons";
import { Figures, Gallery } from "./Preview";
import type { Figure, Shot } from "@/lib/content";

export interface ModalItem {
  key: string;
  title: string;
  meta: string[];
  story: string[];
  stack: string[];
  tags?: string[];
  github?: string;
  link?: string;
  isPrivate?: boolean;
  visual: ReactNode;
  iconVisual?: boolean;
  shots?: Shot[];
  figures?: Figure[];
}

interface Props {
  items: ModalItem[];
  index: number;
  label: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Modal({ items, index, label, onClose, onIndex }: Props) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const last = items.length - 1;

  // focus + verrouillage du scroll
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const sb = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (sb > 0) document.body.style.paddingRight = `${sb}px`;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = "";
      document.body.style.paddingRight = "";
      prev?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && index < last) onIndex(index + 1);
      else if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const end = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          end.focus();
        } else if (!e.shiftKey && document.activeElement === end) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, last, onClose, onIndex]);

  return createPortal(
    <div className="modal-root">
      <div className="modal-backdrop" onClick={onClose} />
      <div ref={dialogRef} className="card modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} type="button" className="btn btn--icon btn--sm modal__close" onClick={onClose} aria-label="Fermer">
          <Close size={18} />
        </button>
        <div ref={scrollRef} className="modal__scroll">
          <div key={item.key} className="modal__swap">
          {item.shots ? (
            <Gallery shots={item.shots} />
          ) : (
            <div className={`frame${item.iconVisual ? " modal__frame--icon" : ""}`}>{item.visual}</div>
          )}
          <p className="kicker modal__step">
            {label} · {index + 1} sur {items.length}
          </p>
          <h2 id="modal-title" className="display modal__title">
            {item.title}
          </h2>
          <div className="modal__chips">
            {item.meta.map((m, i) => (
              <span key={m} className={`chip${i === 0 ? " chip--dark" : ""}`}>
                {m}
              </span>
            ))}
            {item.isPrivate && (
              <span className="chip chip--yellow">
                <Lock size={13} /> Repo privé
              </span>
            )}
          </div>
          {item.figures && <Figures items={item.figures} className="figs--modal" />}
          <div className="modal__story">
            {item.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="kicker modal__label">Stack</p>
          <div className="modal__chips" style={{ marginTop: 0 }}>
            {item.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="modal__chips">
              {item.tags.map((t) => (
                <span key={t} className="chip chip--ghost">
                  #{t}
                </span>
              ))}
            </div>
          )}
          </div>
        </div>
        <div className="modal__foot">
          <button type="button" className="btn btn--sm" onClick={() => onIndex(index - 1)} disabled={index === 0} aria-label="Précédent">
            <ArrowLeft size={16} />
            <span className="hide-xs">Préc.</span>
          </button>
          {item.github && !item.isPrivate && (
            <a href={item.github} target="_blank" rel="noreferrer" className="btn btn--sm">
              <Github size={16} />
              GitHub
            </a>
          )}
          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer" className="btn btn--sm">
              Voir le site
              <ArrowUpRight size={15} />
            </a>
          )}
          <button type="button" className="btn btn--ink btn--sm" onClick={() => onIndex(index + 1)} disabled={index === last} aria-label="Suivant">
            <span className="hide-xs">Suivant</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
