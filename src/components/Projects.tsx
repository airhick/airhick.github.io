import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className="flex items-end justify-between mb-12 pb-6"
          style={{ borderBottom: "3px solid #0A0A0A" }}
        >
          <div>
            <span
              className="nb-tag text-xs mb-3 inline-block"
              style={{ background: "#FFE600" }}
            >
              PORTFOLIO
            </span>
            <h2 className="section-title">PROJETS</h2>
          </div>
          <p className="text-sm mono font-bold hidden md:block">
            {projects.length} PROJETS TOTAL
          </p>
        </div>

        {/* Featured — large */}
        <div className="mb-12">
          <h3
            className="font-black uppercase text-sm tracking-widest mono mb-6 flex items-center gap-3"
          >
            <span
              style={{
                background: "#FFE600",
                border: "2px solid #0A0A0A",
                padding: "2px 8px",
              }}
            >
              FEATURED
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* Others */}
        <div>
          <h3 className="font-black uppercase text-sm tracking-widest mono mb-6 flex items-center gap-3">
            <span
              style={{
                background: "#0A0A0A",
                color: "#FFE600",
                border: "2px solid #0A0A0A",
                padding: "2px 8px",
              }}
            >
              TOUS LES PROJETS
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
