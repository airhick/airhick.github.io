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
].sort((a, b) => {
  const diff = parseInt(b.year) - parseInt(a.year);
  if (diff !== 0) return diff;
  if (a.type === "featured" && b.type === "repo") return -1;
  if (a.type === "repo" && b.type === "featured") return 1;
  return 0;
});

const CARD_WIDTH = 320;
const CARD_GAP = 36;
const CONNECTOR_H = 44;
const DOT_SIZE = 14;
const AUTO_SPEED = 0.4;
const MAX_MOUSE_SPEED = 12;
const DEAD_ZONE = 0.18; // center fraction with no scroll

function mapColor(original: string): string {
  if (original === "#FFE600") return "#F5C07A";
  if (original === "#0A0A0A") return "#132030";
  if (original === "#0057FF") return "#7EC8E3";
  if (original === "#FF2D20") return "#FF9A6C";
  return original;
}

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseVelRef = useRef(0);   // px/frame driven by mouse position
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [selected, setSelected] = useState<Entry | null>(null);

  const updateScales = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const centerX = container.scrollLeft + cw / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      const maxDist = cw * 0.62;
      const proximity = Math.max(0, 1 - dist / maxDist);
      const scale = 0.7 + proximity * 0.3;
      const opacity = 0.28 + proximity * 0.72;
      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.opacity = `${opacity.toFixed(3)}`;
    });
  }, []);

  useEffect(() => { updateScales(); }, [updateScales]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const loop = () => {
      if (!selected) {
        const vel = isHoveringRef.current ? mouseVelRef.current : AUTO_SPEED;
        container.scrollLeft += vel;
        const max = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= max - 1) container.scrollLeft = 0;
        if (container.scrollLeft < 0) container.scrollLeft = max;
        updateScales();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onScroll = () => updateScales();
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, [updateScales, selected]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = scrollRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rel = (e.clientX - rect.left) / rect.width; // 0..1
    const centered = (rel - 0.5) * 2;                 // -1..1
    if (Math.abs(centered) < DEAD_ZONE) {
      mouseVelRef.current = 0;
    } else {
      const sign = centered > 0 ? 1 : -1;
      const mag = (Math.abs(centered) - DEAD_ZONE) / (1 - DEAD_ZONE);
      mouseVelRef.current = sign * mag * MAX_MOUSE_SPEED;
    }
  }, []);

  return (
    <section id="projects" style={{ borderBottom: "1px solid #1A2E45", background: "#0B1321" }}>
      {/* Header */}
      <div
        className="px-6 py-10"
        style={{ borderBottom: "1px solid #1A2E45", maxWidth: "1400px", margin: "0 auto" }}
      >
        <span className="nb-tag text-xs mb-3 inline-block">
          TIMELINE
        </span>
        <div className="flex items-end justify-between">
          <h2 className="section-title">PROJETS & REPOS</h2>
          <span className="mono font-bold text-sm hidden md:block" style={{ color: "#4E6B82" }}>
            {allEntries.length} ITEMS — {Math.min(...allEntries.map(e => parseInt(e.year)))}–
            {Math.max(...allEntries.map(e => parseInt(e.year)))}
          </span>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{ overflowX: "auto", overflowY: "visible", scrollbarWidth: "none", msOverflowStyle: "none", cursor: "ew-resize" }}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; mouseVelRef.current = 0; }}
        onMouseMove={handleMouseMove}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "max-content",
            paddingLeft: "28vw",
            paddingRight: "28vw",
            paddingTop: "72px",
          }}
        >
          {/* ── Cards row ── */}
          <div style={{ display: "flex", flexDirection: "row", gap: `${CARD_GAP}px`, alignItems: "flex-end" }}>
            {allEntries.map((entry, i) => {
              const accentColor = mapColor(entry.color);
              return (
                <div
                  key={entry.id + i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => setSelected(entry)}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    flexShrink: 0,
                    border: "1px solid #1A2E45",
                    background: "#0E1B2E",
                    boxShadow: `4px 4px 0px rgba(255,154,108,0.12)`,
                    cursor: "pointer",
                    transition: "transform 0.09s linear, opacity 0.09s linear",
                    transformOrigin: "bottom center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Color stripe */}
                  <div style={{ height: "4px", background: accentColor, opacity: 0.9 }} />

                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "150px",
                      background: accentColor + "22",
                      borderBottom: "1px solid #1A2E45",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      sizes={`${CARD_WIDTH}px`}
                      className="object-cover"
                      style={{ opacity: 0.7 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* Dark overlay on image */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(11,19,33,0.35)" }} />

                    <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 4 }}>
                      <span
                        className="mono font-bold"
                        style={{
                          fontSize: "10px",
                          padding: "2px 6px",
                          background: "rgba(11,19,33,0.85)",
                          color: "#F5C07A",
                          border: "1px solid rgba(245,192,122,0.3)",
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
                            background: "rgba(255,154,108,0.15)",
                            color: "#FF9A6C",
                            border: "1px solid rgba(255,154,108,0.3)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          FEATURED
                        </span>
                      )}
                    </div>
                    {entry.isPrivate && (
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <Lock size={14} color="#4E6B82" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        fontFamily: "var(--font-mono)",
                        color: "#4E6B82",
                        textTransform: "uppercase",
                      }}
                    >
                      {entry.category}
                    </span>

                    <h3
                      style={{
                        fontWeight: 900,
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.15,
                        color: "#E6D2BE",
                      }}
                    >
                      {entry.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "11px",
                        color: "#8A9BAE",
                        lineHeight: 1.65,
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {entry.description}
                    </p>

                    {/* Stack chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto", paddingTop: "4px" }}>
                      {entry.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: "9px",
                            padding: "2px 5px",
                            border: "1px solid #1A2E45",
                            fontFamily: "var(--font-mono)",
                            background: "rgba(126,200,227,0.06)",
                            color: "#7EC8E3",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                      {entry.stack.length > 4 && (
                        <span
                          style={{
                            fontSize: "9px",
                            padding: "2px 5px",
                            border: "1px solid #1A2E45",
                            color: "#4E6B82",
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
                        borderTop: "1px solid #1A2E45",
                        paddingTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#FF9A6C" }}>
                        Voir le détail →
                      </span>
                      {entry.github && (
                        <a
                          href={entry.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#4E6B82" }}
                        >
                          <GitBranch size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Connectors ── */}
          <div style={{ display: "flex", flexDirection: "row", gap: `${CARD_GAP}px` }}>
            {allEntries.map((_, i) => (
              <div
                key={i}
                style={{ width: `${CARD_WIDTH}px`, flexShrink: 0, display: "flex", justifyContent: "center" }}
              >
                <div style={{ width: "1px", height: `${CONNECTOR_H}px`, background: "linear-gradient(to bottom, #1A2E45, rgba(255,154,108,0.4))" }} />
              </div>
            ))}
          </div>

          {/* ── Timeline rail ── */}
          <div style={{ display: "flex", flexDirection: "row", gap: `${CARD_GAP}px`, position: "relative" }}>
            {/* Horizontal line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${DOT_SIZE / 2 - 1}px`,
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(255,154,108,0.5) 5%, rgba(255,154,108,0.5) 95%, transparent)",
                zIndex: 0,
              }}
            />

            {allEntries.map((entry, i) => (
              <div
                key={i}
                style={{
                  width: `${CARD_WIDTH}px`,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "32px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: `${DOT_SIZE}px`,
                    height: `${DOT_SIZE}px`,
                    background: entry.type === "featured" ? "#FF9A6C" : "#132030",
                    border: `1px solid ${entry.type === "featured" ? "#FF9A6C" : "rgba(255,154,108,0.3)"}`,
                    flexShrink: 0,
                    boxShadow: entry.type === "featured" ? "0 0 10px rgba(255,154,108,0.5)" : "none",
                  }}
                />
                <span
                  className="mono font-black"
                  style={{ fontSize: "10px", color: "#F5C07A", marginTop: "8px", letterSpacing: "0.1em" }}
                >
                  {entry.year}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    color: "#4E6B82",
                    fontFamily: "var(--font-mono)",
                    textAlign: "center",
                    marginTop: "3px",
                    letterSpacing: "0.03em",
                    maxWidth: `${CARD_WIDTH - 8}px`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {entry.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(11,19,33,0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#0E1B2E",
              border: "1px solid rgba(255,154,108,0.3)",
              boxShadow: "0 0 60px rgba(255,154,108,0.12), 8px 8px 0 rgba(255,154,108,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/7",
                background: mapColor(selected.color) + "22",
                borderBottom: "1px solid #1A2E45",
                overflow: "hidden",
              }}
            >
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="680px"
                className="object-cover"
                style={{ opacity: 0.6 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,27,46,0.8), transparent)" }} />

              <button
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  background: "rgba(11,19,33,0.85)",
                  border: "1px solid #1A2E45",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#E6D2BE",
                }}
                onClick={() => setSelected(null)}
              >
                <X size={16} />
              </button>
              <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                <span
                  className="mono font-bold"
                  style={{ fontSize: "10px", padding: "3px 8px", background: "rgba(255,154,108,0.15)", color: "#FF9A6C", border: "1px solid rgba(255,154,108,0.3)" }}
                >
                  {selected.category}
                </span>
                <span
                  className="mono font-bold"
                  style={{ fontSize: "10px", padding: "3px 8px", background: "rgba(245,192,122,0.1)", color: "#F5C07A", border: "1px solid rgba(245,192,122,0.25)" }}
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
                  color: "#E6D2BE",
                }}
              >
                {selected.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {selected.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: "13.5px", lineHeight: 1.8, color: "#8A9BAE" }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Stack */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  className="mono font-black"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #1A2E45",
                    paddingBottom: "6px",
                    marginBottom: "10px",
                    color: "#4E6B82",
                  }}
                >
                  Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selected.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "10px",
                        padding: "4px 10px",
                        background: "rgba(126,200,227,0.08)",
                        border: "1px solid rgba(126,200,227,0.2)",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        color: "#7EC8E3",
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
                    style={{ padding: "10px 18px", fontSize: "12px", background: "rgba(14,27,46,0.8)", display: "flex", alignItems: "center", gap: 6, color: "#E6D2BE" }}
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
                    style={{ padding: "10px 18px", fontSize: "12px", background: "#FF9A6C", color: "#0B1321", border: "1px solid #FF9A6C", display: "flex", alignItems: "center", gap: 6 }}
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
