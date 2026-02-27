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

export function setCurrentBehavioralProfile(
  profileKey: BehavioralProfileKey,
): void {
  currentBehavioralProfile = profileKey;
}

export function parseBehavioralProfileFromApi(
  apiValue: string | undefined,
): BehavioralProfileKey | null {
  if (!apiValue) {
    return null;
  }

  const trimmed = apiValue.trim();
  const directMap: Record<string, BehavioralProfileKey> = {
    AcademicAtRisk: "academic_at_risk",
    "Academic At Risk": "academic_at_risk",
    AverageBalancedUser: "balanced",
    "Average Balanced User": "balanced",
    DigitalMultitasker: "digital_multitasker",
    "Digital Multitasker": "digital_multitasker",
    DigitalSelfRegulated: "digital_self_regulated",
    "Digital Self-Regulated": "digital_self_regulated",
    HighFunctioningAcademic: "high_functioning_academic",
    "High-Functioning Academic": "high_functioning_academic",
    MinimalDigitalengager: "minimal_digital_engager",
    MinimalDigitalEngager: "minimal_digital_engager",
    "Minimal Digital Engager": "minimal_digital_engager",
  };

  if (trimmed in directMap) {
    return directMap[trimmed];
  }

  const camelToSnake = trimmed.replace(/([a-z0-9])([A-Z])/g, "$1_$2");
  const normalized = camelToSnake.toLowerCase().replace(/[-\s]+/g, "_");

  if (normalized in directMap) {
    return directMap[normalized];
  }

  if (normalized in BEHAVIORAL_PROFILE_MAP) {
    return normalized as BehavioralProfileKey;
  }

  return null;
}
