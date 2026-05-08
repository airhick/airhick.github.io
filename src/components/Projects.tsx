import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6" style={{ borderBottom: "3px solid #0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 pb-6" style={{ borderBottom: "3px solid #0A0A0A" }}>
          <span className="nb-tag text-xs mb-3 inline-block" style={{ background: "#FFE600" }}>
            PORTFOLIO
          </span>
          <div className="flex items-end justify-between">
            <h2 className="section-title">PROJETS</h2>
            <span className="mono font-bold text-sm hidden md:block">{projects.length} PROJETS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
