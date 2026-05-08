"use client";
import Image from "next/image";
import { skills } from "@/lib/projects";

const CATEGORY_COLORS: Record<string, string> = {
  languages: "#FFE600",
  frameworks: "#0057FF",
  tools: "#FF2D20",
  specialties: "#0A0A0A",
};

const CATEGORY_TEXT: Record<string, string> = {
  languages: "#0A0A0A",
  frameworks: "#fff",
  tools: "#fff",
  specialties: "#FFE600",
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Langages",
  frameworks: "Frameworks",
  tools: "Outils & Infra",
  specialties: "Spécialités",
};

const SKILL_ICONS: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Playwright: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
};

export default function StackSection() {
  return (
    <section
      id="stack"
      className="py-20 px-6"
      style={{ background: "#0A0A0A", borderTop: "3px solid #0A0A0A", borderBottom: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-12 pb-6"
          style={{ borderBottom: "3px solid #333" }}
        >
          <div>
            <span
              className="nb-tag text-xs mb-3 inline-block"
              style={{ background: "#FFE600", color: "#0A0A0A" }}
            >
              COMPÉTENCES
            </span>
            <h2 className="section-title" style={{ color: "#FFE600" }}>
              TECH STACK
            </h2>
          </div>
          <p className="text-sm mono font-bold hidden md:block" style={{ color: "#666" }}>
            OUTILS &amp; TECHNOLOGIES
          </p>
        </div>

        {/* Grid of categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((cat) => (
            <div
              key={cat}
              style={{
                border: "3px solid #333",
                boxShadow: `6px 6px 0px ${CATEGORY_COLORS[cat]}`,
                background: "#111",
              }}
            >
              <div
                className="px-4 py-3 font-black uppercase text-sm tracking-widest mono"
                style={{
                  background: CATEGORY_COLORS[cat],
                  color: CATEGORY_TEXT[cat],
                  borderBottom: "3px solid #333",
                }}
              >
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="p-4 flex flex-wrap gap-3">
                {skills[cat].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2"
                    style={{
                      border: "2px solid #333",
                      background: "#1a1a1a",
                      color: "#fff",
                    }}
                  >
                    {SKILL_ICONS[skill] && (
                      <Image
                        src={SKILL_ICONS[skill]}
                        alt={skill}
                        width={18}
                        height={18}
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <span className="font-bold text-sm mono">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stack visualization image */}
        <div
          style={{
            border: "3px solid #333",
            boxShadow: "8px 8px 0px #FFE600",
          }}
        >
          <div
            className="px-4 py-3 font-black uppercase text-sm tracking-widest mono"
            style={{ background: "#FFE600", color: "#0A0A0A", borderBottom: "3px solid #333" }}
          >
            ARCHITECTURE &amp; STACK DIAGRAM
          </div>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/7", background: "#111" }}
          >
            <Image
              src="/images/stack.png"
              alt="Tech Stack Diagram"
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-6 p-8 w-full max-w-3xl">
                {["Python", "TypeScript", "Next.js", "Docker", "PostgreSQL"].map((tech) => (
                  <div
                    key={tech}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      style={{
                        border: "2px solid #FFE600",
                        background: "#1a1a1a",
                        padding: "12px",
                      }}
                    >
                      {SKILL_ICONS[tech] && (
                        <Image
                          src={SKILL_ICONS[tech]}
                          alt={tech}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <span className="mono text-xs font-bold" style={{ color: "#FFE600" }}>
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
