import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const clamp = (value) => Math.min(1, Math.max(0, value));
export const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
export const range = (value, start, end) =>
  clamp((value - start) / (end - start));
export const lerp = (start, end, progress) => start + (end - start) * progress;

export function useSectionProgress() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(0);
  const queuedProgressRef = useRef(0);
  const renderedProgressRef = useRef(-1);

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        queuedProgressRef.current = Math.round(self.progress * 300) / 300;
        if (frameRef.current) return;
        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = 0;
          if (queuedProgressRef.current === renderedProgressRef.current) return;
          renderedProgressRef.current = queuedProgressRef.current;
          setProgress(queuedProgressRef.current);
        });
      },
    });
    setProgress(trigger.progress);
    return () => {
      trigger.kill();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { sectionRef, progress };
}
