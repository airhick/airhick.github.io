import { Code2, Cpu, Database, Globe, Zap, GraduationCap } from "lucide-react";
import { education } from "@/lib/projects";

const highlights = [
  {
    icon: <Code2 size={24} />,
    title: "Full-Stack Dev",
    desc: "De l'API backend au frontend React, je couvre toute la stack.",
  },
  {
    icon: <Cpu size={24} />,
    title: "Automation",
    desc: "Playwright, scripts Python — j'automatise tout ce qui peut l'être.",
  },
  {
    icon: <Database size={24} />,
    title: "Data Pipelines",
    desc: "Scraping, ETL, stockage et visualisation de données structurées.",
  },
  {
    icon: <Globe size={24} />,
    title: "LLMs & AI",
    desc: "Intégration d'APIs OpenAI, RAG, embeddings, agents autonomes.",
  },
  {
    icon: <Zap size={24} />,
    title: "Produits utiles",
    desc: "Je construis des outils concrets qui résolvent de vrais problèmes.",
  },
];

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
      className="py-20 px-6 grid-bg"
      style={{ borderTop: "3px solid #0A0A0A", borderBottom: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-12 pb-6"
          style={{ borderBottom: "3px solid #0A0A0A" }}
        >
          <div>
            <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600" }}>
              QUI SUIS-JE?
            </span>
            <h2 className="section-title">À PROPOS</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — bio */}
          <div>
            <div
              className="p-6 nb-card mb-6"
              style={{ background: "#FFE600" }}
            >
              <p className="text-lg font-bold leading-relaxed mb-4">
                Je m'appelle <strong>Eric Aellen</strong>, développeur basé à{" "}
                <strong>Genève, Suisse</strong>.
              </p>
              <p className="leading-relaxed mb-4">
                Je suis passionné par la construction d'outils qui automatisent les tâches répétitives,
                extraient de la valeur des données, et créent des produits concrets. Mon terrain de
                jeu : web scraping, automatisation, APIs, et intégration de LLMs.
              </p>
              <p className="leading-relaxed">
                Entre deux projets tech, vous me trouverez à scraper des données qui ne voulaient
                pas être scrapées, à débugger un crawler récalcitrant, ou à imaginer le prochain
                outil SaaS bootstrappé.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="flex items-start gap-4 p-4"
                  style={{ border: "3px solid #0A0A0A", background: "#fff", boxShadow: "4px 4px 0px #0A0A0A" }}
                >
                  <div
                    className="flex-shrink-0 p-2"
                    style={{ background: "#FFE600", border: "2px solid #0A0A0A" }}
                  >
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm tracking-wide">{h.title}</h4>
                    <p className="text-sm text-gray-700 mt-1">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — education + timeline */}
          <div>
            {/* Education */}
            <div
              className="p-4 mb-4 font-black uppercase text-sm tracking-widest mono flex items-center gap-2"
              style={{ background: "#FFE600", color: "#0A0A0A", border: "3px solid #0A0A0A" }}
            >
              <GraduationCap size={18} />
              FORMATION
            </div>
            <div className="flex flex-col gap-3 mb-8">
              {education.map((ed) => (
                <div
                  key={ed.institution}
                  className="p-4"
                  style={{ border: "3px solid #0A0A0A", background: "#fff", boxShadow: "4px 4px 0px #0A0A0A" }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-black uppercase text-sm tracking-tight">{ed.institution}</span>
                    <span className="mono text-xs font-bold" style={{ color: "#888" }}>{ed.year}</span>
                  </div>
                  <p className="font-bold text-sm mb-1">{ed.degree}</p>
                  <p className="text-xs text-gray-600">{ed.description}</p>
                  <p className="text-xs mono mt-1" style={{ color: "#888" }}>{ed.location}</p>
                </div>
              ))}
            </div>

            <div
              className="p-4 mb-6 font-black uppercase text-sm tracking-widest mono"
              style={{ background: "#0A0A0A", color: "#FFE600", border: "3px solid #0A0A0A" }}
            >
              TIMELINE
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ background: "#0A0A0A", width: "3px" }}
              />

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 pl-0">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: "48px" }}>
                      <div
                        className="w-4 h-4 z-10 relative"
                        style={{
                          background: i === 0 ? "#FFE600" : "#fff",
                          border: "3px solid #0A0A0A",
                          marginLeft: "4px",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 mb-4 p-4"
                      style={{
                        border: "3px solid #0A0A0A",
                        background: i === 0 ? "#FFE600" : "#fff",
                        boxShadow: "4px 4px 0px #0A0A0A",
                      }}
                    >
                      <span className="mono font-black text-sm block mb-1">{item.year}</span>
                      <p className="text-sm font-bold">{item.event}</p>
                    </div>
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
