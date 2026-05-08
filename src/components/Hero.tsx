"use client";
import Image from "next/image";
import { MapPin, Mail, GitBranch, Link2, ArrowDown } from "lucide-react";
import { profile } from "@/lib/projects";

export default function Hero() {
  return (
    <section
      className="min-h-screen grid-bg flex flex-col justify-center pt-24 pb-12 px-6"
      style={{ borderBottom: "3px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top badge */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="nb-tag"
            style={{ background: "#FFE600" }}
          >
            DISPONIBLE — OPEN TO WORK
          </span>
          <span className="nb-tag" style={{ background: "#fff" }}>
            GENÈVE, CH
          </span>
        </div>

        {/* Main hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — main headline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1
              className="font-black uppercase leading-none tracking-tighter mb-6"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                lineHeight: "0.9",
              }}
            >
              ERIC
              <br />
              <span style={{ color: "#FFE600", WebkitTextStroke: "3px #0A0A0A" }}>
                AELLEN
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="nb-tag text-base" style={{ background: "#fff" }}>
                <MapPin size={14} className="inline mr-1" />
                Genève, Suisse
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="nb-btn px-6 py-3 text-sm"
                style={{ background: "#FFE600" }}
              >
                <ArrowDown size={16} />
                Voir mes projets
              </a>
              <a
                href="mailto:eric.aellen000@gmail.com"
                className="nb-btn px-6 py-3 text-sm"
                style={{ background: "#0A0A0A", color: "#FFE600" }}
              >
                <Mail size={16} />
                Me contacter
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="nb-btn px-6 py-3 text-sm bg-white"
              >
                <GitBranch size={16} />
                GitHub
              </a>
            </div>
          </div>

          {/* Right — photo card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              className="nb-card overflow-hidden"
              style={{ background: "#FFE600" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                <Image
                  src="/images/hero.png"
                  alt="Eric Aellen"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "#FFE600" }}
                >
                  <span
                    className="font-black text-8xl"
                    style={{ color: "#0A0A0A" }}
                  >
                    EA
                  </span>
                </div>
              </div>

              {/* Info strip */}
              <div
                className="p-4 flex flex-col gap-2"
                style={{ borderTop: "3px solid #0A0A0A", background: "#fff" }}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <MapPin size={14} />
                  <span>Genève, Suisse</span>
                </div>
                <div className="flex items-center gap-2 text-sm mono">
                  <Mail size={14} />
                  <span>eric.aellen000@gmail.com</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn px-3 py-1 text-xs bg-white flex-1 justify-center"
                  >
                    <GitBranch size={12} />
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn px-3 py-1 text-xs flex-1 justify-center"
                    style={{ background: "#0057FF", color: "#fff" }}
                  >
                    <Link2 size={12} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: "55+", label: "Repos" },
                { n: "5+", label: "Ans d'exp." },
                { n: "8+", label: "Langages" },
              ].map((stat) => (
                <div
                  key={stat.n}
                  className="nb-card p-4 text-center"
                  style={{ background: "#0A0A0A", color: "#FFE600" }}
                >
                  <div className="text-3xl font-black mono">{stat.n}</div>
                  <div className="text-xs font-bold uppercase mt-1 tracking-wide" style={{ color: "#fff" }}>
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
