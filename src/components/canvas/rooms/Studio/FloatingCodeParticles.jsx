import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// CONFIG
// ============================================
const PARTICLE_COUNT = 55;
const VERTICAL_SPREAD = 22;
const BASE_OPACITY = 0.22;

// Thresholds for seamless loop
const LOOP_BOTTOM = -12;
const LOOP_TOP = 14;
const LOOP_HEIGHT = LOOP_TOP - LOOP_BOTTOM;

// Sketched papercraft strategy symbols
const STRATEGY_SYMBOLS = [
    // Growth arrows & velocity
    { text: '↗', size: 0.75, weight: 3 },
    { text: '↑', size: 0.7, weight: 3 },
    { text: '⚡', size: 0.65, weight: 3 },
    { text: '▲', size: 0.5, weight: 2 },
    { text: '+150 WPM', size: 0.42, weight: 2 },

    // Paper airplanes & notes
    { text: '✈', size: 0.65, weight: 2 },
    { text: '📄', size: 0.5, weight: 2 },
    { text: '✍️', size: 0.45, weight: 2 },
    { text: '✎', size: 0.5, weight: 2 },

    // Audio soundwaves & voice
    { text: '〰️', size: 0.6, weight: 3 },
    { text: '≈≈', size: 0.55, weight: 2 },
    { text: '(( • ))', size: 0.45, weight: 2 },
    { text: '🎙️', size: 0.45, weight: 2 },
    { text: '▶', size: 0.5, weight: 2 },

    // Strategy stamps & metrics
    { text: 'GTM', size: 0.48, weight: 2 },
    { text: 'ROI', size: 0.42, weight: 2 },
    { text: 'CTR', size: 0.42, weight: 2 },
    { text: '10x', size: 0.45, weight: 2 },
    { text: 'FLOW', size: 0.4, weight: 2 },
    { text: '•', size: 0.3, weight: 3 },
    { text: '○', size: 0.35, weight: 2 },
];

const getRandomSymbol = () => {
    const totalWeight = STRATEGY_SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;

    for (const symbol of STRATEGY_SYMBOLS) {
        random -= symbol.weight;
        if (random <= 0) return symbol;
    }
    return STRATEGY_SYMBOLS[0];
};

const generateParticles = () => {
    const particles = [];
    const X_SPREAD = 45;
    const Z_MIN = -7.5; // Gently behind tablets and scenery
    const Z_MAX = -12.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const symbol = getRandomSymbol();
        const x = (Math.random() - 0.5) * X_SPREAD;
        const y = (Math.random() - 0.5) * VERTICAL_SPREAD;
        const z = Z_MIN + Math.random() * (Z_MAX - Z_MIN);

        particles.push({
            id: i,
            symbol,
            initialX: x,
            initialY: y,
            z: z,
            position: new THREE.Vector3(x, y, z),
            rotation: Math.random() * Math.PI * 2,
            driftSpeed: 0.12 + Math.random() * 0.18,
            rotationSpeed: (Math.random() - 0.5) * 0.25,
            parallaxFactor: 0.4 + Math.random() * 0.6,
            phaseOffset: Math.random() * Math.PI * 2,
            opacity: BASE_OPACITY * (0.6 + Math.random() * 0.6),
        });
    }

    return particles;
};

/**
 * FloatingCodeParticles
 * Now rendering sketched papercraft strategy particles:
 * growth arrows (↑, ↗, ⚡), folded paper airplanes, audio soundwaves (〰️), and ink stamps.
 */
const FloatingCodeParticles = ({ towerRotationRef, wingOffsetRef }) => {
    const particles = useMemo(() => generateParticles(), []);
    const meshRefs = useRef([]);
    const smoothOffset = useRef(0);
    const particleYOffsets = useRef(particles.map(() => 0));

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        // Accept either wingOffset (X translation) or legacy towerRotation
        const targetOffset = wingOffsetRef?.current ?? (towerRotationRef?.current ? towerRotationRef.current * 3.0 : 0);
        smoothOffset.current = THREE.MathUtils.lerp(smoothOffset.current, targetOffset, 0.08);

        const WRAP_WIDTH = 45;
        const HALF_WIDTH = WRAP_WIDTH / 2;

        particles.forEach((particle, index) => {
            const mesh = meshRefs.current[index];
            if (!mesh) return;

            // Subtle vertical float
            const floatY = Math.sin(time * particle.driftSpeed + particle.phaseOffset) * 0.35;
            let finalY = particle.initialY + particleYOffsets.current[index] + floatY;

            while (finalY < LOOP_BOTTOM) {
                particleYOffsets.current[index] += LOOP_HEIGHT;
                finalY += LOOP_HEIGHT;
            }
            while (finalY > LOOP_TOP) {
                particleYOffsets.current[index] -= LOOP_HEIGHT;
                finalY -= LOOP_HEIGHT;
            }
            mesh.position.y = finalY;

            // Horizontal parallax linked to wing movement
            let finalX = particle.initialX - (smoothOffset.current * particle.parallaxFactor * 0.6);
            finalX = ((finalX + HALF_WIDTH) % WRAP_WIDTH + WRAP_WIDTH) % WRAP_WIDTH - HALF_WIDTH;
            mesh.position.x = finalX;
            mesh.position.z = particle.z;

            // Gentle wobble rotation
            mesh.rotation.z = particle.rotation + time * particle.rotationSpeed;
        });
    });

    return (
        <group position={[0, 0, 0]}>
            {particles.map((particle, index) => (
                <Text
                    key={particle.id}
                    ref={(el) => { meshRefs.current[index] = el; }}
                    position={particle.position}
                    fontSize={particle.symbol.size}
                    color="#2c2825"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={particle.opacity}
                    font="/fonts/CabinSketch-Bold.ttf"
                >
                    {particle.symbol.text}
                </Text>
            ))}
        </group>
    );
};

export default FloatingCodeParticles;
