import React, { useState, useEffect } from 'react';
import { useScene } from '../../context/SceneContext';
import { STORY_SCENES } from '../canvas/rooms/About/storyData';
import '../../styles/StoryPills.scss';

export default function StoryPills() {
    const { currentRoom, overlayContent } = useScene();
    const [activeScene, setActiveScene] = useState(0);

    // Sync active scene when user scroll-flies through 3D waypoints
    useEffect(() => {
        const handleSceneChanged = (e) => {
            if (typeof e.detail?.sceneIndex === 'number') {
                setActiveScene(e.detail.sceneIndex);
            }
        };
        window.addEventListener('story-scene-changed', handleSceneChanged);
        return () => window.removeEventListener('story-scene-changed', handleSceneChanged);
    }, []);

    // Only render when inside Door 3 (The Life Story / About) and overlay is closed
    if (currentRoom !== 'about' || overlayContent) {
        return null;
    }

    const handleSelectScene = (scene, index) => {
        setActiveScene(index);
        window.dispatchEvent(new CustomEvent('story-fly-to', {
            detail: { targetScroll: scene.targetScroll, sceneIndex: index }
        }));
    };

    return (
        <nav className="story-pills-bar" aria-label="Life Story Flight Navigation">
            <div className="pills-container">
                {STORY_SCENES.map((scene, idx) => {
                    const isActive = activeScene === idx;
                    return (
                        <button
                            key={scene.id}
                            type="button"
                            className={`story-pill-btn ${isActive ? 'active' : ''}`}
                            onClick={() => handleSelectScene(scene, idx)}
                            title={scene.title}
                        >
                            <span className="pill-name">{scene.pillLabel}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

