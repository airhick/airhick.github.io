import { GraduationCap } from "lucide-react";
import { education, skills } from "@/lib/projects";

const timeline = [
  { year: "2026", event: "GoReview, MDCrawler, MiniPalantir, AIWebAgent..." },
  { year: "2024", event: "Bachelor — CREA, Genève" },
  { year: "2023", event: "Stage en agence de communication" },
  { year: "2023", event: "Google Maps Scraper, APIFinder, Inventory System" },
  { year: "2021", event: "Convention Sneaker — Maturité, Collège de Candolle" },
  { year: "2020", event: "Premiers projets web & Python" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6"
      style={{ borderTop: "1px solid #1A2E45", borderBottom: "1px solid #1A2E45", background: "#0B1321" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 pb-6" style={{ borderBottom: "1px solid #1A2E45" }}>
          <span className="nb-tag text-xs mb-3 inline-block">
            QUI SUIS-JE?
          </span>
          <h2 className="section-title">À PROPOS</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education */}
          <div>
            <div
              className="flex items-center gap-2 px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "rgba(255,154,108,0.1)", border: "1px solid rgba(255,154,108,0.25)", color: "#FF9A6C" }}
            >
              <GraduationCap size={16} />
              FORMATION
            </div>
            <div className="flex flex-col gap-3">
              {education.map((ed) => (
                <div
                  key={ed.institution}
                  className="p-4"
                  style={{ border: "1px solid #1A2E45", background: "#0E1B2E", boxShadow: "4px 4px 0px rgba(255,154,108,0.08)" }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-black uppercase text-sm" style={{ color: "#E6D2BE" }}>{ed.institution}</span>
                    <span className="mono text-xs" style={{ color: "#4E6B82" }}>{ed.year}</span>
                  </div>
                  <p className="font-bold text-sm" style={{ color: "#8A9BAE" }}>{ed.degree}</p>
                  <p className="text-xs mt-1" style={{ color: "#4E6B82" }}>{ed.description}</p>
                  <p className="text-xs mono mt-1" style={{ color: "#3A5468" }}>{ed.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div
              className="px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "rgba(245,192,122,0.08)", border: "1px solid rgba(245,192,122,0.2)", color: "#F5C07A" }}
            >
              TIMELINE
            </div>
            <div className="flex flex-col gap-3">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="p-4"
                  style={{
                    border: `1px solid ${i === 0 ? "rgba(255,154,108,0.3)" : "#1A2E45"}`,
                    background: i === 0 ? "rgba(255,154,108,0.08)" : "#0E1B2E",
                    boxShadow: i === 0 ? "4px 4px 0px rgba(255,154,108,0.1)" : "4px 4px 0px rgba(255,154,108,0.05)",
                  }}
                >
                  <span className="mono font-black text-sm block mb-1" style={{ color: "#F5C07A" }}>{item.year}</span>
                  <p className="text-sm font-bold" style={{ color: "#8A9BAE" }}>{item.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div
              className="px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "rgba(126,200,227,0.08)", border: "1px solid rgba(126,200,227,0.2)", color: "#7EC8E3" }}
            >
              STACK
            </div>
            <div className="flex flex-col gap-3">
              {(Object.entries(skills) as [string, string[]][]).map(([cat, items]) => (
                <div
                  key={cat}
                  className="p-4"
                  style={{ border: "1px solid #1A2E45", background: "#0E1B2E", boxShadow: "4px 4px 0px rgba(126,200,227,0.06)" }}
                >
                  <p className="mono font-black text-xs uppercase tracking-widest mb-2" style={{ color: "#4E6B82" }}>
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="nb-tag text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
