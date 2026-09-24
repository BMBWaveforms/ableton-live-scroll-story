import React from "react";
import ProductImage, { CLOSEUP_IMAGE } from "./ProductImage.jsx";
import MusicMetadata from "./MusicMetadata.jsx";
import HeroIntro from "./HeroIntro.jsx";
import {
  lerp,
  range,
  smooth,
  useSectionProgress,
} from "../hooks/useSectionProgress.js";

export default function HeroStory() {
  const { sectionRef, progress } = useSectionProgress();
  const camera = smooth(range(progress, 0.04, 0.9));
  const scale = lerp(3.45, 1.08, camera);
  const introOpacity = 1 - smooth(range(progress, 0.07, 0.36));
  const revealOpacity = smooth(range(progress, 0.58, 0.9));

  return (
    <section
      className="hero-story story-section"
      ref={sectionRef}
      aria-label="A music idea becomes a session"
    >
      <div className="story-sticky hero-story__stage">
        <ProductImage
          src={CLOSEUP_IMAGE}
          className="hero-story__image"
          style={{ "--mobile-scale": lerp(2.05, 1.1, camera) }}
          scale={scale}
          origin="8% 10%"
          priority
        />
        <div
          className="hero-story__veil"
          style={{ opacity: lerp(0.67, 0.24, camera) }}
        />
        <HeroIntro opacity={introOpacity} />
        <div
          className="hero-story__top section-kicker"
          style={{ opacity: 1 - introOpacity }}
        >
          <span>01 / FIRST IDEA</span>
          <span>CAMERA 0{Math.min(4, 1 + Math.floor(progress * 4))}</span>
        </div>
        <p
          className="hero-story__reveal"
          style={{
            opacity: revealOpacity,
            transform: `translateY(${(1 - revealOpacity) * 35}px)`,
          }}
        >
          一个片段。
          <br />就是开始。
          <small>A SINGLE CLIP. A PLACE TO BEGIN.</small>
        </p>
        <MusicMetadata className="hero-story__metadata" />
        <div className="story-progress">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
