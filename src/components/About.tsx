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
      style={{ borderTop: "3px solid #0A0A0A", borderBottom: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 pb-6" style={{ borderBottom: "3px solid #0A0A0A" }}>
          <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600" }}>
            QUI SUIS-JE?
          </span>
          <h2 className="section-title">À PROPOS</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education */}
          <div>
            <div
              className="flex items-center gap-2 px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "#FFE600", border: "3px solid #0A0A0A" }}
            >
              <GraduationCap size={16} />
              FORMATION
            </div>
            <div className="flex flex-col gap-3">
              {education.map((ed) => (
                <div
                  key={ed.institution}
                  className="p-4"
                  style={{ border: "3px solid #0A0A0A", background: "#fff", boxShadow: "4px 4px 0px #0A0A0A" }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-black uppercase text-sm">{ed.institution}</span>
                    <span className="mono text-xs" style={{ color: "#888" }}>{ed.year}</span>
                  </div>
                  <p className="font-bold text-sm">{ed.degree}</p>
                  <p className="text-xs mt-1" style={{ color: "#666" }}>{ed.description}</p>
                  <p className="text-xs mono mt-1" style={{ color: "#aaa" }}>{ed.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div
              className="px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "#0A0A0A", color: "#FFE600", border: "3px solid #0A0A0A" }}
            >
              TIMELINE
            </div>
            <div className="flex flex-col gap-3">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="p-4"
                  style={{
                    border: "3px solid #0A0A0A",
                    background: i === 0 ? "#FFE600" : "#fff",
                    boxShadow: "4px 4px 0px #0A0A0A",
                  }}
                >
                  <span className="mono font-black text-sm block mb-1">{item.year}</span>
                  <p className="text-sm font-bold">{item.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div
              className="px-4 py-3 font-black uppercase text-sm tracking-widest mono mb-4"
              style={{ background: "#0A0A0A", color: "#FFE600", border: "3px solid #0A0A0A" }}
            >
              STACK
            </div>
            <div className="flex flex-col gap-3">
              {(Object.entries(skills) as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="p-4" style={{ border: "3px solid #0A0A0A", background: "#fff", boxShadow: "4px 4px 0px #0A0A0A" }}>
                  <p className="mono font-black text-xs uppercase tracking-widest mb-2" style={{ color: "#888" }}>
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((s) => (
                      <span key={s} className="nb-tag text-xs" style={{ background: "#FFE600" }}>{s}</span>
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
