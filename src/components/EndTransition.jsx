import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SESSION_IMAGE } from "./ProductImage.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function EndTransition() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      imageRef.current,
      { scaleX: 1 },
      {
        scaleX: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <section
      className="end-transition"
      ref={sectionRef}
      aria-label="Transition from Session to Arrangement"
    >
      <div
        className="end-transition__visual"
        ref={imageRef}
        style={{ backgroundImage: `url(${SESSION_IMAGE})` }}
      />
      <div className="end-transition__shade" />
      <span className="section-kicker">02 / END OF SESSION</span>
      <p>
        当灵感准备好了，
        <br />
        <span>就把它编成一首歌。</span>
      </p>
      <div className="end-transition__bottom">
        <span>LIVE / SESSION</span>
        <span>NEXT / ARRANGE</span>
      </div>
    </section>
  );
}
