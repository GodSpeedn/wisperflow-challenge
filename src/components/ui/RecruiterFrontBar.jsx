import { useEffect } from 'react';
import { useScene } from '../../context/SceneContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import '../../styles/RecruiterFrontBar.scss';

export default function RecruiterFrontBar() {
  const { isInRoom, hasEntered, activeWallModal, openWallModal } = useScene();
  const { candidate, videoPitch } = usePortfolioData();

  // Don't render front-page dock when inside a room or after entering corridor
  if (isInRoom || hasEntered) return null;

  return (
    <aside className="recruiter-front-bar" aria-label="Recruiter quick access">
      <div className="recruiter-pill">
        <div className="candidate-badge">
          <span className="live-indicator"></span>
          <div className="badge-text">
            <span className="badge-name">{candidate?.name || 'Narayan Rakhecha'}</span>
            <span className="badge-role">{candidate?.targetRole || 'Wispr Flow India'}</span>
          </div>
        </div>

        <div className="pill-actions">
          <button
            type="button"
            className={`action-btn work-btn video-btn ${activeWallModal === 'video' ? 'is-active' : ''}`}
            onClick={() => openWallModal('video')}
            title="Watch Pitch Video & Our Work Briefing"
          >
            <span className="btn-icon">🧱</span>
            <span className="btn-label">Our Work &amp; Video</span>
            <span className="duration-tag">{videoPitch?.duration || '3:00'}</span>
          </button>

          <button
            type="button"
            className={`action-btn guide-btn ${activeWallModal === 'about' ? 'is-active' : ''}`}
            onClick={() => openWallModal('about')}
            title="View About Section & Recruiter Guide"
          >
            <span className="btn-icon">🧭</span>
            <span className="btn-label">About &amp; Guide</span>
          </button>

          <button
            type="button"
            className={`action-btn resume-btn ${activeWallModal === 'resume' ? 'is-active' : ''}`}
            onClick={() => openWallModal('resume')}
            title="View EE / Technical Resume"
          >
            <span className="btn-icon">📄</span>
            <span className="btn-label">See EE Resume</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
