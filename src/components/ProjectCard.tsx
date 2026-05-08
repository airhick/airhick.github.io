"use client";
import Image from "next/image";
import { useState } from "react";
import { ExternalLink, GitBranch, X, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [open, setOpen] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <>
      {/* Card */}
      <article
        className="nb-card overflow-hidden cursor-pointer flex flex-col"
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16/9",
            background: project.color,
            borderBottom: "3px solid #0A0A0A",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="nb-tag text-xs"
              style={{ background: "#FFE600", border: "2px solid #0A0A0A" }}
            >
              {project.category}
            </span>
          </div>
          {/* Year */}
          <div className="absolute bottom-3 right-3">
            <span
              className="nb-tag text-xs"
              style={{ background: "#0A0A0A", color: "#FFE600", border: "2px solid #0A0A0A" }}
            >
              {project.year}
            </span>
          </div>
          {/* Color overlay fallback */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: project.color, opacity: 0 }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-black text-xl uppercase tracking-tight mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-700 mb-4 flex-1">
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="nb-tag" style={{ background: "#fff" }}>
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="nb-tag" style={{ background: "#FFE600" }}>
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: "2px solid #0A0A0A" }}>
            <button
              className="nb-btn px-3 py-1.5 text-xs bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              Voir détails
              <ChevronRight size={12} />
            </button>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="nb-btn p-1.5 bg-white"
                  onClick={(e) => e.stopPropagation()}
                  title="GitHub"
                >
                  <GitBranch size={14} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="nb-btn p-1.5"
                  style={{ background: "#FFE600" }}
                  onClick={(e) => e.stopPropagation()}
                  title="Live"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,10,0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="nb-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "12px 12px 0px #FFE600" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div
              className="relative w-full"
              style={{
                aspectRatio: "16/9",
                background: project.color,
                borderBottom: "3px solid #0A0A0A",
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <button
                className="nb-btn absolute top-3 right-3 p-2"
                style={{ background: "#fff" }}
                onClick={() => setOpen(false)}
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
                  <h2 className="font-black text-2xl uppercase tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <span className="mono font-bold text-sm">{project.year}</span>
              </div>

              <p className="leading-relaxed mb-6 text-gray-800">
                {project.longDescription}
              </p>

              {/* Stack */}
              <div className="mb-6">
                <h4
                  className="font-black uppercase text-sm tracking-widest mb-3 mono"
                  style={{ borderBottom: "2px solid #0A0A0A", paddingBottom: "4px" }}
                >
                  Stack Technique
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="nb-tag"
                      style={{ background: "#FFE600" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4
                  className="font-black uppercase text-sm tracking-widest mb-3 mono"
                  style={{ borderBottom: "2px solid #0A0A0A", paddingBottom: "4px" }}
                >
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="nb-tag" style={{ background: "#fff" }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn px-4 py-2 text-sm bg-white"
                  >
                    <GitBranch size={14} />
                    GitHub
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn px-4 py-2 text-sm"
                    style={{ background: "#FFE600" }}
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
    </>
  );
}
