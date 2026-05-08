"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projets", href: "#projects" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        borderBottom: scrolled ? "1px solid #1A2E45" : "1px solid transparent",
        background: scrolled
          ? "rgba(11,19,33,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-black text-xl uppercase tracking-tighter"
          style={{ color: "#E6D2BE", fontFamily: "Space Grotesk, sans-serif" }}
        >
          ERIC AELLEN
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="nb-btn px-4 py-2 text-sm"
                style={{ background: "transparent", border: "1px solid transparent", color: "#E6D2BE", boxShadow: "none" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:eric@aellen.com"
              className="nb-btn px-4 py-2 text-sm"
              style={{ background: "#FF9A6C", color: "#0B1321", border: "1px solid #FF9A6C", boxShadow: "none" }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ border: "1px solid #1A2E45", background: "rgba(14,27,46,0.8)", color: "#E6D2BE" }}
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
            borderTop: "1px solid #1A2E45",
            background: "rgba(11,19,33,0.96)",
            backdropFilter: "blur(16px)",
          }}
        >
          <ul className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="nb-btn px-4 py-3 text-sm block w-full"
                  style={{ background: "rgba(26,46,69,0.5)", border: "1px solid #1A2E45", color: "#E6D2BE", boxShadow: "none" }}
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
                style={{ background: "#FF9A6C", color: "#0B1321", border: "1px solid #FF9A6C", boxShadow: "none" }}
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
