/**
 * AI Narayan Knowledge Base & Conversational Engine
 * "Figuring Out with Narayan" - Podcast Interview Edition for Door 4: "THE PLAYGROUND"
 */

export const QUICK_PROMPTS = [
  {
    id: 'intro-60s',
    label: '🎙️ The 60s Intro',
    query: 'Welcome to Figuring Out! If someone has no clue who you are, how would you explain yourself in 60 seconds?'
  },
  {
    id: 'ai-pod',
    label: '🤖 5-Agent AI Pod',
    query: 'How did you architect your 5-developer autonomous AI engineering team?'
  },
  {
    id: 'wispr-india',
    label: '🎙️ Why Wispr Flow?',
    query: 'Why are you passionate about Wispr Flow and expanding voice-first AI in India?'
  },
  {
    id: 'quant-poker',
    label: '♠️ Poker & Quant',
    query: 'How did campus poker games lead you into quantitative finance and options trading?'
  },
  {
    id: 'australia-grind',
    label: '🇦🇺 Aussie Work & BlueScope',
    query: 'Tell me about working in Australia: night shifts, guarding BlueScope steelworks, and balancing university.'
  },
  {
    id: 'interviews-firms',
    label: '🏢 Optiver & Tech Loops',
    query: 'What was your experience interviewing with top firms like Optiver, SIG, Quantium, and TikTok?'
  },
  {
    id: 'setbacks-aiu',
    label: '⚡ The CAT & AIU Setback',
    query: 'What happened with your CAT exam prep and the AIU equivalence certificate rejection?'
  },
  {
    id: 'youtube-journey',
    label: '📹 53 Subs & 10K Views',
    query: 'What did you learn from building in public on YouTube with 53 subscribers and 10,000 views?'
  },
  {
    id: 'contact-hire',
    label: '📬 Connect & Hire',
    query: 'How can founders, teams, or recruiters get in touch with you directly?'
  }
];

export const TOPIC_KNOWLEDGE = [
  {
    id: 'intro-60s',
    keywords: ['welcome', 'show', 'figuring out', '60 second', '60s', 'who are you', 'introduce', 'intro', 'yourself', 'about you', 'pitch', 'elevator'],
    title: 'Figuring Out with Narayan: The 60-Second Pitch',
    response: `**Host:** *"Welcome to the show. Welcome to Figuring Out, it's an honor to have you here. If someone's watching you for the first time and has no clue who you are, how would you explain that in the next 60 seconds?"*

**Narayan:**
"Thanks for having me! Really appreciate it.

If I had to explain who I am in 60 seconds: **I'm a tech fan, a curious person about the world, and a believer that AI is going to be this thing that fundamentally redefines how humans build, think, and create.**

I grew up in a Rajasthani village where spotty 2G internet took 20 minutes to download a 5-page PDF, which forced me to understand technology from first principles. I took a leap to Sydney for Electrical Engineering, worked 40-hour supermarket graveyard shifts to survive, learned game theory and probability at campus poker tables, and fell in love with algorithmic trading and autonomous multi-agent systems.

When bureaucratic roadblocks hit—like having my foreign degree equivalence rejected for CAT—I didn't stop. I channeled everything into building in public, experimenting with content, and shipping real code. Right now, I'm building multi-agent AI pods, testing voice-first workflows, and pushing the boundaries of what a single high-agency builder can do.

What do you want to figure out next?"`
  },
  {
    id: 'wispr-india',
    keywords: ['wispr', 'flow', 'india', 'gtm', 'growth', 'market', 'expansion', 'strategy', 'voice', 'dictation', 'speech', 'keyboard'],
    title: 'The Wispr Flow Vision & India Expansion',
    response: `**Keyboards are a 40 WPM bottleneck on human intellect. Voice is 150+ WPM pure bandwidth.**

In India, over 5.2 million developers and tech founders are drafting specifications, reviewing Pull Requests, and typing Slack updates on mechanical keyboards all day. 

**How I View the India Opportunity:**
1. **Developer First:** Don't sell it as "dictation" for executives. Sell it as an instant technical markdown synthesizer for VS Code, Cursor, and Linear.
2. **Acoustic Localization:** Indian developers naturally blend English, technical jargon (gRPC, K8s, Docker), and conversational idioms. Tuning acoustic context for zero phonetic drift is the golden unlock.
3. **Founder & Hackathon Flywheel:** Equip top collegiate hackathon builders (IITs, BITS) and startup founders in Bengaluru and Gurgaon. When team leads dictate at 150 WPM, their entire engineering bench adopts it.`
  },
  {
    id: 'ai-pod',
    keywords: ['agent', 'multi-agent', 'pod', 'gemini', 'openai', '5-developer', 'autonomous', 'architecture', 'pipeline', 'stack', 'cube-ai'],
    title: 'Architecting the 5-Developer Autonomous AI Team',
    response: `**I don't treat LLMs as simple autocomplete prompts. I architect them as an autonomous multi-agent software engineering squad.**

In this workflow, I operate as Technical Lead & Systems Architect, directing specialized agent pods:
- **Orchestrator Agent (Gemini 1.5 Pro):** Ingests whole-codebase context, specifications, and architecture maps to plan dependency graphs.
- **Frontend / 3D Canvas Agent:** Specializes in React Three Fiber, GLSL shaders, camera lerps, and GSAP motion choreographies.
- **State Machine Agent:** Builds robust reactive state machines, telemetry hooks, and audio managers with zero memory leaks.
- **Headless QA Agent:** Boots headless Chrome via CDP (Chrome DevTools Protocol), runs automated interaction scripts, inspects console logs, and verifies 60 FPS performance.
- **Documentation Agent:** Formats deliverables, changelogs, and recruiter dossier summaries.

This workflow turns a single high-agency builder into a full-velocity engineering squad.`
  },
  {
    id: 'quant-poker',
    keywords: ['quant', 'poker', 'trading', 'sig', 'options', 'volatility', 'black-scholes', 'epat', 'derivatives', 'mathematics', 'algo', 'imc', 'prosperity', 'smile'],
    title: 'From Campus Poker & IMC Prosperity to Quant Modeling',
    response: `**Poker was my real-world classroom for Bayesian probability and Expected Value (EV) under uncertainty.**

While studying in Sydney, campus poker games taught me how to make high-conviction decisions with incomplete information and manage bankroll risk under pressure.

**Quant Milestones & Competitions:**
- **Susquehanna (SIG) Poker Tournament:** Placed among top scorers in campus competitions analyzing pot odds and variance.
- **IMC Prosperity Challenge:** Competed in the global algorithmic market-making simulation.
- **EPAT Quant Graduate:** Completed formal executive training in Algorithmic Trading (EPAT) via QuantInsti with top scores.
- **Options Volatility Smile Engine:** Engineered a Python pricing engine modeling implied volatility skew and automated backtests.
- The core principle that transfers to building startups: **Protect downside risk, calculate positive expected value, and let compound velocity do the work.**`
  },
  {
    id: 'australia-grind',
    keywords: ['australia', 'night', 'shift', 'supermarket', 'convenience', 'store', 'workventures', 'visa', 'sydney', 'uow', 'wollongong', 'bluescope', 'steel', 'guard', 'travel'],
    title: 'The Australian Crucible: BlueScope Steel & Night Shifts',
    response: `**Moving to Sydney with an independent education loan was a crucible that permanently rewired my work ethic.**

To fund tuition and living expenses, my routine was relentless:
- **Grocery Night Shifts:** Stacking shelves and unloading pallets during graveyard shifts.
- **BlueScope Steel Guard:** Worked as a student security guard at BlueScope — Australia's largest steel manufacturing facility in Port Kembla.
- **Zero Tourist Travel:** Despite living in Australia for years, I never traveled or sightseed anywhere. Life was strictly university classes, steel plant guarding, and night shifts.
- **WorkVentures:** Earned a competitive cybersecurity & IT operations internship offer at WorkVentures, though student visa hourly caps legally barred full-time continuation.

That period completely stripped away entitlement. It taught me how to operate with absolute discipline when tired.`
  },
  {
    id: 'interviews-firms',
    keywords: ['interview', 'optiver', 'sig', 'susquehanna', 'quantium', 'tiktok', 'firm', 'job', 'application', 'recruiter'],
    title: 'High-Stakes Interviews: Optiver, SIG, Quantium & TikTok',
    response: `**Going head-to-head with tier-1 quantitative and tech interview loops forced me to sharpen my technical baseline.**

- **Quant & Market Making (Optiver & SIG):** Deep dives into mental math under extreme time constraints, option payoff distributions, probability matrices, and risk pricing.
- **Data & Analytics (Quantium):** Algorithmic problem solving, SQL/data pipelines, and business case optimization.
- **Tech Scale (TikTok):** Multi-round software engineering assessments covering data structures, systems design, and behavioral execution.

Navigating these competitive processes gave me deep respect for elite engineering cultures and proved that unconventional candidates with real proof-of-work can stand toe-to-toe with anyone.`
  },
  {
    id: 'setbacks-aiu',
    keywords: ['setback', 'cat', 'aiu', 'equivalence', 'certificate', 'exam', 'iim', 'roadblock', 'mba', 'rejection', 'bachelors'],
    title: 'The AIU Bureaucracy Roadblock & Rebounding Stronger',
    response: `**This was the most painful roadblock I ever faced—and the greatest catalyst for who I am today.**

After returning to India, I locked in to prepare for the CAT (Common Admission Test) for top management institutes. I studied 14+ hours every single day for months: mock tests, quantitative aptitude, and data interpretation.

**The Bureaucratic Wall:**
When I submitted my foreign bachelor's degree to the AIU (Association of Indian Universities) for mandatory equivalence recognition, it was rejected. Why? Because a single 6-month semester had been shifted online during global COVID university lockdowns. Months of relentless 14-hour study days were wiped out by a single bureaucratic policy.

**The Mindset Shift:**
I realized no piece of institutional paperwork defines my ceiling. Instead of despairing, I channeled that intense 14-hour daily grind directly into autonomous AI systems, creative 3D web engineering, and building in public. This entire interactive 3D universe is my real-world proof of capability.`
  },
  {
    id: 'youtube-journey',
    keywords: ['youtube', 'video', 'channel', '53', 'subs', '10k', 'views', 'flappy', 'neat', 'building in public', 'vlog', 'content'],
    title: '53 Subscribers, 10,000 Views & Building in Public',
    response: `**I didn't start YouTube to be a glossy influencer. I started it as an unfiltered builder's diary.**

- **The Real Numbers:** 53 subscribers, 53 uploads, but over 10,000+ organic views!
- **What I Made:** Uncut terminal screen recordings, training evolutionary neural networks (NEAT AI) to play Flappy Bird through 400+ crashes, Python algorithmic backtesters on real stock data, and silent "Studying Till I Get Hungry" CAT exam marathons.
- **The Core Lesson:** People on the internet don't want another corporate slide deck. Authentic struggle, showing actual terminal code compiling, and honest building beats slick marketing every single time.`
  },
  {
    id: 'village-roots',
    keywords: ['village', 'rajasthan', 'roots', 'internet', 'connectivity', 'childhood', 'humble', 'beginning', 'lockdown', '11th'],
    title: 'Roots in a Rajasthani Village & Lockdown',
    response: `**I spent formative years and the COVID lockdown back in our village in Rajasthan.**

The internet was notoriously sluggish and patchy, though nothing cinematic like 20 minutes for a PDF—just classic slow village connectivity. During that entire 11th grade year, I literally didn't open a textbook or study.

That pause forced me to step off the default conveyor belt, question standard tracks, and build the self-driven hunger that eventually led to funding my own education abroad in Australia.`
  },
  {
    id: 'contact-hire',
    keywords: ['contact', 'email', 'phone', 'hire', 'resume', 'availability', 'interview', 'salary', 'connect', 'reach', 'talk'],
    title: 'Availability & Direct Contact',
    response: `**I am fully energized and ready to drive high-impact engineering and growth forward.**

- **Direct Phone:** [+91 89993 92326](tel:+918999392326)
- **Email:** [narayanrakhecha@gmail.com](mailto:narayanrakhecha@gmail.com)
- **LinkedIn:** [linkedin.com/in/narayan-rakhecha](https://linkedin.com)
- **GitHub:** [github.com/GodSpeedn](https://github.com/GodSpeedn)
- **YouTube:** [@narayanrakhecha2376](https://youtube.com/@narayanrakhecha2376)
- **Location:** India (Open to travel, onsite in Bengaluru, or hybrid).`
  }
];

/**
 * Intelligent Answer Matcher with fallback conversational reasoning
 */
export function getAiNarayanResponse(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return {
      title: 'Figuring Out with Narayan: The 60-Second Pitch',
      response: TOPIC_KNOWLEDGE[0].response
    };
  }

  const query = rawQuery.toLowerCase().trim();

  // 1. Direct keyword scoring
  let bestMatch = null;
  let highestScore = 0;

  for (const topic of TOPIC_KNOWLEDGE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (query.includes(kw)) {
        score += kw.length > 5 ? 3 : 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      title: bestMatch.title,
      response: bestMatch.response
    };
  }

  // 2. Fallback conversational response
  return {
    title: `On the Couch: "${rawQuery.slice(0, 32)}${rawQuery.length > 32 ? '...' : ''}"`,
    response: `That's a great question! Here is how I look at it from first principles:

In everything I build—whether it's multi-agent autonomous engineering pipelines, quantitative volatility models, or product distribution—my philosophy is **relentless bias to action and zero fluff**. 

I believe the future belongs to builders who can bridge deep technical execution with authentic storytelling and product intuition. For Wispr Flow, that means creating voice interfaces so effortless and accurate that thinking and creating become the exact same gesture.

Feel free to click any of the interview chips below to dive into my **60-second intro**, **5-agent AI pod**, **quant models**, or the **real story of my journey**!`
  };
}
