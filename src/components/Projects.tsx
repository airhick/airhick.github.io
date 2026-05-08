"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GitBranch, ExternalLink, X } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const project = projects[active];

  const prev = () => setActive((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setActive((i) => (i + 1) % projects.length);

  return (
    <section id="projects" className="py-20 px-6" style={{ borderBottom: "3px solid #0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6" style={{ borderBottom: "3px solid #0A0A0A" }}>
          <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600" }}>
            PORTFOLIO
          </span>
          <div className="flex items-end justify-between">
            <h2 className="section-title">PROJETS</h2>
            <span className="mono font-bold text-sm hidden md:block">{projects.length} PROJETS</span>
          </div>
        </div>

        {/* Timeline track */}
        <div className="mb-10 relative">
          {/* Line */}
          <div
            className="absolute top-5 left-0 right-0 h-0.5"
            style={{ background: "#0A0A0A", height: "3px" }}
          />

          {/* Dots */}
          <div className="flex justify-between relative">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-2 group"
                title={p.title}
              >
                {/* Dot */}
                <div
                  style={{
                    width: i === active ? "20px" : "12px",
                    height: i === active ? "20px" : "12px",
                    background: i === active ? "#FFE600" : "#fff",
                    border: `3px solid #0A0A0A`,
                    boxShadow: i === active ? "3px 3px 0 #0A0A0A" : "2px 2px 0 #0A0A0A",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                />
                {/* Year label */}
                <span
                  className="mono font-black text-xs hidden sm:block"
                  style={{
                    color: i === active ? "#0A0A0A" : "#aaa",
                    fontSize: "10px",
                    transition: "color 0.15s",
                  }}
                >
                  {p.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active project display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16/9",
              border: "3px solid #0A0A0A",
              boxShadow: "8px 8px 0 #0A0A0A",
              background: project.color,
            }}
          >
            <Image
              key={project.id}
              src={project.image}
              alt={project.title}
              fill
              sizes="700px"
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {/* Category */}
            <div className="absolute top-4 left-4">
              <span className="nb-tag text-xs" style={{ background: "#FFE600" }}>
                {project.category}
              </span>
            </div>
            {/* Year */}
            <div className="absolute top-4 right-4">
              <span className="nb-tag text-xs" style={{ background: "#0A0A0A", color: "#FFE600" }}>
                {project.year}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Progress indicator */}
              <p className="mono text-xs font-bold mb-3" style={{ color: "#aaa" }}>
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>

              <h3
                className="font-black uppercase tracking-tight mb-4 leading-none"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                {project.title}
              </h3>

              <p className="text-base leading-relaxed mb-6" style={{ color: "#444" }}>
                {project.description}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="nb-tag text-xs" style={{ background: "#FFE600" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: "3px solid #0A0A0A" }}>
              <div className="flex gap-2">
                <button
                  className="nb-btn px-4 py-2 text-sm bg-white"
                  onClick={() => setModalOpen(true)}
                >
                  En savoir plus
                  <ChevronRight size={14} />
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn p-2 bg-white"
                    title="GitHub"
                  >
                    <GitBranch size={16} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn p-2"
                    style={{ background: "#FFE600" }}
                    title="Voir le projet"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              {/* Nav arrows */}
              <div className="flex gap-2">
                <button
                  className="nb-btn p-2 bg-white"
                  onClick={prev}
                  aria-label="Précédent"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="nb-btn p-2"
                  style={{ background: "#0A0A0A", color: "#FFE600" }}
                  onClick={next}
                  aria-label="Suivant"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mini cards row */}
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="relative overflow-hidden"
              style={{
                aspectRatio: "1/1",
                border: `2px solid ${i === active ? "#FFE600" : "#0A0A0A"}`,
                boxShadow: i === active ? "3px 3px 0 #FFE600" : "2px 2px 0 #0A0A0A",
                background: p.color,
                transition: "all 0.12s ease",
                outline: "none",
              }}
              title={p.title}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="80px"
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {i === active && (
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,230,0,0.3)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,10,0.9)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ border: "3px solid #FFE600", boxShadow: "12px 12px 0 #FFE600", background: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "16/9", background: project.color, borderBottom: "3px solid #0A0A0A" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="700px"
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <button
                className="nb-btn absolute top-3 right-3 p-2 bg-white"
                onClick={() => setModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="nb-tag text-xs mb-2 inline-block" style={{ background: "#FFE600" }}>
                    {project.category}
                  </span>
                  <h2 className="font-black text-2xl uppercase tracking-tight">{project.title}</h2>
                </div>
                <span className="mono font-bold text-sm flex-shrink-0 ml-4">{project.year}</span>
              </div>

              <p className="leading-relaxed mb-6" style={{ color: "#333" }}>
                {project.longDescription}
              </p>

              <div className="mb-6">
                <p className="font-black uppercase text-xs tracking-widest mono mb-3 pb-2" style={{ borderBottom: "2px solid #0A0A0A" }}>
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="nb-tag" style={{ background: "#FFE600" }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="nb-btn px-4 py-2 text-sm bg-white">
                    <GitBranch size={14} />
                    GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="nb-btn px-4 py-2 text-sm" style={{ background: "#FFE600" }}>
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
