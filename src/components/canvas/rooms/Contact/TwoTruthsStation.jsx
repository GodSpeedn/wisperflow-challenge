import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { GAME_ROUNDS, getRank } from './gameData';
import '../../../../styles/PlaygroundStations.scss';

export default function TwoTruthsStation({ position = [3.0, 0.15, -1.8], rotation = [0, -0.35, 0], isActive = false, onSelectStation }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const round = GAME_ROUNDS[currentRoundIndex];
  const rank = getRank(score);

  const handleSelectOption = (option) => {
    if (hasAnswered || isGameOver) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isLie) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextRound = () => {
    if (currentRoundIndex + 1 < GAME_ROUNDS.length) {
      setCurrentRoundIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentRoundIndex(0);
    setScore(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setIsGameOver(false);
  };

  return (
    <group position={position} rotation={rotation} visible={isActive}>
      {/* 3D Papercraft Board Backing */}
      <mesh position={[0, 1.45, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 3.2, 0.08]} />
        <meshStandardMaterial color="#f0eae1" roughness={0.8} />
      </mesh>

      {/* Wooden Desk Border Trim */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.4, 0.12, 0.5]} />
        <meshStandardMaterial color="#3d2c1f" roughness={0.9} />
      </mesh>

      {/* Interactive HTML Detective Board - rendered only when active to prevent cross-station overlay */}
      {isActive && (
        <Html
          transform
          distanceFactor={3.6}
          position={[0, 1.45, 0.02]}
          className="station-html-wrapper"
        >
          <div
            className={`game-station-card ${isActive ? 'focused' : ''}`}
            onClick={() => onSelectStation && onSelectStation('game')}
          >
          {/* Header */}
          <div className="game-station-header">
            <div className="game-header-top">
              <span className="station-badge">DOOR 4 // DETECTIVE MINI-GAME</span>
              <span className="game-score-badge">
                ROUND {currentRoundIndex + 1}/{GAME_ROUNDS.length} • SCORE: {score}
              </span>
            </div>
            <h3 className="game-title">2 Truths &amp; 1 Lie</h3>
            <p className="game-subtitle">
              Can you spot the fabricated story among Narayan's wild life adventures?
            </p>
          </div>

          {!isGameOver ? (
            <div className="game-body">
              {/* Round Theme & Tagline */}
              <div className="round-theme-banner">
                <span className="theme-pill">Theme: {round.theme}</span>
                <span className="tagline-text">{round.tagline}</span>
              </div>

              {/* 3 Option Cards */}
              <div className="options-grid">
                {round.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardClass = 'option-card';

                  if (hasAnswered) {
                    if (opt.isLie) {
                      cardClass += ' is-the-lie';
                    } else if (isSelected && !opt.isLie) {
                      cardClass += ' picked-wrong';
                    } else {
                      cardClass += ' is-truth';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasAnswered}
                      className={cardClass}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption(opt);
                      }}
                    >
                      <div className="option-letter">{opt.id}</div>
                      <div className="option-text">{opt.text}</div>
                      {hasAnswered && opt.isLie && (
                        <div className="stamp lie-stamp">🎯 THE LIE!</div>
                      )}
                      {hasAnswered && !opt.isLie && isSelected && (
                        <div className="stamp truth-stamp">❌ REAL TRUTH!</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reveal Feedback Banner */}
              {hasAnswered && (
                <div className="reveal-explanation-box">
                  <div className="explanation-title">
                    {selectedOptionId && round.options.find((o) => o.id === selectedOptionId)?.isLie ? (
                      <span className="correct-label">🎉 Brilliant Deduction! (+1 Point)</span>
                    ) : (
                      <span className="incorrect-label">🤯 Fooled! That wild story actually happened!</span>
                    )}
                  </div>
                  <p className="explanation-body">{round.explanation}</p>
                  <button
                    type="button"
                    className="next-round-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextRound();
                    }}
                  >
                    {currentRoundIndex + 1 < GAME_ROUNDS.length ? 'NEXT ROUND ➔' : 'SEE FINAL RESULTS ➔'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Victory / Final Detective Report Card */
            <div className="game-over-card">
              <div className="victory-icon">🏆</div>
              <h4 className="game-over-title">Investigation Complete!</h4>
              <div className="final-score-pill">
                FINAL SCORE: {score} / {GAME_ROUNDS.length}
              </div>
              <div className="rank-display">
                <div className="rank-title">{rank.title}</div>
                <p className="rank-desc">{rank.desc}</p>
              </div>
              <button
                type="button"
                className="play-again-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestart();
                }}
              >
                🔄 PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </Html>
      )}
    </group>
  );
}

