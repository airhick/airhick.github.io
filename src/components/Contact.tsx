"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import Bot, { INK, WHITE, YELLOW } from "./illustrations/Bot";
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Pin } from "./icons";

function Crowd() {
  return (
    <svg viewBox="0 0 760 170" aria-hidden="true">
      <g filter="url(#ink-wobble-soft)">
        <Bot x={70} y={168} s={0.8} hat="beanie" look={0.5} />
        <Bot x={150} y={168} s={0.95} armR="wave" look={0.3} />
        <Bot x={240} y={168} s={0.7} shirt className="hop" />
        <Bot
          x={340}
          y={168}
          s={1.05}
          fill={YELLOW}
          face="happy"
          armL="up"
          armR="up"
          front={
            <g>
              <path d="M-27 -84 V-120 M27 -84 V-120" stroke={INK} strokeWidth={4} strokeLinecap="round" />
              <rect x={-74} y={-154} width={148} height={38} rx={8} fill={WHITE} stroke={INK} strokeWidth={3.4} />
              <text x={0} y={-128} textAnchor="middle" fontFamily="Rubik Variable, Rubik, sans-serif" fontWeight={900} fontSize={16} letterSpacing={0.5} fill={INK}>
                À BIENTÔT !
              </text>
            </g>
          }
        />
        <Bot x={440} y={168} s={0.78} hat="cap" armL="wave" look={-0.4} />
        <Bot x={520} y={168} s={0.88} look={-0.6} className="hop" />
        <Bot x={604} y={168} s={0.72} shirt armR="hips" look={-0.5} />
        <Bot x={688} y={168} s={0.84} face="happy" hat="beanie" armL="up" />
      </g>
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <hr className="rule" style={{ marginBottom: "clamp(80px, 10vw, 130px)" }} />
        <p className="kicker section__num reveal" style={{ justifyContent: "center" }}>
          <b>04</b>
          Contact
        </p>
        <h2 id="contact-title" className="display contact__title wobble reveal">
          Travaillons
          <br />
          ensemble
        </h2>
        <p className="contact__lead reveal">Un poste, un partenariat ou un projet à lancer ? Écrivez-moi.</p>

        <div className="contact__mail reveal">
          <a href={`mailto:${profile.email}`} className="btn btn--ink btn--xl">
            <Mail size={26} />
            {profile.email}
          </a>
          <span className="copy-wrap">
            {copied && (
              <span className="bubble" role="status">
                Copié
              </span>
            )}
            <button type="button" className="btn btn--icon" onClick={copy} aria-label="Copier l'adresse email" style={{ width: 58, height: 58 }}>
              <Copy size={22} />
            </button>
          </span>
        </div>

        <div className="contact__socials reveal">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn">
            <Github size={18} />
            GitHub
            <ArrowUpRight size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">
            <Linkedin size={18} />
            LinkedIn
            <ArrowUpRight size={16} />
          </a>
        </div>

        <p className="contact__where reveal">
          <Pin size={18} />
          {profile.location}
        </p>

        <div className="contact__crowd">
          <Crowd />
        </div>
      </div>
    </section>
  );
}
