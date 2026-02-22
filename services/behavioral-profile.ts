export type BehavioralProfileKey =
  | "academic_at_risk"
  | "balanced"
  | "digital_multitasker"
  | "digital_self_regulated"
  | "high_functioning_academic"
  | "minimal_digital_engager";

export type BehavioralProfileConfig = {
  key: BehavioralProfileKey;
  titleLines: [string, string];
  characterImage: number;
  waveTopColor: string;
  waveBottomColor: string;
};

export const BEHAVIORAL_PROFILE_MAP: Record<
  BehavioralProfileKey,
  BehavioralProfileConfig
> = {
  academic_at_risk: {
    key: "academic_at_risk",
    titleLines: ["Academic", "At-Risk"],
    characterImage: require("@/assets/images/state_characters/academic_at_risk.webp"),
    waveTopColor: "#C8E9B1",
    waveBottomColor: "#ECFDE1",
  },
  balanced: {
    key: "balanced",
    titleLines: ["Balanced", "Learner"],
    characterImage: require("@/assets/images/state_characters/balanced.webp"),
    waveTopColor: "#FFE8CC",
    waveBottomColor: "#FFF4E8",
  },
  digital_multitasker: {
    key: "digital_multitasker",
    titleLines: ["Digital", "Multitasker"],
    characterImage: require("@/assets/images/state_characters/digital_multitasker.webp"),
    waveTopColor: "#FFDFBE",
    waveBottomColor: "#FFEFE0",
  },
  digital_self_regulated: {
    key: "digital_self_regulated",
    titleLines: ["Digital", "Self-Regulated"],
    characterImage: require("@/assets/images/state_characters/digital_self_regulated.webp"),
    waveTopColor: "#FFE4D5",
    waveBottomColor: "#FFF5ED",
  },
  high_functioning_academic: {
    key: "high_functioning_academic",
    titleLines: ["High-Functioning", "Academic"],
    characterImage: require("@/assets/images/state_characters/high_functioning_academic.webp"),
    waveTopColor: "#F0D9FF",
    waveBottomColor: "#F9EDFF",
  },
  minimal_digital_engager: {
    key: "minimal_digital_engager",
    titleLines: ["Minimal Digital", "Engager"],
    characterImage: require("@/assets/images/state_characters/minimal_digital_engager.webp"),
    waveTopColor: "#C5E6E8",
    waveBottomColor: "#EAF9FA",
  },
};

// Default profile, can be updated based on user input or API data
let currentBehavioralProfile: BehavioralProfileKey = "minimal_digital_engager"; 

export function getCurrentBehavioralProfile(): BehavioralProfileConfig {
  return BEHAVIORAL_PROFILE_MAP[currentBehavioralProfile];
}

export function setCurrentBehavioralProfile(profileKey: BehavioralProfileKey): void {
  currentBehavioralProfile = profileKey;
}

export function parseBehavioralProfileFromApi(
  apiValue: string | undefined,
): BehavioralProfileKey | null {
  if (!apiValue) {
    return null;
  }

  const normalized = apiValue.trim().toLowerCase().replace(/[-\s]+/g, "_");
  if (normalized in BEHAVIORAL_PROFILE_MAP) {
    return normalized as BehavioralProfileKey;
  }

  return null;
}
