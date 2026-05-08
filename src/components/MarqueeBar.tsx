const items = [
  "PYTHON", "·", "TYPESCRIPT", "·", "NEXT.JS", "·", "WEB SCRAPING", "·",
  "AUTOMATION", "·", "LLMs", "·", "REACT", "·", "POSTGRESQL", "·",
  "DOCKER", "·", "PLAYWRIGHT", "·", "FASTAPI", "·", "GENÈVE, CH", "·",
];

export default function MarqueeBar({ inverted = false }: { inverted?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderTop: "1px solid #1A2E45",
        borderBottom: "1px solid #1A2E45",
        background: inverted ? "rgba(255,154,108,0.06)" : "rgba(126,200,227,0.04)",
        overflow: "hidden",
        padding: "10px 0",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-black text-sm uppercase tracking-widest mono whitespace-nowrap"
            style={{
              padding: "0 16px",
              color: item === "·"
                ? "#1A2E45"
                : inverted
                  ? "#FF9A6C"
                  : "#4E6B82",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
