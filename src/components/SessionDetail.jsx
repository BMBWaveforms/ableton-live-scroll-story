import React, { useState } from "react";
import ProcessIcon from "./ProcessIcon.jsx";

const phases = [
  { id: "capture", title: "捕捉", en: "CAPTURE", description: "先留下眼前的声音，不必把整首歌想完。" },
  { id: "play", title: "试听", en: "PLAY", description: "让片段循环起来，在重复中发现方向。" },
  { id: "layer", title: "叠加", en: "LAYER", description: "把节奏、旋律和质感一层层放进来。" },
  { id: "loop", title: "循环", en: "LOOP", description: "一个想法开始有律动，也开始有生命。" },
];

const initialSteps = [true, false, false, false, true, false, true, false, true, false, false, true, true, false, true, false];

export default function SessionDetail() {
  const [active, setActive] = useState("capture");
  const [steps, setSteps] = useState(initialSteps);

  const toggleStep = (index) => {
    setSteps((current) => current.map((value, stepIndex) => stepIndex === index ? !value : value));
  };

  return (
    <section
      id="loop-lab"
      className="session-detail loop-lab"
      aria-labelledby="loop-lab-heading"
    >
      <div className="session-detail__heading">
        <span className="section-kicker">02 / LOOP LAB</span>
        <div>
          <p id="loop-lab-heading">把一次尝试，变成可以继续生长的循环。</p>
          <small>TURN AN IDEA INTO A GROOVE.</small>
        </div>
        <span>点击节拍点，改变循环 ↗</span>
      </div>
      <div className="loop-lab__body">
        <div className="loop-phases">
          {phases.map((phase, index) => (
          <button
            key={phase.id}
            type="button"
            className={`loop-phase${active === phase.id ? " is-active" : ""}`}
            onPointerEnter={() => setActive(phase.id)}
            onFocus={() => setActive(phase.id)}
            onClick={() => setActive(phase.id)}
          >
            <span className="loop-phase__index">0{index + 1}</span>
            <ProcessIcon type={phase.id} />
            <strong>{phase.title}</strong>
            <small>{phase.en}</small>
            <p>{phase.description}</p>
          </button>
        ))}
        </div>
        <div className="loop-sequencer">
          <div className="loop-sequencer__top section-kicker"><span>CLIP / 01</span><span>120 BPM</span><span>1 BAR</span></div>
          <div className="loop-sequencer__steps">
            {steps.map((enabled, index) => (
              <button
                key={index}
                type="button"
                className={enabled ? "is-on" : ""}
                onClick={() => toggleStep(index)}
                aria-label={`第 ${index + 1} 拍${enabled ? "，已点亮" : ""}`}
                aria-pressed={enabled}
              ><span>{String(index + 1).padStart(2, "0")}</span></button>
            ))}
          </div>
          <div className="loop-sequencer__playhead" aria-hidden="true"><span /></div>
          <div className="loop-sequencer__footer"><span>循环播放中</span><span>LOOPING</span></div>
        </div>
      </div>
    </section>
  );
}
