import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneSetbacks({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const crashChartRef = useRef();
    const respawnBadgeRef = useRef();
    const luggageRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);
    const paperTexture = useLoader(THREE.TextureLoader, '/textures/paper-texture.webp');

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.75) * 0.1;

        // Gentle pulse of hand-stamped respawn sign
        if (respawnBadgeRef.current) {
            respawnBadgeRef.current.scale.setScalar(1 + Math.sin(time * 2.5) * 0.02);
        }

        // Bobbing luggage
        if (luggageRef.current) {
            luggageRef.current.position.y = -0.4 + Math.sin(time * 0.9) * 0.05;
        }
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.4, -1.8, -0.4]} scale={[7.5, 3.2]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.4, -1.9, -0.3]} scale={[7.5, 3.0]} opacity={op * 0.85} />

            {/* === LEFT: EPAT ALGORITHMIC CRASH CHART (WARM GRAPH PAPER STYLE) === */}
            <group ref={crashChartRef} position={[-2.5, 0.5, 0]}>
                {/* Graph Paper Base */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.2, 1.4, 0.04]} />
                    <meshBasicMaterial map={paperTexture} color="#faf8f5" transparent opacity={op * 0.97} />
                </mesh>
                <lineSegments position={[0, 0, 0.025]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.4, 0.04)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* Jagged Plunging Candlesticks */}
                {[
                    { x: -0.8, y: 0.35, h: 0.25, wickH: 0.45, green: true },
                    { x: -0.4, y: 0.15, h: 0.35, wickH: 0.6, green: false },
                    { x: 0.0, y: -0.1, h: 0.45, wickH: 0.7, green: false },
                    { x: 0.4, y: -0.35, h: 0.4, wickH: 0.65, green: false },
                    { x: 0.8, y: -0.5, h: 0.3, wickH: 0.5, green: false }
                ].map((c, i) => (
                    <group key={i} position={[c.x, c.y, 0.03]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[0.015, c.wickH, 0.01]} />
                            <meshBasicMaterial color={c.green ? '#15803d' : '#b91c1c'} transparent opacity={op} />
                        </mesh>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[0.15, c.h, 0.02]} />
                            <meshBasicMaterial color={c.green ? '#15803d' : '#b91c1c'} transparent opacity={op} />
                        </mesh>
                    </group>
                ))}

                <Text
                    position={[0, 0.52, 0.03]}
                    fontSize={0.11}
                    color="#b91c1c"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    ⚠️ EPAT ALGO DRAWDOWN
                </Text>

                {/* Red Ink Stamp: Game Over */}
                <group position={[0, -0.2, 0.05]} rotation={[0, 0, -0.12]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.6, 0.42]} />
                        <meshBasicMaterial color="#fef2f2" transparent opacity={op * 0.95} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.42)]} />
                        <lineBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.12}
                        color="#b91c1c"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ANOTHER GAME OVER
                    </Text>
                </group>
            </group>

            {/* === CENTER: RETURN FLIGHT LUGGAGE (SYD ➔ INDIA) === */}
            <group ref={luggageRef} position={[0.1, -0.4, 0.5]}>
                {/* Kraft Leather Travel Case */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.2, 0.8, 0.45]} />
                    <meshBasicMaterial color="#854d0e" transparent opacity={op} />
                </mesh>
                <lineSegments position={[0, 0, 0]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.8, 0.45)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* Baggage Tag */}
                <group position={[0.2, 0.1, 0.24]} rotation={[0, 0, 0.15]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[0.45, 0.26]} />
                        <meshBasicMaterial color="#faf8f5" transparent opacity={op} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(0.45, 0.26)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.075}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        SYD ➔ INDIA{'\n'}RETURN FLIGHT
                    </Text>
                </group>

                {/* Packed Up Label */}
                <group position={[0, 0.55, 0]}>
                    <Text
                        fontSize={0.11}
                        color="#1f2937"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        PACKED BAGS • RETURN TO INDIA
                    </Text>
                    <Text
                        position={[0, -0.16, 0]}
                        fontSize={0.08}
                        color="#4b5563"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Target: Top Indian B-School / CAT Prep
                    </Text>
                </group>
            </group>

            {/* === RIGHT: AIU BUREAUCRACY BLOCKADE (KRAFT PAPER DOSSIER) === */}
            <group position={[2.6, 0.6, 0]}>
                {/* Aged Kraft Dossier Folder */}
                <mesh position={[0, 0.4, 0]}>
                    <boxGeometry args={[2.2, 1.4, 0.05]} />
                    <meshBasicMaterial map={paperTexture} color="#f5efe6" transparent opacity={op * 0.98} />
                </mesh>
                <lineSegments position={[0, 0.4, 0.03]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.4, 0.05)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* AIU Red Tape Banner */}
                <group position={[0, 0.8, 0.04]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.9, 0.32, 0.02]} />
                        <meshBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.10}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ⛔ AIU EQUIVALENCE: REJECTED
                    </Text>
                </group>

                <Text
                    position={[0, 0.48, 0.04]}
                    fontSize={0.085}
                    color="#b91c1c"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    Blocked: 6-Mo Online Course Component
                </Text>
                <Text
                    position={[0, 0.24, 0.04]}
                    fontSize={0.08}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                    maxWidth={1.9}
                    textAlign="center"
                    fillOpacity={op}
                >
                    AIU refused degree equivalence required for government colleges & exams.
                </Text>
                <Text
                    position={[0, -0.02, 0.04]}
                    fontSize={0.095}
                    color="#111111"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    CAT EXAM: INELIGIBLE TO SIT
                </Text>

                {/* Full Stop Stamp */}
                <group position={[0, -0.32, 0.04]} rotation={[0, 0, -0.06]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.6, 0.32]} />
                        <meshBasicMaterial color="#fef2f2" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.32)]} />
                        <lineBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.105}
                        color="#b91c1c"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ANOTHER FULL STOP
                    </Text>
                </group>
            </group>

            {/* === SKYLINE: HAND-STAMPED WOODBLOCK RESPAWN EMBLEM === */}
            <group ref={respawnBadgeRef} position={[0, 2.2, -0.3]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.4, 0.8, 0.04]} />
                    <meshBasicMaterial map={paperTexture} color="#fef9c3" transparent opacity={op * 0.98} />
                </mesh>
                <lineSegments position={[0, 0, 0.025]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(4.4, 0.8, 0.04)]} />
                    <lineBasicMaterial color="#854d0e" transparent opacity={op} />
                </lineSegments>
                <Text
                    position={[0, 0.14, 0.03]}
                    fontSize={0.17}
                    color="#854d0e"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    🎮 GAME OVER? [PRESS START TO RESPAWN]
                </Text>
                <Text
                    position={[0, -0.16, 0.03]}
                    fontSize={0.115}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    "Two full stops in a row. Still breathing. Still building."
                </Text>
            </group>

            {/* === SCENERY RIGHT/FRONT: INTERACTIVE MILESTONE SIGN === */}
            <MilestoneSign
                scene={scene}
                position={[2.8, -0.5, 0.8]}
                scale={1.0}
                opacity={op}
            />

            {/* === OVERHEAD CHAPTER BANNER === */}
            <group position={[0, 2.85, -0.5]}>
                <Text
                    fontSize={0.28}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    letterSpacing={0.06}
                    fillOpacity={op}
                >
                    LEVEL 06 // TWO FULL STOPS: THE AIU BUREAUCRACY WALL
                </Text>
            </group>
        </group>
    );
}
