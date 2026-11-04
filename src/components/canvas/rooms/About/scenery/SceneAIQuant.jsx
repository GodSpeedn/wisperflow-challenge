import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneFade, MilestoneSign, SketchedCloudBed } from './SceneShared';

export default function SceneAIQuant({ scene, scrollProgressRef, roomZ, clipZ }) {
    const groupRef = useRef();
    const agentPodRef = useRef();
    const pokerTableRef = useRef();
    const candleChartRef = useRef();

    const { opacityRef, isVisibleRef } = useSceneFade(scene.z, scrollProgressRef, roomZ, clipZ);

    useFrame((state) => {
        if (!groupRef.current) return;
        const visible = isVisibleRef.current;
        groupRef.current.visible = visible;
        if (!visible) return;

        const time = state.clock.elapsedTime;
        groupRef.current.position.y = scene.y + Math.sin(time * 0.75) * 0.1;

        // Gentle orbit of multi-agent swarm
        if (agentPodRef.current) {
            agentPodRef.current.rotation.z = Math.sin(time * 0.5) * 0.08;
        }

        // Bobbing poker table
        if (pokerTableRef.current) {
            pokerTableRef.current.position.y = -0.3 + Math.sin(time * 0.9) * 0.06;
            pokerTableRef.current.rotation.x = -0.15 + Math.sin(time * 0.6) * 0.03;
        }

        // Pulsing candlestick chart
        if (candleChartRef.current) {
            candleChartRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
        }
    });

    const op = opacityRef.current;

    const AGENTS = [
        { name: 'ARCHITECT', role: 'System Planner', angle: 0 },
        { name: 'SYNTHESIZER', role: 'Code Generator', angle: (Math.PI * 2) / 5 },
        { name: 'TESTER', role: 'Test Cases', angle: ((Math.PI * 2) / 5) * 2 },
        { name: 'CRITIC', role: 'Security & QA', angle: ((Math.PI * 2) / 5) * 3 },
        { name: 'DEPLOYER', role: 'CI/CD Pipeline', angle: ((Math.PI * 2) / 5) * 4 },
    ];

    return (
        <group ref={groupRef} position={[scene.x, scene.y, scene.z]}>
            {/* === CLOUD BED BASES === */}
            <SketchedCloudBed position={[-2.4, -1.8, -0.4]} scale={[7.5, 3.2]} opacity={op * 0.85} />
            <SketchedCloudBed position={[2.4, -1.9, -0.3]} scale={[7.5, 3.0]} opacity={op * 0.85} />

            {/* === LEFT: 5-AGENT MULTI-AGENT DEV POD === */}
            <group ref={agentPodRef} position={[-2.5, 0.6, 0]}>
                {/* Central AI Brain Hub */}
                <group position={[0, 0, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.45, 0.45, 0.1, 16]} />
                        <meshBasicMaterial color="#312e81" transparent opacity={op * 0.95} />
                    </mesh>
                    <lineSegments position={[0, 0, 0]}>
                        <edgesGeometry args={[new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16)]} />
                        <lineBasicMaterial color="#818cf8" transparent opacity={op} />
                    </lineSegments>
                    <Text
                        position={[0, 0.08, 0.06]}
                        fontSize={0.09}
                        color="#c7d2fe"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        AI RESEARCH POD
                    </Text>
                    <Text
                        position={[0, -0.08, 0.06]}
                        fontSize={0.07}
                        color="#a5b4fc"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Gemini + OpenAI Swarm
                    </Text>
                </group>

                {/* 5 Satellite Agent Nodes */}
                {AGENTS.map((agent, idx) => {
                    const radius = 1.25;
                    const x = Math.cos(agent.angle) * radius;
                    const y = Math.sin(agent.angle) * radius;
                    return (
                        <group key={idx} position={[x, y, 0]}>
                            {/* Connecting Line to Center */}
                            <line>
                                <bufferGeometry
                                    attach="geometry"
                                    {...new THREE.BufferGeometry().setFromPoints([
                                        new THREE.Vector3(0, 0, 0),
                                        new THREE.Vector3(-x, -y, 0)
                                    ])}
                                />
                                <lineBasicMaterial color="#6366f1" transparent opacity={op * 0.6} />
                            </line>

                            {/* Node Box */}
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.85, 0.4, 0.05]} />
                                <meshBasicMaterial color="#1e1b4b" transparent opacity={op * 0.9} />
                            </mesh>
                            <lineSegments position={[0, 0, 0.03]}>
                                <edgesGeometry args={[new THREE.BoxGeometry(0.85, 0.4, 0.05)]} />
                                <lineBasicMaterial color="#a5b4fc" transparent opacity={op} />
                            </lineSegments>
                            <Text
                                position={[0, 0.07, 0.04]}
                                fontSize={0.075}
                                color="#ffffff"
                                anchorX="center"
                                anchorY="middle"
                                font="/fonts/CabinSketch-Bold.ttf"
                                fillOpacity={op}
                            >
                                {agent.name}
                            </Text>
                            <Text
                                position={[0, -0.07, 0.04]}
                                fontSize={0.06}
                                color="#c7d2fe"
                                anchorX="center"
                                anchorY="middle"
                                font="/fonts/CabinSketch-Regular.ttf"
                                fillOpacity={op}
                            >
                                {agent.role}
                            </Text>
                        </group>
                    );
                })}

                {/* Efficiency Metric Badge */}
                <group position={[0, -1.6, 0.1]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2.5, 0.45, 0.04]} />
                        <meshBasicMaterial color="#064e3b" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0.06, 0.03]}
                        fontSize={0.11}
                        color="#34d399"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ⚡ -30% TASK PROCESSING OVERHEAD
                    </Text>
                    <Text
                        position={[0, -0.09, 0.03]}
                        fontSize={0.075}
                        color="#a7f3d0"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Led 5 Devs • UOW AI Research Internship
                    </Text>
                </group>
            </group>

            {/* === CENTER: THE CAMPUS POKER TABLE === */}
            <group ref={pokerTableRef} position={[0.2, -0.2, 0.5]}>
                {/* Green Felt Oval Table Top */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.2, 1.2, 0.12, 24]} />
                    <meshBasicMaterial color="#047857" transparent opacity={op} />
                </mesh>
                {/* Wood Rim Cushion */}
                <mesh position={[0, 0.04, 0]}>
                    <torusGeometry args={[1.2, 0.08, 8, 24]} />
                    <meshBasicMaterial color="#78350f" transparent opacity={op} />
                </mesh>

                {/* Fanned Playing Cards */}
                <group position={[-0.3, 0.12, 0.2]} rotation={[0, 0, -0.15]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[0.3, 0.45]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={op} side={THREE.DoubleSide} />
                    </mesh>
                    <Text
                        position={[0, 0, 0.01]}
                        fontSize={0.12}
                        color="#111111"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        A♠
                    </Text>
                </group>
                <group position={[0, 0.12, 0.25]} rotation={[0, 0, 0.05]}>
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[0.3, 0.45]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={op} side={THREE.DoubleSide} />
                    </mesh>
                    <Text
                        position={[0, 0, 0.01]}
                        fontSize={0.12}
                        color="#dc2626"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        K♥
                    </Text>
                </group>

                {/* Stacks of Poker Chips */}
                {[
                    { x: 0.4, z: 0.1, color: '#dc2626' },
                    { x: 0.55, z: 0.3, color: '#2563eb' },
                    { x: 0.3, z: 0.4, color: '#111111' }
                ].map((chip, idx) => (
                    <group key={idx} position={[chip.x, 0.12, chip.z]}>
                        {[0, 0.03, 0.06, 0.09].map((y, i) => (
                            <mesh key={i} position={[0, y, 0]}>
                                <cylinderGeometry args={[0.1, 0.1, 0.025, 12]} />
                                <meshBasicMaterial color={chip.color} transparent opacity={op} />
                            </mesh>
                        ))}
                    </group>
                ))}

                {/* Table Narrative Plaque */}
                <group position={[0, -0.35, 0.3]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.9, 0.4, 0.04]} />
                        <meshBasicMaterial color="#1e293b" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0.06, 0.03]}
                        fontSize={0.10}
                        color="#facc15"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        ♠️ CAMPUS POKER TOURNAMENT
                    </Text>
                    <Text
                        position={[0, -0.09, 0.03]}
                        fontSize={0.075}
                        color="#94a3b8"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Where Mathematical Edge Met Quant
                    </Text>
                </group>
            </group>

            {/* === RIGHT: SIG QUANT LANDMARK & CANDLESTICK CHART === */}
            <group ref={candleChartRef} position={[2.6, 0.6, 0]}>
                {/* 3D Candlestick Chart Display */}
                <group position={[0, 0.6, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2.0, 1.2, 0.04]} />
                        <meshBasicMaterial color="#090d16" transparent opacity={op} />
                    </mesh>
                    <lineSegments position={[0, 0, 0.025]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 1.2, 0.04)]} />
                        <lineBasicMaterial color="#10b981" transparent opacity={op} />
                    </lineSegments>

                    {/* Candlesticks */}
                    {[
                        { x: -0.6, y: -0.1, h: 0.3, wickH: 0.5, green: true },
                        { x: -0.3, y: 0.05, h: 0.4, wickH: 0.7, green: true },
                        { x: 0.0, y: 0.15, h: 0.25, wickH: 0.4, green: false },
                        { x: 0.3, y: 0.25, h: 0.45, wickH: 0.8, green: true },
                        { x: 0.6, y: 0.4, h: 0.35, wickH: 0.6, green: true }
                    ].map((c, i) => (
                        <group key={i} position={[c.x, c.y, 0.03]}>
                            {/* Wick */}
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.015, c.wickH, 0.01]} />
                                <meshBasicMaterial color={c.green ? '#10b981' : '#ef4444'} transparent opacity={op} />
                            </mesh>
                            {/* Body */}
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.14, c.h, 0.02]} />
                                <meshBasicMaterial color={c.green ? '#10b981' : '#ef4444'} transparent opacity={op} />
                            </mesh>
                        </group>
                    ))}

                    <Text
                        position={[0, 0.46, 0.03]}
                        fontSize={0.09}
                        color="#34d399"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        HIGH-FREQUENCY TRADING EDGE
                    </Text>
                </group>

                {/* Susquehanna (SIG) Gateway Sign */}
                <group position={[0, -0.4, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2.2, 0.5, 0.04]} />
                        <meshBasicMaterial color="#1e3a8a" transparent opacity={op} />
                    </mesh>
                    <Text
                        position={[0, 0.1, 0.03]}
                        fontSize={0.11}
                        color="#60a5fa"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Bold.ttf"
                        fillOpacity={op}
                    >
                        SIG (SUSQUEHANNA) OPPORTUNITY ➔
                    </Text>
                    <Text
                        position={[0, -0.1, 0.03]}
                        fontSize={0.08}
                        color="#e0e7ff"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/CabinSketch-Regular.ttf"
                        fillOpacity={op}
                    >
                        Poker Table Discovery ➔ Algorithmic Journey
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
                    LEVEL 05 // LEADERSHIP & THE SPARK: AI + QUANT
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
                    Led 5-dev AI pod • Autonomous agents • Poker table pivot • SIG Quant Discovery
                </Text>
            </group>
        </group>
    );
}

