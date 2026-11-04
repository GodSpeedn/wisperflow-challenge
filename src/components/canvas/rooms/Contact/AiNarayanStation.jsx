import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { QUICK_PROMPTS, getAiNarayanResponse } from './aiKnowledge';
import '../../../../styles/PlaygroundStations.scss';

export default function AiNarayanStation({ position = [-3.0, 0.15, -1.8], rotation = [0, 0.35, 0], isActive = false, onSelectStation }) {
  const [currentQuery, setCurrentQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState(QUICK_PROMPTS[0]);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fullAnswer, setFullAnswer] = useState('');
  const [answerTitle, setAnswerTitle] = useState(QUICK_PROMPTS[0].label);

  const typewriterTimeoutRef = useRef(null);

  // Initialize with the first prompt answer
  useEffect(() => {
    handleTriggerQuery(QUICK_PROMPTS[0].query, QUICK_PROMPTS[0].label);
  }, []);

  const handleTriggerQuery = (queryText, title) => {
    if (!queryText.trim()) return;

    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }

    const { title: resTitle, response } = getAiNarayanResponse(queryText);
    setAnswerTitle(title || resTitle);
    setFullAnswer(response);
    setDisplayedAnswer('');
    setIsTyping(true);

    let charIndex = 0;
    const speed = 12; // ms per char

    const typeNext = () => {
      if (charIndex < response.length) {
        // Type 2-3 chars per frame for snappy readability
        const step = Math.min(3, response.length - charIndex);
        setDisplayedAnswer(response.substring(0, charIndex + step));
        charIndex += step;
        typewriterTimeoutRef.current = setTimeout(typeNext, speed);
      } else {
        setDisplayedAnswer(response);
        setIsTyping(false);
      }
    };

    typeNext();
  };

  const handleFastForward = () => {
    if (isTyping) {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
      setDisplayedAnswer(fullAnswer);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    handleTriggerQuery(currentQuery, `Question: "${currentQuery.slice(0, 30)}..."`);
    setCurrentQuery('');
  };

  // Convert markdown bold and line breaks to formatted HTML safely
  const formatMarkdown = (text) => {
    if (!text) return '';
    return text
      .split('\n\n')
      .map((para, pIdx) => {
        // Parse bold **text**
        const parts = para.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={pIdx} className="chat-paragraph">
            {parts.map((part, idx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={idx}>{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('- ') || part.startsWith('1. ') || part.startsWith('2. ') || part.startsWith('3. ')) {
                return <span key={idx} className="list-line">{part}</span>;
              }
              return part;
            })}
          </p>
        );
      });
  };

  return (
    <group position={position} rotation={rotation} visible={isActive}>
      {/* 3D Papercraft Desk Backing Plane */}
      <mesh position={[0, 1.45, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 3.2, 0.08]} />
        <meshStandardMaterial color="#f0eae1" roughness={0.8} />
      </mesh>

      {/* Wooden Desk Border Trim */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.4, 0.12, 0.5]} />
        <meshStandardMaterial color="#3d2c1f" roughness={0.9} />
      </mesh>

      {/* Interactive HTML Card attached to 3D station - rendered only when active to prevent cross-station overlay */}
      {isActive && (
        <Html
          transform
          distanceFactor={3.6}
          position={[0, 1.45, 0.02]}
          className="station-html-wrapper"
        >
          <div
            className={`ai-station-card ${isActive ? 'focused' : ''}`}
            onClick={() => onSelectStation && onSelectStation('ai')}
          >
            {/* Header */}
          <div className="ai-station-header">
            <div className="avatar-chip">
              <img
                src="/textures/entrance/avatar_window.webp"
                alt="Narayan Avatar"
                className="narayan-avatar-img"
              />
              <span className="live-dot" title="Autonomous AI Model Active"></span>
            </div>
            <div className="header-text">
              <div className="station-badge">DOOR 4 // THE STUDIO SESSION</div>
              <h3 className="station-title">Figuring Out with Narayan</h3>
              <p className="station-subtitle">
                Raw, Unfiltered Conversation • 60s Elevator Pitch • Tech, AI &amp; Life
              </p>
            </div>
          </div>

          {/* Chat Transcript Area */}
          <div className="chat-body-scroll" onClick={handleFastForward}>
            <div className="topic-title-tag">{answerTitle}</div>
            <div className="chat-bubble typewriter">
              {formatMarkdown(displayedAnswer)}
              {isTyping && <span className="typewriter-cursor">▌</span>}
            </div>
            {isTyping && (
              <div className="skip-hint" onClick={handleFastForward}>
                (Click text to skip typing)
              </div>
            )}
          </div>

          {/* Prompt Chips */}
          <div className="prompt-chips-wrapper">
            <div className="chips-label">SUGGESTED QUESTIONS:</div>
            <div className="chips-row">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  className={`prompt-chip-btn ${activePrompt.id === prompt.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePrompt(prompt);
                    handleTriggerQuery(prompt.query, prompt.label);
                  }}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Query Input */}
          <form className="query-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'How did you handle the AIU setback?')..."
              className="paper-input-field"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="submit" className="paper-send-btn" onClick={(e) => e.stopPropagation()}>
              ASK ↵
            </button>
          </form>
        </div>
      </Html>
      )}
    </group>
  );
}

