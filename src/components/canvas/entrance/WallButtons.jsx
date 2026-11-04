import { useTexture, Html } from '@react-three/drei';
import { useScene } from '../../../context/SceneContext';

/**
 * WallButtons Component
 * 
 * Simple, charming sketch buttons mounted on the brick wall to the left of the doors.
 * Styled in the exact same paper black-and-white finish as the entrance facade.
 * Clicking either button opens the respective sketch paper popup.
 */
export default function WallButtons({ position = [-3.4, 0.1, 0.20] }) {
  const { openWallModal } = useScene();
  const pinTexture = useTexture('/images/pin.webp');
  const paperTexture = useTexture('/textures/paper-texture.webp');

  return (
    <group position={position}>
      {/* =================================================== */}
      {/* 1. RESUME BUTTON (TOP PLAQUE)                       */}
      {/* =================================================== */}
      <group position={[0, 0.55, 0]}>
        {/* Soft Drop Shadow on Brick Wall */}
        <mesh position={[0.02, -0.02, -0.02]}>
          <planeGeometry args={[2.0, 0.85]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.14} />
        </mesh>

        {/* Paper Plaque Backing */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.96, 0.82]} />
          <meshBasicMaterial
            color="#f5ebd9"
            map={paperTexture}
            transparent={true}
            roughness={0.95}
          />
        </mesh>

        {/* Hand-Sketched Red Pushpin */}
        <mesh position={[0, 0.42, 0.04]}>
          <planeGeometry args={[0.18, 0.36]} />
          <meshBasicMaterial map={pinTexture} transparent={true} depthWrite={false} />
        </mesh>

        {/* Interactive Button */}
        <Html
          transform
          distanceFactor={2.8}
          position={[0, 0, 0.03]}
          className="wall-html-wrapper"
        >
          <button
            type="button"
            className="wall-sketch-plaque-btn resume-plaque"
            onClick={(e) => {
              e.stopPropagation();
              openWallModal('resume');
            }}
            title="Click to view full resume & explanation popup"
          >
            <div className="plaque-tag">CURRICULUM VITAE</div>
            <div className="plaque-title">
              <span className="icon">📄</span> SEE RESUME
            </div>
            <div className="plaque-sub">EE / AI &amp; Quant Credentials →</div>
          </button>
        </Html>
      </group>

      {/* =================================================== */}
      {/* 2. ABOUT & GUIDE BUTTON (BOTTOM PLAQUE)             */}
      {/* =================================================== */}
      <group position={[0, -0.55, 0]}>
        {/* Soft Drop Shadow on Brick Wall */}
        <mesh position={[0.02, -0.02, -0.02]}>
          <planeGeometry args={[2.0, 0.85]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.14} />
        </mesh>

        {/* Paper Plaque Backing */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.96, 0.82]} />
          <meshBasicMaterial
            color="#f5ebd9"
            map={paperTexture}
            transparent={true}
            roughness={0.95}
          />
        </mesh>

        {/* Hand-Sketched Red Pushpin */}
        <mesh position={[0, 0.42, 0.04]}>
          <planeGeometry args={[0.18, 0.36]} />
          <meshBasicMaterial map={pinTexture} transparent={true} depthWrite={false} />
        </mesh>

        {/* Interactive Button */}
        <Html
          transform
          distanceFactor={2.8}
          position={[0, 0, 0.03]}
          className="wall-html-wrapper"
        >
          <button
            type="button"
            className="wall-sketch-plaque-btn guide-plaque"
            onClick={(e) => {
              e.stopPropagation();
              openWallModal('about');
            }}
            title="Click to view About section & Navigation Guide"
          >
            <div className="plaque-tag guide-tag">ORIENTATION GUIDE</div>
            <div className="plaque-title">
              <span className="icon">🧭</span> ABOUT DOSSIER
            </div>
            <div className="plaque-sub">Navigation Guide &amp; Review Path →</div>
          </button>
        </Html>
      </group>
    </group>
  );
}

