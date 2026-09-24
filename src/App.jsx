import React, { useEffect, useMemo, useRef, useState } from 'react';
import { assetPath } from './utils/assetPath.js';
import { GestureSynth } from './audioEngine.js';
import PushModel from './PushModel.jsx';
import './styles.css';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const map = (value, a, b) => clamp((value - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => { const x = clamp(t); return x * x * (3 - 2 * x); };

function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        setProgress(clamp(-rect.top / travel));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return [ref, progress];
}

const cameraStops = [
  { p: 0, scale: 2.62 },
  { p: 0.17, scale: 1.28 },
  { p: 0.4, scale: 1.28 },
  { p: 0.53, scale: 0.62 },
  { p: 0.64, scale: 0.36 },
  { p: 0.78, scale: 0.31 },
  { p: 1, scale: 0.26 },
];

function cameraAt(progress) {
  for (let i = 0; i < cameraStops.length - 1; i += 1) {
    const a = cameraStops[i];
    const b = cameraStops[i + 1];
    if (progress <= b.p) {
      const t = smooth(map(progress, a.p, b.p));
      return { scale: mix(a.scale, b.scale, t) };
    }
  }
  return cameraStops.at(-1);
}

function Waveform({ pitch, slide, pressure, active }) {
  const path = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 110; i += 1) {
      const x = i * 4;
      const envelope = Math.sin(Math.PI * i / 110) ** 1.5;
      const wave = Math.sin(i * (0.35 + pitch * 0.028)) + Math.sin(i * (0.72 + slide * 0.3)) * 0.38;
      points.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(48 + wave * envelope * (active ? 15 + pressure * 22 : 8)).toFixed(1)}`);
    }
    return points.join(' ');
  }, [pitch, slide, pressure, active]);
  return <svg className="waveform" viewBox="0 0 440 96" aria-hidden="true"><path d={path} /></svg>;
}

function Journey() {
  const [ref, progress] = useScrollProgress();
  const synth = useRef(null);
  const pointer = useRef(null);
  const holdTimer = useRef(null);
  const [gesture, setGesture] = useState({ active: false, pitch: 0, slide: 0.5, pressure: 0.2, strikes: 0, pressureKind: '模拟力度' });
  const camera = cameraAt(progress);
  const chapter = progress < 0.205 ? 'touch' : progress < 0.435 ? 'express' : 'build';
  const canPlay = progress < 0.44;
  const modelStyle = {
    '--cam-scale': camera.scale,
    '--cam-scale-mobile': camera.scale * (0.43 + 0.12 * smooth(map(camera.scale, 0.28, 2.62))),
    '--cam-mobile-top': `${mix(63, 57, smooth(map(progress, 0.15, 0.25)))}%`,
    '--cam-x': `${progress < 0.42 ? mix(62, 69, smooth(map(progress, 0, 0.23))) : progress < 0.62 ? mix(69, 28, smooth(map(progress, 0.42, 0.62))) : mix(28, 50, smooth(map(progress, 0.62, 1)))}%`,
    '--cam-tilt': `${mix(24, 12, smooth(map(progress, 0.55, 1)))}deg`,
    '--cam-shade': 1 - smooth(map(progress, 0.42, 0.6)),
  };
  const stageLabel = progress < 0.52 ? '从 Pad 开始' : progress < 0.78 ? '镜头拉远中' : '整台 Push 3';

  useEffect(() => () => { clearInterval(holdTimer.current); synth.current?.dispose(); }, []);

  function updateFromPointer(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width);
    const y = clamp((event.clientY - rect.top) / rect.height);
    const pitch = (x - pointer.current.startX) * 5;
    const slide = 1 - y;
    const hasPressure = event.pointerType === 'pen' || (event.pointerType === 'touch' && event.pressure > 0 && event.pressure !== 0.5);
    const pressure = hasPressure ? clamp(event.pressure) : gesture.pressure;
    setGesture(old => ({ ...old, pitch, slide, pressure, pressureKind: hasPressure ? '真实指针压力' : '模拟力度' }));
    synth.current?.update({ pitch, slide, pressure });
  }

  function begin(event) {
    if (!canPlay || pointer.current) return;
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = { id: event.pointerId, startX: clamp((event.clientX - rect.left) / rect.width), started: performance.now() };
    event.currentTarget.setPointerCapture(event.pointerId);
    const next = { active: true, pitch: 0, slide: clamp(1 - (event.clientY - rect.top) / rect.height), pressure: 0.22, strikes: gesture.strikes + 1, pressureKind: '模拟力度' };
    setGesture(next);
    synth.current ||= new GestureSynth();
    synth.current.start(next);
    clearInterval(holdTimer.current);
    holdTimer.current = setInterval(() => {
      if (!pointer.current) return;
      const held = clamp((performance.now() - pointer.current.started) / 1600);
      setGesture(old => {
        if (old.pressureKind === '真实指针压力') return old;
        const pressure = 0.22 + held * 0.66;
        synth.current?.update({ pitch: old.pitch, slide: old.slide, pressure });
        return { ...old, pressure };
      });
    }, 70);
  }

  function move(event) {
    if (pointer.current?.id !== event.pointerId) return;
    updateFromPointer(event);
  }

  function end(event) {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    clearInterval(holdTimer.current);
    synth.current?.stop();
    setGesture(old => ({ ...old, active: false }));
  }

  function onKeyDown(event) {
    if ((event.key === 'Enter' || event.key === ' ') && !gesture.active) {
      event.preventDefault();
      const next = { ...gesture, active: true, strikes: gesture.strikes + 1, pressure: 0.32 };
      setGesture(next);
      synth.current ||= new GestureSynth();
      synth.current.start(next);
    }
  }
  function onKeyUp(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      synth.current?.stop();
      setGesture(old => ({ ...old, active: false }));
    }
  }

  return <section className="journey" id="touch" ref={ref} aria-label="触碰、表达、创作">
    <div className="journey-sticky">
      <div className="journey-backdrop" />
      <div className="chapter-rule"><span>PUSH 3 <b>/</b> 概念三维模型</span><span>TOUCH · EXPRESS · BUILD</span><span>{chapter === 'touch' ? '01 / TOUCH' : chapter === 'express' ? '02 / EXPRESS' : '03 / BUILD'}</span></div>
      <PushModel camera={modelStyle} gesture={gesture} canPlay={canPlay} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
      <div className={`touch-copy chapter-copy ${chapter === 'touch' ? 'is-visible' : ''}`}>
        <span className="eyebrow">01 / TOUCH</span>
        <h1>音乐，从<br /><em>触碰开始。</em></h1>
        <p>按下这颗 Pad，听见第一个音符。</p>
      </div>
      <div className={`express-copy chapter-copy ${chapter === 'express' ? 'is-visible' : ''}`} id="express">
        <span className="eyebrow">02 / EXPRESS</span>
        <h2>一个音符，<br /><em>不止一种形状。</em></h2>
        <p>继续按住刚才的 Pad，试着移动手指。</p>
      </div>
      <div className={`build-copy chapter-copy ${chapter === 'build' ? 'is-visible' : ''}`} id="build" style={{ opacity: chapter === 'build' ? smooth(map(progress, 0.54, 0.62)) * (1 - smooth(map(progress, 0.82, 0.96))) : 0 }}>
        <span className="eyebrow">03 / BUILD</span>
        <h2>从一颗 Pad，<br /><em>到整台乐器。</em></h2>
        <p>向下滚动，让镜头一步步拉远。</p>
      </div>
      <div className={`interaction-guide ${chapter === 'build' ? 'is-build' : ''}`}>
        {chapter === 'touch' ? <><span className="guide-signal">↘</span><strong>{gesture.strikes ? '再试一次，或向下滚动' : '按下中央 Pad'}</strong><small>{gesture.strikes ? 'PLAY AGAIN / SCROLL' : 'PRESS THE PAD / HEAR C3'}</small></>
          : chapter === 'express' ? <><div><b>↔</b><span>左右拖动<small>改变音高 / PITCH</small></span></div><div><b>↕</b><span>上下拖动<small>改变音色 / TIMBRE</small></span></div><div><b>●</b><span>持续按住<small>增强力度 / PRESSURE</small></span></div></>
          : <><strong>继续向下滚动</strong><small>SCROLL TO REVEAL THE INSTRUMENT</small></>}
      </div>
      <div className={`gesture-data ${chapter === 'express' ? 'is-visible' : ''}`} aria-live="off">
        <Waveform pitch={gesture.pitch} slide={gesture.slide} pressure={gesture.pressure} active={gesture.active} />
        <div className="gesture-values"><span>音高 <strong>{gesture.pitch >= 0 ? '+' : ''}{gesture.pitch.toFixed(1)} ST</strong></span><span>音色 <strong>{Math.round(gesture.slide * 100)}%</strong></span><span>力度 <strong>{Math.round(gesture.pressure * 100)}%</strong></span></div>
        <small>{gesture.pressureKind === '模拟力度' ? 'WEB TRANSLATION · 鼠标以按住时长模拟力度' : 'POINTER PRESSURE · 使用设备压力'}</small>
      </div>
      <div className="journey-bottom"><span>{chapter === 'build' ? stageLabel : gesture.active ? 'C3 / 正在发声' : gesture.strikes ? 'C3 / 已释放' : 'C3 / 等待触碰'}</span><span>{chapter === 'build' ? '触碰 → 表达 → 整机' : chapter === 'express' ? '按住 · 拖动 · 松开' : '按下发声 · 滚动探索'}</span></div>
      <div className="journey-progress" style={{ transform: `scaleX(${progress})` }} />
    </div>
  </section>;
}

function Standalone() {
  const [ref, progress] = useScrollProgress();
  return <section className="standalone" id="standalone" ref={ref} aria-label="Push 3 独立模式">
    <div className="standalone-sticky">
      <div className="standalone-photo" style={{ transform: `translate3d(0, ${mix(5, -4, progress)}%, 0) scale(${mix(1.18, 1, progress)})` }}>
        <img src={assetPath('assets/ableton/push/push-performance.webp')} alt="Push 3 与耳机放在桌面上，周围没有电脑" loading="lazy" />
      </div>
      <span className="section-index standalone-index">04 / BREAK FREE</span>
      <div className="standalone-copy" style={{ opacity: smooth(map(progress, 0.43, 0.63)), transform: `translateY(${mix(40, 0, smooth(map(progress, 0.43, 0.65)))}px)` }}>
        <h2>灵感来了，<br /><em>不用打开电脑。</em></h2>
        <p>Push 3 Standalone 可以独立运行，让创作始终留在手边。</p>
      </div>
      <span className="standalone-foot">STAY WITH THE MUSIC <b>↗</b></span>
    </div>
  </section>;
}

function Live() {
  const [ref, progress] = useScrollProgress();
  const pushReveal = smooth(map(progress, 0.02, 0.28));
  const liveReveal = smooth(map(progress, 0.13, 0.43));
  const copyReveal = mix(0.7, 1, smooth(map(progress, 0, 0.35)));
  return <section className="live-scene" id="live" ref={ref} aria-label="Push 与 Ableton Live">
    <div className="live-sticky">
      <div className="live-screen" style={{ opacity: liveReveal, transform: `translateX(${mix(7, 0, liveReveal)}%)` }}>
        <img src={assetPath('assets/ableton/live-session-view.webp')} alt="Ableton Live Session View 的轨道、片段与音符编辑界面" loading="lazy" />
      </div>
      <span className="section-index live-index">05 / PUSH × LIVE</span>
      <div className="live-copy" style={{ opacity: copyReveal, transform: `translateY(${mix(28, 0, copyReveal)}px)` }}>
        <h2>当想法长大，<br /><em>回到 Live 继续。</em></h2>
        <p>在 Push 上捕捉一个想法，再到 Live 的 Session View 里继续编排、混音与打磨。</p>
      </div>
      <div className="live-device" style={{ opacity: pushReveal, transform: `translateY(${mix(50, 0, pushReveal)}px)` }}>
        <img src={assetPath('assets/ableton/push/push-top.webp')} alt="Push 3 上的 Pad 和彩色片段" loading="lazy" />
      </div>
      <div className="live-flow" aria-label="从 Push 捕捉到 Live 编排"><span>01 / PUSH 3　演奏与捕捉</span><b aria-hidden="true">↗</b><span>02 / LIVE　继续编排与制作</span></div>
    </div>
  </section>;
}

function Ending() {
  return <section className="ending" id="ending" aria-label="留在音乐里">
    <h2 className="ending-title">留在音乐里。</h2>
    <div className="ending-product"><img src={assetPath('assets/ableton/push/push-top.webp')} alt="从上方看到完整的 Push 3" loading="lazy" /></div>
  </section>;
}

export default function App() {
  return <>
    <nav className="navigation" aria-label="主导航"><a href="#touch" className="brand" aria-label="Push 3 概念站，返回顶部"><span className="brand-mark">▦</span> PUSH<span className="brand-number">3</span></a><span className="nav-center">一次关于触碰与创作的互动实验</span><a href="#ending" className="nav-end">继续探索 <span>↘</span></a></nav>
    <main><Journey /><Standalone /><Live /><Ending /></main>
    <footer className="footer"><span>PUSH 3 / INTERACTIVE CONCEPT</span><p>非官方概念项目。与 Ableton AG 无合作或背书关系。</p><a href="#touch">回到顶部 ↑</a></footer>
  </>;
}
