import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const playheadRef = useRef(null);

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      playheadRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: true } },
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section id="final" className="final-cta" ref={sectionRef} aria-labelledby="final-heading">
      <div className="final-waveform" aria-hidden="true">
        {Array.from({ length: 96 }, (_, index) => <i key={index} style={{ height: `${12 + ((index * 17) % 54)}%` }} />)}
      </div>
      <div className="final-playhead"><span ref={playheadRef} /></div>
      <div className="final-status section-kicker"><span>07 / FINAL</span><span>TRACK COMPLETE</span></div>
      <div className="final-content">
        <span>Ableton Live 12</span>
        <h2 id="final-heading">你会创造<br />什么？<small>WHAT WILL YOU MAKE?</small></h2>
        <div className="final-actions">
          <a href="https://www.ableton.com/en/trial/" target="_blank" rel="noreferrer">免费试用 Live <small>TRY LIVE FREE</small><span>↗</span></a>
          <a href="https://www.ableton.com/en/shop/live/" target="_blank" rel="noreferrer">购买 Live <small>BUY LIVE</small><span>↗</span></a>
          <a href="https://www.ableton.com/en/live/what-is-live/" target="_blank" rel="noreferrer">探索 Live <small>EXPLORE LIVE</small></a>
          <a href="https://www.ableton.com/en/shop/live/" target="_blank" rel="noreferrer">比较版本 <small>COMPARE EDITIONS</small></a>
        </div>
      </div>
    </section>
  );
}
