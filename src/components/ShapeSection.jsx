import React from "react";
import ProductImage from "./ProductImage.jsx";
import { lerp, range, smooth, useSectionProgress } from "../hooks/useSectionProgress.js";
import { assetPath } from "../utils/assetPath.js";

const ROAR_IMAGE = assetPath("assets/ableton/devices/roar-device.webp");
const CHAIN_IMAGE = assetPath("assets/ableton/devices/live-device-chain.webp");
const MELD_IMAGE = assetPath("assets/ableton/devices/meld-device.webp");

export default function ShapeSection() {
  const { sectionRef, progress } = useSectionProgress();
  const camera = smooth(range(progress, 0.02, 0.48));
  const chainIn = smooth(range(progress, 0.42, 0.6));
  const copyOut = 1 - smooth(range(progress, 0.36, 0.52));
  const automation = smooth(range(progress, 0.58, 0.96));
  const bend = lerp(178, 66, automation);
  const finish = smooth(range(progress, 0.88, 0.98));

  return (
    <section id="shape" className="shape-section long-story" ref={sectionRef} aria-labelledby="shape-heading">
      <div className="story-sticky shape-stage">
        <ProductImage
          src={ROAR_IMAGE}
          alt="Official Ableton Roar audio effect interface"
          className="shape-roar-image"
          scale={lerp(2.2, 1.04, camera)}
          x={lerp(-5, 0, camera)}
          origin="20% center"
          style={{ opacity: 1 - chainIn }}
        />
        <ProductImage
          src={CHAIN_IMAGE}
          alt="Official Ableton Live device chain screenshot"
          className="shape-chain-image"
          scale={lerp(1.2, 1.02, chainIn)}
          origin="center bottom"
          style={{ opacity: chainIn }}
        />
        <div className="shape-shade" />
        <div className="section-frame section-kicker"><span>04 / SHAPE</span><span>DEVICE / ROAR</span></div>
        <div className="shape-copy" style={{ opacity: copyOut }}>
          <h2 id="shape-heading">让每个声音<br />都成为你的声音。</h2>
          <p>乐器、效果器和调制始终在同一条创作流中，不需要离开音乐。</p>
        </div>
        <div className="shape-verbs" style={{ opacity: chainIn * (1 - finish) }}>
          <span><b>构建</b><small>BUILD IT.</small></span><span><b>弯折</b><small>BEND IT.</small></span><span><b>打碎</b><small>BREAK IT.</small></span><span><b>重来</b><small>START AGAIN.</small></span>
        </div>
        <div className="device-data" style={{ opacity: 1 - chainIn }}>
          <span>DRIVE +6.4 dB</span><span>MIX 72%</span><span>MOD 01</span><span>FILTER 2.8 kHz</span>
        </div>
        <div className="device-chain-labels" style={{ opacity: chainIn }}>
          <span>INSTRUMENT</span><span>EFFECT</span><span>EFFECT</span><span>EQ</span>
        </div>
        <svg className="automation-curve" viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true" style={{ opacity: automation }}>
          <path d={`M 0 198 C 180 198, 205 ${bend}, 360 ${bend} S 575 ${215 - bend * 0.42}, 690 112 S 840 ${bend * 0.55}, 1000 35`} style={{ strokeDashoffset: 1400 * (1 - automation) }} />
        </svg>
        <div className="automation-label section-kicker" style={{ opacity: automation }}><span>AUTOMATION / FILTER</span><span>{Math.round(420 + automation * 2380)} Hz</span></div>
        <p className="shape-closing" style={{ opacity: finish }}>停止编辑。<br /><span>开始演奏。</span><small>STOP EDITING. START PLAYING.</small></p>
        <img className="shape-meld-detail" src={MELD_IMAGE} alt="Official Ableton Meld instrument interface" loading="lazy" style={{ opacity: chainIn * (1 - finish) }} />
        <div className="story-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </section>
  );
}
