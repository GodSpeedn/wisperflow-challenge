import { useState } from 'react';
import { useTexture, Html } from '@react-three/drei';
import { usePortfolioData } from '../../../context/PortfolioDataContext';
import { useScene } from '../../../context/SceneContext';

/**
 * WallVideoDisplay Component
 * 
 * Second-story sketch window mounted directly above the ground-floor window.
 * Exactly matches the ground-floor window in dimensions (1.5 × 1.5) and sketch style (window_sketch.webp).
 * Features a hand-drawn video play button in the middle and an interactive speech bubble
 * ("Come in! See video explanation") that animates into view on hover, just like the man in the bottom window.
 * Clicking opens the unified video briefing modal popup.
 */
export default function WallVideoDisplay({ position = [2.5, 1.68, 0.10] }) {
  const { videoPitch } = usePortfolioData();
  const { openWallModal } = useScene();
  const [isHovered, setIsHovered] = useState(false);

  const windowSketchTexture = useTexture('/textures/entrance/window_sketch.webp');
  const paperTexture = useTexture('/textures/paper-texture.webp');

  const handlePointerEnter = (e) => {
    e?.stopPropagation?.();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = (e) => {
    e?.stopPropagation?.();
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e?.stopPropagation?.();
    openWallModal('video');
  };

  return (
    <group
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* 1. Soft Drop Shadow on Brick Wall */}
      <mesh position={[0.02, -0.02, 0.17]}>
        <planeGeometry args={[1.54, 1.54]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.14} />
      </mesh>

      {/* 2. Paper Window Interior Backing (Illuminates when hovered) */}
      <mesh position={[0, 0, 0.18]}>
        <planeGeometry args={[1.40, 1.40]} />
        <meshBasicMaterial
          color={isHovered ? '#fffdf0' : '#f5f2e8'}
          map={paperTexture}
          transparent={true}
          roughness={0.9}
        />
      </mesh>

      {/* 3. Hand-Drawn Window Frame Sketch (EXACT same texture & 1.5×1.5 size as downstairs window) */}
      <mesh position={[0, 0, 0.20]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={windowSketchTexture}
          transparent={true}
          alphaTest={0.01}
        />
      </mesh>

      {/* 4. Interactive Video Play Button & Hover Speech Bubble */}
      <Html
        transform
        distanceFactor={2.0}
        position={[0, 0, 0.22]}
        className="wall-html-wrapper"
      >
        <div
          className={`wall-sketch-window-video ${isHovered ? 'hovered' : ''}`}
          onClick={handleClick}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          title="Click to watch pitch video & explore systems"
        >
          {/* Centered Video Play Content */}
          <div className="window-video-content">
            <div className="window-play-btn">
              <span className="window-play-triangle">▶</span>
            </div>

            <div className="window-video-label">
              <span className="window-video-tag">VIDEO BRIEFING</span>
              <span className="window-duration-pill">{videoPitch?.duration || '3:00'}</span>
            </div>
          </div>

          {/* Hand-Sketched Speech Bubble - Animates on Hover (Like the man in the bottom window) */}
          <div className="window-hover-bubble" aria-hidden={!isHovered}>
            <span className="bubble-line1">Come in! 👋</span>
            <span className="bubble-line2">See video explanation →</span>
            <div className="bubble-tail" />
          </div>
        </div>
      </Html>
    </group>
  );
}
