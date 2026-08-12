/**
 * Combined Screening Questions
 *
 * Two continuous blocks:
 *   • Questions 1–13  → Schizophrenia domain (psychotic-like experiences)
 *   • Questions 14–25 → Bipolar domain (mood spectrum symptoms)
 * Each question carries a 'category' tag for score-splitting on the results dashboard.
 *
 * Total: 25 questions — 13 Schizophrenia, 12 Bipolar
 */
export const combinedQuestions = [
  // ─────────────────────────────────────────────────────────────
  // PART 1 — Schizophrenia Domain (Questions 1–13)
  // ─────────────────────────────────────────────────────────────
  { id: 1,  category: 'schizophrenia', text: "I feel uninterested in the things I used to enjoy." },
  { id: 2,  category: 'schizophrenia', text: "I sometimes smell or taste things that other people can't smell or taste." },
  { id: 3,  category: 'schizophrenia', text: "I have seen things that other people apparently can't see." },
  { id: 4,  category: 'schizophrenia', text: "I have heard things other people can't hear, like voices whispering or talking." },
  { id: 5,  category: 'schizophrenia', text: "My thoughts are sometimes so strong that I can almost hear them." },
  { id: 6,  category: 'schizophrenia', text: "Sometimes I have felt that I'm not in control of my own ideas or thoughts." },
  { id: 7,  category: 'schizophrenia', text: "I sometimes see special meanings in ordinary things or places around me." },
  { id: 8,  category: 'schizophrenia', text: "I often feel that others have it in for me." },
  { id: 9,  category: 'schizophrenia', text: "I have had the sense that some person or force is around me, even when I could not see anyone." },
  { id: 10, category: 'schizophrenia', text: "I have been confused at times whether something I experienced was real or imaginary." },
  { id: 11, category: 'schizophrenia', text: "I often hear unusual sounds like banging, clicking, hissing, or ringing in my ears." },
  { id: 12, category: 'schizophrenia', text: "Sometimes I feel suddenly distracted by distant sounds that I am not normally aware of." },
  { id: 13, category: 'schizophrenia', text: "I feel that parts of my body have changed in some way, or are not working right." },

  // ─────────────────────────────────────────────────────────────
  // PART 2 — Bipolar Domain (Questions 14–25)
  // ─────────────────────────────────────────────────────────────
  { id: 14, category: 'bipolar', text: "I have experienced periods where I felt unusually energetic or excited." },
  { id: 15, category: 'bipolar', text: "I have gone for long periods with very little sleep and still felt rested." },
  { id: 16, category: 'bipolar', text: "My thoughts sometimes race so fast that I find it difficult to keep up." },
  { id: 17, category: 'bipolar', text: "I have felt much more confident or powerful than usual during certain periods." },
  { id: 18, category: 'bipolar', text: "I become more talkative than normal during certain periods." },
  { id: 19, category: 'bipolar', text: "I have made impulsive decisions that later caused problems." },
  { id: 20, category: 'bipolar', text: "I spend money more freely during certain moods." },
  { id: 21, category: 'bipolar', text: "My mood changes dramatically without obvious reasons." },
  { id: 22, category: 'bipolar', text: "I find it difficult to control my emotions during mood changes." },
  { id: 23, category: 'bipolar', text: "I sometimes feel unusually irritable for several days." },
  { id: 24, category: 'bipolar', text: "People have noticed major changes in my mood or behavior." },
  { id: 25, category: 'bipolar', text: "My mood swings interfere with my daily life." },
];
