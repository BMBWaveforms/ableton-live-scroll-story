import React, { useState } from "react";
import ProductImage from "./ProductImage.jsx";
import PushPad from "./PushPad.jsx";
import { lerp, range, smooth, useSectionProgress } from "../hooks/useSectionProgress.js";
import { assetPath } from "../utils/assetPath.js";

const PUSH_IMAGE = assetPath("assets/ableton/push/push-top.webp");
const PUSH_LIVE_IMAGE = assetPath("assets/ableton/push/push-live.webp");

export default function PerformSection() {
  const { sectionRef, progress } = useSectionProgress();
  const [activePad, setActivePad] = useState(null);
  const camera = smooth(range(progress, 0.04, 0.66));
  const liveIn = smooth(range(progress, 0.65, 0.88));
  const titleOut = 1 - smooth(range(progress, 0.42, 0.65));

  return (
    <section id="perform" className="perform-section long-story" ref={sectionRef} aria-labelledby="perform-heading">
      <div className="story-sticky perform-stage">
        <ProductImage
          src={PUSH_IMAGE}
          alt="Official Ableton Push top view"
          className="push-product-image"
          scale={lerp(1.65, 1.02, camera)}
          y={lerp(3, 0, camera)}
          origin="center 62%"
          style={{ opacity: 1 - liveIn }}
        >
          <div className="push-hit-grid" style={{ opacity: smooth(range(progress, 0.15, 0.4)) * (1 - liveIn) }}>
            {Array.from({ length: 64 }, (_, index) => (
              <PushPad key={index} index={index} active={activePad === index} onActivate={setActivePad} />
            ))}
          </div>
        </ProductImage>
        <ProductImage
          src={PUSH_LIVE_IMAGE}
          alt="Official Ableton Push connected to Live"
          className="push-live-image"
          scale={lerp(1.2, 1.01, liveIn)}
          origin="center center"
          style={{ opacity: liveIn }}
        />
        <div className="perform-shade" />
        <div className="section-frame section-kicker"><span>05 / PERFORM</span><span>PERFORMANCE / 01</span></div>
        <div className="perform-copy" style={{ opacity: titleOut }}>
          <h2 id="perform-heading">别只是在制作音乐。<br /><span>亲手演奏它。</span></h2>
          <p>实时触发片段、演奏乐器，并在现场重新塑造整套音乐。</p>
        </div>
        <div className="perform-data"><span>120 BPM</span><span>SCENE 04</span><span>04 / 04</span></div>
        <p className="perform-closing" style={{ opacity: liveIn }}>一件乐器。<br /><span>一个完整工作空间。</span><small>ONE INSTRUMENT. ONE WORKSPACE.</small></p>
        <div className="story-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </section>
  );
}
