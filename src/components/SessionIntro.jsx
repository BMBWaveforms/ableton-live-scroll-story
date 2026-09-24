import React from "react";
import ProductImage from "./ProductImage.jsx";
import MusicMetadata from "./MusicMetadata.jsx";

export default function SessionIntro() {
  return (
    <section className="session-intro" aria-labelledby="session-heading">
      <ProductImage
        className="session-intro__image"
        scale={1.08}
        origin="center top"
      />
      <div className="session-intro__veil" />
      <div className="session-intro__content">
        <span className="section-kicker">02 / SESSION</span>
        <h2 id="session-heading">
          从任何声音开始。
          <br />
          <span>再慢慢长成作品。</span>
        </h2>
        <p>
          放进一段节奏、录下一句旋律、触发一个片段，或者只是随手试试。
          <br />
          在它成为一首歌之前，Live 先给灵感足够的生长空间。
        </p>
      </div>
      <MusicMetadata
        chapter="LIVE / SESSION"
        className="session-intro__metadata"
      />
    </section>
  );
}
