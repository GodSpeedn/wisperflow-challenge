import React, { useState, useEffect } from 'react';
import { useScene } from '../../context/SceneContext';
import '../../styles/PlaygroundPills.scss';

export const PLAYGROUND_MODES = [
  { id: 'ai', icon: '🎙️', label: 'The Interview', desc: 'Figuring Out with Narayan (60s Pitch & Q&A)' },
  { id: 'game', icon: '🎭', label: '2 Truths & 1 Lie', desc: 'Interactive Detective Game' },
  { id: 'connect', icon: '📬', label: 'Direct Connect', desc: 'Barrels & Contacts' },
];

export default function PlaygroundPills() {
  const { currentRoom, overlayContent } = useScene();
  const [activeMode, setActiveMode] = useState('ai');

  // Listen for station changes from 3D space
  useEffect(() => {
    const handleStationChanged = (e) => {
      if (e.detail?.mode) {
        setActiveMode(e.detail.mode);
      }
    };
    window.addEventListener('playground-station-changed', handleStationChanged);
    return () => window.removeEventListener('playground-station-changed', handleStationChanged);
  }, []);

  // Only render when in contact/playground room and overlay is closed
  if (currentRoom !== 'contact' || overlayContent) {
    return null;
  }

  const handleSelectMode = (modeId) => {
    setActiveMode(modeId);
    window.dispatchEvent(
      new CustomEvent('playground-switch-station', { detail: { mode: modeId } })
    );
  };

  return (
    <nav className="playground-pills-bar" aria-label="Playground Navigation">
      <div className="pills-container">
        {PLAYGROUND_MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              className={`playground-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectMode(mode.id)}
              title={mode.desc}
            >
              <span className="pill-icon">{mode.icon}</span>
              <span className="pill-name">{mode.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

