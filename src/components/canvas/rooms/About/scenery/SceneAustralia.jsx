import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneAustralia({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const uowIslandRef = useRef();
    const cartRef = useRef();
    const resumeFlurryRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);
    const uoTexture = useLoader(THREE.TextureLoader, '/textures/about/uowyspa.webp');
    const coffeeCupTexture = useLoader(THREE.TextureLoader, '/textures/corridor/decorations/coffee_cup.webp');

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.7) * 0.1;

        // Bobbing UOW island
        if (uowIslandRef.current) {
            uowIslandRef.current.position.y = 0.6 + Math.sin(time * 0.6) * 0.12;
            uowIslandRef.current.rotation.z = Math.sin(time * 0.4) * 0.03;
        }

        // Swirling ghosted resumes
        if (resumeFlurryRef.current) {
            resumeFlurryRef.current.children.forEach((resume, idx) => {
                resume.rotation.z = Math.sin(time * 1.5 + idx * 1.5) * 0.3;
                resume.position.y = (idx * 0.3) + Math.sin(time * 2 + idx) * 0.08;
            });
        }
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.4, -1.8, -0.4]} scale={[7.5, 3.2]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.4, -1.9, -0.3]} scale={[7.5, 3.0]} opacity={op * 0.85} />

            {/* === LEFT: UNIVERSITY OF WOLLONGONG ISLAND === */}
            <group ref={uowIslandRef} position={[-2.6, 0.6, 0]}>
                {/* Authentic UOW Island Texture */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[4.2, 2.3]} />
                    <meshBasicMaterial map={uoTexture} transparent opacity={op * 0.95} side={THREE.DoubleSide} />
                </mesh>

                {/* Academic Title Plaque */}
                <group position={[0, -1.2, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[3.2, 0.6, 0.04]} />
                        <meshBasicMaterial color="#1e3a8a" transparent opacity={op * 0.95} />
                    </mesh>
                    <Text
                        position={[0, 0.1, 0.03]}
                        fontSize={0.13}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        UNIVERSITY OF WOLLONGONG
                    </Text>
                    <Text
                        position={[0, -0.12, 0.03]}
                        fontSize={0.10}
                        color="#93c5fd"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        B.CS in Big Data & Artificial Intelligence
                    </Text>
                </group>
            </group>

            {/* === CENTER-BOTTOM: GROCERY SHIFT WIRE CART & COFFEE === */}
            <group ref={cartRef} position={[-0.2, -0.5, 0.5]}>
                {/* 3D Wireframe Shopping Cart */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.0, 0.7, 0.8]} />
                    <meshBasicMaterial color="#475569" wireframe transparent opacity={op * 0.9} />
                </mesh>
                {/* Cart Wheels */}
                {[-0.45, 0.45].map((x, i) =>
                    [-0.35, 0.35].map((z, j) => (
                        <mesh key={`${i}-${j}`} position={[x, -0.4, z]} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.06, 12]} />
                            <meshBasicMaterial color="#1e293b" transparent opacity={op} />
                        </mesh>
                    ))
                )}
                {/* Shift Grind Label */}
                <group position={[0, 0.55, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.6, 0.38, 0.04]} />
                        <meshBasicMaterial color="#fef3c7" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 0.38, 0.04)]} />
                        <lineBasicMaterial color="#d97706" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.05, 0.03]}
                        fontSize={0.10}
                        color="#b45309"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        GROCERY NIGHT SHIFTS
                    </Text>
                    <Text
                        position={[0, -0.09, 0.03]}
                        fontSize={0.075}
                        color="#78350f"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Surviving Solo • Minimum Wage Reality
                    </Text>
                </group>

                {/* Floating Coffee Cup for late night fuel */}
                <mesh position={[0.7, 0.1, 0.2]}>
                    <planeGeometry args={[0.4, 0.45]} />
                    <meshBasicMaterial map={coffeeCupTexture} transparent opacity={op * 0.85} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* === RIGHT: WORKVENTURES CYBERSECURITY & GHOSTED APPLICATIONS === */}
            <group position={[2.6, 0.6, 0]}>
                {/* WorkVentures Terminal Shield */}
                <group position={[-0.3, 0.6, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.9, 1.1, 0.04]} />
                        <meshBasicMaterial color="#0f172a" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.9, 1.1, 0.04)]} />
                        <lineBasicMaterial color="#38bdf8" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.32, 0.03]}
                        fontSize={0.10}
                        color="#38bdf8"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        🛡️ WORKVENTURES SYDNEY
                    </Text>
                    <Text
                        position={[0, 0.12, 0.03]}
                        fontSize={0.08}
                        color="#e2e8f0"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Cybersecurity Research Intern
                    </Text>
                    {/* Full-time offer vs visa block */}
                    <Text
                        position={[0, -0.15, 0.03]}
                        fontSize={0.08}
                        color="#22c55e"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        OFFERED FULL-TIME ROLE ➔
                    </Text>
                    <Text
                        position={[0, -0.34, 0.03]}
                        fontSize={0.075}
                        color="#ef4444"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        BLOCKED BY STUDENT VISA LIMITS
                    </Text>
                </group>

                {/* Swirling Ghosted Job Applications */}
                <group ref={resumeFlurryRef} position={[1.1, 0.2, 0.3]}>
                    {['RESUME #42 // GHOSTED', 'APPLIED TO 100+ ROLES', 'NO RESPONSE...'].map((txt, idx) => (
                        <group key={idx} position={[(idx - 1) * 0.4, 0, 0]}>
                            <mesh position={[0, 0, 0]}>
                                <planeGeometry args={[0.7, 0.4]} />
                                <meshBasicMaterial color="#ffffff" transparent opacity={op * 0.9} side={THREE.DoubleSide} />
                            </mesh>
                            <Text
                                position={[0, 0, 0.01]}
                                fontSize={0.055}
                                color="#dc2626"
                                anchorX="center"
                                anchorY="middle"
                                font="/fonts/CabinSketch-Bold.ttf"
                                fillOpacity={op}
                            >
                                {txt}
                            </Text>
                        </group>
                    ))}
                </group>

                {/* Kratos Energy Outbound Calling Hustle */}
                <group position={[0.2, -0.7, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2.2, 0.55, 0.04]} />
                        <meshBasicMaterial color="#065f46" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0.12, 0.03]}
                        fontSize={0.10}
                        color="#34d399"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        📞 KRATOS ENERGY // OUTBOUND HUSTLE
                    </Text>
                    <Text
                        position={[0, -0.12, 0.03]}
                        fontSize={0.08}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Cold Calling Blitz • Direct Client Sales
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
                    LEVEL 04 // THE HUSTLE: AUSTRALIAN REALITY
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
                    UOW Computer Science • Grocery shifts • Cybersecurity offer • Sales cold calls
                </Text>
            </group>
        </group>
    );
}

