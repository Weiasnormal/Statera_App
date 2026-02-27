// API Request/Response Types matching the backend

/**
 * Extended request with full usage data for ML analysis
 * Send raw app data - backend will handle categorization and analysis
 */
export interface UsageDataRequest {
  gwa: number;
  trackingDurationDays: number;
  totalScreenTime: number; // seconds
  totalAppsTracked: number;
  pickups: number; // Number of screen activations
  deviceUnlocks: number; // Number of lock screen bypasses
  apps: Array<{
    packageName: string;
    totalTimeInForeground: number; // seconds
  }>;
  collectionTimestamp: string;
  platform: string;
}

/**
 * Backend ML Analysis Response - Matches C# Response record
 * Backend returns the dominant profile + category usage breakdown
 */
export interface GetMLAnalysisResponse {
  score: number; // Highest probability score (0-1 range)
  label: string; // Profile name with highest score (e.g., "AcademicAtRisk", "DigitalMultitasker")
  categoryScores: Record<string, number>; // Top 5 app categories with usage percentages
  dateAnalyzed: string; // ISO 8601 DateTime string
}

/**
 * Profile label mapping from backend labels to display names
 */
export const PROFILE_LABELS: Record<string, string> = {
  AcademicAtRisk: "Academic at Risk",
  AverageBalancedUser: "Average Balanced User",
  DigitalMultitasker: "Digital Multitasker",
  DigitalSelfRegulated: "Digital Self-Regulated",
  HighFunctioningAcademic: "High-Functioning Academic",
  MinimalDigitalengager: "Minimal Digital Engager",
};

/**
 * Enhanced ML Analysis Result with formatted data for UI
 */
export interface MLAnalysisResult extends GetMLAnalysisResponse {
  dominantProfile: string; // Friendly profile name
  dominantScore: number; // Same as score, for consistency
  topCategories: Array<{
    category: string;
    percentage: number;
  }>;
}

/**
 * API Error structure
 */
export type ApiError = {
  code: string;
  description: string;
  type: ErrorType;
};

export enum ErrorType {
  Failure = 0,
  NotFound = 1,
  Conflict = 2,
  Validation = 3,
  Unauthorized = 4,
  Forbidden = 5,
  Problem = 6,
}

export type ApiResult<T> =
  | { isSuccess: true; value: T }
  | { isSuccess: false; error: ApiError };
