import React, { useRef, useState, useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * StrategyBoard
 * 
 * 3D tactile papercraft tablet with warm parchment background, hand-drawn
 * charcoal border, immediate first-plane 3D typography, bold ink metric stamp,
 * and interactive "READ DOSSIER ↗" trigger.
 */
export default function StrategyBoard({
    item,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    onReadDossier,
    paintOnBeforeCompile,
}) {
    const groupRef = useRef();
    const [btnHovered, setBtnHovered] = useState(false);

    // Initial transform storage for hover spring
    const basePos = useMemo(() => [...position], [position]);
    const baseRot = useMemo(() => [...rotation], [rotation]);

    // Papercraft tablet materials with optional paint shader reveal
    const boardMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#faf7f0', // Warm parchment paper
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'strategy_board_parchment';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const borderMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#262422', // Charcoal pencil edge
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'strategy_board_border';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const badgeMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#ebe5d8', // Muted paper tag
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'strategy_board_badge';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const stampBoxMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#f6ede4', // Terracotta-tinted ink stamp box
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'strategy_board_stamp';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const btnMat = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: btnHovered ? '#1a1a1a' : '#ffffff',
            transparent: true,
        });
    }, [btnHovered]);

    // Open dossier on click / tap
    const handleTrigger = (e) => {
        e.stopPropagation();
        onReadDossier?.(item);
    };

    // Smooth hover spring
    const handlePointerOver = (e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';

        if (groupRef.current) {
            gsap.to(groupRef.current.position, {
                z: basePos[2] + 0.18,
                duration: 0.28,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            gsap.to(groupRef.current.rotation, {
                x: baseRot[0] - 0.03,
                duration: 0.28,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }
    };

    const handlePointerOut = () => {
        setBtnHovered(false);
        document.body.style.cursor = 'auto';

        if (groupRef.current) {
            gsap.to(groupRef.current.position, {
                x: basePos[0],
                y: basePos[1],
                z: basePos[2],
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            gsap.to(groupRef.current.rotation, {
                x: baseRot[0],
                y: baseRot[1],
                z: baseRot[2],
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }
    };

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            scale={scale}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleTrigger}
        >
            {/* 1. DROP SHADOW (offset paper lift) */}
            <mesh position={[0.06, -0.06, -0.04]} frustumCulled={false}>
                <planeGeometry args={[2.42, 1.94]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.14} />
            </mesh>

            {/* 2. CHARCOAL SKETCH BORDER (outer rim) */}
            <mesh position={[0, 0, -0.01]} frustumCulled={false}>
                <boxGeometry args={[2.42, 1.94, 0.03]} />
                <primitive object={borderMat} attach="material" />
            </mesh>

            {/* 3. PARCHMENT TABLET BODY */}
            <mesh position={[0, 0, 0.01]} frustumCulled={false}>
                <boxGeometry args={[2.36, 1.88, 0.035]} />
                <primitive object={boardMat} attach="material" />
            </mesh>

            {/* 4. CATEGORY BADGE PILL */}
            <group position={[0, 0.68, 0.03]}>
                <mesh frustumCulled={false}>
                    <planeGeometry args={[1.32, 0.20]} />
                    <primitive object={badgeMat} attach="material" />
                </mesh>
                {/* Thin badge outline */}
                <mesh position={[0, 0, -0.001]} frustumCulled={false}>
                    <planeGeometry args={[1.35, 0.23]} />
                    <primitive object={borderMat} attach="material" />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.095}
                    font="/fonts/CabinSketch-Bold.ttf"
                    color="#4a423b"
                    anchorX="center"
                    anchorY="middle"
                >
                    {item.badge}
                </Text>
            </group>

            {/* 5. STRATEGY HEADLINE TITLE */}
            <Text
                position={[0, 0.48, 0.035]}
                fontSize={0.124}
                maxWidth={2.15}
                lineHeight={1.12}
                font="/fonts/CabinSketch-Bold.ttf"
                color="#141414"
                textAlign="center"
                anchorX="center"
                anchorY="top"
            >
                {item.headline}
            </Text>

            {/* 6. CRISP 2-LINE STRATEGIC THESIS (immediately readable on first plane!) */}
            <Text
                position={[0, 0.12, 0.035]}
                fontSize={0.082}
                maxWidth={2.18}
                lineHeight={1.22}
                font="/fonts/CabinSketch-Regular.ttf"
                color="#38332e"
                textAlign="center"
                anchorX="center"
                anchorY="top"
            >
                {item.thesis}
            </Text>

            {/* 7. BOLD INK METRIC STAMP */}
            <group position={[0, -0.38, 0.03]}>
                {/* Stamp background box */}
                <mesh frustumCulled={false}>
                    <planeGeometry args={[1.92, 0.24]} />
                    <primitive object={stampBoxMat} attach="material" />
                </mesh>
                {/* Stamp border */}
                <mesh position={[0, 0, -0.001]} frustumCulled={false}>
                    <planeGeometry args={[1.96, 0.27]} />
                    <primitive object={borderMat} attach="material" />
                </mesh>
                {/* Metric Ink Text */}
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.118}
                    font="/fonts/CabinSketch-Bold.ttf"
                    color="#b23b28" // Warm red ink stamp color
                    anchorX="center"
                    anchorY="middle"
                >
                    {item.metric}
                </Text>
            </group>

            {/* 8. INTERACTIVE "READ DOSSIER ↗" BUTTON */}
            <group
                position={[0, -0.68, 0.032]}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setBtnHovered(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setBtnHovered(false);
                }}
                onClick={handleTrigger}
            >
                {/* Button backing */}
                <mesh frustumCulled={false}>
                    <planeGeometry args={[1.44, 0.24]} />
                    <primitive object={btnMat} attach="material" />
                </mesh>
                {/* Button outline */}
                <mesh position={[0, 0, -0.001]} frustumCulled={false}>
                    <planeGeometry args={[1.48, 0.28]} />
                    <primitive object={borderMat} attach="material" />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.108}
                    font="/fonts/CabinSketch-Bold.ttf"
                    color={btnHovered ? '#ffffff' : '#1a1a1a'}
                    anchorX="center"
                    anchorY="middle"
                >
                    {item.actionText || (item.sector === 1 ? 'READ STORY ↗' : 'READ DOSSIER ↗')}
                </Text>
            </group>
        </group>
    );
}
