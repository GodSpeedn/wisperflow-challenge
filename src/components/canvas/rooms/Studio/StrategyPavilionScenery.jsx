import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * StrategyPavilionScenery
 * 
 * 3D architectural scenery for Door 2 ("THE STRATEGY"):
 * - Wing 0: Overhead Wispr India banner + Drafting desk diorama beneath tablets
 * - Wing 1: Overhead YouTube Engine banner + Storyboard easel diorama beneath tablets
 * - Central Archway marker between the two wings (at X = 7.0)
 * - Floor growth ribbon lines connecting both wings
 */
export default function StrategyPavilionScenery({ paintOnBeforeCompile }) {
    // Shared materials
    const bannerMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#fdfbf7', // Crisp paper banner
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_banner_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const borderMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#262422', // Charcoal ink lines
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_border_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const blueprintMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#2d4d76', // Prussian blueprint blue
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_blueprint_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const woodMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#b09477', // Light craft wood easel
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_wood_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const filmstripMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#1a1a1a', // Charcoal filmstrip
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_filmstrip_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    const ribbonMat = useMemo(() => {
        const mat = new THREE.MeshBasicMaterial({
            color: '#d4883b', // Warm amber growth ribbon
            transparent: true,
        });
        if (paintOnBeforeCompile) {
            mat.onBeforeCompile = paintOnBeforeCompile;
            mat.customProgramCacheKey = () => 'scenery_ribbon_mat';
        }
        return mat;
    }, [paintOnBeforeCompile]);

    return (
        <group position={[0, 0, 0]}>
            {/* ========================================================
                CENTRAL ARCHWAY & WAR ROOM MARKER (Midpoint between wings at X = 7.0)
                ======================================================== */}
            <group position={[7.0, 2.45, -0.2]}>
                {/* Center Banner Paper */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[3.6, 0.62]} />
                    <primitive object={bannerMat} attach="material" />
                </mesh>
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[3.68, 0.70]} />
                    <primitive object={borderMat} attach="material" />
                </mesh>
                <Text
                    position={[0, 0.10, 0.02]}
                    fontSize={0.20}
                    font="/fonts/CabinSketch-Bold.ttf"
                    color="#141414"
                    anchorX="center"
                    anchorY="middle"
                >
                    STRATEGY WAR ROOM
                </Text>
                <Text
                    position={[0, -0.14, 0.02]}
                    fontSize={0.11}
                    font="/fonts/CabinSketch-Regular.ttf"
                    color="#5c544d"
                    anchorX="center"
                    anchorY="middle"
                >
                    10 PRODUCTION &amp; GTM BLUEPRINTS
                </Text>
            </group>

            {/* ========================================================
                WING 0: WISPR FLOW INDIA EXPANSION (Centered at X = 0)
                ======================================================== */}
            <group position={[0, 0, 0]}>
                {/* Overhead Archway Banner */}
                <group position={[0, 2.45, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[5.2, 0.62]} />
                        <primitive object={bannerMat} attach="material" />
                    </mesh>
                    <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[5.28, 0.70]} />
                        <primitive object={borderMat} attach="material" />
                    </mesh>
                    <Text
                        position={[0, 0.11, 0.02]}
                        fontSize={0.22}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                    >
                        🎙️ WISPR FLOW INDIA EXPANSION
                    </Text>
                    <Text
                        position={[0, -0.14, 0.02]}
                        fontSize={0.105}
                        font="/fonts/CabinSketch-Regular.ttf"
                        color="#5e544c"
                        anchorX="center"
                        anchorY="middle"
                    >
                        NATIONAL INPUT LAYER ROADMAP • 5M+ BUILDERS &amp; ENGINEERS
                    </Text>
                </group>

                {/* Blueprint Drafting Desk Diorama (Beneath tablets) */}
                <group position={[0, -2.15, 0.35]} rotation={[-0.40, 0, 0]}>
                    {/* Desk Surface */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[4.4, 1.1, 0.06]} />
                        <primitive object={woodMat} attach="material" />
                    </mesh>
                    {/* Blueprints on desk */}
                    <mesh position={[-0.7, 0.04, 0.04]} rotation={[0, 0, 0.04]}>
                        <planeGeometry args={[2.0, 0.8]} />
                        <primitive object={blueprintMat} attach="material" />
                    </mesh>
                    <Text
                        position={[-0.7, 0.08, 0.05]}
                        fontSize={0.095}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        GTM BLUEPRINT: 150+ WPM WHISPER INTEGRATION
                    </Text>
                    {/* Audio soundwave doodle sketch on blueprint */}
                    <Text
                        position={[-0.7, -0.14, 0.05]}
                        fontSize={0.13}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#e8c872"
                        anchorX="center"
                        anchorY="middle"
                    >
                        〰️ 〰️ (( • )) 〰️ 〰️
                    </Text>
                    {/* Drafting Ruler & Pen */}
                    <mesh position={[1.2, 0.08, 0.04]} rotation={[0, 0, -0.08]}>
                        <boxGeometry args={[1.3, 0.10, 0.02]} />
                        <primitive object={borderMat} attach="material" />
                    </mesh>
                </group>
            </group>

            {/* ========================================================
                WING 1: THE ACCIDENTAL CREATOR (Centered at X = +14.0)
                ======================================================== */}
            <group position={[14.0, 0, 0]}>
                {/* Overhead Archway Banner */}
                <group position={[0, 2.45, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[5.2, 0.62]} />
                        <primitive object={bannerMat} attach="material" />
                    </mesh>
                    <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[5.28, 0.70]} />
                        <primitive object={borderMat} attach="material" />
                    </mesh>
                    <Text
                        position={[0, 0.11, 0.02]}
                        fontSize={0.22}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                    >
                        📹 THE ACCIDENTAL CREATOR
                    </Text>
                    <Text
                        position={[0, -0.14, 0.02]}
                        fontSize={0.105}
                        font="/fonts/CabinSketch-Regular.ttf"
                        color="#5e544c"
                        anchorX="center"
                        anchorY="middle"
                    >
                        BUILDING IN PUBLIC • 53 SUBS &amp; 10K+ VIEWS • RAW CODE &amp; STUDY LOGS
                    </Text>
                </group>

                {/* Storyboard Easel & Filmstrip Diorama (Beneath tablets) */}
                <group position={[0, -2.15, 0.35]} rotation={[-0.40, 0, 0]}>
                    {/* Easel Backboard */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[4.4, 1.1, 0.06]} />
                        <primitive object={woodMat} attach="material" />
                    </mesh>
                    {/* Filmstrip Strip */}
                    <mesh position={[0, 0.08, 0.04]}>
                        <planeGeometry args={[4.0, 0.38]} />
                        <primitive object={filmstripMat} attach="material" />
                    </mesh>
                    {/* Filmstrip Relatable Milestones */}
                    <Text
                        position={[0, 0.08, 0.05]}
                        fontSize={0.092}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ☕ 2 AM COFFEE ─── 💻 TERMINAL SCREEN ─── 🍕 "STUDY TILL HUNGRY" ─── 🚀 SHIP CODE
                    </Text>
                    {/* Clapboard sketch */}
                    <mesh position={[-1.2, -0.22, 0.04]} rotation={[0, 0, 0.06]}>
                        <planeGeometry args={[1.08, 0.28]} />
                        <primitive object={borderMat} attach="material" />
                    </mesh>
                    <Text
                        position={[-1.2, -0.22, 0.05]}
                        fontSize={0.076}
                        font="/fonts/CabinSketch-Bold.ttf"
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        TAKE 42 • "WHY IS IT CRASHING?"
                    </Text>
                </group>
            </group>

            {/* ========================================================
                FLOOR GROWTH RIBBON LINES (Connecting Wings 0 to 1)
                ======================================================== */}
            <group position={[7.0, -2.6, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                {/* Main connecting growth path */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[14.8, 0.06]} />
                    <primitive object={ribbonMat} attach="material" />
                </mesh>
                {/* Step Markers along the ribbon */}
                {[-6.0, -4.0, -2.0, 0, 2.0, 4.0, 6.0].map((x, i) => (
                    <mesh key={i} position={[x, 0, 0.01]} rotation={[0, 0, Math.PI / 4]}>
                        <planeGeometry args={[0.16, 0.16]} />
                        <primitive object={borderMat} attach="material" />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
