const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
export const Search = () => (
  <svg {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);
export const Heart = ({ fill = false }) => (
  <svg {...base} fill={fill ? "currentColor" : "none"}>
    <path d="M20.8 8.7c0 5.2-8.8 10-8.8 10S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
  </svg>
);
export const Bag = () => (
  <svg {...base}>
    <path d="M5 8h14l1 13H4L5 8Z" />
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
  </svg>
);
export const Menu = () => (
  <svg {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const User = () => (
  <svg {...base}>
    <circle cx="12" cy="7" r="3.5" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);
export const Truck = () => (
  <svg {...base}>
    <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="1.7" />
    <circle cx="18" cy="19" r="1.7" />
  </svg>
);
export const Shield = () => (
  <svg {...base}>
    <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
    <path d="m8.5 12 2.3 2.3 4.7-5" />
  </svg>
);
export const Rotate = () => (
  <svg {...base}>
    <path d="M20 11a8 8 0 0 0-14.9-4L3 10" />
    <path d="M3 5v5h5" />
    <path d="M4 13a8 8 0 0 0 14.9 4L21 14" />
    <path d="M21 19v-5h-5" />
  </svg>
);
export const Headphones = () => (
  <svg {...base}>
    <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
    <path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />
  </svg>
);
export const Instagram = () => (
  <svg {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
  </svg>
);
export const Facebook = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M13.5 20v-6h2l.4-2.5h-2.4V10c0-.8.3-1.4 1.4-1.4H16V6.3c-.4-.1-1.1-.2-1.9-.2-2 0-3.4 1.2-3.4 3.5v1.9H9v2.5h1.7v6" />
  </svg>
);
export const Arrow = () => (
  <svg {...base} width="17" height="17">
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);
export const Sun = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = () => (
  <svg {...base}>
    <path d="M20 15.4A8.2 8.2 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" />
  </svg>
);
export const X = () => (
  <svg {...base}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);
export const Plus = () => (
  <svg {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = () => (
  <svg {...base}>
    <path d="M5 12h14" />
  </svg>
);
export const Check = () => (
  <svg {...base}>
    <path d="m5 12 4 4L19 6" />
  </svg>
);
