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
 * Returns probability scores for 6 behavioral profiles (0-1 range)
 */
export interface GetMLAnalysisResponse {
  academicAtRiskScore: number;
  averageBalancedUserScore: number;
  digitalMultitaskerScore: number;
  digitalSelfRegulatedScore: number;
  highFunctioningAcademicScore: number;
  minimalDigitalengagerScore: number;
  dateAnalyzed: string; // ISO 8601 DateTime string
}

/**
 * Enhanced ML Analysis Result with computed insights
 */
export interface MLAnalysisResult extends GetMLAnalysisResponse {
  dominantProfile: string; // Profile with highest score
  dominantScore: number; // Highest probability score
  profileDistribution: Array<{
    profile: string;
    score: number;
    percentage: number; // Score as percentage (0-100)
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
