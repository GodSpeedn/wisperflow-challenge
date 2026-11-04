import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneVillage({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);
    const treeTexture = useLoader(THREE.TextureLoader, '/textures/entrance/tree_sketch.webp');

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        // Gentle floating bob
        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.7) * 0.1;
    });

    const op = opacityRef.current;

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASE === */}
            <SketchedCloudBed position={[-1.5, -1.8, -0.5]} scale={[8.5, 3.2]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.5, -2.0, -0.2]} scale={[6.0, 2.8]} opacity={op * 0.8} />

            {/* === SCENERY LEFT: VILLAGE ISLAND & HUTS === */}
            <group position={[-2.8, -0.2, 0]}>
                {/* Island Earth Platform */}
                <mesh position={[0, -0.8, 0]}>
                    <cylinderGeometry args={[2.0, 1.6, 0.4, 16]} />
                    <meshBasicMaterial color="#d4c5a9" transparent opacity={op * 0.9} />
                </mesh>
                <lineSegments position={[0, -0.8, 0]}>
                    <edgesGeometry args={[new THREE.CylinderGeometry(2.0, 1.6, 0.4, 16)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                </lineSegments>

                {/* Village Hut 1 (Main Hut) */}
                <group position={[-0.7, 0, 0.2]}>
                    {/* Walls */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.1, 0.9, 0.9]} />
                        <meshBasicMaterial color="#f0e6d2" transparent opacity={op * 0.95} />
                    </mesh>
                    <lineSegments position={[0, 0, 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(1.1, 0.9, 0.9)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    {/* Clay / Straw Thatched Roof (Pyramid) */}
                    <mesh position={[0, 0.75, 0]} rotation={[0, Math.PI / 4, 0]}>
                        <coneGeometry args={[0.9, 0.7, 4]} />
                        <meshBasicMaterial color="#b45309" transparent opacity={op * 0.95} />
                    </mesh>
                    {/* Wooden Door */}
                    <mesh position={[0, -0.15, 0.46]}>
                        <planeGeometry args={[0.3, 0.6]} />
                        <meshBasicMaterial color="#451a03" transparent opacity={op} />
                    </mesh>
                </group>

                {/* Village Hut 2 (Small Barn) */}
                <group position={[0.7, -0.1, -0.3]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.8, 0.7, 0.7]} />
                        <meshBasicMaterial color="#e5d0ba" transparent opacity={op * 0.95} />
                    </mesh>
                    <lineSegments position={[0, 0, 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.7, 0.7)]} />
                        <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                    </lineSegments>
                    <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]}>
                        <coneGeometry args={[0.7, 0.5, 4]} />
                        <meshBasicMaterial color="#92400e" transparent opacity={op * 0.95} />
                    </mesh>
                </group>

                {/* Sketched Trees */}
                <mesh position={[-1.3, 0.4, -0.4]}>
                    <planeGeometry args={[1.4, 1.8]} />
                    <meshBasicMaterial map={treeTexture} transparent opacity={op * 0.9} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[1.2, 0.3, 0.3]}>
                    <planeGeometry args={[1.2, 1.6]} />
                    <meshBasicMaterial map={treeTexture} transparent opacity={op * 0.85} side={THREE.DoubleSide} />
                </mesh>

                {/* Wooden Fence Posts */}
                {[-1.0, -0.5, 0, 0.5, 1.0].map((xPos, idx) => (
                    <mesh key={idx} position={[xPos, -0.3, 0.8]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
                        <meshBasicMaterial color="#5c4033" transparent opacity={op} />
                    </mesh>
                ))}
            </group>

            {/* === CENTER: THE NASHIK MILESTONE & SINGLE TRACK === */}
            <group position={[0.2, -0.6, 0.5]}>
                {/* 3D Stone Milestone Pillar */}
                <group position={[-0.9, 0, 0]}>
                    <mesh position={[0, 0.3, 0]}>
                        <cylinderGeometry args={[0.25, 0.25, 0.7, 16]} />
                        <meshBasicMaterial color="#f5f5f5" transparent opacity={op} />
                    </mesh>
                    {/* Domed Yellow/Black Top */}
                    <mesh position={[0, 0.65, 0]}>
                        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshBasicMaterial color="#f59e0b" transparent opacity={op} />
                    </mesh>
                    {/* Mile Marker Text */}
                    <Text
                        position={[0, 0.35, 0.26]}
                        fontSize={0.09}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        NASHIK{'\n'}0 KM
                    </Text>
                    <Text
                        position={[0, 0.12, 0.26]}
                        fontSize={0.07}
                        color="#666666"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        CLASS 10
                    </Text>
                </group>

                {/* Single Railway Track heading into the clouds */}
                <group position={[0.3, 0.1, -0.5]} rotation={[-0.15, 0.2, 0]}>
                    {/* Left & Right Rails */}
                    <mesh position={[-0.3, 0, 0]}>
                        <boxGeometry args={[0.04, 0.04, 3.5]} />
                        <meshBasicMaterial color="#1e293b" transparent opacity={op} />
                    </mesh>
                    <mesh position={[0.3, 0, 0]}>
                        <boxGeometry args={[0.04, 0.04, 3.5]} />
                        <meshBasicMaterial color="#1e293b" transparent opacity={op} />
                    </mesh>
                    {/* Cross-Ties (Sleepers) */}
                    {[-1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5].map((zPos, idx) => (
                        <mesh key={idx} position={[0, -0.03, zPos]}>
                            <boxGeometry args={[0.8, 0.03, 0.08]} />
                            <meshBasicMaterial color="#78350f" transparent opacity={op * 0.9} />
                        </mesh>
                    ))}
                    {/* Directional Wooden Signpost */}
                    <group position={[0.7, 0.6, 0.2]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1.3, 0.45, 0.04]} />
                            <meshBasicMaterial color="#faf8f5" transparent opacity={op} />
                        </mesh>
                        <lineSegments position={[0, 0, 0.025]}>
                            <edgesGeometry args={[new THREE.BoxGeometry(1.3, 0.45, 0.04)]} />
                            <lineBasicMaterial color="#1a1a1a" transparent opacity={op} />
                        </lineSegments>
                        <Text
                            position={[0, 0.08, 0.03]}
                            fontSize={0.11}
                            color="#dc2626"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Bold.ttf"
                            fillOpacity={op}
                        >
                            ONLY 1 TRACK ➔ JEE
                        </Text>
                        <Text
                            position={[0, -0.09, 0.03]}
                            fontSize={0.08}
                            color="#555555"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/CabinSketch-Regular.ttf"
                            fillOpacity={op}
                        >
                            [ NO PLAN B ]
                        </Text>
                    </group>
                </group>
            </group>

            {/* === SCENERY RIGHT: INTERACTIVE MILESTONE SIGN === */}
            <MilestoneSign
                scene={scene}
                position={[3.0, 0.4, 0.2]}
                scale={1.0}
                opacity={op}
            />

            {/* === OVERHEAD PARCHMENT CHAPTER BANNER === */}
            <group position={[0, 2.4, -0.5]}>
                <Text
                    fontSize={0.32}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    letterSpacing={0.06}
                    fillOpacity={op}
                >
                    LEVEL 01 // ORIGIN: VILLAGE TO NASHIK
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
                    Born in rural India • Moved to Nashik in 5th grade • Single track forward
                </Text>
            </group>
        </group>
    );
}

