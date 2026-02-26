/**
 * Analysis Context - Store and share ML analysis results across the app
 */

import type { GetMLAnalysisResponse, MLAnalysisResult } from "@/services/api-types";
import type { CollectedData } from "@/services/data-collection";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Profile names matching the backend response fields
 */
const PROFILE_NAMES = {
  academicAtRiskScore: "Academic at Risk",
  averageBalancedUserScore: "Average Balanced User",
  digitalMultitaskerScore: "Digital Multitasker",
  digitalSelfRegulatedScore: "Digital Self-Regulated",
  highFunctioningAcademicScore: "High-Functioning Academic",
  minimalDigitalengagerScore: "Minimal Digital Engager",
} as const;

/**
 * Compute enhanced ML analysis with dominant profile and distribution
 */
export function computeEnhancedAnalysis(response: GetMLAnalysisResponse): MLAnalysisResult {
  const profiles = [
    { key: "academicAtRiskScore", score: response.academicAtRiskScore },
    { key: "averageBalancedUserScore", score: response.averageBalancedUserScore },
    { key: "digitalMultitaskerScore", score: response.digitalMultitaskerScore },
    { key: "digitalSelfRegulatedScore", score: response.digitalSelfRegulatedScore },
    { key: "highFunctioningAcademicScore", score: response.highFunctioningAcademicScore },
    { key: "minimalDigitalengagerScore", score: response.minimalDigitalengagerScore },
  ];

  // Find dominant profile (highest score)
  const dominant = profiles.reduce((max, current) => 
    current.score > max.score ? current : max
  );

  const profileDistribution = profiles.map(p => ({
    profile: PROFILE_NAMES[p.key as keyof typeof PROFILE_NAMES],
    score: p.score,
    percentage: Math.round(p.score * 100),
  }));

  return {
    ...response,
    dominantProfile: PROFILE_NAMES[dominant.key as keyof typeof PROFILE_NAMES],
    dominantScore: dominant.score,
    profileDistribution,
  };
}

interface AnalysisContextType {
  // Collected user data
  collectedData: CollectedData | null;
  setCollectedData: (data: CollectedData | null) => void;

  // ML analysis result from backend with enhanced computed insights
  analysisResult: MLAnalysisResult | null;
  setAnalysisResult: (result: MLAnalysisResult | null) => void;

  // Raw backend response (deprecated, use analysisResult instead)
  backendResponse: string | null;
  setBackendResponse: (response: string | null) => void;

  // Loading and error states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  // Clear all data
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [collectedData, setCollectedData] = useState<CollectedData | null>(
    null
  );
  const [analysisResult, setAnalysisResult] = useState<MLAnalysisResult | null>(
    null
  );
  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearAnalysis = () => {
    setCollectedData(null);
    setAnalysisResult(null);
    setBackendResponse(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        collectedData,
        setCollectedData,
        analysisResult,
        setAnalysisResult,
        backendResponse,
        setBackendResponse,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
