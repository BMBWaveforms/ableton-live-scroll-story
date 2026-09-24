import React from "react";

export default function HeroIntro({ opacity }) {
  return (
    <div
      className="hero-intro-content"
      style={{ opacity, pointerEvents: opacity < 0.05 ? "none" : "auto" }}
    >
      <div className="hero-intro__small section-kicker">
        LIVE / 让灵感成为声音
      </div>
      <h1 id="hero-heading">开始创作。</h1>
      <p className="hero-intro__subhead">让灵感一直流动。</p>
      <div className="hero-intro__bottom">
        <div>
          <p>
            从第一个声音到完成整首作品，Live 让你始终留在创作状态里。
          </p>
          <div className="hero-actions">
            <a
              href="https://www.ableton.com/en/trial/"
              target="_blank"
              rel="noreferrer"
            >
              免费试用 Live <span>↗</span>
            </a>
            <a
              href="https://www.youtube.com/watch?v=QFCV6EkqRQs"
              target="_blank"
              rel="noreferrer"
            >
              观看影片 <span>↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-intro__scroll">
        向下探索 <small>SCROLL</small> <span>↓</span>
      </div>
    </div>
  );
}
