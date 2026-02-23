import API_CONFIG from "./api-config";
import type {
    GetMLAnalysisRequest,
    GetMLAnalysisResponse,
    UsageDataRequest
} from "./api-types";
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
        "API base URL is not configured. Set EXPO_PUBLIC_API_URL for non-development builds."
      );
    }

    return this.baseURL;
  }

  /**
   * Generic fetch wrapper with timeout and error handling
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {}
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
   * @param request Request object with name
   * @returns ML Analysis result
   */
  async getMLAnalysis(
    request: GetMLAnalysisRequest
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
          `API Error: ${response.status} ${response.statusText}`
        );
      }

      // Backend returns the value directly on success
      const data = await response.json();
      
      return {
        value: data,
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
    collectedData: CollectedData
  ): Promise<GetMLAnalysisResponse> {
    try {
      // Prepare full usage data request with raw app data
      // Convert milliseconds to seconds for backend
      const usageDataRequest: UsageDataRequest = {
        gwa: collectedData.gwa,
        trackingDurationDays: collectedData.trackingDurationDays,
        totalScreenTime: Math.round(collectedData.usageMetrics.totalScreenTime / 1000),
        totalAppsTracked: collectedData.usageMetrics.totalAppsTracked,
        apps: collectedData.usageMetrics.apps.map(app => ({
          packageName: app.packageName,
          totalTimeInForeground: Math.round(app.totalTimeInForeground / 1000),
        })),
        collectionTimestamp: collectedData.collectionTimestamp,
        platform: collectedData.platform,
      };

      console.log("Submitting raw usage data to backend (time in seconds):", {
        gwa: usageDataRequest.gwa,
        duration: usageDataRequest.trackingDurationDays,
        totalScreenTimeSeconds: usageDataRequest.totalScreenTime,
        appsTracked: usageDataRequest.totalAppsTracked,
        totalApps: usageDataRequest.apps.length,
      });

      const url = `${this.getBaseURLOrThrow()}${API_CONFIG.ENDPOINTS.GET_ML_ANALYSIS}`;

      const response = await this.fetchWithTimeout(url, {
        method: "POST",
        body: JSON.stringify(usageDataRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.description || 
          `API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      
      console.log("Backend response:", data);

      return {
        value: data,
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
