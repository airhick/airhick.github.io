"use client";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Lock, X, GitBranch } from "lucide-react";
import { githubRepos, type GithubRepo } from "@/lib/projects";

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "—": "#555",
};

const CATEGORIES = ["Tous", "Web App", "Scraping", "Automation", "AI", "Tool", "API", "Backend", "Data", "Education"];

function Modal({ repo, onClose }: { repo: GithubRepo; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,10,0.9)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        style={{ border: "3px solid #FFE600", boxShadow: "10px 10px 0px #FFE600", background: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: "16/9", background: repo.color }}>
          <Image
            src={repo.image}
            alt={repo.name}
            fill
            sizes="600px"
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2"
            style={{ background: "#fff", border: "2px solid #0A0A0A", boxShadow: "2px 2px 0 #0A0A0A" }}
          >
            <X size={16} />
          </button>
          {repo.isPrivate && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 text-xs font-bold mono"
              style={{ background: "#0A0A0A", color: "#FFE600", border: "2px solid #FFE600" }}
            >
              <Lock size={10} /> PRIVÉ
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span
                className="text-xs font-bold mono uppercase tracking-widest"
                style={{ color: "#FFE600" }}
              >
                {repo.category}
              </span>
              <h3 className="font-black text-xl text-white mt-1">{repo.name}</h3>
            </div>
            <span
              className="text-xs mono px-2 py-1 flex-shrink-0"
              style={{ background: "#1a1a1a", color: "#666", border: "1px solid #333" }}
            >
              {repo.language}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "#aaa" }}>
            {repo.longDescription}
          </p>

          {/* Stack */}
          <div className="mb-5">
            <p className="text-xs mono font-bold uppercase tracking-widest mb-2" style={{ color: "#555" }}>
              STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {repo.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold mono px-2 py-1"
                  style={{ background: "#1a1a1a", color: "#FFE600", border: "2px solid #333" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          {!repo.isPrivate && (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="nb-btn px-4 py-2 text-sm w-full justify-center"
              style={{ background: "#FFE600", color: "#0A0A0A", border: "3px solid #FFE600", boxShadow: "none" }}
            >
              <GitBranch size={14} />
              Voir sur GitHub
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function RepoCard({ repo, onClick }: { repo: GithubRepo; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const langColor = LANG_COLORS[repo.language] || "#666";

  return (
    <button
      className="text-left w-full"
      style={{
        border: `2px solid ${hovered ? "#FFE600" : "#1e1e1e"}`,
        background: "#111",
        boxShadow: hovered ? "5px 5px 0px #FFE600" : "4px 4px 0px #1a1a1a",
        padding: "0",
        transform: hovered ? "translate(-2px, -2px)" : "",
        transition: "all 0.12s ease",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mini image */}
      <div className="relative w-full" style={{ aspectRatio: "16/9", background: repo.color }}>
        <Image
          src={repo.image}
          alt={repo.name}
          fill
          sizes="300px"
          className="object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {repo.isPrivate && (
          <div className="absolute top-2 right-2">
            <Lock size={10} style={{ color: "#fff", opacity: 0.7 }} />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-black text-sm mono truncate" style={{ color: "#FFE600", maxWidth: "160px" }}>
            {repo.name}
          </span>
          <span
            className="text-xs mono flex-shrink-0 ml-1"
            style={{ color: "#444", fontSize: "10px" }}
          >
            {repo.category}
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#666", minHeight: "28px" }}>
          {repo.description}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: langColor,
              display: "inline-block", flexShrink: 0,
              border: repo.language === "JavaScript" ? "1px solid #444" : "none",
            }}
          />
          <span className="text-xs mono" style={{ color: "#444" }}>{repo.language}</span>
        </div>
      </div>
    </button>
  );
}

export default function GitHubRepos() {
  const [active, setActive] = useState("Tous");
  const [selected, setSelected] = useState<GithubRepo | null>(null);

  const filtered = active === "Tous" ? githubRepos : githubRepos.filter((r) => r.category === active);

  return (
    <section id="repos" className="py-20 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 pb-6" style={{ borderBottom: "3px solid #1e1e1e" }}>
          <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600", color: "#0A0A0A" }}>
            GITHUB — AIRHICK
          </span>
          <div className="flex items-end justify-between">
            <h2 className="section-title" style={{ color: "#fff" }}>REPOS</h2>
            <span className="mono font-bold text-sm" style={{ color: "#444" }}>
              {githubRepos.length} REPOSITORIES
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-xs font-bold mono uppercase tracking-wide px-3 py-1.5 transition-all"
              style={{
                background: active === cat ? "#FFE600" : "transparent",
                color: active === cat ? "#0A0A0A" : "#555",
                border: `2px solid ${active === cat ? "#FFE600" : "#222"}`,
                cursor: "pointer",
              }}
            >
              {cat}
              {active === cat && (
                <span className="ml-1" style={{ opacity: 0.6 }}>
                  ({filtered.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((repo) => (
            <RepoCard key={repo.name} repo={repo} onClick={() => setSelected(repo)} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/airhick"
            target="_blank"
            rel="noreferrer"
            className="nb-btn px-5 py-3 text-sm"
            style={{ background: "transparent", color: "#FFE600", border: "3px solid #FFE600", boxShadow: "4px 4px 0px #FFE600" }}
          >
            <GitBranch size={14} />
            Voir sur GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {selected && <Modal repo={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
