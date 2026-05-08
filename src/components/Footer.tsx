export default function Footer() {
  return (
    <footer
      style={{
        background: "#080F1A",
        borderTop: "1px solid #1A2E45",
        color: "#4E6B82",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black text-sm uppercase tracking-widest mono" style={{ color: "#FF9A6C" }}>
          ERIC AELLEN © 2026
        </span>
        <p className="text-xs mono text-center" style={{ color: "#2A4060" }}>
          GENÈVE, SUISSE — BUILT WITH NEXT.JS + TAILWIND
        </p>
        <a
          href="#"
          className="text-xs mono font-bold uppercase tracking-wider"
          style={{ color: "#4E6B82", textDecoration: "none" }}
        >
          ↑ BACK TO TOP
        </a>
      </div>
    </footer>
  );
}
