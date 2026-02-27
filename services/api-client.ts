import API_CONFIG from "./api-config";
import type { GetMLAnalysisResponse, UsageDataRequest } from "./api-types";
import type { CollectedData } from "./data-collection";

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private getBaseURLOrThrow(): string {
    if (!this.baseURL) {
      throw new Error(
        "API base URL is not configured. Set EXPO_PUBLIC_API_URL for non-development builds.",
      );
    }

    return this.baseURL;
  }

  /**
   * Generic fetch wrapper with timeout and error handling
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  }

  /**
   * POST /getMl/ - Get ML Analysis
   * Submits usage data and receives behavioral profile scores
   * @param request Usage data request
   * @returns ML Analysis result with 6 behavioral profile scores
   */
  async getMLAnalysis(
    request: UsageDataRequest,
  ): Promise<GetMLAnalysisResponse> {
    try {
      const url = `${this.getBaseURLOrThrow()}${API_CONFIG.ENDPOINTS.GET_ML_ANALYSIS}`;

      const response = await this.fetchWithTimeout(url, {
        method: "POST",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.description ||
            `API Error: ${response.status} ${response.statusText}`,
        );
      }

      // Backend returns structured Response with dominant profile + category scores
      const data = await response.json();

      return {
        score: data.score,
        label: data.label,
        categoryScores: data.categoryScores,
        dateAnalyzed: data.dateAnalyzed,
      };
    } catch (error) {
      console.error("Error calling getMLAnalysis:", error);
      throw error;
    }
  }

  /**
   * Submit usage data for ML analysis
   * Sends raw app usage data to backend for categorization and ML analysis
   *
   * @param collectedData Full collected user data
   * @returns ML Analysis result
   */
  async submitUsageData(
    collectedData: CollectedData,
  ): Promise<GetMLAnalysisResponse> {
    try {
      // Prepare full usage data request with raw app data
      // Convert milliseconds to seconds for backend
      const usageDataRequest: UsageDataRequest = {
        gwa: collectedData.gwa,
        trackingDurationDays: collectedData.trackingDurationDays,
        totalScreenTime: Math.round(
          collectedData.usageMetrics.totalScreenTime / 1000,
        ),
        totalAppsTracked: collectedData.usageMetrics.totalAppsTracked,
        pickups: collectedData.usageMetrics.pickups,
        deviceUnlocks: collectedData.usageMetrics.deviceUnlocks,
        apps: collectedData.usageMetrics.apps.map((app) => ({
          packageName: app.packageName,
          totalTimeInForeground: Math.round(app.totalTimeInForeground / 1000),
        })),
        collectionTimestamp: collectedData.collectionTimestamp,
        platform: collectedData.platform,
      };

      if (__DEV__) {
        console.log("Submitting raw usage data to backend (time in seconds):", {
          gwa: usageDataRequest.gwa,
          duration: usageDataRequest.trackingDurationDays,
          totalScreenTimeSeconds: usageDataRequest.totalScreenTime,
          appsTracked: usageDataRequest.totalAppsTracked,
          pickups: usageDataRequest.pickups,
          deviceUnlocks: usageDataRequest.deviceUnlocks,
          totalApps: usageDataRequest.apps.length,
        });
        // Uncomment for full payload debugging:
        // console.log("📤 Full API Payload being sent:", JSON.stringify(usageDataRequest, null, 2));
      }

      const url = `${this.getBaseURLOrThrow()}${API_CONFIG.ENDPOINTS.GET_ML_ANALYSIS}`;

      if (__DEV__) {
        console.log("📍 API Endpoint:", url);
      }

      const response = await this.fetchWithTimeout(url, {
        method: "POST",
        body: JSON.stringify(usageDataRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.description ||
            `API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (__DEV__) {
        console.log(
          "✅ Backend response received:",
          JSON.stringify(data, null, 2),
        );
      }

      return {
        score: data.score,
        label: data.label,
        categoryScores: data.categoryScores,
        dateAnalyzed: data.dateAnalyzed,
      };
    } catch (error) {
      console.error("Error submitting usage data:", error);
      throw error;
    }
  }

  /**
   * Update base URL (useful for switching between HTTP/HTTPS or environments)
   */
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing or multiple instances
export default ApiClient;
