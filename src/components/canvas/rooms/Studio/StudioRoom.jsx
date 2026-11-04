import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { CONTENT_DATA, STUDIO_SECTORS } from './contentData';
import { useScene } from '../../../../context/SceneContext';
import { useAchievements } from '../../../../context/AchievementsContext';
import FloatingCodeParticles from './FloatingCodeParticles';
import StrategyPavilionScenery from './StrategyPavilionScenery';
import StrategyBoard from './StrategyBoard';
import { useAudio } from '../../../../context/AudioManager';
import { usePaintMaterial } from '../Gallery/usePaintMaterial';

// Paint reveal configuration (top to bottom watercolor wave)
const STUDIO_PAINT_CONFIG = {
    dirX: 0.0,
    dirY: -1.0,
    dirZ: 0.0,
    startDist: -10.0,
    endDist: 10.0,
    noiseAxes: 'xz'
};

// Spatial audio settings for papercraft ambient atmosphere
const AUDIO_SETTINGS = {
    volume: 0.65,
    distance: 3.5,
    rolloff: 1.0
};

// Golden proportion tablet layout: fits 100% inside viewport without edge overflow
const TABLET_LAYOUT = {
    'hero':         { pos: [0, 0.05, 0.15],       rot: [0, 0, 0],       scale: 0.95 },
    'top-left':     { pos: [-2.6, 1.05, -0.15],   rot: [0, 0.08, 0],    scale: 0.75 },
    'top-right':    { pos: [2.6, 1.05, -0.15],    rot: [0, -0.08, 0],   scale: 0.75 },
    'bottom-left':  { pos: [-2.6, -0.95, -0.15],  rot: [0, 0.06, 0],    scale: 0.75 },
    'bottom-right': { pos: [2.6, -0.95, -0.15],   rot: [0, -0.06, 0],   scale: 0.75 },
};

const StudioRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
    const groupRef = useRef();
    const stageRef = useRef();
    const { isTeleporting } = useScene();
    const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
    const { globalVolume, isMuted } = useAudio();
    const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

    // Wing state: 0 = Wispr India GTM, 1 = YouTube Content Engine
    const activeWingRef = useRef(0);
    const wingOffsetRef = useRef(0);
    const isGlidingRef = useRef(false);

    // Audio Ref
    const audioRef = useRef();
    useEffect(() => {
        if (audioRef.current?.setVolume) {
            audioRef.current.setVolume(effectiveVolume);
        }
    }, [effectiveVolume]);

    useEffect(() => {
        if (isExiting || isTeleporting) {
            hidePopup();
        }
    }, [isExiting, isTeleporting, hidePopup]);

    // ===== PAINT TRANSITION =====
    const {
        onBeforeCompile: paintOnBeforeCompile,
        animatePaint,
        resetPaint,
        uniformsData: paintUniforms,
        updateRoomOrigin
    } = usePaintMaterial(STUDIO_PAINT_CONFIG);

    const wasTeleportedRef = useRef(false);
    useEffect(() => {
        if (isTeleporting) wasTeleportedRef.current = true;
    }, [isTeleporting]);

    useEffect(() => {
        if (showRoom && !isWarmup) {
            if (wasTeleportedRef.current || isTeleporting) {
                gsap.set(paintUniforms.uPaintProgress, { value: 1.0 });
            } else {
                resetPaint();
                animatePaint(0.2, 2.5);
            }
        } else {
            gsap.set(paintUniforms.uPaintProgress, { value: 1.0 });
        }
    }, [showRoom, isWarmup, isTeleporting, animatePaint, resetPaint, paintUniforms]);

    // Signal ready after 5 render frames
    const hasSignaledReady = useRef(false);
    const frameCount = useRef(0);
    const FRAMES_TO_WAIT = 5;

    useFrame(() => {
        updateRoomOrigin(groupRef);

        if (hasSignaledReady.current) return;
        frameCount.current++;
        if (frameCount.current >= FRAMES_TO_WAIT) {
            hasSignaledReady.current = true;
            onReady?.();
            if (!isWarmup) {
                setTimeout(() => showTutorial('studio_interact'), 1800);
            }
        }
    });

    // Content split by wing
    const wing1Items = useMemo(() => CONTENT_DATA.filter(item => item.sector === 0), []);
    const wing2Items = useMemo(() => CONTENT_DATA.filter(item => item.sector === 1), []);

    // Smooth stage sliding between Wing 0 and Wing 1 (NEVER touches camera.position)
    const switchWing = useCallback((targetWing, duration = 0.75) => {
        if (!stageRef.current) return;
        gsap.killTweensOf(stageRef.current.position);
        isGlidingRef.current = true;
        activeWingRef.current = targetWing;

        // Wing 0 is at local X = 0, Wing 1 is at local X = 14.0
        const targetStageX = targetWing === 0 ? 0 : -14.0;
        wingOffsetRef.current = targetStageX;

        unlockAchievement('studio_interact');

        gsap.to(stageRef.current.position, {
            x: targetStageX,
            duration,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => {
                isGlidingRef.current = false;
                window.dispatchEvent(new CustomEvent('studio-sector-changed', {
                    detail: { sector: targetWing }
                }));
            }
        });
    }, [unlockAchievement]);

    // Reset stage to Wing 0 when entering room or teleporting
    useEffect(() => {
        if (showRoom && !isWarmup) {
            activeWingRef.current = 0;
            wingOffsetRef.current = 0;
            if (stageRef.current) {
                stageRef.current.position.x = 0;
            }
        }
    }, [showRoom, isWarmup]);

    // Listen for HUD pill events (`studio-rotate-sector` / `studio-switch-wing`)
    useEffect(() => {
        const handleSwitchSector = (e) => {
            const sec = e.detail?.sector;
            if (typeof sec === 'number' && sec !== activeWingRef.current) {
                switchWing(sec);
            }
        };
        window.addEventListener('studio-rotate-sector', handleSwitchSector);
        window.addEventListener('studio-switch-wing', handleSwitchSector);

        return () => {
            window.removeEventListener('studio-rotate-sector', handleSwitchSector);
            window.removeEventListener('studio-switch-wing', handleSwitchSector);
        };
    }, [switchWing]);

    // Keyboard arrow navigation (Left/Right to switch wings)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && activeWingRef.current !== 0) {
                switchWing(0);
            } else if (e.key === 'ArrowRight' && activeWingRef.current !== 1) {
                switchWing(1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [switchWing]);

    // Horizontal pointer/touch drag handling to swipe between wings
    const dragStartX = useRef(0);
    const isDragging = useRef(false);

    const handlePointerDown = (e) => {
        dragStartX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
        isDragging.current = true;
    };

    const handlePointerUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const currentX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || dragStartX.current;
        const deltaX = currentX - dragStartX.current;

        // Swipe right (positive delta) -> go to left wing (Wing 0)
        // Swipe left (negative delta) -> go to right wing (Wing 1)
        if (deltaX > 45 && activeWingRef.current !== 0) {
            switchWing(0);
        } else if (deltaX < -45 && activeWingRef.current !== 1) {
            switchWing(1);
        }
    };

    // Open Strategy Dossier drawer
    const handleReadDossier = useCallback((item) => {
        unlockAchievement('studio_interact');
        window.dispatchEvent(new CustomEvent('open-strategy-dossier', {
            detail: { item }
        }));
    }, [unlockAchievement]);

    return (
        <group
            ref={groupRef}
            position={[0, 0, 0]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            {/* 1. Papercraft Ambient Audio */}
            {!isWarmup && (
                <PositionalAudio
                    ref={audioRef}
                    url="/sounds/cfl_turningpages-belem-breeze-487596.ogg"
                    distanceModel="exponential"
                    refDistance={AUDIO_SETTINGS.distance}
                    rolloffFactor={AUDIO_SETTINGS.rolloff}
                    loop
                    autoplay
                    volume={effectiveVolume}
                />
            )}

            {/* 2. THE LOCAL SLIDING STAGE (Positioned in front of entrance camera at local Z = -6.5, Y = 0.45 for perfect vertical clearance) */}
            <group ref={stageRef} position={[0, 0.45, -6.5]}>
                {/* 2A. Integrated Architectural Scenery */}
                <StrategyPavilionScenery
                    paintOnBeforeCompile={paintOnBeforeCompile}
                    onSwitchWing={switchWing}
                />

                {/* 2B. WING 0: WISPR FLOW INDIA EXPANSION (Centered at local X = 0) */}
                <group position={[0, 0, 0]}>
                    {wing1Items.map((item, idx) => {
                        const layout = TABLET_LAYOUT[item.slot] || TABLET_LAYOUT['hero'];
                        return (
                            <StrategyBoard
                                key={item.id}
                                item={item}
                                index={idx}
                                position={layout.pos}
                                rotation={layout.rot}
                                scale={layout.scale}
                                onReadDossier={handleReadDossier}
                                paintOnBeforeCompile={paintOnBeforeCompile}
                            />
                        );
                    })}

                    {/* 3D Arrow pill to switch to Wing 1 */}
                    <group
                        position={[4.2, 0.05, 0]}
                        onClick={(e) => {
                            e.stopPropagation();
                            switchWing(1);
                        }}
                    >
                        <mesh>
                            <planeGeometry args={[1.75, 0.42]} />
                            <meshBasicMaterial color="#faf6ed" />
                        </mesh>
                        <mesh position={[0, 0, -0.002]}>
                            <planeGeometry args={[1.81, 0.48]} />
                            <meshBasicMaterial color="#1a1a1a" />
                        </mesh>
                        <Text
                            position={[0, 0, 0.01]}
                            fontSize={0.13}
                            font="/fonts/CabinSketch-Bold.ttf"
                            color="#1a1a1a"
                            anchorX="center"
                            anchorY="middle"
                        >
                            YOUTUBE ENGINE ➔
                        </Text>
                    </group>
                </group>

                {/* 2C. WING 1: YOUTUBE CONTENT ENGINE (Centered at local X = +14.0) */}
                <group position={[14.0, 0, 0]}>
                    {wing2Items.map((item, idx) => {
                        const layout = TABLET_LAYOUT[item.slot] || TABLET_LAYOUT['hero'];
                        return (
                            <StrategyBoard
                                key={item.id}
                                item={item}
                                index={idx}
                                position={layout.pos}
                                rotation={layout.rot}
                                scale={layout.scale}
                                onReadDossier={handleReadDossier}
                                paintOnBeforeCompile={paintOnBeforeCompile}
                            />
                        );
                    })}

                    {/* 3D Arrow pill to switch back to Wing 0 */}
                    <group
                        position={[-4.2, 0.05, 0]}
                        onClick={(e) => {
                            e.stopPropagation();
                            switchWing(0);
                        }}
                    >
                        <mesh>
                            <planeGeometry args={[1.95, 0.42]} />
                            <meshBasicMaterial color="#faf6ed" />
                        </mesh>
                        <mesh position={[0, 0, -0.002]}>
                            <planeGeometry args={[2.01, 0.48]} />
                            <meshBasicMaterial color="#1a1a1a" />
                        </mesh>
                        <Text
                            position={[0, 0, 0.01]}
                            fontSize={0.13}
                            font="/fonts/CabinSketch-Bold.ttf"
                            color="#1a1a1a"
                            anchorX="center"
                            anchorY="middle"
                        >
                            ⬅ WISPR INDIA GTM
                        </Text>
                    </group>
                </group>
            </group>

            {/* 3. Sketched Papercraft Floating Strategy Particles */}
            <FloatingCodeParticles wingOffsetRef={wingOffsetRef} />
        </group>
    );
};

export default StudioRoom;
