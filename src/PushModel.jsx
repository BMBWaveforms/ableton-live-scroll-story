import React, { useMemo } from 'react';

const activePads = new Map([
  [0, 'coral'], [7, 'coral'], [11, 'mint'], [18, 'coral'],
  [28, 'mint'], [36, 'coral'], [47, 'mint'], [57, 'coral'],
]);
const CORE_PAD = 27;

export default function PushModel({ camera, gesture, canPlay, onPointerDown, onPointerMove, onPointerUp, onKeyDown, onKeyUp }) {
  const decorativePads = useMemo(() => Array.from({ length: 64 }, (_, i) => {
    if (i === CORE_PAD) return null;
    const color = activePads.get(i);
    return <span key={i} className={`model-pad ${color ? `model-pad--${color}` : ''}`} aria-hidden="true"><span className="pad-side" /><span className="pad-surface"><span className="pad-light" /></span></span>;
  }), []);
  const coreStyle = {
    '--press': gesture.active ? gesture.pressure : 0,
    '--pitch-tilt': `${gesture.pitch * 1.5}deg`,
    '--slide-tilt': `${(gesture.slide - 0.5) * 8}deg`,
  };

  return <div className="model-space" style={camera} aria-label="Push 3 概念三维模型">
    <div className="model-floor" />
    <div className="model-camera">
      <div className="push-device">
        <div className="device-edge" />
        <div className="device-face">
          <div className="encoder-bank" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span className="encoder" key={i} />)}</div>
          <div className="upper-buttons" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} />)}</div>
          <div className="model-display" aria-hidden="true">
            <div className="display-track"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="display-lines"><span /><span /><span /><span /><span /></div>
          </div>
          <div className="side-button-group side-button-group--left" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} />)}</div>
          <div className="side-button-group side-button-group--right" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} />)}</div>
          <div className="side-dial side-dial--left" aria-hidden="true" />
          <div className="side-dial side-dial--right" aria-hidden="true" />
          <div className="model-pad-grid">
            {decorativePads.map((pad, i) => i === CORE_PAD
                ? <button key={i} className={`model-pad model-pad--core ${gesture.active ? 'is-pressed' : ''}`} style={coreStyle} type="button" aria-label="按住这颗 Pad 发声，左右拖动改变音高，上下拖动改变音色"
                    tabIndex={canPlay ? 0 : -1} disabled={!canPlay}
                    onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
                    onKeyDown={onKeyDown} onKeyUp={onKeyUp}><span className="pad-side" /><span className="pad-surface"><span className="pad-light" /></span></button>
                : pad)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}
