import { Mail, MapPin, GitBranch, Link2, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/projects";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ background: "#FFE600", borderTop: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-12 pb-6"
          style={{ borderBottom: "3px solid #0A0A0A" }}
        >
          <div>
            <span
              className="nb-tag text-xs mb-3 inline-block"
              style={{ background: "#0A0A0A", color: "#FFE600" }}
            >
              DISPONIBLE
            </span>
            <h2 className="section-title">CONTACT</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — info */}
          <div>
            <p className="text-xl font-bold leading-relaxed mb-8">
              Un projet d'automatisation ? Un outil à construire ? Besoin d'un
              dev full-stack freelance ? Parlons-en.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="nb-btn px-5 py-4 text-base w-full justify-between"
                style={{ background: "#fff" }}
              >
                <span className="flex items-center gap-3">
                  <Mail size={20} />
                  {profile.email}
                </span>
                <ArrowUpRight size={16} />
              </a>

              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ border: "3px solid #0A0A0A", background: "#fff", boxShadow: "4px 4px 0px #0A0A0A" }}
              >
                <MapPin size={20} />
                <span className="font-bold">{profile.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="nb-btn px-5 py-3 text-sm flex-1 justify-center"
                style={{ background: "#0A0A0A", color: "#FFE600" }}
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="nb-btn px-5 py-3 text-sm flex-1 justify-center"
                style={{ background: "#0057FF", color: "#fff" }}
              >
                <Link2 size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right — CTA card */}
          <div
            className="p-8 flex flex-col justify-between"
            style={{
              border: "3px solid #0A0A0A",
              background: "#0A0A0A",
              color: "#FFE600",
              boxShadow: "8px 8px 0px rgba(10,10,10,0.4)",
            }}
          >
            <div>
              <h3 className="font-black text-3xl uppercase tracking-tight mb-4">
                TRAVAILLONS
                <br />
                ENSEMBLE
              </h3>
              <p style={{ color: "#ccc" }} className="leading-relaxed mb-6">
                Disponible pour des missions freelance, collaborations sur des
                projets tech, et opportunités full-time à Genève ou remote.
              </p>

              <ul className="space-y-3">
                {[
                  "Automatisation & scraping",
                  "Développement web full-stack",
                  "Intégration LLM & AI",
                  "Outils SaaS & prototypes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        background: "#FFE600",
                        display: "inline-block",
                        flexShrink: 0,
                        border: "2px solid #FFE600",
                      }}
                    />
                    <span className="font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="nb-btn px-6 py-4 text-base mt-8 justify-center"
              style={{ background: "#FFE600", color: "#0A0A0A", border: "3px solid #FFE600", boxShadow: "none" }}
            >
              <Mail size={18} />
              Envoyer un message
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
