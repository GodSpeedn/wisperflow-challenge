import { useScene } from '../../context/SceneContext';
import { useGalleryProjects, useStudioContent, useAwards } from '../../hooks/useSanityData';
import { GALLERY_ACHIEVEMENTS } from '../../../data/portfolioData';
import '../../styles/ScreenReaderOverlay.scss';

/**
 * ScreenReaderOverlay — A7 Accessibility
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Contains buttons/links matching interactive 3D elements (doors, rooms).
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit, markEntered } = useScene();
    
    // Pobieranie danych do wygenerowania niewidocznego HTML-a dla SEO / robotów
    const rawProjects = useGalleryProjects();
    const projects = rawProjects && rawProjects.length > 0 ? rawProjects : GALLERY_ACHIEVEMENTS;
    const studio = useStudioContent();
    const awards = useAwards();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>Narayan Rakhecha — Growth & AI Portfolio</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <>
                        <p>Welcome to Narayan Rakhecha's interactive 3D portfolio and Wispr Flow dossier. Click or press Enter on the doors to enter.</p>
                        <ul>
                            <li>
                                <button onClick={() => markEntered()} type="button">
                                    Enter Corridor
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    The Life Story — 7 scenes from village roots to Australia, setbacks, and Wispr Flow
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    Achievements — Honors, AI leadership, and certifications
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button">
                                    The Strategy — YouTube Content Engine and Wispr Growth Playbook
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    The Playground — Interview My AI Clone &amp; Play 2 Truths &amp; 1 Lie
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. Choose a room to explore:</p>
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    The Life Story — 7 scenes from village roots to Australia, setbacks, and Wispr Flow
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    Achievements — Honors, AI leadership, and certifications
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    The Playground — Interview My AI Clone &amp; Play 2 Truths &amp; 1 Lie
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button">
                                    The Strategy — YouTube Content Engine and Wispr Growth Playbook
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'The Life Story' :
                                currentRoom === 'gallery' ? 'Achievements' :
                                    currentRoom === 'contact' ? 'Contact' :
                                        currentRoom === 'studio' ? 'The Strategy' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">
                            Go back to corridor
                        </button>

                        {/* Room-specific content descriptions */}
                        {currentRoom === 'about' && (
                            <div aria-label="Life Story room content">
                                <h3>The Life Story</h3>
                                <p>A 3D paper airplane flight through 7 candid scenes of my journey: from village roots and JEE lockdown to Australia, WorkVentures, Kratos, leading a 5-dev AI pod, quant setbacks, and the Wispr Flow mission.</p>
                                
                                {awards && (
                                    <section>
                                        <h4>My Awards</h4>
                                        <ul>
                                            {awards.sotd && awards.sotd.items && awards.sotd.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                            {awards.sotm && awards.sotm.items && awards.sotm.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                            {awards.other && awards.other.items && awards.other.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Achievements room content">
                                <h3>Key Achievements &amp; Honors</h3>
                                <p>Explore quantitative trading achievements, multi-agent AI systems, and certifications displayed on 3D papercraft cards.</p>
                                
                                {projects && projects.length > 0 && (
                                    <ul>
                                        {projects.map((p, i) => (
                                            <li key={i}>
                                                <h4>{p.title} ({p.category})</h4>
                                                <p>{p.description}</p>
                                                {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer">{p.buttonText || `View ${p.title}`}</a>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>Contact Me</h3>
                                <p>Find my social media links displayed as floating barrels. Click to visit my profiles on LinkedIn, GitHub, and other platforms.</p>
                            </div>
                        )}
                        {currentRoom === 'studio' && (
                            <div aria-label="Strategy room content">
                                <h3>The Strategy</h3>
                                <p>Explore YouTube content breakdowns and the Wispr Flow India growth playbook on rotating monitors. Click a monitor to read detailed information about my work.</p>

                                {studio && studio.length > 0 && (
                                    <ul>
                                        {studio.map((s, i) => (
                                            <li key={i}>
                                                <h4>{s.title} ({s.platform})</h4>
                                                <p>{s.description}</p>
                                                {s.url && <a href={s.url}>View content</a>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to The Life Story</button></li>
                            )}
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Achievements</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                            {currentRoom !== 'studio' && (
                                <li><button onClick={() => teleportTo('studio')} type="button">Go to The Strategy</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
