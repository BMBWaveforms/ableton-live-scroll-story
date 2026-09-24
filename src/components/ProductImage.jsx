import React, { useState } from "react";
import { assetPath } from "../utils/assetPath.js";

export const SESSION_IMAGE = assetPath("assets/ableton/live-session-view.webp");
export const CLOSEUP_IMAGE = assetPath("assets/ableton/live-session-closeup.webp");
export const LITE_IMAGE = assetPath("assets/ableton/live-lite-session.webp");

export default function ProductImage({
  src = SESSION_IMAGE,
  alt = "Real Ableton Live Session View screenshot",
  scale = 1,
  x = 0,
  y = 0,
  origin = "center top",
  className = "",
  style,
  children,
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`product-image${loaded ? " is-loaded" : ""} ${className}`} style={style}>
      <div
        className="product-image__camera"
        style={{
          transform: `translate3d(${x}%, ${y}%, 0) scale(${scale})`,
          transformOrigin: origin,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable="false"
          onLoad={() => setLoaded(true)}
        />
        {children}
      </div>
    </div>
  );
}
