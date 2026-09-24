import React from "react";
import { range, smooth } from "../hooks/useSectionProgress.js";

export default function TrackHighlight({
  track,
  progress,
  hovered,
  selected,
  onHover,
  onSelect,
}) {
  const revealed =
    track.trigger === 0
      ? 1
      : smooth(range(progress, track.trigger, track.trigger + 0.12));
  const lit = selected ?? revealed > 0.65;
  const maskOpacity =
    hovered || selected === true
      ? 0.02
      : selected === false
        ? 0.73
        : 0.73 * (1 - revealed);
  return (
    <button
      type="button"
      className={`track-highlight${hovered ? " is-hovered" : ""}${lit ? " is-lit" : ""}`}
      style={{
        left: `${track.left}%`,
        width: `${track.width}%`,
        "--track-color": track.color,
        "--mask-opacity": maskOpacity,
      }}
      onPointerMove={() => onHover(track.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(track.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(track.id, !lit)}
      aria-label={`${track.name}: ${lit ? "active" : "muted"}. Click to toggle highlight`}
      aria-pressed={lit}
    >
      <span className="track-highlight__rule" />
      <span className="track-highlight__info">
        <strong>{track.name}</strong>
        <small>
          4 BARS / 120 BPM
          <br />
          {track.label}
        </small>
      </span>
      <span className="track-highlight__pulse" aria-hidden="true" />
    </button>
  );
}
