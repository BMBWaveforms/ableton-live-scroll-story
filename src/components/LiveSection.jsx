import React from "react";
import ProductImage from "./ProductImage.jsx";
import ProcessIcon from "./ProcessIcon.jsx";
import { range, smooth, useSectionProgress } from "../hooks/useSectionProgress.js";
import { assetPath } from "../utils/assetPath.js";

const WORKSPACE_IMAGE = assetPath("assets/ableton/workspace/live-workspace.webp");

const phases = [
  { label: "创造", en: "CREATE", icon: "create", start: 0.06 },
  { label: "编排", en: "ARRANGE", icon: "arrange", start: 0.22 },
  { label: "塑形", en: "SHAPE", icon: "shape", start: 0.38 },
  { label: "演奏", en: "PERFORM", icon: "perform", start: 0.54 },
];

export default function LiveSection() {
  const { sectionRef, progress } = useSectionProgress();
  const finalIn = smooth(range(progress, 0.7, 0.9));

  return (
    <section id="live" className="live-section long-story" ref={sectionRef} aria-labelledby="live-heading">
      <div className="story-sticky live-stage">
        <ProductImage
          src={WORKSPACE_IMAGE}
          alt="Official Ableton studio workspace with Live on screen"
          className="live-workspace-image"
          scale={1.01}
          origin="center center"
        />
        <div className="live-shade" />
        <div className="section-frame section-kicker"><span>06 / LIVE</span><span>ONE ENVIRONMENT</span></div>
        <div className="live-workflow" style={{ opacity: Math.max(0, 1 - finalIn * 1.35) }}>
          <div className="live-workflow__intro">
            <span>同一个空间</span>
            <small>ONE ENVIRONMENT</small>
          </div>
          {phases.map((phase) => {
            const strength = smooth(range(progress, phase.start, phase.start + 0.13));
            return (
              <div className="live-workflow__step" key={phase.en} style={{ "--step-progress": strength }}>
                <ProcessIcon type={phase.icon} />
                <strong>{phase.label}</strong>
                <small>{phase.en}</small>
              </div>
            );
          })}
        </div>
        <div className="live-final-copy" style={{ opacity: finalIn }}>
          <h2 id="live-heading">一切都留在<br />创作的流动里。</h2>
          <p>创造。编排。塑形。演奏。</p>
          <small>CREATE. ARRANGE. SHAPE. PERFORM.</small>
          <em>从第一个声音到完成整首作品，始终在同一个环境里。</em>
        </div>
        <div className="live-progress-data section-kicker"><span>WORKSPACE / LIVE 12</span><span>{String(Math.round(progress * 100)).padStart(3, "0")}%</span></div>
        <div className="story-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </section>
  );
}
