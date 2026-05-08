import { Mail, MapPin, GitBranch, Link2, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/projects";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ background: "#0B1321", borderTop: "1px solid #1A2E45" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6" style={{ borderBottom: "1px solid #1A2E45" }}>
          <span className="nb-tag text-xs mb-3 inline-block">DISPONIBLE</span>
          <h2 className="section-title">CONTACT</h2>
        </div>

        <div className="flex flex-col gap-4 max-w-xl">
          <p className="text-lg font-medium leading-relaxed mb-4" style={{ color: "#8A9BAE" }}>
            Un projet d'automatisation, un outil à construire, une collaboration ?
            Parlons-en.
          </p>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="nb-btn px-6 py-5 text-base w-full justify-between"
            style={{ background: "rgba(14,27,46,0.8)", color: "#E6D2BE", fontSize: "15px" }}
          >
            <span className="flex items-center gap-3">
              <Mail size={20} style={{ color: "#FF9A6C" }} />
              {profile.email}
            </span>
            <ArrowUpRight size={18} style={{ color: "#FF9A6C" }} />
          </a>

          {/* Location */}
          <div
            className="flex items-center gap-3 px-6 py-4"
            style={{ border: "1px solid #1A2E45", background: "#0E1B2E" }}
          >
            <MapPin size={18} style={{ color: "#FF9A6C" }} />
            <span className="font-bold" style={{ color: "#8A9BAE" }}>{profile.location}</span>
          </div>

          {/* Social */}
          <div className="flex gap-3 mt-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="nb-btn px-5 py-3 text-sm flex-1 justify-center"
              style={{ background: "rgba(126,200,227,0.07)", color: "#7EC8E3", border: "1px solid rgba(126,200,227,0.18)" }}
            >
              <GitBranch size={15} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="nb-btn px-5 py-3 text-sm flex-1 justify-center"
              style={{ background: "rgba(255,154,108,0.08)", color: "#FF9A6C", border: "1px solid rgba(255,154,108,0.22)" }}
            >
              <Link2 size={15} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
