/*
 * ENOSX AI — deterministic safety guard (server-side, shared)
 * Narrow, high-precision protections for the highest-risk categories.
 * Genuine advice, education, and historical or professional questions about
 * these topics remain answerable; only direct requests are intercepted.
 * This is a first line of defense; the system prompt remains responsible for
 * the broader ENOSX protocol.
 */

const CRISIS_PATTERN = /\b(?:kill(?:ing)? myself|end(?:ing)? my life|take my own life|suicid(?:e|al)|self[-\s]?harm(?:ing)?|cut(?:ting)? myself|hurt(?:ing)? myself)\b/i;
const MINOR_CONTEXT_PATTERN = /\b(?:child|children|minor|minors|underage|pre[-\s]?teen|toddler|infant|primary school|high school|grade \d)\b/i;
const SEXUAL_PATTERN = /\b(?:sex|sexual|sexually|nude|nudes|naked|porn|pornographic|explicit|erotic|intercourse|molest|groom(?:ing)?)\b/i;
const WEAPON_HARM_PATTERN = /\b(?:how (?:to|do i|can i|would i)|instructions?|guide|recipe|steps|build|make|construct|assemble|synthesize|manufacture|detonate)\b[^\n]{0,80}\b(?:bomb|explosive|improvised explosive|ied|nerve agent|sarin|ricin|anthrax|bioweapon|biological weapon|chemical weapon|dirty bomb|pipe bomb)\b/i;

export type SafetyGuardCategory = "crisis" | "minor-safety" | "harmful-instructions";

export interface SafetyGuardResult {
  category: SafetyGuardCategory;
  response: string;
}

/**
 * Inspect a single user message and return a protected response when the
 * highest-risk patterns match, or null when the message may proceed.
 */
export function evaluateSafetyGuard(userText: string): SafetyGuardResult | null {
  if (!userText) return null;

  if (CRISIS_PATTERN.test(userText)) {
    return {
      category: "crisis",
      response:
        "I'm really glad you reached out, and your safety matters to me. I can't provide emergency support here, so please contact your local emergency number right now if you might act on these thoughts (in Kenya: 999, 112, or 911), or reach out to a trusted person who can stay with you. If you are not in immediate danger, speaking with a qualified counselor or doctor can make a real difference, and I can stay with you to work through calm, practical next steps.",
    };
  }

  if (MINOR_CONTEXT_PATTERN.test(userText) && SEXUAL_PATTERN.test(userText)) {
    return {
      category: "minor-safety",
      response:
        "I can't help with sexual content that involves minors in any form. If a child is at risk, please contact your local child-protection authority or emergency services. I can help with age-appropriate health education, online-safety planning, or other questions.",
    };
  }

  if (WEAPON_HARM_PATTERN.test(userText)) {
    return {
      category: "harmful-instructions",
      response:
        "I can't provide instructions for creating weapons, explosives, or harmful agents. If this is professional research, I can point you to published safety, regulatory, or emergency-preparedness resources instead. If you are having thoughts of harming others, please reach out to a trusted person or a qualified professional.",
    };
  }

  return null;
}

const TOOL_INJECTION_PATTERNS: RegExp[] = [
  /\bignore (?:all |any )?(?:previous|prior|above) (?:instructions|rules|prompts)\b/i,
  /\bdisregard (?:your|all|the) (?:system|safety|previous) (?:prompt|instructions|rules)\b/i,
  /\b(?:reveal|print|show|output) (?:your|the) (?:system prompt|hidden instructions|api keys?)\b/i,
];

/**
 * Detect obvious prompt-injection or credential-fishing attempts in external
 * content (for example scraped pages or connector text) that should never be
 * treated as instructions.
 */
export function looksLikeToolInjection(content: string): boolean {
  return TOOL_INJECTION_PATTERNS.some((pattern) => pattern.test(content));
}
