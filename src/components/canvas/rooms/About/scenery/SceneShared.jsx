import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '../../../../../context/SceneContext';
import { isTouchDevice } from '../../../../../utils/deviceDetect';
import { STORY_SCENES } from '../storyData';

// Fade distance thresholds in room space (relative to camera at Z=0)
export const FADE_IN_START = -95;
export const FADE_IN_END = -45;
export const FADE_OUT_START = 8;
export const FADE_OUT_END = 20;

/**
 * Shared hook to calculate distance and smooth opacity for each 3D scene
 */
export function useSceneFade(sceneZ, scrollProgressRef, roomZ = -25, clipZ = -8.0) {
    const currentOpacity = useRef(0);
    const isVisibleRef = useRef(false);

    useFrame((_, delta) => {
        const scrollProgress = scrollProgressRef?.current || 0;
        const currentWorldZ = roomZ + scrollProgress + sceneZ;

        // Hard clip inside corridor vestibule
        if (currentWorldZ > clipZ) {
            isVisibleRef.current = false;
            currentOpacity.current = 0;
            return;
        }

        const distanceZ = sceneZ + scrollProgress;
        let targetOpacity = 0;

        if (distanceZ < FADE_IN_START) {
            targetOpacity = 0;
        } else if (distanceZ >= FADE_IN_START && distanceZ <= FADE_IN_END) {
            targetOpacity = (distanceZ - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);
        } else if (distanceZ > FADE_IN_END && distanceZ < FADE_OUT_START) {
            targetOpacity = 1;
        } else if (distanceZ >= FADE_OUT_START && distanceZ <= FADE_OUT_END) {
            targetOpacity = 1 - (distanceZ - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START);
        } else {
            targetOpacity = 0;
        }

        currentOpacity.current = THREE.MathUtils.lerp(
            currentOpacity.current,
            targetOpacity,
            1 - Math.pow(0.05, delta)
        );

        isVisibleRef.current = currentOpacity.current > 0.01;
    });

    return { opacityRef: currentOpacity, isVisibleRef };
}

/**
 * MilestoneSign: Integrated hand-drawn signpost with structured 3-beat storytelling
 * Enlarged dimensions, camera-facing tilt, and large readable typography (+60% font size)
 */
export function MilestoneSign({ scene, position = [0, 0, 0], scale = 1, opacity = 1 }) {
    const { openOverlay } = useScene();
    const isTouch = isTouchDevice();
    const [hovered, setHovered] = useState(false);
    const signGroupRef = useRef();

    const paperTexture = useLoader(THREE.TextureLoader, '/textures/paper-texture.webp');
    const buttonTexture = useLoader(THREE.TextureLoader, '/textures/about/button.webp');
    const buttonPaintedTexture = useLoader(THREE.TextureLoader, isTouch ? '/textures/about/button.webp' : '/textures/about/button_painted.webp');

    const handleOpenDossier = (e) => {
        e?.stopPropagation?.();
        const fullDescription = `📖 CHAPTER CHRONICLE:

① THE STAGE:
${scene.stage}

② THE FRICTION (The Obstacle):
${scene.friction}

③ THE PIVOT (The Leap Forward):
${scene.pivot}

---
🔍 UNFILTERED REALITY:
${scene.reality}

⚠️ THE SETBACK (Game Over):
${scene.setback}

⚡ THE RESPAWN (We Rise Again):
${scene.respawn}

💡 KEY TAKEAWAY FOR WISPR:
${scene.takeaway}`;

        openOverlay({
            id: scene.id,
            title: scene.title,
            description: fullDescription,
            date: `${scene.period} • ${scene.location}`,
            platform: 'story',
            platformConfig: {
                label: scene.tag,
                color: '#1a1a1a',
                icon: '🎮'
            },
            url: scene.sceneNumber === 7 ? 'https://youtube.com/@narayanrakhecha2376' : 'https://linkedin.com'
        });
    };

    useFrame((state) => {
        if (!signGroupRef.current) return;
        const t = state.clock.elapsedTime + scene.sceneNumber * 0.9;
        signGroupRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.08;
    });

    // Substantially enlarged board dimensions for comfortable reading
    const boardWidth = 5.6;
    const boardHeight = 3.4;

    // Angle board inward towards center flight camera (X=0)
    const rotY = position[0] > 0 ? -0.26 : position[0] < 0 ? 0.26 : 0;

    return (
        <group ref={signGroupRef} position={position} rotation={[0, rotY, 0]} scale={scale}>
            {/* Wooden Support Posts (Double Post for Grand Signboard) */}
            {[-1.4, 1.4].map((xPost, idx) => (
                <mesh key={idx} position={[xPost, -boardHeight / 2 - 0.9, -0.05]}>
                    <cylinderGeometry args={[0.08, 0.09, 2.0, 8]} />
                    <meshBasicMaterial color="#5c4033" transparent opacity={opacity} />
                </mesh>
            ))}

            {/* Interactive Signboard Group */}
            <group
                position={[0, 0, 0]}
                onClick={handleOpenDossier}
                onPointerOver={() => {
                    if (!isTouch) {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }
                }}
                onPointerOut={() => {
                    if (!isTouch) {
                        setHovered(false);
                        document.body.style.cursor = 'auto';
                    }
                }}
            >
                {/* Paper Board Base (Crisp high-contrast pure paper) */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[boardWidth, boardHeight]} />
                    <meshBasicMaterial
                        map={paperTexture}
                        color="#ffffff"
                        transparent
                        opacity={opacity * 0.99}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Hand-Drawn Double Charcoal Border */}
                <lineSegments position={[0, 0, 0.01]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(boardWidth, boardHeight)]} />
                    <lineBasicMaterial color="#1a1a1a" transparent opacity={opacity} linewidth={2} />
                </lineSegments>
                <lineSegments position={[0, 0, 0.012]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(boardWidth - 0.12, boardHeight - 0.12)]} />
                    <lineBasicMaterial color="#78350f" transparent opacity={opacity * 0.5} />
                </lineSegments>

                {/* Level Tag / Badge */}
                <Text
                    position={[-boardWidth / 2 + 0.35, boardHeight / 2 - 0.32, 0.02]}
                    fontSize={0.22}
                    color="#b91c1c"
                    anchorX="left"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    fillOpacity={opacity}
                >
                    {scene.tag}
                </Text>

                {/* Location / Period */}
                <Text
                    position={[boardWidth / 2 - 0.35, boardHeight / 2 - 0.32, 0.02]}
                    fontSize={0.17}
                    color="#4b5563"
                    anchorX="right"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                    fillOpacity={opacity * 0.9}
                >
                    {scene.period}
                </Text>

                {/* Headline (Large & Bold) */}
                <Text
                    position={[0, boardHeight / 2 - 0.75, 0.02]}
                    fontSize={0.28}
                    color="#111111"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    maxWidth={boardWidth - 0.8}
                    textAlign="center"
                    fillOpacity={opacity}
                >
                    {scene.headline}
                </Text>

                {/* Sketched Divider */}
                <mesh position={[0, boardHeight / 2 - 1.1, 0.02]}>
                    <planeGeometry args={[boardWidth - 0.8, 0.02]} />
                    <meshBasicMaterial color="#1a1a1a" transparent opacity={opacity * 0.4} />
                </mesh>

                {/* 3-Beat Sequential Summary (Spacious, Large, and Effortlessly Readable) */}
                <group position={[0, 0, 0.02]}>
                    {/* Beat 1: Stage */}
                    <Text
                        position={[-boardWidth / 2 + 0.4, 0.45, 0]}
                        fontSize={0.16}
                        color="#1f2937"
                        anchorX="left"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        maxWidth={boardWidth - 0.8}
                        lineHeight={1.35}
                        fillOpacity={opacity}
                    >
                        ① THE STAGE: {scene.stage}
                    </Text>

                    {/* Beat 2: Friction */}
                    <Text
                        position={[-boardWidth / 2 + 0.4, -0.12, 0]}
                        fontSize={0.16}
                        color="#991b1b"
                        anchorX="left"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        maxWidth={boardWidth - 0.8}
                        lineHeight={1.35}
                        fillOpacity={opacity}
                    >
                        ② THE FRICTION: {scene.friction}
                    </Text>

                    {/* Beat 3: Pivot */}
                    <Text
                        position={[-boardWidth / 2 + 0.4, -0.72, 0]}
                        fontSize={0.16}
                        color="#15803d"
                        anchorX="left"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        maxWidth={boardWidth - 0.8}
                        lineHeight={1.35}
                        fillOpacity={opacity}
                    >
                        ③ THE PIVOT: {scene.pivot}
                    </Text>
                </group>

                {/* Interactive Large Button */}
                <group position={[0, -boardHeight / 2 + 0.42, 0.02]}>
                    <mesh scale={hovered ? [1.06, 1.06, 1] : [1, 1, 1]}>
                        <planeGeometry args={[2.8, 0.52]} />
                        <meshBasicMaterial
                            map={hovered ? buttonPaintedTexture : buttonTexture}
                            transparent
                            opacity={opacity}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    <Text
                        position={[0, 0, 0.03]}
                        fontSize={0.20}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        letterSpacing={0.05}
                        fillOpacity={opacity}
                    >
                        READ FULL CHRONICLE ↗
                    </Text>
                </group>
            </group>
        </group>
    );
}

/**
 * Floating Cloud Bed supporting 3D scenery items
 */
export function SketchedCloudBed({ position = [0, 0, 0], scale = [6, 2.5], opacity = 0.85 }) {
    const cloudTexture = useLoader(THREE.TextureLoader, '/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp');

    return (
        <mesh position={position}>
            <planeGeometry args={[scale[0], scale[1]]} />
            <meshBasicMaterial
                map={cloudTexture}
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}

/**
 * FlightPathRibbon: Continuous 3D dashed pencil trail connecting all 7 chapters
 * with floating chapter transition signs between scenes
 */
export function FlightPathRibbon({ scrollProgressRef, roomZ = -25, clipZ = -8.0 }) {
    const ribbonRef = useRef();
    const paperTexture = useLoader(THREE.TextureLoader, '/textures/paper-texture.webp');

    // Transitions between scenes
    const TRANSITIONS = useMemo(() => {
        const trans = [];
        for (let i = 0; i < STORY_SCENES.length - 1; i++) {
            const curr = STORY_SCENES[i];
            const next = STORY_SCENES[i + 1];
            const midZ = (curr.z + next.z) / 2;
            trans.push({
                index: i + 1,
                text: curr.bridgeToNext,
                z: midZ,
                y: 0.9,
                x: 0.0,
            });
        }
        return trans;
    }, []);

    // Create continuous dashed flight path points
    const lineGeometry = useMemo(() => {
        const points = [];
        for (let z = -20; z >= -300; z -= 2.5) {
            // Gentle S-curve matching flight path
            const x = Math.sin(z * 0.05) * 0.8;
            const y = 0.2 + Math.cos(z * 0.03) * 0.3;
            points.push(new THREE.Vector3(x, y, z));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    useFrame((state) => {
        if (!ribbonRef.current) return;
        const scroll = scrollProgressRef?.current || 0;
        const currentWorldZ = roomZ + scroll;
        ribbonRef.current.visible = currentWorldZ < clipZ + 15;
    });

    return (
        <group ref={ribbonRef}>
            {/* Dashed Flight Trail Line */}
            <line geometry={lineGeometry}>
                <lineDashedMaterial
                    color="#475569"
                    dashSize={1.5}
                    gapSize={1.2}
                    linewidth={2}
                    transparent
                    opacity={0.65}
                />
            </line>

            {/* Floating Transition Markers between Chapters */}
            {TRANSITIONS.map((tr) => (
                <TransitionMarker
                    key={tr.index}
                    transition={tr}
                    paperTexture={paperTexture}
                    scrollProgressRef={scrollProgressRef}
                    roomZ={roomZ}
                    clipZ={clipZ}
                />
            ))}
        </group>
    );
}

function TransitionMarker({ transition, paperTexture, scrollProgressRef, roomZ, clipZ }) {
    const markerRef = useRef();
    const { opacityRef, isVisibleRef } = useSceneFade(transition.z, scrollProgressRef, roomZ, clipZ);

    useFrame((state) => {
        if (!markerRef.current) return;
        markerRef.current.visible = isVisibleRef.current;
        if (!markerRef.current.visible) return;
        const t = state.clock.elapsedTime + transition.index * 1.5;
        markerRef.current.position.y = transition.y + Math.sin(t * 1.2) * 0.08;
    });

    const op = opacityRef.current;

    return (
        <group ref={markerRef} position={[transition.x, transition.y, transition.z]}>
            {/* Paper Ribbon Mesh */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[3.2, 0.45]} />
                <meshBasicMaterial
                    map={paperTexture}
                    color="#fef9c3"
                    transparent
                    opacity={op * 0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <lineSegments position={[0, 0, 0.01]}>
                <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 0.45)]} />
                <lineBasicMaterial color="#854d0e" transparent opacity={op} />
            </lineSegments>

            {/* Transition Text */}
            <Text
                position={[0, 0, 0.02]}
                fontSize={0.13}
                color="#78350f"
                anchorX="center"
                anchorY="middle"
                font="/fonts/CabinSketch-Bold.ttf"
                fillOpacity={op}
            >
                {transition.text}
            </Text>
        </group>
    );
}
