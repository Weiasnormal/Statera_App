/**
 * Example usage of the API client
 * 
 * This file demonstrates how to use the apiClient to communicate with the backend
 */

import { apiClient } from "./api-client";

/**
 * Example: Get ML Analysis
 */
export async function exampleGetMLAnalysis() {
  try {
    const response = await apiClient.getMLAnalysis({
      name: "John Doe",
    });

    console.log("ML Analysis Result:", response.value);
    // Expected output: "Hello John Doe"
    
    return response;
  } catch (error) {
    console.error("Failed to get ML analysis:", error);
    throw error;
  }
}

/**
 * Example: Use in a React component with error handling
 */
export async function getAnalysisWithErrorHandling(userName: string) {
  try {
    const response = await apiClient.getMLAnalysis({
      name: userName,
    });

    return {
      success: true,
      data: response.value,
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
  console.log("Switched to HTTPS endpoint:", apiClient.getBaseURL());
}
