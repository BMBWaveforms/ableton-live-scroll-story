import React, { memo } from "react";

function TimelineHighlight({ part, active, onActivate }) {
  return (
    <button
      type="button"
      className={`timeline-highlight${active ? " is-active" : ""}`}
      style={{
        left: `${part.left}%`,
        width: `${part.width}%`,
        "--part-color": part.color,
      }}
      onPointerEnter={() => onActivate(part.id)}
      onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(part.id)}
      onBlur={() => onActivate(null)}
      aria-label={`${part.name}, ${part.range}, ${part.bars}`}
    >
      <span>{part.name}</span>
      <small>{part.range}<br />{part.bars}</small>
    </button>
  );
}

export default memo(TimelineHighlight);
