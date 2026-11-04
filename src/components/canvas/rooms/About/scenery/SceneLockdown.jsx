import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneLockdown({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const towerBeaconRef = useRef();
    const signalWave1Ref = useRef();
    const signalWave2Ref = useRef();
    const signalWave3Ref = useRef();
    const bufferingSpinnerRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);
    const pencilTexture = useLoader(THREE.TextureLoader, '/textures/corridor/decorations/pencil.webp');
    const paperBallTexture = useLoader(THREE.TextureLoader, '/textures/corridor/decorations/paper_ball.webp');

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.8) * 0.09;

        // Fluctuating amber beacon on tower (weak connection)
        if (towerBeaconRef.current) {
            towerBeaconRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.25);
        }

        // Concentric spotty signal waves expanding
        const waveProgress = (time * 0.7) % 1;
        if (signalWave1Ref.current) {
            const s = 0.5 + waveProgress * 1.5;
            signalWave1Ref.current.scale.set(s, s, 1);
            signalWave1Ref.current.material.opacity = (1 - waveProgress) * opacityRef.current * 0.7;
        }
        if (signalWave2Ref.current) {
            const wp2 = ((time * 0.7) + 0.33) % 1;
            const s = 0.5 + wp2 * 1.5;
            signalWave2Ref.current.scale.set(s, s, 1);
            signalWave2Ref.current.material.opacity = (1 - wp2) * opacityRef.current * 0.7;
        }
        if (signalWave3Ref.current) {
            const wp3 = ((time * 0.7) + 0.66) % 1;
            const s = 0.5 + wp3 * 1.5;
            signalWave3Ref.current.scale.set(s, s, 1);
            signalWave3Ref.current.material.opacity = (1 - wp3) * opacityRef.current * 0.7;
        }

        // Buffering spinner rotation
        if (bufferingSpinnerRef.current) {
            bufferingSpinnerRef.current.rotation.z = -time * 2.5;
        }
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.4, -1.8, -0.4]} scale={[7.5, 3.0]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.2, -1.9, -0.3]} scale={[6.5, 2.8]} opacity={op * 0.85} />

            {/* === LEFT: GRANDPARENTS' RUSTIC VERANDA STUDY === */}
            <group position={[-2.6, -0.2, 0]}>
                {/* Wooden Veranda Floor Deck */}
                <mesh position={[0, -0.7, 0]}>
                    <boxGeometry args={[2.5, 0.15, 2.2]} />
                    <meshBasicMaterial color="#b45309" transparent opacity={op * 0.9} />
                </mesh>
                <lineSegments position={[0, -0.7, 0]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(2.5, 0.15, 2.2)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* Wooden Pillar Columns */}
                {[-1.1, 1.1].map((x, idx) => (
                    <mesh key={idx} position={[x, 0.2, 0.9]}>
                        <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
                        <meshBasicMaterial color="#78350f" transparent opacity={op} />
                    </mesh>
                ))}

                {/* Study Desk */}
                <group position={[0, -0.2, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.4, 0.08, 0.8]} />
                        <meshBasicMaterial color="#d97706" transparent opacity={op} />
                    </mesh>
                    {/* Desk Legs */}
                    {[-0.6, 0.6].map((x, i) =>
                        [-0.3, 0.3].map((z, j) => (
                            <mesh key={`${i}-${j}`} position={[x, -0.25, z]}>
                                <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
                                <meshBasicMaterial color="#451a03" transparent opacity={op} />
                            </mesh>
                        ))
                    )}
                    {/* Desk Lamp */}
                    <group position={[-0.45, 0.2, -0.2]}>
                        <mesh position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.08, 0.1, 0.04, 12]} />
                            <meshBasicMaterial color="#1f2937" transparent opacity={op} />
                        </mesh>
                        <mesh position={[0, 0.15, 0]}>
                            <cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
                            <meshBasicMaterial color="#4b5563" transparent opacity={op} />
                        </mesh>
                        <mesh position={[0.05, 0.32, 0]} rotation={[0, 0, -0.4]}>
                            <coneGeometry args={[0.12, 0.18, 12]} />
                            <meshBasicMaterial color="#f59e0b" transparent opacity={op} />
                        </mesh>
                    </group>

                    {/* Open Study Notebook */}
                    <mesh position={[0.1, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0.05]}>
                        <planeGeometry args={[0.55, 0.4]} />
                        <meshBasicMaterial color="#faf8f5" transparent opacity={op} side={THREE.DoubleSide} />
                    </mesh>
                </group>

                {/* Wooden Chair */}
                <group position={[0, -0.3, -0.6]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.5, 0.05, 0.5]} />
                        <meshBasicMaterial color="#78350f" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0, 0.3, -0.22]}>
                        <boxGeometry args={[0.5, 0.6, 0.05]} />
                        <meshBasicMaterial color="#78350f" transparent opacity={op} />
                    </mesh>
                </group>
            </group>

            {/* === CENTER: TOWERING JEE TEXTBOOKS & HOURGLASS === */}
            <group position={[-0.4, -0.4, 0.6]}>
                {/* Thick Textbook Stack */}
                {[
                    { title: 'I.E. IRODOV // PHYSICS', color: '#1e3a8a', y: 0 },
                    { title: 'CENGAGE // CALCULUS', color: '#991b1b', y: 0.18 },
                    { title: 'ORGANIC CHEMISTRY', color: '#166534', y: 0.36 },
                    { title: 'JEE 10-YR ARCHIVES', color: '#581c87', y: 0.54 }
                ].map((book, idx) => (
                    <group key={idx} position={[0, book.y, 0]} rotation={[0, (idx % 2 === 0 ? 0.08 : -0.1), 0]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.5, 0.15, 1.1]} />
                            <meshBasicMaterial color={book.color} transparent opacity={op * 0.95} />
                        </mesh>
                        <lineSegments position={[0, 0, 0]}>
                            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.15, 1.1)]} />
                            <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                        </lineSegments>
                        <Text
                            position={[0.76, 0, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                            fontSize={0.07}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Bold.ttf"
                            fillOpacity={op}
                        >
                            {book.title}
                        </Text>
                    </group>
                ))}

                {/* 3D Floating Hourglass */}
                <group position={[1.4, 0.4, 0]}>
                    <mesh position={[0, 0.4, 0]}>
                        <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
                        <meshBasicMaterial color="#78350f" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0, -0.4, 0]}>
                        <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
                        <meshBasicMaterial color="#78350f" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0, 0.18, 0]}>
                        <coneGeometry args={[0.18, 0.36, 16]} />
                        <meshBasicMaterial color="#e2e8f0" transparent opacity={op * 0.6} wireframe />
                    </mesh>
                    <mesh position={[0, -0.18, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.18, 0.36, 16]} />
                        <meshBasicMaterial color="#e2e8f0" transparent opacity={op * 0.6} wireframe />
                    </mesh>
                    <Text
                        position={[0, -0.6, 0]}
                        fontSize={0.10}
                        color="#451a03"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        6 MONTHS OF SILENT RE-THINKING
                    </Text>
                </group>

                {/* Floating Crumpled Paper & Pencils */}
                <mesh position={[-1.1, 0.2, 0.4]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshBasicMaterial map={paperBallTexture} transparent opacity={op * 0.8} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0.8, -0.2, 0.8]} rotation={[0, 0, 0.5]}>
                    <planeGeometry args={[0.2, 0.8]} />
                    <meshBasicMaterial map={pencilTexture} transparent opacity={op * 0.85} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* === RIGHT: SPOTTY 2G CELL TOWER (WEAK INTERNET) === */}
            <group position={[2.6, 0.3, 0]}>
                {/* Lattice Tower Frame */}
                <mesh position={[0, 0.8, 0]}>
                    <cylinderGeometry args={[0.1, 0.4, 2.4, 4, 6, true]} />
                    <meshBasicMaterial color="#5c4033" wireframe transparent opacity={op * 0.9} />
                </mesh>
                {/* Amber Indicator Beacon on Top */}
                <mesh ref={towerBeaconRef} position={[0, 2.05, 0]}>
                    <sphereGeometry args={[0.1, 12, 12]} />
                    <meshBasicMaterial color="#f59e0b" transparent opacity={op} />
                </mesh>

                {/* Pulsing Weak Signal Waves */}
                <group position={[0, 2.05, 0.1]}>
                    <mesh ref={signalWave1Ref}>
                        <ringGeometry args={[0.4, 0.44, 24, 1, Math.PI / 4, Math.PI / 2]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={op * 0.7} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh ref={signalWave2Ref}>
                        <ringGeometry args={[0.7, 0.74, 24, 1, Math.PI / 4, Math.PI / 2]} />
                        <meshBasicMaterial color="#d97706" transparent opacity={op * 0.5} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh ref={signalWave3Ref}>
                        <ringGeometry args={[1.0, 1.04, 24, 1, Math.PI / 4, Math.PI / 2]} />
                        <meshBasicMaterial color="#b45309" transparent opacity={op * 0.3} side={THREE.DoubleSide} />
                    </mesh>
                </group>

                {/* Sketched Buffering Spinner */}
                <group ref={bufferingSpinnerRef} position={[0, 1.4, 0.1]}>
                    <mesh>
                        <ringGeometry args={[0.18, 0.22, 16, 1, 0, Math.PI * 1.5]} />
                        <meshBasicMaterial color="#b45309" transparent opacity={op * 0.8} side={THREE.DoubleSide} />
                    </mesh>
                </group>

                {/* Signal Status Stamped Tag (Paper Badge) */}
                <group position={[0, 0.3, 0.3]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2.0, 0.55, 0.04]} />
                        <meshBasicMaterial color="#faf8f5" transparent opacity={op * 0.96} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.55, 0.04)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.1, 0.03]}
                        fontSize={0.11}
                        color="#b45309"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        SPOTTY NETWORK // BAD 2G
                    </Text>
                    <Text
                        position={[0, -0.1, 0.03]}
                        fontSize={0.08}
                        color="#555555"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Dropped Lectures • Slow Buffering
                    </Text>
                </group>
            </group>

            {/* === SCENERY RIGHT/FRONT: INTERACTIVE MILESTONE SIGN === */}
            <MilestoneSign
                scene={scene}
                position={[2.8, -0.4, 0.7]}
                scale={1.0}
                opacity={op}
            />

            {/* === OVERHEAD CHAPTER BANNER === */}
            <group position={[0, 2.5, -0.5]}>
                <Text
                    fontSize={0.32}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    letterSpacing={0.06}
                    fillOpacity={op}
                >
                    LEVEL 02 // DISRUPTION: THE 2G BREAKTHROUGH
                </Text>
                <Text
                    position={[0, -0.32, 0]}
                    fontSize={0.16}
                    color="#4b5563"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                    fillOpacity={op * 0.9}
                >
                    Lockdown hits • Grandparents' village • Bad 2G network • Re-routing reality
                </Text>
            </group>
        </group>
    );
}
