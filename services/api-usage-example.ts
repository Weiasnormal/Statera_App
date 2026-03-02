/**
 * Example usage of the API client
 * 
 * This file demonstrates how to use the apiClient to communicate with the backend
 * Note: These are simplified examples. For actual usage, see data-collection.ts
 */

import { apiClient } from "./api-client";
import type { UsageDataRequest } from "./api-types";
import { logger } from "./logger";

/**
 * Example: Get ML Analysis with sample data
 */
export async function exampleGetMLAnalysis() {
  try {
    // Example usage data request with minimal data
    const sampleRequest: UsageDataRequest = {
      gwa: 85.5,
      trackingDurationDays: 7,
      totalScreenTime: 36000, // 10 hours in seconds
      totalAppsTracked: 15,
      pickups: 120,
      deviceUnlocks: 80,
      apps: [
        { packageName: "com.example.app1", totalTimeInForeground: 7200 },
        { packageName: "com.example.app2", totalTimeInForeground: 5400 },
      ],
      collectionTimestamp: new Date().toISOString(),
      platform: "android",
    };

    const response = await apiClient.getMLAnalysis(sampleRequest);

    logger.info("ML Analysis Result", response);
    logger.info("Dominant Profile", response.label);
    logger.info("Confidence Score", (response.score * 100).toFixed(1) + "%");
    
    return response;
  } catch (error) {
    logger.error("Failed to get ML analysis", error);
    throw error;
  }
}

/**
 * Example: Use in a React component with error handling
 */
export async function getAnalysisWithErrorHandling(usageData: UsageDataRequest) {
  try {
    const response = await apiClient.getMLAnalysis(usageData);

    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Example: Switch to HTTPS endpoint
 */
export function switchToHTTPS() {
  apiClient.setBaseURL("https://localhost:7120");
  logger.info("Switched to HTTPS endpoint", apiClient.getBaseURL());
}

