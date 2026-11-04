import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { isTouchDevice } from '../../../../utils/deviceDetect';
import { useScene } from '../../../../context/SceneContext';
import '../../shaders/RevealBasicMaterial';

// Reusable Vector3 for position calculations
const _worldPos = new THREE.Vector3();

// Fade distance thresholds in world Z
const FADE_IN_START = -95;
const FADE_IN_END = -45;
const FADE_OUT_START = 8;
const FADE_OUT_END = 20;

export default function StoryWaypoint({
    scene,
    scrollProgressRef,
    roomZ = -25,
    clipZ = -8.0,
}) {
    const groupRef = useRef();
    const buttonRef = useRef();
    const cardMeshRef = useRef();
    const isTouch = isTouchDevice();
    const { openOverlay } = useScene();
    const [hovered, setHovered] = useState(false);

    // Load textures
    const cloudTexture = useLoader(THREE.TextureLoader, '/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp');
    const paperTexture = useLoader(THREE.TextureLoader, '/textures/paper-texture.webp');
    const buttonTexture = useLoader(THREE.TextureLoader, '/textures/about/button.webp');
    const buttonPaintedTexture = useLoader(THREE.TextureLoader, isTouch ? '/textures/about/button.webp' : '/textures/about/button_painted.webp');

    // Ensure correct color spaces
    useMemo(() => {
        cloudTexture.colorSpace = THREE.SRGBColorSpace;
        paperTexture.colorSpace = THREE.SRGBColorSpace;
        buttonTexture.colorSpace = THREE.SRGBColorSpace;
        buttonPaintedTexture.colorSpace = THREE.SRGBColorSpace;
    }, [cloudTexture, paperTexture, buttonTexture, buttonPaintedTexture]);

    // Opacity tracking for smooth fade in/out
    const currentOpacity = useRef(0);
    const titleRef = useRef();
    const tagRef = useRef();
    const locationRef = useRef();
    const previewRef = useRef();
    const cardBgRef = useRef();
    const cloudRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const scrollProgress = scrollProgressRef?.current || 0;
        const currentWorldZ = roomZ + scrollProgress + scene.z;

        // Hard corridor clip - don't render inside the corridor vestibule
        if (currentWorldZ > clipZ) {
            groupRef.current.visible = false;
            return;
        }
        groupRef.current.visible = true;

        // Distance relative to camera (camera at Z=0 in room space)
        // scene moves toward camera: distanceZ approaches 0
        const distanceZ = scene.z + scrollProgress;

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

        const op = currentOpacity.current;

        // Apply opacities
        if (titleRef.current) titleRef.current.fillOpacity = op;
        if (tagRef.current) tagRef.current.fillOpacity = op * 0.9;
        if (locationRef.current) locationRef.current.fillOpacity = op * 0.75;
        if (previewRef.current) previewRef.current.fillOpacity = op * 0.95;
        if (cardBgRef.current) cardBgRef.current.opacity = op * 0.96;
        if (cloudRef.current) cloudRef.current.opacity = op * 0.85;

        // Gentle floating bob
        const time = state.clock.elapsedTime + scene.sceneNumber * 1.3;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.8) * 0.12;

        // Interactive hover scaling
        if (cardMeshRef.current) {
            const targetScale = hovered ? 1.03 : 1.0;
            cardMeshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: 1 }, 0.1);
        }
    });

    const handleOpenDossier = (e) => {
        e?.stopPropagation?.();

        const fullDescription = `${scene.reality}\n\n⚠️ THE SETBACK (Game Over):\n${scene.setback}\n\n⚡ THE RESPAWN (We Rise Again):\n${scene.respawn}\n\n💡 KEY TAKEAWAY:\n${scene.takeaway}`;

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

    const cardWidth = 5.2;
    const cardHeight = 3.2;

    return (
        <group
            ref={groupRef}
            position={[scene.x, scene.y, scene.z]}
        >
            {/* Fluffy Sketched Cloud Bed Base */}
            <mesh position={[0, -1.8, -0.3]}>
                <planeGeometry args={[7.2, 3.2]} />
                <meshBasicMaterial
                    ref={cloudRef}
                    map={cloudTexture}
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Main Interactive Parchment Board */}
            <group
                ref={cardMeshRef}
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
                {/* Paper Card Background */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[cardWidth, cardHeight]} />
                    <meshBasicMaterial
                        ref={cardBgRef}
                        map={paperTexture}
                        color="#faf8f5"
                        transparent
                        opacity={0.96}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Hand-Drawn Sketch Border */}
                <lineSegments position={[0, 0, 0.01]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(cardWidth, cardHeight)]} />
                    <lineBasicMaterial color="#1a1a1a" linewidth={2} />
                </lineSegments>

                {/* Level Tag / Badge */}
                <Text
                    ref={tagRef}
                    position={[-cardWidth / 2 + 0.35, cardHeight / 2 - 0.35, 0.02]}
                    fontSize={0.22}
                    color="#b91c1c"
                    anchorX="left"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    letterSpacing={0.05}
                >
                    {scene.tag}
                </Text>

                {/* Period & Location Pill */}
                <Text
                    ref={locationRef}
                    position={[cardWidth / 2 - 0.35, cardHeight / 2 - 0.35, 0.02]}
                    fontSize={0.17}
                    color="#555555"
                    anchorX="right"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                >
                    {scene.period} • {scene.location}
                </Text>

                {/* Headline */}
                <Text
                    ref={titleRef}
                    position={[0, cardHeight / 2 - 0.9, 0.02]}
                    fontSize={0.28}
                    color="#111111"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    maxWidth={cardWidth - 0.7}
                    textAlign="center"
                >
                    {scene.headline}
                </Text>

                {/* Narrative Preview Text */}
                <Text
                    ref={previewRef}
                    position={[0, 0.05, 0.02]}
                    fontSize={0.165}
                    color="#2d2d2d"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Regular.ttf"
                    maxWidth={cardWidth - 0.8}
                    textAlign="center"
                    lineHeight={1.35}
                >
                    {scene.preview}
                </Text>

                {/* Interactive "READ CHAPTER" Button */}
                <group
                    ref={buttonRef}
                    position={[0, -cardHeight / 2 + 0.5, 0.02]}
                >
                    <mesh>
                        <planeGeometry args={[2.2, 0.55]} />
                        <meshBasicMaterial
                            map={hovered ? buttonPaintedTexture : buttonTexture}
                            transparent
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    <Text
                        position={[0, 0, 0.03]}
                        fontSize={0.21}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        letterSpacing={0.06}
                    >
                        READ CHAPTER ↗
                    </Text>
                </group>
            </group>
        </group>
    );
}
