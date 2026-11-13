"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { ArrowRight, Close, Mail, Menu } from "./icons";

const LINKS = [
  { id: "projets", label: "Projets" },
  { id: "archive", label: "Archive" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

export function BotHead({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 11 Q21 7 20 4" stroke="#14140f" strokeWidth={2.6} strokeLinecap="round" fill="none" />
      <circle cx={20} cy={4} r={3.2} fill="#f8e08a" stroke="#14140f" strokeWidth={2.4} />
      <circle cx={20} cy={24} r={13.5} fill="#fff" stroke="#14140f" strokeWidth={3} />
      <circle cx={15.5} cy={23.5} r={2.1} fill="#14140f" />
      <circle cx={24.5} cy={23.5} r={2.1} fill="#14140f" />
      <path d="M16.5 29 q3.5 2.6 7 0" stroke="#14140f" strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const hero = document.getElementById("top");
    if (hero) io.observe(hero);
    for (const l of LINKS) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled || open ? " is-scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Navigation principale">
        <a href="#top" className="nav__logo" onClick={() => setOpen(false)}>
          <BotHead />
          <span>{profile.name}</span>
        </a>
        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={`nav__link${active === l.id ? " is-active" : ""}`} aria-current={active === l.id ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ marginLeft: 8 }}>
            <a href={`mailto:${profile.email}`} className="btn btn--ink btn--sm">
              <Mail size={16} />
              Me contacter
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn--icon btn--sm nav__burger"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div id="nav-sheet" className="card nav__sheet">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
              {l.label}
              <ArrowRight size={18} />
            </a>
          ))}
          <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
            Me contacter
            <Mail size={18} />
          </a>
        </div>
      )}
    </header>
  );
}
