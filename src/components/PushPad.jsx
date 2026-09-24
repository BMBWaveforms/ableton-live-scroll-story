import React, { memo, useState } from "react";

function PushPad({ index, active, onActivate }) {
  const [pressed, setPressed] = useState(false);
  const color = ["#e8f43d", "#f49a55", "#ed9dbb", "#55d6cf", "#7295ff"][index % 5];
  return (
    <button
      type="button"
      className={`push-hit${active || pressed ? " is-active" : ""}`}
      style={{ "--pad-color": color }}
      onPointerEnter={() => onActivate(index)}
      onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(index)}
      onBlur={() => onActivate(null)}
      onClick={() => setPressed((value) => !value)}
      aria-label={`Push pad ${index + 1}${pressed ? ", playing" : ""}`}
      aria-pressed={pressed}
    />
  );
}

export default memo(PushPad);
