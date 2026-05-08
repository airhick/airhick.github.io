"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { GitBranch, ExternalLink, X, Lock } from "lucide-react";
import { projects, githubRepos, type Project, type GithubRepo } from "@/lib/projects";

interface Entry {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  longDescription: string;
  stack: string[];
  image: string;
  color: string;
  github?: string;
  link?: string;
  isPrivate?: boolean;
  type: "featured" | "repo";
}

const allEntries: Entry[] = [
  ...projects.map((p: Project): Entry => ({
    id: p.id,
    title: p.title,
    year: p.year,
    category: p.category,
    description: p.description,
    longDescription: p.longDescription,
    stack: p.stack,
    image: p.image,
    color: p.color,
    github: p.github,
    link: p.link,
    isPrivate: false,
    type: "featured",
  })),
  ...githubRepos.map((r: GithubRepo): Entry => ({
    id: r.name,
    title: r.name,
    year: r.year,
    category: r.category,
    description: r.description,
    longDescription: r.longDescription,
    stack: r.stack,
    image: r.image,
    color: r.color,
    github: r.url,
    isPrivate: r.isPrivate,
    type: "repo",
  })),
].sort((a, b) => parseInt(b.year) - parseInt(a.year));

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [selected, setSelected] = useState<Entry | null>(null);

  const updateScales = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const centerX = container.scrollLeft + cw / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardLeft = card.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      const maxDist = cw * 0.7;
      const proximity = Math.max(0, 1 - dist / maxDist);
      const scale = 0.78 + proximity * 0.22;
      const opacity = 0.35 + proximity * 0.65;
      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.opacity = `${opacity.toFixed(3)}`;
    });
  }, []);

  useEffect(() => {
    updateScales();
  }, [updateScales]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 0.4;
    const animate = () => {
      if (!pausedRef.current && !selected) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 2) {
          container.scrollLeft = 0;
        }
        updateScales();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onScroll = () => updateScales();
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, [updateScales, selected]);

  return (
    <section id="projects" style={{ borderBottom: "3px solid #0A0A0A", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        className="px-6 py-10"
        style={{ borderBottom: "3px solid #0A0A0A", maxWidth: "1400px", margin: "0 auto" }}
      >
        <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600" }}>
          TIMELINE
        </span>
        <div className="flex items-end justify-between">
          <h2 className="section-title">PROJETS & REPOS</h2>
          <span className="mono font-bold text-sm hidden md:block" style={{ color: "#888" }}>
            {allEntries.length} ITEMS — {Math.min(...allEntries.map(e => parseInt(e.year)))}–
            {Math.max(...allEntries.map(e => parseInt(e.year)))}
          </span>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingTop: "60px", paddingBottom: "60px" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "28px",
            paddingLeft: "30vw",
            paddingRight: "30vw",
            width: "max-content",
          }}
        >
          {allEntries.map((entry, i) => (
            <div
              key={entry.id + i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => setSelected(entry)}
              style={{
                width: "300px",
                flexShrink: 0,
                border: "3px solid #0A0A0A",
                background: "#fff",
                boxShadow: "6px 6px 0 #0A0A0A",
                cursor: "pointer",
                transition: "transform 0.08s linear, opacity 0.08s linear",
                transformOrigin: "center center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Color top stripe */}
              <div
                style={{
                  height: "6px",
                  background: entry.color === "#FFE600" ? "#FFE600" : entry.color,
                  borderBottom: "3px solid #0A0A0A",
                }}
              />

              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "160px",
                  background: entry.color,
                  borderBottom: "3px solid #0A0A0A",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="300px"
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Badges */}
                <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4 }}>
                  <span
                    className="mono font-bold"
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      background: "#0A0A0A",
                      color: "#FFE600",
                      border: "2px solid #0A0A0A",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {entry.year}
                  </span>
                  {entry.type === "featured" && (
                    <span
                      className="mono font-bold"
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        background: "#FFE600",
                        color: "#0A0A0A",
                        border: "2px solid #0A0A0A",
                        letterSpacing: "0.06em",
                      }}
                    >
                      FEATURED
                    </span>
                  )}
                </div>
                {entry.isPrivate && (
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <Lock size={14} color="#fff" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-mono)",
                    color: "#888",
                    textTransform: "uppercase",
                  }}
                >
                  {entry.category}
                </span>

                <h3
                  style={{
                    fontWeight: 900,
                    fontSize: "15px",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    color: "#0A0A0A",
                  }}
                >
                  {entry.title}
                </h3>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    lineHeight: 1.55,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {entry.description}
                </p>

                {/* Stack chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto" }}>
                  {entry.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        border: "1.5px solid #0A0A0A",
                        fontFamily: "var(--font-mono)",
                        background: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {entry.stack.length > 4 && (
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        border: "1.5px solid #ccc",
                        color: "#aaa",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      +{entry.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div
                  style={{
                    borderTop: "2px solid #0A0A0A",
                    paddingTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#0A0A0A",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Voir le détail →
                  </span>
                  {entry.github && (
                    <a
                      href={entry.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "#888" }}
                    >
                      <GitBranch size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Year ruler */}
      <div
        style={{
          borderTop: "3px solid #0A0A0A",
          overflowX: "hidden",
          background: "#0A0A0A",
          padding: "0 30vw",
          display: "flex",
          gap: "28px",
          width: "100%",
        }}
      >
        {allEntries.map((entry, i) => (
          <div
            key={i}
            style={{
              width: "300px",
              flexShrink: 0,
              textAlign: "center",
              padding: "6px 0",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "10px",
                color: "#FFE600",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {entry.year}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10,10,10,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#fff",
              border: "3px solid #FFE600",
              boxShadow: "12px 12px 0 #FFE600",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/7",
                background: selected.color,
                borderBottom: "3px solid #0A0A0A",
                overflow: "hidden",
              }}
            >
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="680px"
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  background: "#fff",
                  border: "3px solid #0A0A0A",
                  boxShadow: "3px 3px 0 #0A0A0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelected(null)}
              >
                <X size={16} />
              </button>
              <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                <span
                  className="mono font-bold"
                  style={{ fontSize: "11px", padding: "3px 8px", background: "#FFE600", border: "2px solid #0A0A0A" }}
                >
                  {selected.category}
                </span>
                <span
                  className="mono font-bold"
                  style={{ fontSize: "11px", padding: "3px 8px", background: "#0A0A0A", color: "#FFE600", border: "2px solid #0A0A0A" }}
                >
                  {selected.year}
                </span>
              </div>
            </div>

            {/* Modal content */}
            <div style={{ padding: "28px" }}>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                  lineHeight: 1,
                }}
              >
                {selected.title}
              </h2>

              {/* Long description paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {selected.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#333" }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Stack */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  className="mono font-black"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #0A0A0A",
                    paddingBottom: "6px",
                    marginBottom: "10px",
                  }}
                >
                  Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selected.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        background: "#FFE600",
                        border: "2px solid #0A0A0A",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "10px" }}>
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn"
                    style={{ padding: "10px 18px", fontSize: "13px", background: "#fff", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <GitBranch size={14} />
                    GitHub
                  </a>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn"
                    style={{ padding: "10px 18px", fontSize: "13px", background: "#FFE600", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <ExternalLink size={14} />
                    Voir le projet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
