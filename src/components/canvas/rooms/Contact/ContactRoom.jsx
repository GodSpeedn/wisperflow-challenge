import { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, PositionalAudio, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

import SocialBarrel from './SocialBarrel';
import AiNarayanStation from './AiNarayanStation';
import TwoTruthsStation from './TwoTruthsStation';
import { useScene } from '../../../../context/SceneContext';
import GalleryClouds from '../Gallery/GalleryClouds';
import { useAchievements } from '../../../../context/AchievementsContext';
import { useAudio } from '../../../../context/AudioManager';
import { usePaintMaterial } from '../Gallery/usePaintMaterial';

// ============================================
// 🎪 THE PLAYGROUND (DOOR 4)
// Dual-Mode Experience: Ask AI Narayan & 2 Truths & 1 Lie
// ============================================

const WAVE_LAYERS = 4;

export const AUDIO_SETTINGS = {
  volume: 2,
  distance: 2,
  rolloff: 1.2
};

export const LATARNIA_SETTINGS = {
  position: [-10, 5, -20],
  rotation: [0, 0.1, 0],
  scale: [4.49, 5]
};

export const STATEK_SETTINGS = {
  position: [0, 1.6, -15],
  rotation: [0, -0.2, 0],
  scale: [3.35, 1.3]
};

const ContactRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
  const { camera } = useThree();
  const { isTeleporting } = useScene();
  const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
  const { globalVolume, isMuted } = useAudio();
  const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

  const [activeStation, setActiveStation] = useState('ai'); // 'ai' | 'game' | 'connect'
  const baseRotationY = useRef(0);
  const isBaseCaptured = useRef(false);
  const activeTweenRef = useRef(null);

  const audioRef = useRef();
  useEffect(() => {
    if (audioRef.current && audioRef.current.setVolume) {
      audioRef.current.setVolume(effectiveVolume);
    }
  }, [effectiveVolume]);

  useEffect(() => {
    if (isExiting || isTeleporting) {
      hidePopup();
    }
  }, [isExiting, isTeleporting, hidePopup]);

  // Load Sea, Pier, Lighthouse, Ship textures
  const seaTexture = useTexture('/textures/contact/faletopdown.webp');
  const moloTexture = useTexture('/textures/contact/molo.webp');
  const latarniaTexture = useTexture('/textures/contact/latarnia.webp');
  const statekTexture = useTexture('/textures/contact/statek.webp');

  useEffect(() => {
    if (seaTexture) {
      seaTexture.wrapS = seaTexture.wrapT = THREE.MirroredRepeatWrapping;
      seaTexture.repeat.set(6, 4);
      seaTexture.needsUpdate = true;
    }

    if (moloTexture) {
      moloTexture.wrapS = moloTexture.wrapT = THREE.RepeatWrapping;
      moloTexture.center.set(0.5, 0.5);
      moloTexture.rotation = Math.PI / 2;
      moloTexture.repeat.set(1, 1);
      moloTexture.needsUpdate = true;
    }
  }, [seaTexture, moloTexture]);

  useEffect(() => {
    camera.rotation.reorder('YXZ');
    return () => {
      camera.rotation.reorder('XYZ');
    };
  }, [camera]);

  // Paint Transition
  const groupRef = useRef();
  const { onBeforeCompile, animatePaint, resetPaint, uniformsData, updateRoomOrigin } = usePaintMaterial({
    dirX: 1.0,
    dirY: 0.0,
    dirZ: -0.1,
    startDist: -5.0,
    endDist: 55.0,
    noiseAxes: 'yz'
  });

  const wasTeleportedRef = useRef(false);
  useEffect(() => {
    if (isTeleporting) wasTeleportedRef.current = true;
  }, [isTeleporting]);

  useEffect(() => {
    if (showRoom && !isWarmup) {
      if (wasTeleportedRef.current || isTeleporting) {
        uniformsData.uPaintProgress.value = 1.0;
      } else {
        resetPaint();
        animatePaint(0.2, 2.5);
      }
    } else {
      uniformsData.uPaintProgress.value = 1.0;
    }
  }, [showRoom, isWarmup, isTeleporting]);

  const hasSignaledReady = useRef(false);
  const frameCount = useRef(0);
  const FRAMES_TO_WAIT = 5;

  const hasExitTriggered = useRef(false);
  if (isExiting && !hasExitTriggered.current) {
    hasExitTriggered.current = true;
    if (activeTweenRef.current) activeTweenRef.current.kill();
  }

  // Wave & Ship Refs
  const waveRefs = useRef([]);
  const statekRef = useRef();

  // Smooth Camera Pan to Station
  const animateToStation = useCallback((stationId) => {
    if (isExiting || hasExitTriggered.current) return;

    if (!isBaseCaptured.current) {
      baseRotationY.current = camera.rotation.y;
      isBaseCaptured.current = true;
    }

    const baseY = baseRotationY.current;
    let targetX = 0;
    let targetY = baseY;

    if (stationId === 'ai') {
      targetX = -0.02;
      targetY = baseY + 0.36; // Look towards left AI station
    } else if (stationId === 'game') {
      targetX = -0.02;
      targetY = baseY - 0.36; // Look towards right Detective station
    } else if (stationId === 'connect') {
      targetX = -0.16; // Look down at ocean barrels
      targetY = baseY;
    }

    if (activeTweenRef.current) activeTweenRef.current.kill();

    activeTweenRef.current = gsap.to(camera.rotation, {
      x: targetX,
      y: targetY,
      z: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });

    setActiveStation(stationId);
    window.dispatchEvent(
      new CustomEvent('playground-station-changed', { detail: { mode: stationId } })
    );
  }, [camera, isExiting]);

  // Listen for station switch events from HUD pills
  useEffect(() => {
    const handleSwitchEvent = (e) => {
      if (e.detail?.mode) {
        animateToStation(e.detail.mode);
      }
    };
    window.addEventListener('playground-switch-station', handleSwitchEvent);
    return () => window.removeEventListener('playground-switch-station', handleSwitchEvent);
  }, [animateToStation]);

  // Reset when exiting / teleporting
  useEffect(() => {
    if (isTeleporting) {
      isBaseCaptured.current = false;
      hasExitTriggered.current = false;
      setActiveStation('ai');
    }
  }, [isTeleporting]);

  // Once room is ready, focus initial AI station smoothly
  useEffect(() => {
    if (showRoom && !isExiting) {
      const timer = setTimeout(() => {
        if (!isBaseCaptured.current) {
          baseRotationY.current = camera.rotation.y;
          isBaseCaptured.current = true;
        }
        animateToStation('ai');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showRoom, isExiting, camera, animateToStation]);

  // Frame Loop (Wave & Ship bobbing)
  useFrame((state) => {
    updateRoomOrigin(groupRef);

    if (!hasSignaledReady.current) {
      frameCount.current++;
      if (frameCount.current >= FRAMES_TO_WAIT) {
        hasSignaledReady.current = true;
        onReady?.();
        if (!isWarmup) {
          setTimeout(() => showTutorial('contact_submit'), 1800);
        }
      }
    }

    // 🌊 Ocean Waves
    const time = state.clock.getElapsedTime();
    waveRefs.current.forEach((ref, i) => {
      if (ref) {
        const speed = 0.8 + i * 0.15;
        const amplitude = 0.15 - i * 0.02;
        const offset = i * 0.5;
        ref.position.y = Math.sin(time * speed + offset) * amplitude;
      }
    });

    // ⛵ Ship bobbing and sailing
    if (statekRef.current) {
      const bobSpeed = 0.8;
      const bobAmplitude = 0.3;
      statekRef.current.position.y = STATEK_SETTINGS.position[1] + Math.sin(time * bobSpeed) * bobAmplitude;

      const sailSpeed = 0.04;
      const sailAmplitude = 12;
      statekRef.current.position.x = STATEK_SETTINGS.position[0] + Math.sin(time * sailSpeed) * sailAmplitude;

      const rollAmplitude = 0.05;
      statekRef.current.rotation.z = Math.sin(time * bobSpeed * 1.2) * rollAmplitude;
    }
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.7, -5]}>
      {!isWarmup && (
        <PositionalAudio
          ref={audioRef}
          url="/sounds/szummorza.mp3"
          distanceModel="exponential"
          refDistance={AUDIO_SETTINGS.distance}
          rolloffFactor={AUDIO_SETTINGS.rolloff}
          loop
          autoplay
          volume={effectiveVolume}
        />
      )}

      {/* ☁️ CLOUDS */}
      <GalleryClouds count={45} seed={88} rotationOffset={[0, 1, 0]} />

      {/* 🌊 OCEAN WAVE LAYERS */}
      <group position={[0, -1, -8]}>
        {Array.from({ length: WAVE_LAYERS }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => (waveRefs.current[i] = el)}
            position={[0, -i * 0.1, -i * 8]}
            rotation={[-Math.PI / 2.5, 0, 0]}
          >
            <planeGeometry args={[80, 30]} />
            <meshBasicMaterial
              map={seaTexture}
              color="#ffffff"
              transparent={true}
              opacity={1 - i * 0.1}
              side={THREE.DoubleSide}
              toneMapped={false}
              onBeforeCompile={onBeforeCompile}
            />
          </mesh>
        ))}
      </group>

      {/* 🏖️ CENTRAL WOODEN PIER / DOCK */}
      <mesh position={[0, 0.05, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 7]} />
        <meshBasicMaterial
          map={moloTexture}
          color="#e0e0e0"
          roughness={0.8}
          side={THREE.DoubleSide}
          transparent
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 🤖 STATION 1 (LEFT): ASK AI NARAYAN                     */}
      {/* ======================================================== */}
      <AiNarayanStation
        position={[-3.1, 0.12, -1.6]}
        rotation={[0, 0.38, 0]}
        isActive={activeStation === 'ai'}
        onSelectStation={(s) => animateToStation(s)}
      />

      {/* ======================================================== */}
      {/* 🎭 STATION 2 (RIGHT): 2 TRUTHS & 1 LIE                  */}
      {/* ======================================================== */}
      <TwoTruthsStation
        position={[3.1, 0.12, -1.6]}
        rotation={[0, -0.38, 0]}
        isActive={activeStation === 'game'}
        onSelectStation={(s) => animateToStation(s)}
      />

      {/* ======================================================== */}
      {/* 🛢️ STATION 3: SOCIAL BARRELS (Floating in water)       */}
      {/* ======================================================== */}
      {/* LINKEDIN */}
      <SocialBarrel
        position={isMobile ? [-1.2, 0.5, -10] : [-3.2, 0.4, -9]}
        rotation={[0, 0.2, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="LINKEDIN"
        onClick={() => window.open('https://linkedin.com/in/narayan-rakhecha', '_blank')}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />
      {/* GITHUB */}
      <SocialBarrel
        position={isMobile ? [-1.5, -0.3, -7] : [-5.2, -0.3, -8.5]}
        rotation={[0, 0.3, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="GITHUB"
        onClick={() => window.open('https://github.com/GodSpeedn', '_blank')}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />
      {/* YOUTUBE */}
      <SocialBarrel
        position={isMobile ? [1.2, 0.5, -10] : [3.2, 0.4, -9]}
        rotation={[0, -0.2, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="YOUTUBE"
        onClick={() => window.open('https://youtube.com/@narayanrakhecha2376', '_blank')}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />
      {/* PHONE */}
      <SocialBarrel
        position={isMobile ? [1.5, -0.3, -7] : [5.2, -0.3, -8.5]}
        rotation={[0, -0.3, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="PHONE"
        onClick={() => window.open('tel:+918999392326', '_blank')}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />
      {/* EMAIL / DIRECT MESSAGE */}
      <SocialBarrel
        position={isMobile ? [0, -0.7, -6] : [0, -0.6, -7]}
        rotation={[0, 0, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="EMAIL"
        onClick={() => {
          unlockAchievement('contact_submit');
          window.open(
            'mailto:narayanrakhecha@gmail.com?subject=Connecting%20with%20Narayan%20Rakhecha',
            '_blank'
          );
        }}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      {/* 🗼 LATARNIA (LIGHTHOUSE) */}
      <mesh position={LATARNIA_SETTINGS.position} rotation={LATARNIA_SETTINGS.rotation}>
        <planeGeometry args={LATARNIA_SETTINGS.scale} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={latarniaTexture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {/* 🚢 STATEK (SHIP) */}
      <mesh ref={statekRef} position={STATEK_SETTINGS.position} rotation={STATEK_SETTINGS.rotation}>
        <planeGeometry args={STATEK_SETTINGS.scale} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={statekTexture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </group>
  );
};

export default ContactRoom;
