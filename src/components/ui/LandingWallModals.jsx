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
        {/* MODAL 1: NARAYAN RAKHECHA'S OFFICIAL RESUME              */}
        {/* ======================================================== */}
        {activeWallModal === 'resume' && (
          <div className="official-resume-document">
            {/* Action Bar Header */}
            <div className="resume-action-bar">
              <span className="resume-sheet-tag">OFFICIAL RESUME // CURRICULUM VITAE</span>
              <div className="resume-action-buttons">
                <a
                  href="/Narayan_Rakhecha_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-action-btn pdf-btn"
                  title="Open original PDF in new tab"
                >
                  📄 View / Download PDF
                </a>
                <button
                  type="button"
                  className="sketch-modal-close"
                  onClick={closeWallModal}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Sheet */}
            <div className="resume-sheet-paper">
              {/* Header */}
              <header className="resume-doc-header">
                <h1 className="resume-name">NARAYAN RAKHECHA</h1>
                <div className="resume-contact-line">
                  <span>Nashik, India</span>
                  <span className="sep">|</span>
                  <a href="mailto:narayanrakhechaau@gmail.com">narayanrakhechaau@gmail.com</a>
                  <span className="sep">|</span>
                  <a href="tel:+918999392326">+91 8999392326</a>
                  <span className="sep">|</span>
                  <a href="https://linkedin.com/in/narayan-rakhecha" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <span className="sep">|</span>
                  <a href="https://github.com/GodSpeedn" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <div className="resume-sub-status">
                  Available immediately; flexible for April–August 2027 cohort start
                </div>
              </header>

              {/* SUMMARY */}
              <section className="resume-section">
                <h2 className="resume-section-title">SUMMARY</h2>
                <p className="resume-summary-text">
                  AI product builder with a B.CompSci (AI &amp; Big Data). Led a team of 5 students through a 10-month multi-agent LLM platform build with weekly sponsor reviews, led 10+ team projects, and ran consumer growth campaigns. Top scorer in QuantInsti EPAT Batch 68. Looking to build AI products people actually need.
                </p>
              </section>

              {/* PRODUCT MANAGEMENT & LEADERSHIP EXPERIENCE */}
              <section className="resume-section">
                <h2 className="resume-section-title">PRODUCT MANAGEMENT &amp; LEADERSHIP EXPERIENCE</h2>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>AI Product Lead &amp; Research Intern</strong>, University of Wollongong</span>
                    <span className="job-dates">Jan – Oct 2025</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Owned vision, roadmap, and PRDs for a multi-agent AI platform that helps developers go from a plain-language request to working code; led a 5-student team through Agile sprints across a 10-month project.</li>
                    <li>Ran two stakeholder meetings per week with the faculty sponsor and managed delivery day to day, reducing manual operational work by an estimated 30%.</li>
                    <li>Directed the design and AI-assisted development of cross-model communication between Gemini and OpenAI models, coordinating the team to deliver multi-agent workflows that automated 5+ end-to-end processes.</li>
                    <li>Presented a live demo of the prototype at a university tech expo attended by 200+ students; received technical review feedback from the sponsor.</li>
                  </ul>
                </div>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Product Strategy &amp; Marketing Intern</strong>, Kratos Energy, Wollongong</span>
                    <span className="job-dates">Oct – Dec 2024</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Used user and market data to target consumer prospects and run cold-lead campaigns, lifting qualified leads by 25%.</li>
                  </ul>
                </div>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Cyber Security Intern</strong>, Work Ventures, Sydney</span>
                    <span className="job-dates">Oct – Dec 2023</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Learned common attack methods and helped run a simulated attack on employees to test their compliance with company security rules.</li>
                  </ul>
                </div>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Team Lead, University Group Projects</strong>, University of Wollongong</span>
                    <span className="job-dates">2022 – 2025</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Led teams of 4–5 on 10+ subject and group projects, owning planning, task allocation, and final presentations.</li>
                  </ul>
                </div>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Member</strong>, UOW Quant Club</span>
                    <span className="job-dates">2023 – 2025</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Drove outreach for the SIG UNSW Algothon, promoting the Sydney tournament to students and signing peers up to compete.</li>
                  </ul>
                </div>
              </section>

              {/* PROJECTS */}
              <section className="resume-section">
                <h2 className="resume-section-title">PROJECTS</h2>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Multi-Agent AI Platform &amp; Code Generation System</strong></span>
                    <span className="project-tech">FastAPI · React/TypeScript · Python</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Led the AI-assisted build of a prototype where agents running on local and cloud LLMs (Gemini, OpenAI) collaborate to generate code from a plain-language request, with a FastAPI backend, a React/TypeScript UI, and automated GitHub commits.</li>
                    <li>Demoed it at the university tech expo, then paused development because it didn’t show enough traction to justify continuing, a lesson in validating user need before building further.</li>
                  </ul>
                </div>

                <div className="resume-job-block">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Options Volatility Smile Trading Strategy</strong></span>
                    <span className="project-tech">Python · NumPy · Pandas · SciPy</span>
                  </div>
                  <ul className="resume-bullets">
                    <li>Computed implied volatility for SPY options using Black-Scholes and Brent’s method, then fitted a cubic-spline fair-value curve to the volatility smile to flag options that look cheap or expensive versus their neighbors.</li>
                    <li>Turned the signal into a mean-reversion strategy (long/short butterflies when the IV-spread z-score exceeds 1.5σ), backtested on 2017–2018 data; a standard relative-value approach in options trading.</li>
                  </ul>
                </div>
              </section>

              {/* COMPETITIONS & ACHIEVEMENTS */}
              <section className="resume-section">
                <h2 className="resume-section-title">COMPETITIONS &amp; ACHIEVEMENTS</h2>
                <ul className="resume-bullets">
                  <li>QuantInsti EPAT Batch 68: Top scorer, recognized at Convocation 2026.</li>
                  <li>Susquehanna Australia &amp; NZ Poker Showdown (Jul 2025): Top 30 of 100 finalists, from 1,000+ qualifiers.</li>
                  <li>SIG UNSW Algothon (2025): 18th of 400+ (solo) | IMC Prosperity 4 (2026): #284 in Australia after Round 2 (solo).</li>
                </ul>
              </section>

              {/* EDUCATION */}
              <section className="resume-section">
                <h2 className="resume-section-title">EDUCATION</h2>
                <div className="resume-edu-list">
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>Master of Science in Financial Engineering</strong>, WorldQuant University (online, in progress)</span>
                    <span className="job-dates">Started Nov 2026</span>
                  </div>
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>QuantInsti</strong>, Executive Program in Algorithmic Trading (EPAT)</span>
                    <span className="job-dates">Mar 2026</span>
                  </div>
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>University of Wollongong</strong>, Bachelor of Computer Science (AI &amp; Big Data)</span>
                    <span className="job-dates">Dec 2025</span>
                  </div>
                  <div className="job-row-top">
                    <span className="job-title-inst"><strong>University of Wollongong</strong>, Diploma of Information Technology</span>
                    <span className="job-dates">Dec 2023</span>
                  </div>
                </div>
              </section>

              {/* SKILLS */}
              <section className="resume-section">
                <h2 className="resume-section-title">SKILLS</h2>
                <div className="resume-skills-block">
                  <p><strong>Product:</strong> Agile/Scrum, PRDs, roadmapping, user research, stakeholder management.</p>
                  <p><strong>Technical:</strong> Python, SQL, Git, data analysis, 150+ LeetCode problems (Java, Python).</p>
                </div>
              </section>
            </div>
          </div>
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

