"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projets", href: "#projects" },
  { label: "Repos", href: "#repos" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        borderBottom: scrolled ? "3px solid #0A0A0A" : "none",
        background: scrolled ? "#FFE600" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-black text-xl uppercase tracking-tighter"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          ERIC AELLEN
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="nb-btn px-4 py-2 text-sm bg-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:eric@aellen.com"
              className="nb-btn px-4 py-2 text-sm"
              style={{ background: "#0A0A0A", color: "#FFE600" }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ border: "3px solid #0A0A0A", background: "#fff" }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            borderTop: "3px solid #0A0A0A",
            background: "#FFE600",
          }}
        >
          <ul className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="nb-btn px-4 py-3 text-sm bg-white block w-full"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:eric@aellen.com"
                className="nb-btn px-4 py-3 text-sm block w-full text-center"
                style={{ background: "#0A0A0A", color: "#FFE600" }}
                onClick={() => setOpen(false)}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
