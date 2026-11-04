import React, { useState, useEffect } from 'react';
import { useScene } from '../../context/SceneContext';
import { STUDIO_SECTORS } from '../canvas/rooms/Studio/contentData';
import '../../styles/StudioPills.scss';

export default function StudioPills() {
    const { currentRoom, overlayContent } = useScene();
    const [activeSector, setActiveSector] = useState(0);
    const [isDossierOpen, setIsDossierOpen] = useState(false);

    // Listen for sector changes triggered by 3D dragging, gliding, or keyboard
    useEffect(() => {
        const handleSectorChanged = (e) => {
            if (typeof e.detail?.sector === 'number') {
                setActiveSector(e.detail.sector);
            }
        };
        const handleDossierState = (e) => {
            setIsDossierOpen(Boolean(e.detail?.isOpen));
        };

        window.addEventListener('studio-sector-changed', handleSectorChanged);
        window.addEventListener('strategy-dossier-state-changed', handleDossierState);

        return () => {
            window.removeEventListener('studio-sector-changed', handleSectorChanged);
            window.removeEventListener('strategy-dossier-state-changed', handleDossierState);
        };
    }, []);

    // Only render when in Studio room and overlay/dossier is not covering screen
    if (currentRoom !== 'studio' || overlayContent || isDossierOpen) {
        return null;
    }

    const handleSelectSector = (idx) => {
        setActiveSector(idx);
        window.dispatchEvent(new CustomEvent('studio-switch-wing', { detail: { sector: idx } }));
        window.dispatchEvent(new CustomEvent('studio-rotate-sector', { detail: { sector: idx } }));
    };

    return (
        <nav className="studio-pills-bar" aria-label="Strategy Pavilion Wing Navigator">
            <div className="pills-container">
                {STUDIO_SECTORS.map((sector, idx) => {
                    const isActive = activeSector === idx;
                    return (
                        <button
                            key={sector.id}
                            type="button"
                            className={`studio-pill-btn ${isActive ? 'active' : ''}`}
                            onClick={() => handleSelectSector(idx)}
                            aria-pressed={isActive}
                        >
                            <span className="pill-icon">{sector.icon}</span>
                            <span className="pill-name">{sector.name}</span>
                            <span className="pill-count">({sector.count})</span>
                        </button>
                    );
                })}
                <span className="pills-hint" title="Use Left and Right arrow keys to switch wings">
                    [ ← / → ]
                </span>
            </div>
        </nav>
    );
}
