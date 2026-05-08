"use client";
import { useState } from "react";
import Image from "next/image";
import { GitBranch, ExternalLink, X, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const project = projects[active];

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — vertical timeline */}
          <div className="lg:col-span-4">
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute top-0 bottom-0"
                style={{ left: "10px", width: "3px", background: "#0A0A0A" }}
              />

              <div className="flex flex-col">
                {projects.map((p, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      className="relative flex items-start gap-4 text-left group"
                      style={{ paddingBottom: i < projects.length - 1 ? "28px" : "0" }}
                    >
                      {/* Dot */}
                      <div
                        style={{
                          width: isActive ? "22px" : "14px",
                          height: isActive ? "22px" : "14px",
                          background: isActive ? "#FFE600" : "#fff",
                          border: "3px solid #0A0A0A",
                          boxShadow: isActive ? "3px 3px 0 #0A0A0A" : "2px 2px 0 #0A0A0A",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "all 0.15s ease",
                          zIndex: 1,
                          position: "relative",
                        }}
                      />

                      {/* Text */}
                      <div
                        className="flex-1 pb-1"
                        style={{
                          opacity: isActive ? 1 : 0.45,
                          transition: "opacity 0.15s ease",
                        }}
                      >
                        <span
                          className="mono font-black text-xs block mb-0.5"
                          style={{ color: isActive ? "#0A0A0A" : "#888", letterSpacing: "0.08em" }}
                        >
                          {p.year}
                        </span>
                        <span
                          className="font-black uppercase text-sm leading-tight block"
                          style={{ color: "#0A0A0A" }}
                        >
                          {p.title}
                        </span>
                        <span
                          className="text-xs mt-0.5 block"
                          style={{ color: "#888" }}
                        >
                          {p.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — active project detail */}
          <div className="lg:col-span-8">
            <div
              key={project.id}
              style={{
                border: "3px solid #0A0A0A",
                boxShadow: "8px 8px 0 #0A0A0A",
                background: "#fff",
                overflow: "hidden",
              }}
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
                  sizes="800px"
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="nb-tag text-xs" style={{ background: "#FFE600" }}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="nb-tag text-xs" style={{ background: "#0A0A0A", color: "#FFE600" }}>
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Counter */}
                <p className="mono text-xs font-bold mb-2" style={{ color: "#bbb" }}>
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </p>

                <h3
                  className="font-black uppercase tracking-tight mb-4 leading-none"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "#444" }}>
                  {project.description}
                </p>

                {/* Visual separator */}
                <div className="w-12 h-1 mb-5" style={{ background: "#FFE600", border: "1px solid #0A0A0A" }} />

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((s) => (
                    <span key={s} className="nb-tag text-xs" style={{ background: "#FFE600" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "2px solid #0A0A0A" }}
                >
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
              </div>
            </div>
          </div>
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

              <div className="mb-6 flex flex-col gap-4">
                {project.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed text-sm" style={{ color: "#333" }}>
                    {para}
                  </p>
                ))}
              </div>

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
