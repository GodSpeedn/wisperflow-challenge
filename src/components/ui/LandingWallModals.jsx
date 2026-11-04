import { useEffect } from 'react';
import { useScene } from '../../context/SceneContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import '../../styles/RecruiterFrontBar.scss';

export default function LandingWallModals() {
  const { activeWallModal, closeWallModal, teleportTo, hasEntered, isInRoom } = useScene();
  const { candidate, videoPitch, resumeFacts } = usePortfolioData();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeWallModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeWallModal]);

  // Don't render if no modal is active, or user is inside a room, or has entered corridor
  if (!activeWallModal || hasEntered || isInRoom) return null;

  return (
    <div className="sketch-modal-backdrop" onClick={closeWallModal}>
      <div
        className={`sketch-modal-card ${activeWallModal}-card`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* MODAL 1: RESUME & CREDENTIALS EXPLANATION                */}
        {/* ======================================================== */}
        {activeWallModal === 'resume' && (
          <>
            <header className="sketch-modal-header">
              <div className="header-meta">
                <span className="sketch-tape-tag">EXECUTIVE DOSSIER // CURRICULUM VITAE</span>
                <h2 className="modal-title">How to Read Narayan's Resume</h2>
                <p className="modal-sub">
                  {candidate?.role || 'Quantitative Dev & AI Engineer'} • Targeting{' '}
                  <strong>{candidate?.targetRole || 'Wispr Flow India'}</strong>
                </p>
              </div>
              <button
                type="button"
                className="sketch-modal-close"
                onClick={closeWallModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>

            <div className="sketch-modal-body">
              {/* Quick Contact Bar */}
              <div className="modal-contact-strip">
                <span>📍 {candidate?.location || 'Sydney / Remote'}</span>
                <a href={`mailto:${candidate?.email}`}>✉️ {candidate?.email}</a>
                <a href={`tel:${candidate?.phone}`}>📞 {candidate?.phone}</a>
                <a href={candidate?.linkedin} target="_blank" rel="noopener noreferrer">
                  🔗 LinkedIn
                </a>
                <a href={candidate?.github} target="_blank" rel="noopener noreferrer">
                  💻 GitHub
                </a>
              </div>

              {/* Headline Metrics Grid */}
              <div className="modal-metrics-grid">
                {(candidate?.metrics || []).slice(0, 4).map((m, idx) => (
                  <div key={idx} className="metric-box">
                    <span className="m-val">{m.value}</span>
                    <span className="m-lbl">{m.label}</span>
                    <span className="m-ctx">{m.context}</span>
                  </div>
                ))}
              </div>

              {/* Career Experience & Leadership */}
              <section className="modal-content-section">
                <h4 className="section-title">Career Experience &amp; Pod Leadership</h4>
                <div className="resume-timeline-list">
                  {(resumeFacts || []).map((fact, idx) => (
                    <article key={idx} className="timeline-entry">
                      <div className="entry-head">
                        <div>
                          <strong>{fact.title}</strong>
                          <span className="entry-inst"> — {fact.institution}</span>
                        </div>
                        <span className="entry-date">{fact.period}</span>
                      </div>
                      <p className="entry-body">{fact.description}</p>
                      {fact.skills && (
                        <div className="skill-tags">
                          {fact.skills.map((s, sIdx) => (
                            <span key={sIdx} className="skill-pill">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              {/* Education & Algorithmic Trading Certification */}
              <section className="modal-content-section">
                <h4 className="section-title">Education &amp; Quantitative Training</h4>
                <div className="edu-cards-grid">
                  <div className="edu-card">
                    <h5>Bachelor of Computer Science</h5>
                    <p>Major in Artificial Intelligence &amp; Big Data • Minor in Finance</p>
                    <small>University of Wollongong, Australia | 2023 – 2026</small>
                  </div>
                  <div className="edu-card">
                    <h5>Executive Program in Algorithmic Trading (EPAT)</h5>
                    <p>Options Pricing (Black-Scholes), Volatility Surfaces, Monte Carlo &amp; Stat-Arb</p>
                    <small>QuantInsti | 2025 – 2026</small>
                  </div>
                </div>
              </section>
            </div>

            <footer className="sketch-modal-footer">
              <a
                href={`mailto:${candidate?.email}?subject=Interview%20Invitation%20-%20Wispr%20Flow%20India`}
                className="sketch-btn-secondary"
              >
                ✉️ Send Direct Email
              </a>
              <button
                type="button"
                className="sketch-btn-primary"
                onClick={() => window.print()}
              >
                🖨️ Print / Save PDF
              </button>
            </footer>
          </>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: ABOUT SECTION & NAVIGATION GUIDE EXPLANATION    */}
        {/* ======================================================== */}
        {activeWallModal === 'about' && (
          <>
            <header className="sketch-modal-header">
              <div className="header-meta">
                <span className="sketch-tape-tag guide-tag">ORIENTATION // VISITOR GUIDE</span>
                <h2 className="modal-title">About this Dossier &amp; How to Navigate</h2>
                <p className="modal-sub">Recruiter guide to explore the 3D world &amp; jump into key rooms</p>
              </div>
              <button
                type="button"
                className="sketch-modal-close"
                onClick={closeWallModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>

            <div className="sketch-modal-body">
              {/* 3D Navigation Controls */}
              <section className="modal-content-section">
                <h4 className="section-title">🎮 3D Navigation Controls</h4>
                <div className="guide-controls-grid">
                  <div className="control-item">
                    <span className="badge-key">Scroll / ↑ ↓</span>
                    <span className="desc">Walk forward / backward along the corridor</span>
                  </div>
                  <div className="control-item">
                    <span className="badge-key">Click &amp; Drag</span>
                    <span className="desc">Look around in full 360° perspective</span>
                  </div>
                  <div className="control-item">
                    <span className="badge-key">Click Any Door</span>
                    <span className="desc">Step through any door to enter that room</span>
                  </div>
                  <div className="control-item">
                    <span className="badge-key">Map (Top-Left)</span>
                    <span className="desc">Instant pin teleport to any room anytime</span>
                  </div>
                </div>
              </section>

              {/* Recommended Fast-Track Review Path */}
              <section className="modal-content-section">
                <h4 className="section-title">🗺️ Recommended Fast-Track Review Path</h4>
                <div className="path-steps-list">
                  <div
                    className="path-step-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('about');
                    }}
                    title="Teleport to Life Story"
                  >
                    <div className="step-num">01</div>
                    <div className="step-content">
                      <h5>The Life Story (Sky Flight)</h5>
                      <p>Flight through 7 candid scenes: village roots, JEE lockdown, Australia pivot, WorkVentures, Kratos, AI pod leadership, and the Wispr mission.</p>
                      <span className="jump-link">Teleport to Life Story →</span>
                    </div>
                  </div>

                  <div
                    className="path-step-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('gallery');
                    }}
                    title="Teleport to Achievements"
                  >
                    <div className="step-num">02</div>
                    <div className="step-content">
                      <h5>The Achievements (Honors &amp; Credentials)</h5>
                      <p>Balcony clothesline featuring SIG Algothon Top 5%, IMC Prosperity 4, QuantInsti EPAT certification, and AI pod leadership.</p>
                      <span className="jump-link">Teleport to Achievements →</span>
                    </div>
                  </div>

                  <div
                    className="path-step-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('studio');
                    }}
                    title="Teleport to Strategy"
                  >
                    <div className="step-num">03</div>
                    <div className="step-content">
                      <h5>The Strategy (YouTube &amp; Wispr India)</h5>
                      <p>Centred 3D tower featuring the Wispr Flow India distribution masterplan and YouTube content creation breakdown.</p>
                      <span className="jump-link">Teleport to Strategy →</span>
                    </div>
                  </div>

                  <div
                    className="path-step-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('contact');
                    }}
                    title="Teleport to Contact"
                  >
                    <div className="step-num">04</div>
                    <div className="step-content">
                      <h5>The Playground (AI Clone &amp; 2 Truths 1 Lie)</h5>
                      <p>Interview Narayan's AI clone, test your detective skills with 2 Truths &amp; 1 Lie, or grab direct contact details.</p>
                      <span className="jump-link">Teleport to Playground →</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <footer className="sketch-modal-footer">
              <button
                type="button"
                className="sketch-btn-secondary"
                onClick={closeWallModal}
              >
                Close Guide
              </button>
              <button
                type="button"
                className="sketch-btn-primary"
                onClick={() => {
                  closeWallModal();
                  teleportTo('about');
                }}
              >
                Start with Life Story 🚀
              </button>
            </footer>
          </>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: OUR WORK & VIDEO BRIEFING EXPLANATION           */}
        {/* ======================================================== */}
        {activeWallModal === 'video' && (
          <>
            <header className="sketch-modal-header">
              <div className="header-meta">
                <span className="sketch-tape-tag video-tag">OUR WORK // VIDEO BRIEFING</span>
                <h2 className="modal-title">Our Work &amp; Video Field Briefing</h2>
                <p className="modal-sub">
                  {videoPitch?.headline || 'Why Narayan Rakhecha for Wispr Flow India'}
                </p>
              </div>
              <button
                type="button"
                className="sketch-modal-close"
                onClick={closeWallModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>

            <div className="sketch-modal-body">
              {/* Responsive Video Player */}
              <div className="modal-video-container">
                <iframe
                  src={videoPitch?.embedUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                  title={videoPitch?.title || 'Pitch Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="modal-video-iframe"
                />
              </div>

              {/* Hook Quote */}
              <blockquote className="modal-hook-quote">
                "{videoPitch?.hook || 'Talking is no longer a rough draft. It is the final product.'}"
              </blockquote>

              {/* Featured Systems ("Our Work") */}
              <section className="modal-content-section">
                <h4 className="section-title">Featured Systems &amp; Case Studies ("Our Work"):</h4>
                <div className="modal-systems-grid">
                  <div
                    className="system-work-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('gallery');
                    }}
                  >
                    <span className="system-tag ai-tag">AI SYSTEMS</span>
                    <h5>Multi-Agent AI Orchestrator</h5>
                    <p>Led pod architecting automated multi-agent LLM pipelines (-30% manual time).</p>
                    <span className="card-link">Inspect Architecture →</span>
                  </div>

                  <div
                    className="system-work-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('gallery');
                    }}
                  >
                    <span className="system-tag quant-tag">QUANT TRADING</span>
                    <h5>SIG Pair-Trading Engine</h5>
                    <p>Ranked 18th / 400+ Solo quants in the SIG UNSW Algothon with automated statistical arbitrage.</p>
                    <span className="card-link">Inspect Models →</span>
                  </div>

                  <div
                    className="system-work-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('studio');
                    }}
                  >
                    <span className="system-tag growth-tag">GROWTH ENGINE</span>
                    <h5>Wispr India Growth Playbook</h5>
                    <p>3-Pronged distribution masterplan: Top Creator Speed-Runs, 25+ Hackathons &amp; B2B Stack Injection.</p>
                    <span className="card-link">Inspect Playbook →</span>
                  </div>

                  <div
                    className="system-work-card"
                    onClick={() => {
                      closeWallModal();
                      teleportTo('about');
                    }}
                  >
                    <span className="system-tag epat-tag">EPAT QUANT</span>
                    <h5>IMC Prosperity 4 Market Maker</h5>
                    <p>Australian rank ~284 / 1,000+ building Python market making and adaptive spread pricing.</p>
                    <span className="card-link">Inspect Track Record →</span>
                  </div>
                </div>
              </section>
            </div>

            <footer className="sketch-modal-footer">
              <a
                href={candidate?.youtube?.startsWith('http') ? candidate.youtube : `https://youtube.com/${candidate?.youtube || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sketch-btn-secondary"
              >
                Visit YouTube Channel ({candidate?.youtube || ''})
              </a>
              <button
                type="button"
                className="sketch-btn-primary"
                onClick={() => {
                  closeWallModal();
                  teleportTo('gallery');
                }}
              >
                Explore All Achievements in 3D →
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

