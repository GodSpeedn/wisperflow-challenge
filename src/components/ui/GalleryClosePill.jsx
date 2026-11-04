import React, { useState, useEffect } from 'react';
import '../../styles/GalleryClosePill.scss';

export default function GalleryClosePill() {
    const [isInspecting, setIsInspecting] = useState(false);

    useEffect(() => {
        const handleGalleryInspect = (e) => {
            setIsInspecting(Boolean(e.detail?.isInspecting));
        };
        window.addEventListener('gallery-inspect-state', handleGalleryInspect);
        return () => window.removeEventListener('gallery-inspect-state', handleGalleryInspect);
    }, []);

    if (!isInspecting) return null;

    const handleClose = () => {
        window.dispatchEvent(new CustomEvent('gallery-close-inspect'));
    };

    return (
        <div className="gallery-close-pill-wrapper" role="region" aria-label="Poster Close Controls">
            <button
                type="button"
                className="gallery-close-pill-btn"
                onClick={handleClose}
                aria-label="Close inspected poster"
            >
                <span className="pill-cross" aria-hidden="true">✕</span>
                <span className="pill-title">CLOSE POSTER</span>
                <span className="pill-hint">(or tap anywhere outside)</span>
            </button>
        </div>
    );
}

