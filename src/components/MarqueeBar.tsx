const items = [
  "PYTHON", "★", "TYPESCRIPT", "★", "NEXT.JS", "★", "WEB SCRAPING", "★",
  "AUTOMATION", "★", "LLMs", "★", "REACT", "★", "POSTGRESQL", "★",
  "DOCKER", "★", "PLAYWRIGHT", "★", "FASTAPI", "★", "GENÈVE, CH", "★",
];

export default function MarqueeBar({ inverted = false }: { inverted?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderTop: "3px solid #0A0A0A",
        borderBottom: "3px solid #0A0A0A",
        background: inverted ? "#0A0A0A" : "#FFE600",
        color: inverted ? "#FFE600" : "#0A0A0A",
        overflow: "hidden",
        padding: "12px 0",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-black text-sm uppercase tracking-widest mono whitespace-nowrap"
            style={{ padding: "0 16px" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
