/**
 * Studio Strategy Content Data
 * 
 * Contains structured, authentic strategy playbooks for Door 2: "THE STRATEGY"
 * Sector 0: Wispr Flow India GTM & Developer Distribution Architecture
 * Sector 1: Technical YouTube Content Engine & Architecture Blueprint
 */

export const STUDIO_SECTORS = [
    {
        id: 'wispr',
        name: 'Wispr India GTM',
        icon: '🎙️',
        count: 5,
        tagline: 'High-Bandwidth Developer Input Layer & Growth Flywheel',
        angleIndex: 0,
    },
    {
        id: 'youtube',
        name: "The Builder's Journey",
        icon: '📹',
        count: 5,
        tagline: '53 Subs, 10K+ Views & Late-Night Coding Logs',
        angleIndex: 1,
    }
];

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'Content Engine',
        shape: 'tv',
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Strategy & Systems',
        shape: 'monitor',
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '📱',
        label: 'Tactics & Demos',
        shape: 'phone',
    },
};

export const CONTENT_DATA = [
    // ========================================================
    // SECTOR 0: Wispr Flow India Distribution Strategy (Wing 0)
    // ========================================================
    {
        id: 'wispr-pitch',
        sector: 0,
        slot: 'hero',
        platform: 'blog',
        badge: 'EXECUTIVE STRATEGY',
        headline: 'Wispr Flow India Distribution Architecture',
        thesis: 'Voice as the primary high-bandwidth cognitive input layer. Establishing Wispr Flow as the standard input protocol for India\'s 5M+ developers, founders, and knowledge workers.',
        metric: '5M+ ADDRESSABLE DEVELOPERS',
        fullTactics: [
            'Cognitive Bandwidth Shift: Reframing voice from legacy "dictation" to an instant markdown synthesizer that captures architectural specs and RFCs at 150+ WPM.',
            'Developer Workflow Native: Deep integration with VS Code, Cursor, Linear, and Notion so developers dictate formatted PRDs and code comments without touching the keyboard.',
            'Velocity Benchmark: Highlighting real engineering hours reclaimed — saving 10+ hours per dev per week by eliminating document drafting latency.',
            'Acoustic Localization: Custom fine-tuning for technical acronyms (API, gRPC, K8s), Indian English cadences, and developer dialect combinations.'
        ],
        actionUrl: null,
        actionLabel: null,
        title: 'Wispr Flow India Distribution Architecture',
        description: 'Establishing voice as the high-bandwidth input layer for India\'s 5M+ software engineers.',
        date: '2026-03-01',
        duration: 'Strategic Brief'
    },
    {
        id: 'wispr-playbook-01',
        sector: 0,
        slot: 'top-left',
        platform: 'blog',
        badge: 'GTM PLAYBOOK 01',
        headline: 'Zero-Edit Technical Spec Speed-Runs',
        thesis: 'Side-by-side velocity demonstrations: drafting an end-to-end technical PRD in 180 seconds via speech versus 10 minutes of mechanical keyboard typing.',
        metric: '3.3X INPUT VELOCITY',
        fullTactics: [
            'Split-Screen Proof: Showing mechanical typing struggling with formatting vs Wispr outputting clean bulleted Jira issues and markdown directly.',
            'Shattering Cognitive Friction: Proving speech produces production-grade text immediately without requiring a second editing pass.',
            'High-Signal Distribution: Circulating short, uncut terminal demos across developer Twitter/X, LinkedIn engineering circles, and GitHub discussions.',
            'Zero-Friction Install: Menu-bar macOS onboarding flow enabling developers to test their first voice sprint in under 30 seconds.'
        ],
        actionUrl: null,
        actionLabel: null,
        title: 'Wispr India Playbook 01: Zero-Edit Speed-Runs',
        description: 'Drafting end-to-end engineering PRDs in 180 seconds with zero keyboard touches.',
        date: '2026-03-01',
        readTime: 'Strategic Brief'
    },
    {
        id: 'wispr-speedrun',
        sector: 0,
        slot: 'top-right',
        platform: 'tiktok',
        badge: 'GTM PLAYBOOK 02',
        headline: 'Collegiate Builder Blitz (IITs & BITS)',
        thesis: 'Equipping student founders and hackathon teams across top Indian institutes with Wispr licenses to make speech the default competitive advantage.',
        metric: 'TOP-TIER CAMPUS BLITZ',
        fullTactics: [
            'Hackathon Sponsorships: Distributing free Wispr Flow licenses across premier collegiate hackathons (IIT Bombay, IIT Delhi, BITS Pilani).',
            'Fastest-Ship Spotlight: Sponsoring category awards for projects with the highest shipping frequency documented entirely through voice-assisted docs.',
            'Campus Developer Advocates: Empowering student lead developers to evangelize voice workflows within student clubs and campus Discord communities.',
            'Long-Term Talent Pipeline: Converting collegiate builders into lifelong power users as they graduate into high-growth tech startups.'
        ],
        actionUrl: null,
        actionLabel: null,
        title: 'Wispr India Playbook 02: Collegiate Builder Blitz',
        description: 'Empowering tier-1 collegiate hackathons with free Wispr Flow licenses so builders ship at speech velocity.',
        date: '2026-02-28',
        views: 'Campus Initiative',
        likes: 'Tier-1 Network'
    },
    {
        id: 'wispr-playbook-02',
        sector: 0,
        slot: 'bottom-left',
        platform: 'blog',
        badge: 'GTM PLAYBOOK 03',
        headline: 'B2B Startup Engineering Velocity Loops',
        thesis: 'Targeting high-velocity tech hubs in Bengaluru and Gurgaon to eliminate typing fatigue across engineering, product, and design organizations.',
        metric: '10 HRS RECLAIMED / DEV / WK',
        fullTactics: [
            'Team Pilot Programs: 14-day team onboarding for engineering leaders at fast-shipping Series A-C tech startups.',
            'Native Ecosystem Adapters: Auto-formatting for Linear epics, GitHub Pull Request reviews, and Slack executive summaries.',
            'Productivity Audit Dashboard: Providing team leads with visibility into collective words dictated and cumulative drafting time saved.',
            'Enterprise Privacy Safeguards: Strict local processing guarantees and zero retention on spoken audio data.'
        ],
        actionUrl: null,
        actionLabel: null,
        title: 'Wispr India Playbook 03: B2B Startup Engineering Loops',
        description: 'Targeting high-growth developer hubs across Bengaluru & Gurgaon to save 10 hours per week per engineer.',
        date: '2026-02-20',
        readTime: 'Strategic Brief'
    },
    {
        id: 'wispr-playbook-03',
        sector: 0,
        slot: 'bottom-right',
        platform: 'blog',
        badge: 'GTM PLAYBOOK 04',
        headline: 'Localized Acoustic & Idiom Optimization',
        thesis: 'Acoustic adaptation for Indian developer speech patterns — capturing mixed Hinglish idioms, technical jargon, and multi-lingual acronyms with zero phonetic drift.',
        metric: 'ZERO PHONETIC DRIFT',
        fullTactics: [
            'Domain Dictionary Integration: Custom vocabulary injection for tech stacks, AWS services, and internal codebase nomenclature.',
            'Cadence Robustness: Handling variable speech rhythms, background ambient office noise, and rapid developer train-of-thought.',
            'Contextual Punctuation: Automatic placement of markdown backticks, code blocks, and structured lists based on conversational intent.',
            'Continuous Feedback Loop: Lightweight user corrections feeding localized language model refinements without compromising data privacy.'
        ],
        actionUrl: null,
        actionLabel: null,
        title: 'Wispr India Playbook 04: Localized Acoustic Optimization',
        description: 'Fine-tuning Whisper acoustic models for Indian developer terminology, tech acronyms, and natural cadence.',
        date: '2026-02-10',
        readTime: 'Strategic Brief'
    },

    // ========================================================
    // SECTOR 1: The Builder's Journey (Wing 1)
    // Authentic, fun, lighthearted story of building in public
    // ========================================================
    {
        id: 'yt-channel',
        sector: 1,
        slot: 'hero',
        platform: 'youtube',
        badge: 'CHAPTER 01 • THE ORIGIN',
        headline: '53 Subs, 10K+ Views & Late-Night Code',
        thesis: 'I didn\'t start a channel to be a polished influencer. I just wanted to build things in public, document 2 AM terminal logs, and see if anyone on the internet cared.',
        metric: '53 SUBS • 10,000+ VIEWS',
        fullTactics: [
            'The Setup: Just an open VS Code window, zero ring lights, and a mechanical keyboard clattering past midnight.',
            'The Content: Uncut terminal screencasts, algorithmic backtests, and quiet study marathons with zero corporate fluff.',
            'The Wild Math: 53 subscribers somehow unlocked over 10,000 organic views from fellow curious builders across the web.',
            'The Real Goal: Learning how digital content distribution actually works from first principles, one raw upload at a time.'
        ],
        actionUrl: null,
        actionLabel: null,
        actionText: 'READ STORY ↗',
        title: 'Chapter 01: 53 Subs, 10K+ Views & Late-Night Code',
        description: 'How an accidental channel turned into an authentic build-in-public sandbox with 10K+ organic views.',
        date: '2026-03-01',
        duration: 'Story Log'
    },
    {
        id: 'yt-retention',
        sector: 1,
        slot: 'top-left',
        platform: 'youtube',
        badge: 'CHAPTER 02 • THE AI PET',
        headline: 'Teaching AI to Play Flappy Bird (NEAT)',
        thesis: 'Watching a neural network faceplant into green pipes 400 times until natural selection kicked in. The most entertaining coding rabbit hole.',
        metric: '400+ CRASHES BEFORE FLIGHT',
        fullTactics: [
            'The Premise: Why manually flap between pipes when you can breed 50 mutant neural networks to figure it out for you?',
            'Generation 01 to 15: Pure slapstick comedy. Every single bird nosedives straight into the dirt in under half a second.',
            'Generation 38: A mutation suddenly figures out flap velocity. Within minutes, it is dodging pipes better than any human.',
            'Viewer Reaction: Visualizing genetic evolution in real-time proved that seeing code in motion beats 100 pages of theory.'
        ],
        actionUrl: null,
        actionLabel: null,
        actionText: 'READ STORY ↗',
        title: 'Chapter 02: Teaching AI to Play Flappy Bird (NEAT)',
        description: 'Evolutionary neural networks learning obstacle navigation through trial, error, and hundreds of hilarious crashes.',
        date: '2026-02-25',
        duration: 'Story Log'
    },
    {
        id: 'yt-ai-systems',
        sector: 1,
        slot: 'top-right',
        platform: 'youtube',
        badge: 'CHAPTER 03 • QUANT LOGS',
        headline: 'My First Buy & Hold Algorithmic Script',
        thesis: 'Python backtests, historical OHLC candles, and calculating portfolio risk. Trading math is ruthless, but the terminal never lies.',
        metric: 'RAW TERMINAL BACKTESTS',
        fullTactics: [
            'Terminal Over Hype: No rented lambos or fake lifestyle reels. Just Python scripts pulling real stock price data.',
            'The Strategy: Testing simple buy-and-hold benchmarks against market volatility to understand real equity drawdowns.',
            'The Reality Check: Backtests always look rich until slippage, exchange fees, and real-world market drag enter the chat.',
            'The Takeaway: Viewers loved the unvarnished honesty — seeing real code errors and real math instead of get-rich hype.'
        ],
        actionUrl: null,
        actionLabel: null,
        actionText: 'READ STORY ↗',
        title: 'Chapter 03: My First Buy & Hold Algorithmic Script',
        description: 'Hands-on Python quantitative backtests, portfolio risk calculations, and real market data experiments.',
        date: '2026-02-20',
        duration: 'Story Log'
    },
    {
        id: 'yt-micro-distribution',
        sector: 1,
        slot: 'bottom-left',
        platform: 'youtube',
        badge: 'CHAPTER 04 • THE GRIND',
        headline: '"Studying Till Hungry" & CAT Sprints',
        thesis: 'Lo-fi beats, zero talking, and hours of exam prep. Turns out people on the internet just want quiet, genuine company while they grind.',
        metric: 'UNFILTERED STUDY MARATHONS',
        fullTactics: [
            'The Title: Literally titled a stream "Studying Till I Get Hungry" because honesty makes the best YouTube algorithm hook.',
            'The Accountability Mirror: It is virtually impossible to procrastinate on your phone when a live timer is ticking on screen.',
            'Quiet Camaraderie: Fellow students and builders tuning in from around the country to grind through quantitative aptitude mocks.',
            'Silent Impact: Proving that quiet, shared focus builds deeper trust and community than any noisy motivational lecture.'
        ],
        actionUrl: null,
        actionLabel: null,
        actionText: 'READ STORY ↗',
        title: 'Chapter 04: "Studying Till Hungry" & CAT Prep Marathons',
        description: 'Silent study-along streams, deep exam prep grinds, and building quiet discipline in public.',
        date: '2026-02-15',
        duration: 'Story Log'
    },
    {
        id: 'yt-editing-breakdown',
        sector: 1,
        slot: 'bottom-right',
        platform: 'youtube',
        badge: 'CHAPTER 05 • LESSONS',
        headline: 'What 10,000 Views Taught Me About Content',
        thesis: 'Ditch the corporate jargon. Authentic struggle, showing actual terminal code, and honest building beats glossy slide decks every time.',
        metric: 'HONEST SIGNAL OVER HYPE',
        fullTactics: [
            'Show The Terminal: A 15-second screen recording of code compiling conveys 100x more value than an hour of buzzwords.',
            'Small Audience, Real Signal: 53 subscribers who actually build and code matter far more than thousands of passive ghost followers.',
            'Embrace The Bugs: When a script crashes live, it is not an error — it is the most relatable part of being an engineer.',
            'The Next Build: Continuing to experiment in public — multi-agent AI teams, quant algorithms, and whatever comes next.'
        ],
        actionUrl: null,
        actionLabel: null,
        actionText: 'READ STORY ↗',
        title: 'Chapter 05: What 10,000 Views Taught Me About Content',
        description: 'Key takeaways from 10,000 organic views: why unfiltered builder honesty beats corporate polish.',
        date: '2026-02-10',
        duration: 'Story Log'
    },
];

export const getContentBySector = (sector) => {
    return CONTENT_DATA.filter(item => item.sector === sector);
};

export const getSectorCount = (sector) => {
    return CONTENT_DATA.filter(item => item.sector === sector).length;
};

export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};

export default CONTENT_DATA;
