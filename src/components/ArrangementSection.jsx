import React, { useState } from "react";
import ProductImage, { SESSION_IMAGE } from "./ProductImage.jsx";
import TimelineHighlight from "./TimelineHighlight.jsx";
import { arrangementParts } from "../data/arrangement.js";
import { lerp, range, smooth, useSectionProgress } from "../hooks/useSectionProgress.js";
import { assetPath } from "../utils/assetPath.js";

const ARRANGEMENT_IMAGE = assetPath("assets/ableton/arrangement/live-arrangement-view.webp");

export default function ArrangementSection() {
  const { sectionRef, progress } = useSectionProgress();
  const [active, setActive] = useState(null);
  const reveal = smooth(range(progress, 0.14, 0.44));
  const titleIn = smooth(range(progress, 0.02, 0.13));
  const titleOut = 1 - smooth(range(progress, 0.3, 0.48));
  const timelineIn = smooth(range(progress, 0.38, 0.58));
  const closingIn = smooth(range(progress, 0.76, 0.92));

  return (
    <section id="arrange" className="arrange-section long-story" ref={sectionRef} aria-labelledby="arrange-heading">
      <div className="story-sticky arrange-stage">
        <ProductImage
          src={SESSION_IMAGE}
          alt="Ableton Live Session View before arranging"
          className="arrange-session-image"
          scale={lerp(1.08, 1.28, reveal)}
          x={lerp(0, -8, reveal)}
          origin="center top"
          style={{ opacity: 1 - reveal }}
        />
        <ProductImage
          src={ARRANGEMENT_IMAGE}
          alt="Official Ableton Live Arrangement View screenshot"
          className="arrange-product-image"
          scale={lerp(1.24, 1.03, reveal)}
          x={lerp(7, 0, reveal)}
          origin="center center"
          style={{ opacity: reveal, transform: `translate3d(${(1 - reveal) * 7}%, 0, 0)` }}
        >
          <div className="timeline-hit-areas" style={{ opacity: timelineIn }}>
            {arrangementParts.map((part) => (
              <TimelineHighlight key={part.id} part={part} active={active === part.id} onActivate={setActive} />
            ))}
          </div>
        </ProductImage>
        <div className="arrange-grid-shift" style={{ "--timeline-progress": reveal }} />
        <div className="arrange-shade" />
        <div className="section-frame section-kicker"><span>03 / ARRANGE</span><span>BAR 001 — BAR 057</span></div>
        <div className="arrange-copy" style={{ opacity: titleIn * titleOut }}>
          <h2 id="arrange-heading">先自由尝试。<br /><span>准备好时，再把它编成一首歌。</span></h2>
          <p>把随手捕捉的片段，逐渐组织成有结构、有起伏的完整作品。</p>
        </div>
        <div className="arrange-bars" style={{ opacity: timelineIn }} aria-hidden="true">
          <span>BAR 001</span><span>BAR 009</span><span>BAR 017</span><span>BAR 025</span>
        </div>
        <p className="arrange-closing" style={{ opacity: closingIn, transform: `translateY(${(1 - closingIn) * 30}px)` }}>
          接下来，塑造每一个声音。
        </p>
        <div className="story-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </section>
  );
}
