export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "3px solid #0A0A0A",
        color: "#666",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black text-sm uppercase tracking-widest mono" style={{ color: "#FFE600" }}>
          ERIC AELLEN © 2026
        </span>
        <p className="text-xs mono text-center">
          GENÈVE, SUISSE — BUILT WITH NEXT.JS + TAILWIND + NEO-BRUTALISM
        </p>
        <a
          href="#"
          className="text-xs mono font-bold uppercase tracking-wider"
          style={{ color: "#FFE600", textDecoration: "none" }}
        >
          ↑ BACK TO TOP
        </a>
      </div>
    </footer>
  );
}
