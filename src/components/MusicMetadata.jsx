import React from "react";

export default function MusicMetadata({
  chapter = "IDEA 001",
  className = "",
}) {
  return (
    <div className={`music-metadata ${className}`}>
      <span>{chapter}</span>
      <span>120 BPM</span>
      <span>04 / 04</span>
      <span>BAR 001</span>
    </div>
  );
}
