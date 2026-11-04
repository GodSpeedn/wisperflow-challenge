/**
 * "2 Truths & 1 Lie" - Narayan Life Edition
 * 6 Rounds of detective trivia exploring Narayan's real journey
 */

export const GAME_ROUNDS = [
  {
    round: 1,
    theme: 'Survival Jobs in Australia',
    tagline: 'How did Narayan really survive Down Under?',
    options: [
      {
        id: 'A',
        text: 'Worked grueling night shifts at a grocery store, stacking shelves and unpacking stock.',
        isLie: false
      },
      {
        id: 'B',
        text: 'Worked as a student security guard at BlueScope — Australia’s largest steel manufacturing works in Port Kembla.',
        isLie: false
      },
      {
        id: 'C',
        text: 'Worked as a weekend surf instructor and lifeguard on North Wollongong Beach.',
        isLie: true
      }
    ],
    explanation: 'Lifeguard? Not even close! Balancing university meant grinding graveyard shifts at a local supermarket and working security at BlueScope — the largest steel manufacturing works in Australia!'
  },
  {
    round: 2,
    theme: 'The Rajasthan Lockdown',
    tagline: 'Find the fake high school legend!',
    options: [
      {
        id: 'A',
        text: 'Spent the COVID lockdown in a rural Rajasthan village with patchy, sluggish internet.',
        isLie: false
      },
      {
        id: 'B',
        text: 'Built a solar-powered Wi-Fi antenna on his village terrace to stream 4K physics lectures.',
        isLie: true
      },
      {
        id: 'C',
        text: 'Literally did not study, open a textbook, or attend online classes for the entire 11th grade.',
        isLie: false
      }
    ],
    explanation: 'Solar Wi-Fi relay? Pure fiction! Rural village internet was slow, and Narayan spent the entire 11th grade without touching a single school textbook or opening an exam prep book!'
  },
  {
    round: 3,
    theme: 'The Interview Crucible',
    tagline: 'Which prestigious interview story is pure fiction?',
    options: [
      {
        id: 'A',
        text: 'Accepted a $180,000 graduate quant trader offer from Citadel Securities in Sydney.',
        isLie: true
      },
      {
        id: 'B',
        text: 'Cleared technical interview rounds with top quantitative and data firms including Optiver, Susquehanna (SIG), and Quantium.',
        isLie: false
      },
      {
        id: 'C',
        text: 'Advanced through software engineering and technical assessment loops for a role at TikTok.',
        isLie: false
      }
    ],
    explanation: 'No Citadel contract! But the real interview grind is 100% verified: Narayan tackled intense interview loops with market-making powerhouses like Optiver, Susquehanna (SIG), Quantium, and global tech platform TikTok!'
  },
  {
    round: 4,
    theme: 'Life & Travel Down Under',
    tagline: 'One of these Australian lifestyle claims is totally made up!',
    options: [
      {
        id: 'A',
        text: 'Lived and studied in Australia for years, but literally never traveled anywhere for tourism (no Melbourne, no Gold Coast, zero vacations).',
        isLie: false
      },
      {
        id: 'B',
        text: 'His daily routine was strictly a closed triangle between university lectures, the BlueScope steel plant, and grocery night shifts.',
        isLie: false
      },
      {
        id: 'C',
        text: 'Took a 2-week solo campervan road trip across the Australian Outback to Uluru during mid-semester break.',
        isLie: true
      }
    ],
    explanation: 'Outback campervan trip? Never happened! Despite living in Australia for years, Narayan literally never did any tourism or sightseeing — his entire life was a non-stop hustle between university, the BlueScope steelworks, and night shifts!'
  },
  {
    round: 5,
    theme: 'The Exam Bureaucracy Wall',
    tagline: 'Find the fabricated reason for missing the CAT exam!',
    options: [
      {
        id: 'A',
        text: 'Prepared relentlessly for the Indian CAT entrance exam with the goal of entering a premier Indian B-school.',
        isLie: false
      },
      {
        id: 'B',
        text: 'Was barred from the CAT exam hall after accidentally bringing a programmable financial options calculator into the test center.',
        isLie: true
      },
      {
        id: 'C',
        text: 'Was legally disqualified from CAT because the AIU refused foreign degree equivalence — purely because 6 months of his bachelor\'s were taught online during COVID.',
        isLie: false
      }
    ],
    explanation: 'No calculator mix-up! The real obstacle was brutal bureaucracy: after months of intense CAT preparation, the Association of Indian Universities (AIU) refused foreign degree equivalence simply because 6 months of his degree were conducted online during pandemic lockdowns, legally locking him out!'
  },
  {
    round: 6,
    theme: 'Competitions & Proof of Work',
    tagline: 'Which high-stakes milestone is the imposter?',
    options: [
      {
        id: 'A',
        text: 'Competed in the world-renowned IMC Prosperity algorithmic market-making challenge.',
        isLie: false
      },
      {
        id: 'B',
        text: 'Finished as a top scorer in the Susquehanna (SIG) campus poker tournament and graduated from the executive EPAT algorithmic trading program.',
        isLie: false
      },
      {
        id: 'C',
        text: 'Won $25,000 in a televised underground poker cash game against seasoned pro traders.',
        isLie: true
      }
    ],
    explanation: 'No underground casino millions! But Narayan\'s quant and game theory record is 100% verified: high placement in the Susquehanna (SIG) poker tournament, EPAT quantitative trading graduate, competitor in IMC Prosperity, and creator of the Options Volatility Smile trading engine and December Multi-Agent TA engineering pod!'
  }
];

export const DETECTIVE_RANKS = [
  { minScore: 6, title: '🕵️ Master Detective', desc: 'Flawless deduction! You know Narayan better than his own resume.' },
  { minScore: 4, title: '🔍 Senior Investigator', desc: 'Impressive radar! You can spot a tech bluff from a mile away.' },
  { minScore: 2, title: '📋 Junior Sleuth', desc: 'Good instincts! A few wild truths caught you off guard.' },
  { minScore: 0, title: '🌱 Rookie Inquirer', desc: 'Narayan’s real life is so unconventional that the truths sounded like lies!' }
];

export function getRank(score) {
  return DETECTIVE_RANKS.find(r => score >= r.minScore) || DETECTIVE_RANKS[DETECTIVE_RANKS.length - 1];
}

