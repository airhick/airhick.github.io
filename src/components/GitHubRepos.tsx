"use client";
import { useState } from "react";
import { ExternalLink, Lock, GitBranch } from "lucide-react";
import { githubRepos } from "@/lib/projects";

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "—": "#666",
};

const CATEGORIES = ["Tous", "Web App", "Scraping", "Automation", "AI", "Tool", "API", "Backend", "Data", "Education"];

export default function GitHubRepos() {
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? githubRepos : githubRepos.filter((r) => r.category === active);

  return (
    <section
      id="repos"
      className="py-20 px-6"
      style={{ background: "#0A0A0A", borderTop: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-10 pb-6"
          style={{ borderBottom: "3px solid #333" }}
        >
          <div>
            <span
              className="nb-tag text-xs mb-3 inline-block"
              style={{ background: "#FFE600", color: "#0A0A0A" }}
            >
              GITHUB — AIRHICK
            </span>
            <h2 className="section-title" style={{ color: "#FFE600" }}>
              TOUS LES REPOS
            </h2>
          </div>
          <span className="mono font-bold text-sm" style={{ color: "#555" }}>
            {githubRepos.length} REPOSITORIES
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="nb-tag text-xs cursor-pointer transition-all"
              style={{
                background: active === cat ? "#FFE600" : "#1a1a1a",
                color: active === cat ? "#0A0A0A" : "#aaa",
                border: `2px solid ${active === cat ? "#FFE600" : "#333"}`,
                padding: "4px 12px",
              }}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Repos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((repo) => {
            const langColor = LANG_COLORS[repo.language] || "#666";
            return (
              <a
                key={repo.name}
                href={repo.isPrivate ? undefined : repo.url}
                target="_blank"
                rel="noreferrer"
                className={`block group ${repo.isPrivate ? "cursor-default" : "cursor-pointer"}`}
                style={{
                  border: "2px solid #222",
                  background: "#111",
                  boxShadow: "4px 4px 0px #222",
                  padding: "16px",
                  transition: "transform 0.1s, box-shadow 0.1s, border-color 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (!repo.isPrivate) {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px #FFE600";
                    (e.currentTarget as HTMLElement).style.borderColor = "#FFE600";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px #222";
                  (e.currentTarget as HTMLElement).style.borderColor = "#222";
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch size={14} style={{ color: "#555", flexShrink: 0 }} />
                    <span
                      className="font-black text-sm mono truncate"
                      style={{ color: "#FFE600", maxWidth: "140px" }}
                      title={repo.name}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                    {repo.isPrivate ? (
                      <Lock size={12} style={{ color: "#555" }} />
                    ) : (
                      <ExternalLink size={12} style={{ color: "#444" }} />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: "#888", minHeight: "32px" }}
                >
                  {repo.description || "—"}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: langColor,
                        display: "inline-block",
                        flexShrink: 0,
                        border: repo.language === "JavaScript" ? "1px solid #555" : "none",
                      }}
                    />
                    <span className="mono text-xs" style={{ color: "#555" }}>
                      {repo.language}
                    </span>
                  </div>
                  <span
                    className="text-xs mono"
                    style={{
                      background: "#1a1a1a",
                      color: "#444",
                      border: "1px solid #2a2a2a",
                      padding: "1px 6px",
                    }}
                  >
                    {repo.category}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/airhick"
            target="_blank"
            rel="noreferrer"
            className="nb-btn px-6 py-3 text-sm inline-flex"
            style={{ background: "#FFE600", color: "#0A0A0A", border: "3px solid #FFE600", boxShadow: "4px 4px 0px #333" }}
          >
            <GitBranch size={16} />
            Voir tous les repos sur GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
