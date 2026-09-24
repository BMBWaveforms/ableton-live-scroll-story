import React, { useState } from "react";
import ProductImage from "./ProductImage.jsx";
import TrackHighlight from "./TrackHighlight.jsx";
import { trackGroups } from "../data/tracks.js";
import {
  lerp,
  range,
  smooth,
  useSectionProgress,
} from "../hooks/useSectionProgress.js";

export default function SessionStory() {
  const { sectionRef, progress } = useSectionProgress();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState({});
  const camera = smooth(progress);
  const textFade = 1 - smooth(range(progress, 0.18, 0.38));
  const groove =
    smooth(range(progress, 0.39, 0.5)) *
    (1 - smooth(range(progress, 0.62, 0.74)));

  return (
    <section
      className="session-story story-section"
      ref={sectionRef}
      aria-label="Explore ideas in Session View"
    >
      <div className="story-sticky session-story__stage">
        <ProductImage
          className="session-story__image"
          style={{
            "--mobile-pan": `${lerp(0, -Math.max(0, Math.max(window.innerHeight, 700) - window.innerWidth), camera)}px`,
          }}
          scale={lerp(1.16, 1.02, camera)}
          x={lerp(2, -2, camera)}
          origin="center top"
        >
          <div className="track-highlights">
            {trackGroups.map((track) => (
              <TrackHighlight
                key={track.id}
                track={track}
                progress={progress}
                hovered={hovered === track.id}
                selected={selected[track.id]}
                onHover={setHovered}
                onSelect={(id, value) =>
                  setSelected((current) => ({ ...current, [id]: value }))
                }
              />
            ))}
          </div>
        </ProductImage>
        <div className="session-story__gradient" />
        <div className="session-story__top section-kicker">
          <span>02 / SESSION</span>
          <span>LIVE / SESSION VIEW</span>
        </div>
        <div className="session-story__copy" style={{ opacity: textFade }}>
          <span>先试，再决定。 / IDEAS, NOT A TIMELINE.</span>
          <p>
            从任何地方开始。
            <br />
            别让灵感停下来。
          </p>
          <small>悬停或点击轨道，听见层次如何加入</small>
        </div>
        <p
          className="session-story__groove"
          style={{
            opacity: groove,
            transform: `translateY(${(1 - groove) * 24}px)`,
          }}
        >
          一个想法，开始有了律动。
        </p>
        <div className="session-story__counter">
          {String(1 + Math.round(progress * 4)).padStart(2, "0")} / 05 LAYERS
        </div>
        <div className="story-progress">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
