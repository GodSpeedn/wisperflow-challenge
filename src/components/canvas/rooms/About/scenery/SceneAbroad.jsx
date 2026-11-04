import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneAbroad({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const pivotArrowRef = useRef();
    const suitcaseRef = useRef();
    const starGroupRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.75) * 0.1;

        // Bobbing floating suitcase
        if (suitcaseRef.current) {
            suitcaseRef.current.position.y = 0.2 + Math.sin(time * 1.2) * 0.08;
            suitcaseRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;
        }

        // Sparkling Southern Cross stars
        if (starGroupRef.current) {
            starGroupRef.current.children.forEach((star, idx) => {
                star.scale.setScalar(0.8 + Math.sin(time * 2 + idx * 1.2) * 0.25);
            });
        }
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.2, -1.8, -0.4]} scale={[7.0, 3.0]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.4, -1.9, -0.3]} scale={[7.2, 2.8]} opacity={op * 0.85} />

            {/* === LEFT: THE CANADA ROADBLOCK & REDIRECTION ARROW === */}
            <group position={[-2.5, 0.4, 0]}>
                {/* Canada Passport Sheet */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[1.8, 2.3]} />
                    <meshBasicMaterial color="#faf8f5" transparent opacity={op * 0.95} side={THREE.DoubleSide} />
                </mesh>
                <lineSegments position={[0, 0, 0.01]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(1.8, 2.3)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* Stamped Red Maple Leaf / Header */}
                <Text
                    position={[0, 0.85, 0.02]}
                    fontSize={0.16}
                    color="#b91c1c"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    🍁 CANADA VISA
                </Text>

                {/* Stamped Red Rejection / Delay Box */}
                <group position={[0, 0.25, 0.02]} rotation={[0, 0, -0.1]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.5, 0.5]} />
                        <meshBasicMaterial color="#fef2f2" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 0.5)]} />
                        <lineBasicMaterial color="#dc2626" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.06, 0.02]}
                        fontSize={0.13}
                        color="#dc2626"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        TOO LATE // FAILED
                    </Text>
                    <Text
                        position={[0, -0.11, 0.02]}
                        fontSize={0.08}
                        color="#7f1d1d"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        VISA ARRIVED AFTER INTAKE
                    </Text>
                </group>

                {/* Giant Redirection Ink Arrow */}
                <group ref={pivotArrowRef} position={[0.7, -0.6, 0.05]} rotation={[0, 0, -0.3]}>
                    <Text
                        fontSize={0.24}
                        color="#ea580c"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ➔ FAST PIVOT ➔
                    </Text>
                    <Text
                        position={[0, -0.22, 0]}
                        fontSize={0.11}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        NO QUITTING // REDIRECT TO AUS
                    </Text>
                </group>
            </group>

            {/* === CENTER: INTERNATIONAL FLIGHT ARCHWAY & SUITCASE === */}
            <group position={[0.1, 0.2, 0.5]}>
                {/* 3D Flight Portal Arch */}
                <mesh position={[0, 1.4, -0.5]}>
                    <torusGeometry args={[1.6, 0.05, 8, 24, Math.PI]} />
                    <meshBasicMaterial color="#0284c7" transparent opacity={op * 0.8} />
                </mesh>
                <Text
                    position={[0, 1.7, -0.45]}
                    fontSize={0.15}
                    color="#0369a1"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={op}
                >
                    ✈️ INTERNATIONAL DEPARTURE GATE
                </Text>

                {/* Floating 3D Vintage Suitcase */}
                <group ref={suitcaseRef} position={[0, 0.2, 0]}>
                    {/* Main Case Body */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.3, 0.9, 0.45]} />
                        <meshBasicMaterial color="#854d0e" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.3, 0.9, 0.45)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    {/* Brass Corner Caps */}
                    {[-0.65, 0.65].map((x, i) =>
                        [-0.45, 0.45].map((y, j) => (
                            <mesh key={`${i}-${j}`} position={[x, y, 0]}>
                                <boxGeometry args={[0.12, 0.12, 0.46]} />
                                <meshBasicMaterial color="#eab308" transparent opacity={op} />
                            </mesh>
                        ))
                    )}
                    {/* Handle */}
                    <mesh position={[0, 0.52, 0]}>
                        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
                        <meshBasicMaterial color="#451a03" transparent opacity={op} />
                    </mesh>
                    {/* Airport Luggage Tag */}
                    <group position={[0.3, 0.1, 0.24]} rotation={[0, 0, 0.2]}>
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[0.35, 0.22]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={op} side={THREE.DoubleSide} />
                        </mesh>
                        <Text
                            position={[0, 0, 0.01]}
                            fontSize={0.07}
                            color="#111111"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Bold.ttf"
                            fillOpacity={op}
                        >
                            SYDNEY{'\n'}ONE-WAY
                        </Text>
                    </group>
                </group>

                {/* Independent Bank Loan Paper */}
                <group position={[-0.8, -0.4, 0.2]} rotation={[0, 0, -0.15]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.1, 0.7]} />
                        <meshBasicMaterial color="#f8fafc" transparent opacity={op * 0.9} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.1, 0.7)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.15, 0.02]}
                        fontSize={0.08}
                        color="#166534"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        BANK EDUCATION LOAN
                    </Text>
                    <Text
                        position={[0, -0.08, 0.02]}
                        fontSize={0.065}
                        color="#334155"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Self-Funded • Full Responsibility
                    </Text>
                </group>
            </group>

            {/* === RIGHT: AUSTRALIA HIGHWAY SIGN & SOUTHERN CROSS === */}
            <group position={[2.6, 0.5, 0]}>
                {/* Yellow Australian Kangaroo Road Sign (Diamond) */}
                <group position={[-0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.1, 1.1, 0.04]} />
                        <meshBasicMaterial color="#facc15" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.1, 1.1, 0.04)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    {/* Un-rotated Text inside Diamond */}
                    <group rotation={[0, 0, -Math.PI / 4]}>
                        <Text
                            position={[0, 0.12, 0.03]}
                            fontSize={0.13}
                            color="#111111"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Bold.ttf"
                            fillOpacity={op}
                        >
                            🦘 G'DAY AUS!
                        </Text>
                        <Text
                            position={[0, -0.12, 0.03]}
                            fontSize={0.09}
                            color="#1e3a8a"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Bold.ttf"
                            fillOpacity={op}
                        >
                            VISA APPROVED ➔
                        </Text>
                    </group>
                </group>

                {/* Southern Cross Constellation */}
                <group ref={starGroupRef} position={[0.7, 0.8, -0.2]}>
                    {[
                        [0, 0.6, 0],
                        [0, -0.6, 0],
                        [-0.4, 0.1, 0],
                        [0.4, 0.2, 0],
                        [0.15, -0.15, 0]
                    ].map((pos, idx) => (
                        <mesh key={idx} position={pos}>
                            <octahedronGeometry args={[0.07, 0]} />
                            <meshBasicMaterial color="#38bdf8" transparent opacity={op * 0.9} />
                        </mesh>
                    ))}
                </group>

                {/* 6-Month Online Bridge Certificate */}
                <group position={[0.2, -0.5, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.4, 0.6]} />
                        <meshBasicMaterial color="#faf8f5" transparent opacity={op} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.01]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.4, 0.6)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.1, 0.02]}
                        fontSize={0.09}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        6-MONTH ONLINE INTENSIVE
                    </Text>
                    <Text
                        position={[0, -0.1, 0.02]}
                        fontSize={0.07}
                        color="#059669"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        QUALIFIED & GRANTED ➔ FLIGHT SET
                    </Text>
                </group>
            </group>

            {/* === SCENERY RIGHT/FRONT: INTERACTIVE MILESTONE SIGN === */}
            <MilestoneSign
                scene={scene}
                position={[2.8, -0.5, 0.8]}
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
                    LEVEL 03 // THE PIVOT: THE LEAP ABROAD
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
                    Canada failed • Self-funded loan • Australia redirect • One-way ticket
                </Text>
            </group>
        </group>
    );
}

