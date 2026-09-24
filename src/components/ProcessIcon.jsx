import React from "react";

const paths = {
  capture: <><path d="M4 12h2l2-6 3 12 3-10 2 4h4" /><circle cx="12" cy="12" r="10" /></>,
  play: <><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4Z" /></>,
  layer: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  loop: <><path d="M18 7h3v-3M21 7a9 9 0 0 0-15-2L4 7M6 17H3v3M3 17a9 9 0 0 0 15 2l2-2" /></>,
  create: <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="5" /></>,
  arrange: <><path d="M3 6h8v4H3zM13 6h8v4h-8zM3 14h5v4H3zM10 14h11v4H10z" /></>,
  shape: <><path d="M4 17c4 0 4-10 8-10s4 10 8 10" /><circle cx="12" cy="7" r="2" /></>,
  perform: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
};

export default function ProcessIcon({ type, className = "" }) {
  return (
    <svg className={`process-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] ?? paths.create}
    </svg>
  );
}
