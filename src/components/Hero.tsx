"use client";
import { Mail, GitBranch, ArrowDown } from "lucide-react";
import { profile } from "@/lib/projects";
import AsciiAvatar from "./AsciiAvatar";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6"
      style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid #1A2E45" }}
    >
      {/* Cinematic video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.45,
          zIndex: 0,
        }}
      >
        <source src="/ref.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(11,19,33,0.55) 0%, rgba(11,19,33,0.3) 50%, rgba(11,19,33,0.85) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(11,19,33,0.7) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      {/* Atmospheric grid on top */}
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full" style={{ position: "relative", zIndex: 3 }}>
        {/* Location badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="nb-tag">
            GENÈVE, CH
          </span>
        </div>

        {/* Main hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — headline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              className="font-black uppercase leading-none tracking-tighter mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: "0.9" }}
            >
              ERIC
              <br />
              <span style={{ color: "#FF9A6C" }}>
                AELLEN
              </span>
            </h1>

            <p
              className="mb-8 font-medium"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "#E6D2BE", maxWidth: "480px", lineHeight: 1.65, opacity: 0.85 }}
            >
              Étudiant la journée, étudiant d'autre chose la nuit.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="nb-btn px-6 py-3 text-sm"
                style={{ background: "#FF9A6C", color: "#0B1321", border: "1px solid #FF9A6C" }}
              >
                <ArrowDown size={16} />
                Voir mes projets
              </a>
              <a
                href="mailto:eric@aellen.com"
                className="nb-btn px-6 py-3 text-sm"
                style={{ background: "rgba(14,27,46,0.85)", color: "#7EC8E3", border: "1px solid rgba(126,200,227,0.3)" }}
              >
                <Mail size={16} />
                Me contacter
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="nb-btn px-6 py-3 text-sm"
                style={{ background: "rgba(14,27,46,0.7)", border: "1px solid #1A2E45" }}
              >
                <GitBranch size={16} />
                GitHub
              </a>
            </div>
          </div>

          {/* Right — ASCII avatar floating over video */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AsciiAvatar src="/images/avatar.png" cols={130} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: "55+", label: "Repos" },
                { n: "5+", label: "Ans d'exp." },
                { n: "8+", label: "Langages" },
              ].map((stat) => (
                <div
                  key={stat.n}
                  className="nb-card p-4 text-center"
                  style={{ background: "rgba(14,27,46,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,154,108,0.2)" }}
                >
                  <div className="text-2xl font-black mono" style={{ color: "#FF9A6C" }}>{stat.n}</div>
                  <div className="text-xs font-bold uppercase mt-1 tracking-wide" style={{ color: "#4E6B82" }}>
                    {stat.label}
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
