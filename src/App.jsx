import React, { useEffect, useMemo, useRef, useState } from 'react';
import { assetPath } from './utils/assetPath.js';
import { GestureSynth } from './audioEngine.js';
import PushModel from './PushModel.jsx';
import './styles.css';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const map = (value, a, b) => clamp((value - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => { const x = clamp(t); return x * x * (3 - 2 * x); };

const trailMedia = [
  { src: 'assets/ableton/official-effects/roar-live12.png', label: 'ROAR / SATURATION', kind: 'wide' },
  { src: 'assets/ableton/official-effects/hybrid-reverb-live12.png', label: 'HYBRID REVERB / SPACE', kind: 'wide' },
  { src: 'assets/ableton/official-effects/spectral-time-live12.png', label: 'SPECTRAL TIME / TEXTURE', kind: 'wide' },
  { src: 'assets/ableton/official-effects/auto-filter-live12.png', label: 'AUTO FILTER / MOTION', kind: 'wide' },
  { src: 'assets/ableton/official-effects/echo-live12.png', label: 'ECHO / MOVEMENT', kind: 'wide' },
  { src: 'assets/ableton/official-effects/delay-live12.png', label: 'DELAY / REPEAT', kind: 'wide' },
  { src: 'assets/ableton/official-effects/reverb-live12.png', label: 'REVERB / DEPTH', kind: 'wide' },
  { src: 'assets/ableton/official-effects/spectral-resonator-live12.png', label: 'SPECTRAL RESONATOR / HARMONICS', kind: 'wide' },
  { src: 'assets/ableton/official-effects/grain-delay-live12.png', label: 'GRAIN DELAY / PARTICLES', kind: 'wide' },
  { src: 'assets/ableton/official-effects/chorus-ensemble-live12.png', label: 'CHORUS-ENSEMBLE / WIDTH', kind: 'wide' },
];

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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return [ref, progress];
}

function Hero() {
  const serial = useRef(3);
  const last = useRef({ x: 0, y: 0 });
  const [trail, setTrail] = useState([
    { id: 0, media: trailMedia[1], x: 16, y: 34, rotate: -7 },
    { id: 1, media: trailMedia[2], x: 76, y: 25, rotate: 4 },
    { id: 2, media: trailMedia[7], x: 69, y: 73, rotate: -3 },
  ]);

  function reveal(event, force = false) {
    if (event.pointerType === 'touch' && !force) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPx = event.clientX - rect.left;
    const yPx = event.clientY - rect.top;
    if (!force && Math.hypot(xPx - last.current.x, yPx - last.current.y) < 82) return;
    last.current = { x: xPx, y: yPx };
    const id = serial.current++;
    const media = trailMedia[id % trailMedia.length];
    setTrail((items) => [...items.slice(-7), {
      id,
      media,
      x: clamp((xPx / rect.width) * 100, 8, 92),
      y: clamp((yPx / rect.height) * 100, 15, 88),
      rotate: ((id * 7) % 13) - 6,
    }]);
  }

  return <section className="hero" id="top" onPointerMove={reveal} onPointerDown={(event) => reveal(event, true)}>
    <div className="hero-trail" aria-hidden="true">
      {trail.map((item) => <figure key={item.id} className="trail-item" style={{ '--trail-x': `${item.x}%`, '--trail-y': `${item.y}%`, '--trail-r': `${item.rotate}deg`, '--trail-z': item.id }}>
        <img src={assetPath(item.media.src)} alt="" draggable="false" />
      </figure>)}
    </div>
    <div className="hero-copy">
      <p className="hero-overline">PUSH 3 / AN INSTRUMENT THAT LISTENS</p>
      <h1>SOUND,<br />IN YOUR HANDS.</h1>
      <p className="hero-lede">从一颗 Pad 出发，经过力度、音高与音色，最后长成一首完整的作品。</p>
    </div>
    <div className="hero-hint"><span className="hero-hint-dot" />移动鼠标，让声音显形<br /><small>MOVE TO REVEAL / CLICK ON TOUCH</small></div>
    <a className="hero-scroll" href="#effects" aria-label="向下继续探索">↓</a>
  </section>;
}

function EffectsPrelude() {
  const devices = [
    { src: 'assets/ableton/official-effects/roar-live12.png', name: 'Roar', desc: '给声音增加重量、摩擦与不可预测的反馈。' },
    { src: 'assets/ableton/official-effects/hybrid-reverb-live12.png', name: 'Hybrid Reverb', desc: '把空间变成乐器，让触碰拥有更长的尾音。' },
    { src: 'assets/ableton/official-effects/spectral-time-live12.png', name: 'Spectral Time', desc: '冻结、切开并重新排列声音里的时间。' },
    { src: 'assets/ableton/official-effects/auto-filter-live12.png', name: 'Auto Filter', desc: '让每次移动都带来新的音色方向。' },
    { src: 'assets/ableton/official-effects/echo-live12.png', name: 'Echo', desc: '把重复变成会呼吸、会偏移的节奏空间。' },
    { src: 'assets/ableton/official-effects/delay-live12.png', name: 'Delay', desc: '用左右声道的时间差制造前进与回响。' },
    { src: 'assets/ableton/official-effects/reverb-live12.png', name: 'Reverb', desc: '为声音建立从房间到峡谷的真实距离。' },
    { src: 'assets/ableton/official-effects/spectral-resonator-live12.png', name: 'Spectral Resonator', desc: '把频谱里的局部能量重新调成旋律。' },
    { src: 'assets/ableton/official-effects/grain-delay-live12.png', name: 'Grain Delay', desc: '把声音拆成颗粒，再改变它们的时间与音高。' },
    { src: 'assets/ableton/official-effects/chorus-ensemble-live12.png', name: 'Chorus-Ensemble', desc: '用轻微的偏移拓宽声音，并保留演奏的中心。' },
  ];
  return <section className="effects-prelude" id="effects">
    <header className="effects-heading">
      <span>01 / SOUND BEFORE SCREENS</span>
      <h2>你先碰到声音，<br />参数随后才出现。</h2>
      <p>Push 把 Live 里的乐器与效果器带到指尖。以下画面会在首屏随鼠标出现，也会在演奏时被旋钮、力度和手势直接改变。</p>
    </header>
    <div className="device-lines">
      {devices.map((device, index) => <article className="device-line" key={device.name}>
        <span className="device-count">{String(index + 1).padStart(2, '0')}</span>
        <div className="device-image"><img src={assetPath(device.src)} alt={`${device.name} 效果器界面`} loading="lazy" /></div>
        <h3>{device.name}</h3>
        <p>{device.desc}</p>
      </article>)}
    </div>
  </section>;
}

const cameraStops = [
  { p: 0, scale: 2.62 }, { p: 0.17, scale: 1.28 }, { p: 0.4, scale: 1.28 },
  { p: 0.53, scale: 0.62 }, { p: 0.64, scale: 0.36 }, { p: 0.78, scale: 0.31 }, { p: 1, scale: 0.26 },
];

function cameraAt(progress) {
  for (let i = 0; i < cameraStops.length - 1; i += 1) {
    const a = cameraStops[i];
    const b = cameraStops[i + 1];
    if (progress <= b.p) return { scale: mix(a.scale, b.scale, smooth(map(progress, a.p, b.p))) };
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

  useEffect(() => () => { clearInterval(holdTimer.current); synth.current?.dispose(); }, []);

  function updateFromPointer(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width);
    const y = clamp((event.clientY - rect.top) / rect.height);
    const pitch = (x - pointer.current.startX) * 5;
    const slide = 1 - y;
    const hasPressure = event.pointerType === 'pen' || (event.pointerType === 'touch' && event.pressure > 0 && event.pressure !== 0.5);
    const pressure = hasPressure ? clamp(event.pressure) : gesture.pressure;
    setGesture((old) => ({ ...old, pitch, slide, pressure, pressureKind: hasPressure ? '真实指针压力' : '模拟力度' }));
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
      setGesture((old) => {
        if (old.pressureKind === '真实指针压力') return old;
        const pressure = 0.22 + held * 0.66;
        synth.current?.update({ pitch: old.pitch, slide: old.slide, pressure });
        return { ...old, pressure };
      });
    }, 70);
  }

  function move(event) { if (pointer.current?.id === event.pointerId) updateFromPointer(event); }
  function end(event) {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    clearInterval(holdTimer.current);
    synth.current?.stop();
    setGesture((old) => ({ ...old, active: false }));
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
      setGesture((old) => ({ ...old, active: false }));
    }
  }

  return <section className="journey" id="touch" ref={ref} aria-label="触碰、表达、创作">
    <div className="journey-sticky">
      <div className="journey-backdrop" />
      <div className="chapter-rule"><span>PUSH 3 / PLAY IT</span><span>{chapter === 'touch' ? 'TOUCH' : chapter === 'express' ? 'EXPRESS' : 'THE WHOLE INSTRUMENT'}</span></div>
      <PushModel camera={modelStyle} gesture={gesture} canPlay={canPlay} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
      <div className={`touch-copy chapter-copy ${chapter === 'touch' ? 'is-visible' : ''}`}>
        <span className="section-kicker">02 / TOUCH</span><h2>先按下，<br /><em>再决定它是什么。</em></h2><p>按住画面中央的 Pad，听见第一个音符。</p>
      </div>
      <div className={`express-copy chapter-copy ${chapter === 'express' ? 'is-visible' : ''}`}>
        <span className="section-kicker">03 / EXPRESS</span><h2>一颗音，<br /><em>可以弯曲、滑动、加深。</em></h2><p>继续按住，左右改变音高，上下改变音色，时间会模拟力度。</p>
      </div>
      <div className={`build-copy chapter-copy ${chapter === 'build' ? 'is-visible' : ''}`} style={{ opacity: chapter === 'build' ? smooth(map(progress, 0.54, 0.62)) * (1 - smooth(map(progress, 0.84, 0.97))) : 0 }}>
        <span className="section-kicker">04 / BUILD</span><h2>从一颗 Pad，<br /><em>看到整台乐器。</em></h2><p>继续滚动，镜头会从触碰表面退回完整的 Push 3。</p>
      </div>
      <div className={`interaction-guide ${chapter}`}>
        {chapter === 'touch' && <><strong>{gesture.strikes ? '再试一次，或继续滚动' : '按住中央 Pad'}</strong><small>PRESS / HOLD / LISTEN</small></>}
        {chapter === 'express' && <><span>↔ 左右：音高</span><span>↕ 上下：音色</span><span>● 按住：力度</span></>}
        {chapter === 'build' && <><strong>继续向下滚动</strong><small>REVEAL THE WHOLE INSTRUMENT</small></>}
      </div>
      <div className={`gesture-data ${chapter === 'express' ? 'is-visible' : ''}`}><Waveform pitch={gesture.pitch} slide={gesture.slide} pressure={gesture.pressure} active={gesture.active} /><div className="gesture-values"><span>音高 <strong>{gesture.pitch >= 0 ? '+' : ''}{gesture.pitch.toFixed(1)} ST</strong></span><span>音色 <strong>{Math.round(gesture.slide * 100)}%</strong></span><span>力度 <strong>{Math.round(gesture.pressure * 100)}%</strong></span></div></div>
      <div className="journey-bottom"><span>{gesture.active ? 'C3 / 正在发声' : gesture.strikes ? 'C3 / 已释放' : 'C3 / 等待触碰'}</span><span>触碰 → 表达 → 成形</span></div>
      <div className="journey-progress" style={{ transform: `scaleX(${progress})` }} />
    </div>
  </section>;
}

function Showreel() {
  const [playing, setPlaying] = useState(false);
  return <section className="showreel" id="showreel">
    <header className="showreel-heading"><span>05 / SHOWREEL</span><h2>看它如何<br />进入一首歌。</h2><p>Ableton 官方 Push 3 介绍影片</p></header>
    <div className="showreel-player">
      {playing
        ? <iframe src="https://www.youtube-nocookie.com/embed/qcGUgp6yo_k?autoplay=1&rel=0" title="Introducing Push 3: An expressive standalone instrument — Ableton" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        : <button type="button" className="showreel-poster" onClick={() => setPlaying(true)} aria-label="播放 Ableton 官方 Push 3 介绍视频"><img src={assetPath('assets/ableton/video/push3-showreel.jpg')} alt="Ableton 官方 Push 3 介绍视频画面" loading="lazy" /><span className="play-button">播放 <b>▶</b></span></button>}
    </div>
    <a className="showreel-link" href="https://www.youtube.com/watch?v=qcGUgp6yo_k" target="_blank" rel="noreferrer">在 YouTube 查看官方视频 ↗</a>
  </section>;
}

function Standalone() {
  return <section className="standalone" id="standalone"><div className="standalone-copy"><span className="section-kicker">06 / STANDALONE</span><h2>电脑可以<br />暂时离开。</h2><p>处理器、电池、音频接口和完整的乐器都在 Push 里。灵感出现时，先演奏，再决定是否回到屏幕。</p></div><figure className="standalone-photo"><img src={assetPath('assets/ableton/official-push/p3-expressive.jpg')} alt="Ableton Push 3 与耳机组成的独立创作空间" loading="lazy" /><figcaption>Push 3 / Standalone mode</figcaption></figure></section>;
}

function Live() {
  const [ref, progress] = useScrollProgress();
  const reveal = smooth(map(progress, 0.08, 0.52));
  return <section className="live-scene" id="live" ref={ref}><div className="live-sticky"><div className="live-copy"><span className="section-kicker">07 / PUSH × LIVE</span><h2>想法长大，<br /><em>回到 Live 继续。</em></h2><p>在 Push 上捕捉表演，再把同一个 Set 带到 Live 的 Session View 里继续编排、混音与打磨。</p></div><div className="live-workspace" style={{ '--reveal': reveal }}><img src={assetPath('assets/ableton/live-session-view.webp')} alt="Ableton Live Session View 的轨道、片段与音符编辑界面" loading="lazy" /></div><div className="live-push" style={{ '--reveal': reveal }}><img src={assetPath('assets/ableton/official-push/p3-live-control.jpg')} alt="Push 3 控制 Ableton Live" loading="lazy" /></div><div className="live-path"><span>在 Push 捕捉</span><b>→</b><span>在 Live 展开</span></div></div></section>;
}

function Ending() {
  return <section className="ending" id="ending"><div className="ending-copy"><span>08 / KEEP CREATING</span><h2>留在<br />音乐里。</h2><a href="#top">再走一次 ↑</a></div><div className="ending-product"><img src={assetPath('assets/ableton/push/push-top.webp')} alt="从上方看到完整的 Push 3" loading="lazy" /></div></section>;
}

export default function App() {
  return <><nav className="navigation" aria-label="主导航"><a href="#top" className="brand" aria-label="Push 3 概念站，返回顶部"><span className="brand-mark" aria-hidden="true">▦</span> PUSH<sup>3</sup></a><span className="nav-center">触碰 / 表达 / 创作</span><a href="#touch" className="nav-end">开始体验 <span>↓</span></a></nav><main><Hero /><EffectsPrelude /><Journey /><Showreel /><Standalone /><Live /><Ending /></main><footer className="footer"><span>PUSH 3 / INTERACTIVE CONCEPT</span><p>非官方概念项目。产品图片、设备界面与官方影片版权归 Ableton AG 所有，本项目与 Ableton AG 无合作或背书关系。</p><a href="https://www.ableton.com/en/push/" target="_blank" rel="noreferrer">了解 Push 3 ↗</a></footer></>;
}
