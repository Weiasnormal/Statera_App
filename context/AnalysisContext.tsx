/**
 * Analysis Context - Store and share ML analysis results across the app
 */

import type {
    GetMLAnalysisResponse,
    MLAnalysisResult,
} from "@/services/api-types";
import { PROFILE_LABELS } from "@/services/api-types";
import type { CollectedData } from "@/services/data-collection";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Compute enhanced ML analysis with formatted data for UI
 */
export function computeEnhancedAnalysis(
  response: GetMLAnalysisResponse,
): MLAnalysisResult {
  // Convert categoryScores object to sorted array
  const topCategories = Object.entries(response.categoryScores)
    .map(([category, percentage]) => ({
      category,
      percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Get friendly profile name from label
  const dominantProfile = PROFILE_LABELS[response.label] || response.label;

  return {
    ...response,
    dominantProfile,
    dominantScore: response.score,
    topCategories,
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
  undefined,
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [collectedData, setCollectedData] = useState<CollectedData | null>(
    null,
  );
  const [analysisResult, setAnalysisResult] = useState<MLAnalysisResult | null>(
    null,
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
