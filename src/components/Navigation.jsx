import React from "react";

function AbletonMark() {
  return (
    <svg
      className="ableton-mark"
      viewBox="0 0 45 21"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="3" height="21" />
      <rect x="6" width="3" height="21" />
      <rect x="12" width="3" height="21" />
      <rect x="18" width="3" height="21" />
      <rect x="24" width="21" height="3" />
      <rect x="24" y="6" width="21" height="3" />
      <rect x="24" y="12" width="21" height="3" />
      <rect x="24" y="18" width="21" height="3" />
    </svg>
  );
}

export default function Navigation() {
  return (
    <header className="navigation">
      <a className="brand" href="#top" aria-label="Ableton Live, back to top">
        <AbletonMark />
        <span>Ableton</span>
      </a>
      <nav className="nav-links" aria-label="Products">
        <a className="nav-current" href="#top">
          Live
        </a>
        <a
          href="https://www.ableton.com/en/push/"
          target="_blank"
          rel="noreferrer"
        >
          Push
        </a>
        <a
          href="https://www.ableton.com/en/move/"
          target="_blank"
          rel="noreferrer"
        >
          Move
        </a>
        <a
          href="https://www.ableton.com/en/packs/"
          target="_blank"
          rel="noreferrer"
        >
          Packs
        </a>
        <a
          href="https://www.ableton.com/en/blog/categories/learn/"
          target="_blank"
          rel="noreferrer"
        >
          Learn
        </a>
      </nav>
      <a
        className="nav-try"
        href="https://www.ableton.com/en/trial/"
        target="_blank"
        rel="noreferrer"
      >
        免费试用 <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
