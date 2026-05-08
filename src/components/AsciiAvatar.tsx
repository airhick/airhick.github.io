"use client";
import { useEffect, useRef } from "react";

const DENSITY   = " ·.:,;i!1tfx#$@";
const CODE_POOL = "01{}[]()<>;=+-*/&|#$@\\_~?!";

interface Props {
  src: string;
  cols?: number;
}

export default function AsciiAvatar({ src, cols = 72 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      // Sample the image at grid resolution onto an offscreen canvas (read-only, never displayed)
      // charWidth ≈ fontSize * 0.601 + letterSpacing, charHeight = fontSize
      // rows must compensate so rendered block matches image proportions
      const charW = 6 * 0.601 + 0.3; // ~3.9px
      const charH = 6;               // fontSize px
      const rows = Math.round(cols * (img.naturalHeight / img.naturalWidth) * (charW / charH));
      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, cols, rows);
      const { data } = offCtx.getImageData(0, 0, cols, rows);

      type Cell = { char: string; color: string; visible: boolean };
      const cells: Cell[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const R = data[i], G = data[i + 1], B = data[i + 2], A = data[i + 3];
          const brightness = (R * 0.299 + G * 0.587 + B * 0.114) / 255;
          const charIdx = Math.floor(brightness * (DENSITY.length - 1));
          cells.push({
            char: DENSITY[charIdx],
            color: `rgba(${R},${G},${B},${(A / 255).toFixed(2)})`,
            visible: A >= 20,
          });
        }
      }

      // Build real DOM: row <div>s containing <span> text nodes
      container.innerHTML = "";
      const spans: HTMLSpanElement[] = [];

      for (let r = 0; r < rows; r++) {
        const rowEl = document.createElement("div");
        rowEl.style.cssText = "display:flex;line-height:1.05;";
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cell = cells[idx];
          const span = document.createElement("span");

          if (cell.visible) {
            // Start as a random code character, dimly cyan
            span.textContent = CODE_POOL[Math.floor(Math.random() * CODE_POOL.length)];
            span.style.color = "rgba(126,200,227,0.18)";
          } else {
            span.textContent = "\u00A0"; // non-breaking space
          }

          rowEl.appendChild(span);
          spans.push(span);
        }
        container.appendChild(rowEl);
      }

      // ── Animated reveal ──────────────────────────────────────────────────
      const visibleIdx = cells
        .map((cell, i) => (cell.visible ? i : -1))
        .filter((i) => i !== -1);

      // Shuffle for random reveal order
      for (let i = visibleIdx.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [visibleIdx[i], visibleIdx[j]] = [visibleIdx[j], visibleIdx[i]];
      }

      let revealed = 0;
      const batchSize = Math.ceil(visibleIdx.length / 28); // ~28 frames total

      const revealBatch = () => {
        for (let k = 0; k < batchSize && revealed < visibleIdx.length; k++, revealed++) {
          const i = visibleIdx[revealed];
          spans[i].textContent = cells[i].char;
          spans[i].style.color  = cells[i].color;
        }
        if (revealed < visibleIdx.length) {
          setTimeout(revealBatch, 45);
        } else {
          startFlicker();
        }
      };

      setTimeout(revealBatch, 120);

      // ── Subtle glitch flicker after reveal ───────────────────────────────
      const startFlicker = () => {
        const tick = () => {
          const n = Math.max(1, Math.floor(visibleIdx.length * 0.004));
          const toFlicker: number[] = [];

          for (let k = 0; k < n; k++) {
            toFlicker.push(visibleIdx[Math.floor(Math.random() * visibleIdx.length)]);
          }

          toFlicker.forEach((i) => {
            spans[i].textContent = CODE_POOL[Math.floor(Math.random() * CODE_POOL.length)];
            spans[i].style.color  = "rgba(126,200,227,0.75)";
          });

          setTimeout(() => {
            toFlicker.forEach((i) => {
              spans[i].textContent = cells[i].char;
              spans[i].style.color  = cells[i].color;
            });
          }, 90);

          setTimeout(tick, 160 + Math.random() * 80);
        };
        tick();
      };
    };
  }, [src, cols]);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: "6px",
        letterSpacing: "0.3px",
        userSelect: "none",
        pointerEvents: "none",
        lineHeight: 1,
      }}
    />
  );
}
