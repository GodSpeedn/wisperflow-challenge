import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation.
 */

const ROOM_META = {
    null: {
        path: '/',
        title: 'Narayan Rakhecha | Growth & AI Portfolio for Wispr Flow',
        description: 'Interactive 3D portfolio and dossier for Narayan Rakhecha — Quantitative trading (SIG Algothon 18th), Multi-agent AI systems, and Wispr Flow India growth strategy.',
    },
    about: {
        path: '/about',
        title: 'About Narayan | Career Journey & Metrics',
        description: 'The journey of Narayan Rakhecha: Nashik roots, Wollongong CS & AI leadership, SIG UNSW Algothon ranking, and the Wispr Flow mission.',
    },
    gallery: {
        path: '/gallery',
        title: 'Key Achievements & Systems | Narayan Rakhecha',
        description: 'Explore quantitative trading honors (SIG Algothon Top 5%, IMC Prosperity 4), AI leadership (-30% task latency), and EPAT algorithmic trading certification.',
    },
    studio: {
        path: '/studio',
        title: 'The Dossier Studio | Wispr Flow Playbook & Terminal',
        description: 'Interactive terminal, video pitch, growth playbook pillars, and the Two Truths and a Lie game for Narayan Rakhecha.',
    },
    contact: {
        path: '/contact',
        title: 'The Playground | Ask AI Narayan & 2 Truths & 1 Lie',
        description: 'Interactive AI clone of Narayan Rakhecha, 2 Truths & 1 Lie detective game, and direct channels for Wispr Flow.',
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
    '/playground': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 * Call this once at app startup to determine if we need to auto-teleport.
 */
export function getInitialRoomFromUrl() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined); // Track what we last pushed to avoid duplicates

    // Update document meta and URL when room changes
    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        // Update the page title
        document.title = meta.title;

        // Update meta description
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
            descTag.setAttribute('content', meta.description);
        }

        // Update OG meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://itomdev.com${meta.path}`);

        // Update canonical link to ensure virtual routes are correctly indexable as separate pages
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute('href', `https://itomdev.com${meta.path}`);
        }

        // Push to browser history (only if not handling a popstate event and room actually changed)
        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            // Use replaceState for the very first load, pushState for subsequent navigations
            if (lastPushedRoom.current === undefined) {
                const initialPathRoom = getInitialRoomFromUrl();
                if (currentRoom === null && initialPathRoom !== null) {
                    // Don't overwrite deep-linked URL on initial load before auto-teleport fires
                    window.history.replaceState({ room: initialPathRoom }, '', window.location.pathname);
                    lastPushedRoom.current = initialPathRoom;
                } else {
                    window.history.replaceState({ room: currentRoom }, '', meta.path);
                    lastPushedRoom.current = currentRoom;
                }
            } else {
                window.history.pushState({ room: currentRoom }, '', meta.path);
                lastPushedRoom.current = currentRoom;
            }
        }

        isHandlingPopState.current = false;
    }, [currentRoom]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room ?? null;
            lastPushedRoom.current = targetRoom;

            if (targetRoom === null) {
                // Going back to corridor — we don't teleport, just need to trigger exit
                // The SceneContext requestExit will handle the animation
                // For now, we update meta immediately
                const meta = ROOM_META['null'];
                document.title = meta.title;
            } else if (hasEntered) {
                // Teleport to the target room
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
