import React from "react";
import { SESSION_IMAGE } from "./ProductImage.jsx";

export default function SectionTransition() {
  return (
    <section
      className="section-transition"
      aria-label="Every track starts somewhere"
    >
      <div
        className="section-transition__strip"
        style={{ backgroundImage: `url(${SESSION_IMAGE})` }}
      />
      <div className="section-transition__copy">
        <span>01 / 02</span>
        <p>每首作品，都从某个声音开始。<small>EVERY TRACK STARTS SOMEWHERE.</small></p>
        <span>↓</span>
      </div>
    </section>
  );
}
