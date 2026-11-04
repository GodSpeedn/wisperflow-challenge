import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAudio } from '../../context/AudioManager';
import { CONTENT_DATA, STUDIO_SECTORS } from '../canvas/rooms/Studio/contentData';
import '../../styles/StrategyDossier.scss';

export default function StrategyDossier() {
    const { play, isMuted, globalVolume } = useAudio();
    const [isOpen, setIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    // Find current index in full CONTENT_DATA list
    const currentIndex = useMemo(() => {
        if (!currentItem) return 0;
        const idx = CONTENT_DATA.findIndex(item => item.id === currentItem.id);
        return idx >= 0 ? idx : 0;
    }, [currentItem]);

    // Current sector details
    const currentSector = useMemo(() => {
        if (!currentItem) return STUDIO_SECTORS[0];
        return STUDIO_SECTORS.find(s => s.angleIndex === currentItem.sector) || STUDIO_SECTORS[0];
    }, [currentItem]);

    // Sound effect (respects mute and global volume)
    const playPaperSound = useCallback(() => {
        if (isMuted || globalVolume <= 0) return;
        try {
            play('papersound', { volume: 0.55 });
        } catch {
            // Audio policy fallback
        }
    }, [play, isMuted, globalVolume]);

    // Listen for open events dispatched from 3D StrategyBoard or UI
    useEffect(() => {
        const handleOpen = (e) => {
            const item = e.detail?.item;
            if (item) {
                setCurrentItem(item);
                setIsOpen(true);
                playPaperSound();
                window.dispatchEvent(new CustomEvent('strategy-dossier-state-changed', {
                    detail: { isOpen: true, item }
                }));
            }
        };

        const handleClose = () => {
            setIsOpen(false);
            window.dispatchEvent(new CustomEvent('strategy-dossier-state-changed', {
                detail: { isOpen: false }
            }));
        };

        window.addEventListener('open-strategy-dossier', handleOpen);
        window.addEventListener('close-strategy-dossier', handleClose);

        return () => {
            window.removeEventListener('open-strategy-dossier', handleOpen);
            window.removeEventListener('close-strategy-dossier', handleClose);
        };
    }, [playPaperSound]);

    // Close handler
    const handleCloseDossier = useCallback(() => {
        setIsOpen(false);
        playPaperSound();
        window.dispatchEvent(new CustomEvent('strategy-dossier-state-changed', {
            detail: { isOpen: false }
        }));
    }, [playPaperSound]);

    // Sequential Navigation
    const handlePrev = useCallback(() => {
        const prevIdx = (currentIndex - 1 + CONTENT_DATA.length) % CONTENT_DATA.length;
        const prevItem = CONTENT_DATA[prevIdx];
        setCurrentItem(prevItem);
        playPaperSound();

        // Notify 3D room to align wing if sector changed
        window.dispatchEvent(new CustomEvent('studio-switch-wing', {
            detail: { sector: prevItem.sector }
        }));
    }, [currentIndex, playPaperSound]);

    const handleNext = useCallback(() => {
        const nextIdx = (currentIndex + 1) % CONTENT_DATA.length;
        const nextItem = CONTENT_DATA[nextIdx];
        setCurrentItem(nextItem);
        playPaperSound();

        // Notify 3D room to align wing if sector changed
        window.dispatchEvent(new CustomEvent('studio-switch-wing', {
            detail: { sector: nextItem.sector }
        }));
    }, [currentIndex, playPaperSound]);

    // Keyboard navigation (ESC to close, Left/Right for sequential reading)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                handleCloseDossier();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [isOpen, handleCloseDossier, handlePrev, handleNext]);

    if (!isOpen || !currentItem) return null;

    return (
        <div className="strategy-dossier-overlay" onClick={handleCloseDossier}>
            <aside
                className="strategy-dossier-drawer"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dossier-title"
            >
                {/* 1. TOP HEADER & METADATA BAR */}
                <header className="dossier-header">
                    <div className="dossier-badge-row">
                        <span className="dossier-wing-badge">
                            {currentSector.icon} {currentSector.name}
                        </span>
                        <span className="dossier-category-pill">
                            {currentItem.badge}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="dossier-close-btn"
                        onClick={handleCloseDossier}
                        aria-label="Close Strategy Dossier"
                    >
                        <span>✕</span> ESC
                    </button>
                </header>

                {/* 2. MAIN SCROLLABLE CONTENT */}
                <div className="dossier-body">
                    {/* Headline Title */}
                    <h2 id="dossier-title" className="dossier-title">
                        {currentItem.headline}
                    </h2>

                    {/* Bold Ink Metric Stamp */}
                    <div className="dossier-metric-stamp">
                        <span className="stamp-label">
                            {currentItem.sector === 1 ? 'THE REAL NUMBERS' : 'CORE IMPACT METRIC'}
                        </span>
                        <span className="stamp-value">{currentItem.metric}</span>
                    </div>

                    {/* Executive Strategic Thesis / Backstory */}
                    <section className="dossier-thesis-card">
                        <span className="thesis-label">
                            {currentItem.sector === 1 ? 'THE BACKSTORY' : 'STRATEGIC THESIS'}
                        </span>
                        <p className="thesis-text">{currentItem.thesis}</p>
                    </section>

                    {/* Tactical Playbook & Execution Blueprint / Behind-the-Scenes Log */}
                    <section className="dossier-tactics-section">
                        <h3 className="section-title">
                            {currentItem.sector === 1 ? (
                                <><span className="title-icon">📖</span> THE BEHIND-THE-SCENES LOG</>
                            ) : (
                                <><span className="title-icon">⚡</span> TACTICAL PLAYBOOK & EXECUTION BLUEPRINT</>
                            )}
                        </h3>
                        <ul className="tactics-list">
                            {currentItem.fullTactics?.map((tactic, idx) => (
                                <li key={idx} className="tactic-item">
                                    <span className="tactic-bullet">›</span>
                                    <span className="tactic-text">{tactic}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* 3. DOCK: CTA & SEQUENTIAL NAVIGATION */}
                <footer className="dossier-footer">
                    {/* Primary Action Button or Self-Contained Strategy Indicator */}
                    {currentItem.actionUrl ? (
                        <a
                            href={currentItem.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dossier-action-btn"
                        >
                            <span>{currentItem.actionLabel || 'Open Live Demo ↗'}</span>
                        </a>
                    ) : (
                        <div className="dossier-brief-badge" role="status">
                            <span className="badge-icon">{currentItem.sector === 1 ? '🎬' : '📋'}</span>
                            <span>
                                {currentItem.sector === 1
                                    ? 'BUILDER FIELD NOTE — DOCUMENTING THE JOURNEY'
                                    : 'EXECUTIVE STRATEGY BRIEF — READY FOR EXECUTION'}
                            </span>
                        </div>
                    )}

                    {/* Sequential Reading Controls */}
                    <div className="dossier-nav-bar">
                        <button
                            type="button"
                            className="dossier-nav-btn prev-btn"
                            onClick={handlePrev}
                            title="Previous Story [←]"
                        >
                            ← Previous
                        </button>

                        <span className="nav-counter">
                            {currentItem.sector === 1 ? 'Story' : 'Playbook'} <strong>{currentIndex + 1}</strong> of <strong>{CONTENT_DATA.length}</strong>
                        </span>

                        <button
                            type="button"
                            className="dossier-nav-btn next-btn"
                            onClick={handleNext}
                            title="Next Story [→]"
                        >
                            Next →
                        </button>
                    </div>
                </footer>
            </aside>
        </div>
    );
}
