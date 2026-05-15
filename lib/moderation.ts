import type {
  ModerationCategory,
  ModerationResult,
  ModerationSeverity,
} from "@/types";

const KEYWORDS: Record<ModerationCategory, RegExp[]> = {
  toxicity: [
    /\b(idiot|stupid|dumb|loser|trash|scum|moron)\b/i,
    /\b(shut up|stfu|kys)\b/i,
  ],
  hate: [
    /\b(hate (you|them|those people))\b/i,
    /\b(slur1|slur2)\b/i, // placeholders — replaced server-side
  ],
  harassment: [
    /\b(dox+|leak your address|i('| a)?m coming for you)\b/i,
    /\b(final warning|or else)\b/i,
  ],
  violence: [
    /\b(kill|murder|stab|shoot|behead|attack)\b/i,
    /\b(burn .* down|blow .* up)\b/i,
  ],
  extremism: [
    /\b(jihad|ethnic cleansing|race war)\b/i,
  ],
  scam: [
    /\$\s?\d{2,}[kK]?\/\s?(week|day|month)/,
    /\b(guaranteed (payout|profit)|drop your wallet|send (\$|usdt|btc))\b/i,
    /\b(dm me|click this link).*(money|crypto|wallet|earn)\b/i,
  ],
  nsfw: [
    /\b(porn|xxx|onlyfans|nudes)\b/i,
  ],
  "self-harm": [
    /\b(i want to (die|end it)|kill myself|suicide method)\b/i,
  ],
};

const WEIGHTS: Record<ModerationCategory, number> = {
  toxicity: 0.35,
  hate: 0.85,
  harassment: 0.8,
  violence: 0.9,
  extremism: 0.95,
  scam: 0.7,
  nsfw: 0.55,
  "self-harm": 0.9,
};

function severityFromScore(score: number): ModerationSeverity {
  if (score >= 0.85) return "critical";
  if (score >= 0.6) return "high";
  if (score >= 0.35) return "medium";
  return "low";
}

/**
 * Heuristic moderator — used as a deterministic fallback so the demo works
 * without an OpenAI key. Real call below in `moderateWithOpenAI`.
 */
export function heuristicModerate(content: string): ModerationResult {
  const text = content.toLowerCase();
  const categoryScores: Partial<Record<ModerationCategory, number>> = {};
  const flagged: ModerationCategory[] = [];

  let max = 0;
  for (const [cat, patterns] of Object.entries(KEYWORDS) as [
    ModerationCategory,
    RegExp[],
  ][]) {
    let hits = 0;
    for (const re of patterns) if (re.test(text)) hits++;
    if (hits > 0) {
      const base = WEIGHTS[cat];
      const score = Math.min(1, base * (0.7 + hits * 0.25));
      categoryScores[cat] = parseFloat(score.toFixed(2));
      flagged.push(cat);
      if (score > max) max = score;
    }
  }

  // baseline noise
  if (!flagged.length) {
    const noise = Math.min(0.08, text.length / 4000);
    categoryScores.toxicity = parseFloat(noise.toFixed(2));
    max = noise;
  }

  return {
    safe: max < 0.5,
    score: parseFloat(max.toFixed(2)),
    severity: severityFromScore(max),
    flagged,
    categoryScores,
    rationale: flagged.length
      ? `Detected ${flagged.join(", ")} with severity ${severityFromScore(max)}.`
      : "Content appears safe.",
  };
}

/**
 * Real OpenAI moderation call. Falls back to heuristic if no key.
 * Expects to run server-side only.
 */
export async function moderateWithOpenAI(
  content: string,
): Promise<ModerationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return heuristicModerate(content);

  try {
    const res = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "omni-moderation-latest",
        input: content,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    const result = data.results?.[0];
    if (!result) return heuristicModerate(content);

    // Map OpenAI categories → ours
    const map: Record<string, ModerationCategory> = {
      hate: "hate",
      "hate/threatening": "hate",
      harassment: "harassment",
      "harassment/threatening": "harassment",
      "self-harm": "self-harm",
      "self-harm/intent": "self-harm",
      "self-harm/instructions": "self-harm",
      sexual: "nsfw",
      "sexual/minors": "nsfw",
      violence: "violence",
      "violence/graphic": "violence",
    };

    const categoryScores: Partial<Record<ModerationCategory, number>> = {};
    const flagged: ModerationCategory[] = [];
    let max = 0;

    for (const [k, v] of Object.entries(result.category_scores ?? {})) {
      const cat = map[k];
      if (!cat) continue;
      const score = Number(v) || 0;
      categoryScores[cat] = Math.max(categoryScores[cat] ?? 0, score);
      if (score > max) max = score;
    }
    for (const [k, v] of Object.entries(result.categories ?? {})) {
      const cat = map[k];
      if (cat && v) flagged.push(cat);
    }

    return {
      safe: !result.flagged && max < 0.5,
      score: parseFloat(max.toFixed(2)),
      severity: severityFromScore(max),
      flagged: Array.from(new Set(flagged)),
      categoryScores,
      rationale: result.flagged
        ? `Flagged by classifier: ${Array.from(new Set(flagged)).join(", ") || "policy"}`
        : "Approved by classifier.",
    };
  } catch {
    return heuristicModerate(content);
  }
}

export const CATEGORY_LABELS: Record<ModerationCategory, string> = {
  toxicity: "Toxicity",
  hate: "Hate speech",
  harassment: "Harassment",
  violence: "Violence",
  extremism: "Extremism",
  scam: "Scam",
  nsfw: "NSFW",
  "self-harm": "Self-harm",
};

export const SEVERITY_COLORS: Record<ModerationSeverity, string> = {
  low: "text-emerald-400",
  medium: "text-amber-400",
  high: "text-orange-400",
  critical: "text-rose-400",
};
