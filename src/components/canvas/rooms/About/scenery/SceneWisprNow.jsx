import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneWisprNow({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const flappyBirdRef = useRef();
    const ripple1Ref = useRef();
    const ripple2Ref = useRef();
    const ripple3Ref = useRef();
    const cameraRigRef = useRef();
    const recLightRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);
    const paperTexture = useLoader(THREE.TextureLoader, '/textures/paper-texture.webp');

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.75) * 0.08;

        // Flappy Bird flapping wings & undulating
        if (flappyBirdRef.current) {
            flappyBirdRef.current.position.y = 0.5 + Math.sin(time * 3.5) * 0.25;
            flappyBirdRef.current.rotation.z = Math.sin(time * 3.5) * 0.2;
        }

        // Hand-drawn pencil acoustic ripples radiating outward
        if (ripple1Ref.current) ripple1Ref.current.scale.setScalar(1 + Math.sin(time * 2.2) * 0.15);
        if (ripple2Ref.current) ripple2Ref.current.scale.setScalar(1 + Math.sin(time * 2.2 + 1) * 0.18);
        if (ripple3Ref.current) ripple3Ref.current.scale.setScalar(1 + Math.sin(time * 2.2 + 2) * 0.22);

        // Blinking red recording tally light
        if (recLightRef.current) {
            recLightRef.current.material.opacity = (Math.sin(time * 4) > 0 ? 1 : 0.2) * opacityRef.current;
        }
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.4, -1.8, -0.4]} scale={[8.0, 3.2]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.4, -1.9, -0.3]} scale={[8.0, 3.0]} opacity={op * 0.85} />

            {/* === LEFT: YOUTUBE CREATOR STUDIO RIG (SKETCHED PAPER AESTHETIC) === */}
            <group ref={cameraRigRef} position={[-2.6, 0.5, 0]}>
                {/* 3D Video Camera on Tripod */}
                <group position={[-0.4, 0, 0]}>
                    {/* Camera Body (Paper Textured Charcoal) */}
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[0.7, 0.45, 0.8]} />
                        <meshBasicMaterial map={paperTexture} color="#334155" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0.5, 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.45, 0.8)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>

                    {/* Lens Barrel */}
                    <mesh position={[0, 0.5, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
                        <meshBasicMaterial color="#1e293b" transparent opacity={op} />
                    </mesh>

                    {/* Red REC Tally Light */}
                    <mesh ref={recLightRef} position={[0.25, 0.75, 0.3]}>
                        <sphereGeometry args={[0.06, 12, 12]} />
                        <meshBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0.25, 0.9, 0.3]}
                        fontSize={0.07}
                        color="#b91c1c"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ● REC
                    </Text>

                    {/* Tripod Legs */}
                    {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => {
                        const x = Math.cos(angle) * 0.35;
                        const z = Math.sin(angle) * 0.35;
                        return (
                            <line key={idx}>
                                <bufferGeometry
                                    attach="geometry"
                                    {...new THREE.BufferGeometry().setFromPoints([
                                        new THREE.Vector3(0, 0.3, 0),
                                        new THREE.Vector3(x, -0.7, z)
                                    ])}
                                />
                                <lineBasicMaterial color="#475569" transparent opacity={op} />
                            </line>
                        );
                    })}
                </group>

                {/* YouTube Play Button Plaque (Paper Craft) */}
                <group position={[0.6, 0.4, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.8, 1.1, 0.04]} />
                        <meshBasicMaterial map={paperTexture} color="#faf8f5" transparent opacity={op * 0.98} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.8, 1.1, 0.04)]} />
                        <lineBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </lineSegments>
                    {/* Red Play Triangle Stamp */}
                    <mesh position={[0, 0.15, 0.03]} rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.18, 0.32, 3]} />
                        <meshBasicMaterial color="#b91c1c" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, -0.16, 0.03]}
                        fontSize={0.11}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        @narayanrakhecha2376
                    </Text>
                    <Text
                        position={[0, -0.36, 0.03]}
                        fontSize={0.08}
                        color="#555555"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Educational • Quant • Code • Real
                    </Text>
                </group>
            </group>

            {/* === CENTER: FLAPPY BIRD NEAT AI & ML PREDICTION === */}
            <group position={[0.2, 0.2, 0.6]}>
                {/* Sketched Green Pipe */}
                <group position={[-0.7, -0.2, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.22, 0.22, 0.8, 16]} />
                        <meshBasicMaterial color="#166534" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0, 0.4, 0]}>
                        <cylinderGeometry args={[0.28, 0.28, 0.16, 16]} />
                        <meshBasicMaterial color="#14532d" transparent opacity={op} />
                    </mesh>
                </group>

                {/* 3D Flappy Bird */}
                <group ref={flappyBirdRef} position={[-0.2, 0.5, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <sphereGeometry args={[0.16, 12, 12]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0.16, -0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.07, 0.14, 8]} />
                        <meshBasicMaterial color="#d97706" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0.08, 0.08, 0.1]}>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshBasicMaterial color="#111111" transparent opacity={op} />
                    </mesh>
                    <mesh position={[-0.05, 0, 0.12]}>
                        <boxGeometry args={[0.12, 0.08, 0.02]} />
                        <meshBasicMaterial color="#faf8f5" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0.3, 0]}
                        fontSize={0.08}
                        color="#92400e"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        NEAT AI BIRD
                    </Text>
                </group>

                {/* ML 10-Yr Stock Model & Volatility Smile Board (Warm Paper Base) */}
                <group position={[0.9, 0.2, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.8, 0.9, 0.04]} />
                        <meshBasicMaterial map={paperTexture} color="#faf8f5" transparent opacity={op * 0.98} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.8, 0.9, 0.04)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.25, 0.03]}
                        fontSize={0.10}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ML STOCK MODEL
                    </Text>
                    <Text
                        position={[0, 0.05, 0.03]}
                        fontSize={0.08}
                        color="#555555"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        10-Year OHLC Data • Time Series
                    </Text>
                    <Text
                        position={[0, -0.22, 0.03]}
                        fontSize={0.09}
                        color="#15803d"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        OPTIONS VOL SMILE (60% WIN RATE)
                    </Text>
                </group>
            </group>

            {/* === AHEAD/CENTER: WISPR FLOW INDIA SOUNDWAVE GATEWAY (PENCIL ACOUSTIC RIPPLES) === */}
            <group position={[0, 1.2, -1.8]}>
                {/* Hand-Drawn Pencil Acoustic Soundwave Ripples */}
                <mesh ref={ripple1Ref}>
                    <ringGeometry args={[1.7, 1.76, 32]} />
                    <meshBasicMaterial color="#78350f" transparent opacity={op * 0.75} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={ripple2Ref}>
                    <ringGeometry args={[2.1, 2.16, 32]} />
                    <meshBasicMaterial color="#b45309" transparent opacity={op * 0.55} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={ripple3Ref}>
                    <ringGeometry args={[2.5, 2.56, 32]} />
                    <meshBasicMaterial color="#d97706" transparent opacity={op * 0.35} side={THREE.DoubleSide} />
                </mesh>

                {/* Gateway Plaque (Warm Paper & Charcoal Woodblock Style) */}
                <group position={[0, 0, 0.1]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[3.6, 0.85, 0.05]} />
                        <meshBasicMaterial map={paperTexture} color="#faf8f5" transparent opacity={op * 0.98} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.03]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(3.6, 0.85, 0.05)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.18, 0.04]}
                        fontSize={0.16}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        🎙️ WISPR FLOW // INDIA MISSION
                    </Text>
                    <Text
                        position={[0, -0.06, 0.04]}
                        fontSize={0.10}
                        color="#b91c1c"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        BUILT AS DIRECT PROOF OF WORK FOR THIS CHALLENGE
                    </Text>
                    <Text
                        position={[0, -0.26, 0.04]}
                        fontSize={0.08}
                        color="#555555"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Creative 3D Dev • Multi-Agent AI • Creator Distribution
                    </Text>
                </group>
            </group>

            {/* === SKYLINE: THE ATTENTION PHILOSOPHY MANIFESTO === */}
            <group position={[0, 2.5, -0.4]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.8, 0.75, 0.04]} />
                    <meshBasicMaterial map={paperTexture} color="#fef9c3" transparent opacity={op * 0.98} />
                </mesh>
                <lineSegments position={[0, 0, 0.025]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(4.8, 0.75, 0.04)]} />
                    <lineBasicMaterial color="#854d0e" transparent opacity={op} />
                </lineSegments>
                <Text
                    position={[0, 0.12, 0.03]}
                    fontSize={0.16}
                    color="#854d0e"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    "ATTENTION IS THE ONLY CURRENCY OF THE FUTURE."
                </Text>
                <Text
                    position={[0, -0.16, 0.03]}
                    fontSize={0.10}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                    fillOpacity={op}
                >
                    If people pay attention, they will buy anything and build anything.
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
            <group position={[0, 2.95, -0.5]}>
                <Text
                    fontSize={0.28}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    letterSpacing={0.06}
                    fillOpacity={op}
                >
                    LEVEL 07 // THE MISSION: ALL IN ON WISPR FLOW
                </Text>
            </group>
        </group>
    );
}
