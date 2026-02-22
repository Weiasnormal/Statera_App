// API Request/Response Types matching the backend

/**
 * Backend Request - Currently expects a name field
 * TODO: Backend should be updated to accept full usage data
 */
export type GetMLAnalysisRequest = {
  name: string;
};

/**
 * Extended request with full usage data for ML analysis
 * This represents the complete data structure we want to send
 */
export interface UsageDataRequest {
  gwa: number;
  trackingDurationDays: number;
  totalScreenTime: number; // milliseconds
  totalAppsTracked: number;
  categoryBreakdown: {
    productivity: number;
    social: number;
    entertainment: number;
    other: number;
  };
  topApps: Array<{
    packageName: string;
    totalTimeInForeground: number;
    category?: string;
  }>;
  collectionTimestamp: string;
  platform: string;
}

/**
 * Backend Response - Simple string value
 */
export type GetMLAnalysisResponse = {
  value: string;
};

/**
 * Expected ML Analysis Result (once backend is updated)
 */
export interface MLAnalysisResult {
  behaviorScore: {
    checkingFrequency: number; // 0-100
    focusStability: number; // 0-100
    sessionImmersion: number; // 0-100
    impulseUnlocking: number; // 0-100
  };
  academicIndicator: string; // Description based on GWA
  patternInterpretation: string; // ML-generated insights
  recommendations?: string[];
  timestamp: string;
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
