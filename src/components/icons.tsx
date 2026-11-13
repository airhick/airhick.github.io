import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, rest: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...rest,
});

export const ArrowRight = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M4 12.5c4.6-.4 9.6-.2 15 .1" />
    <path d="M13.5 6.5c2 2 3.9 3.8 5.6 6-1.8 1.9-3.7 3.6-5.8 5.2" />
  </svg>
);

export const ArrowLeft = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M20 12.5c-4.6-.4-9.6-.2-15 .1" />
    <path d="M10.5 6.5c-2 2-3.9 3.8-5.6 6 1.8 1.9 3.7 3.6 5.8 5.2" />
  </svg>
);

export const ArrowDown = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M12.3 4c-.3 4.7-.2 9.6.1 15" />
    <path d="M6.3 13.3c2 2 3.8 3.9 6 5.7 1.9-1.8 3.6-3.7 5.2-5.8" />
  </svg>
);

export const ArrowUpRight = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M6 18.2c3.8-4 7.6-8 11.6-11.9" />
    <path d="M8.6 5.8c3-.2 6-.3 9.3-.1.3 3.2.2 6.3-.1 9.4" />
  </svg>
);

export const Close = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M5.5 5.8c4.4 4 8.6 8.2 12.8 12.6" />
    <path d="M18.4 5.4c-4.2 4.4-8.4 8.7-12.9 12.9" />
  </svg>
);

export const Menu = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M4 7.2c5.4-.4 10.8-.3 16 .1" />
    <path d="M4.2 12.2c5.2-.2 10.4-.2 15.6 0" />
    <path d="M4 17.1c5.4.3 10.8.3 16-.2" />
  </svg>
);

export const Mail = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M3.6 6.4c5.6-.5 11.2-.5 16.8 0 .4 3.8.4 7.6 0 11.3-5.6.5-11.2.5-16.8 0-.4-3.7-.4-7.5 0-11.3Z" />
    <path d="M4.2 7.2c2.6 2.2 5.2 4.2 7.9 6 2.7-1.8 5.3-3.8 7.8-6" />
  </svg>
);

export const Copy = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M8.6 8.4c3.7-.3 7.4-.3 11 0 .3 3.7.3 7.4 0 11-3.6.3-7.3.3-11 0-.3-3.6-.3-7.3 0-11Z" />
    <path d="M15.4 5.5c-.1-.8-.2-1.3-.4-1.6-3.6-.3-7.2-.3-10.7 0-.3 3.5-.3 7 0 10.6.4.2.9.3 1.6.4" />
  </svg>
);

export const Lock = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M5.2 10.8c4.6-.4 9.1-.4 13.6 0 .3 3.1.3 6.1 0 9.2-4.5.4-9 .4-13.6 0-.3-3.1-.3-6.1 0-9.2Z" />
    <path d="M8.3 10.5c-.2-2.2 0-4.2 1.1-5.3 1.4-1.3 3.9-1.3 5.3 0 1.1 1.1 1.2 3.2 1 5.3" />
    <path d="M12 14.4v2.2" />
  </svg>
);

export const Pin = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M12 21.2c-3.2-3.6-6.6-7.6-6.4-11.4.2-3.5 3-6 6.4-6s6.3 2.6 6.4 6c.1 3.9-3.2 7.8-6.4 11.4Z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </svg>
);

export const Cap = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M2.5 9.4c3.2-1.6 6.3-3 9.5-4.3 3.2 1.3 6.4 2.7 9.5 4.3-3.1 1.7-6.3 3.2-9.5 4.5-3.2-1.3-6.4-2.8-9.5-4.5Z" />
    <path d="M6.3 11.5c-.2 1.7-.1 3.3.2 4.8 3.6 2.2 7.4 2.2 11 0 .3-1.5.4-3.1.2-4.8" />
    <path d="M21.3 9.6c.1 2 .1 3.8-.2 5.6" />
  </svg>
);

export const Clock = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M12 3.4c4.9-.1 8.7 3.8 8.6 8.7-.1 4.7-3.9 8.5-8.6 8.5-4.8 0-8.6-3.9-8.6-8.7.1-4.7 3.9-8.5 8.6-8.5Z" />
    <path d="M12.1 7.3c-.1 1.8-.1 3.4.1 5 1.3.7 2.6 1.4 3.7 2.2" />
  </svg>
);

export const Wrench = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M14.8 3.8c2.3-.7 4.6.2 5.4 1.6l-3 2.9.4 2.1 2.1.5 2.8-2.9c.8 2.2-.2 4.5-2.3 5.4-1.3.6-2.7.5-3.9 0-3 3.2-6.1 6.2-9.2 9.1-1.1.3-2.1-.1-2.7-.9-.5-.8-.6-1.8 0-2.6 3-3 6-6.1 9.1-9-.6-2.6.5-5.4 1.3-6.2Z" />
  </svg>
);

export const Github = ({ size = 18, ...r }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...r}>
    <path d="M12 1.6C6.2 1.6 1.5 6.3 1.5 12.1c0 4.6 3 8.6 7.2 10 .5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1.8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10C22.5 6.3 17.8 1.6 12 1.6Z" />
  </svg>
);

export const Linkedin = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M4 3.8c5.4-.4 10.7-.4 16 0 .4 5.4.4 10.9 0 16.4-5.3.4-10.6.4-16 0-.4-5.5-.4-11 0-16.4Z" />
    <path d="M8.2 10.6v6" />
    <path d="M8.2 7.4v.1" strokeWidth="3.4" />
    <path d="M12 16.6v-6M12 13.2c.4-1.8 1.6-2.7 3-2.7 1.4 0 2.2 1 2.2 2.6v3.5" />
  </svg>
);

export const Sparkle = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path d="M12 3c.6 4.3 2.2 6.6 6.5 8.8-4.2 1.4-5.8 3.6-6.5 9.2-.8-5.4-2.4-7.6-6.6-9 4.2-2.2 5.9-4.6 6.6-9Z" />
  </svg>
);
