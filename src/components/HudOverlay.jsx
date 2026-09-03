import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';

export default function HudOverlay({
  progress = 0,
  currentFrame = 1,
  totalFrames = 120,
  stageTitle = 'MEKO DELI // DOUBLE SMASH',
  statusText = 'SCROLL TO UNPACK',
  onScrubClick,
}) {
  const [timecode, setTimecode] = useState('00:01:24:08');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Timecode incrementer for cinematic feel
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 40)).padStart(2, '0');
      setTimecode(`00:${m}:${s}:${ms}`);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hud-layer">
      {/* Corner Viewfinder Brackets */}
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>

      {/* Top Telemetry Header */}
      <div className="hud-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="hud-rec-badge">
            <span className="rec-dot animate-rec-pulse"></span>
            <span>REC</span>
            <span style={{ color: '#ffffff', opacity: 0.9 }}>{timecode}</span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              display: 'none',
            }}
            className="d-md-inline"
          >
            {stageTitle}
          </span>
        </div>

        <div className="hud-specs-badge">
          <span>FLAT-TOP: <strong style={{ color: 'var(--gold-light)' }}>260°C</strong></span>
          <span>4K · 60FPS</span>
          <span>ISO 400</span>
          <span>F/1.8 MACRO</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: soundEnabled ? 'var(--green-bright)' : 'var(--text-muted)',
              marginLeft: '0.5rem',
            }}
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </div>

      {/* Center Reticle Crosshair */}
      <div className="hud-crosshair">
        <div className="reticle-ring"></div>
      </div>

      {/* Bottom Timeline & Scrub Ruler */}
      <div className="hud-bottom-scrub">
        <div className="scrub-telemetry-row">
          <div className="scrub-state-badge">
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: progress > 0.1 && progress < 0.85 ? 'var(--gold-light)' : 'var(--green-bright)',
              }}
            ></span>
            <span>{statusText}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-secondary)' }}>
            <span>SCRUB: <strong style={{ color: '#ffffff' }}>{Math.round(progress * 100)}%</strong></span>
            <span>FRAME: <strong style={{ color: 'var(--gold-light)' }}>{String(currentFrame).padStart(3, '0')}</strong> / {totalFrames}</span>
            <span>SECTION 01 / 02</span>
          </div>
        </div>

        {/* Clickable Scrub Ruler Track */}
        <div
          className="scrub-ruler-track"
          onClick={(e) => {
            if (onScrubClick) {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              onScrubClick(ratio);
            }
          }}
        >
          <div className="scrub-ruler-ticks"></div>
          <div
            className="scrub-progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          ></div>
          <div
            className="scrub-head-marker"
            style={{ left: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          ></div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .d-md-inline { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}
