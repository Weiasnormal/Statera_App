import API_CONFIG from "./api-config";
import type {
    GetMLAnalysisRequest,
    GetMLAnalysisResponse,
    MLAnalysisResult,
    UsageDataRequest,
} from "./api-types";
import type { CollectedData } from "./data-collection";

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
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
      const url = `${this.baseURL}${API_CONFIG.ENDPOINTS.GET_ML_ANALYSIS}`;
      
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
   * Currently sends a simplified request (name) to match backend
   * TODO: Update backend to accept full UsageDataRequest
   * 
   * @param collectedData Full collected user data
   * @returns ML Analysis result
   */
  async submitUsageData(
    collectedData: CollectedData
  ): Promise<GetMLAnalysisResponse> {
    try {
      // For now, send to the same endpoint with a simplified request
      // Once backend is updated, send the full collectedData
      const simplifiedRequest: GetMLAnalysisRequest = {
        name: `User_GWA_${collectedData.gwa}`,
      };

      console.log("Submitting data to backend:", {
        gwa: collectedData.gwa,
        duration: collectedData.trackingDurationDays,
        totalScreenTime: collectedData.usageMetrics.totalScreenTime,
        appsTracked: collectedData.usageMetrics.totalAppsTracked,
      });

      // Call the existing endpoint
      const result = await this.getMLAnalysis(simplifiedRequest);

      console.log("Backend response:", result);

      return result;
    } catch (error) {
      console.error("Error submitting usage data:", error);
      throw error;
    }
  }

  /**
   * Future method: Submit full usage data (when backend is ready)
   * This is the structure we want to send eventually
   */
  async submitFullUsageData(
    collectedData: CollectedData
  ): Promise<MLAnalysisResult> {
    const usageDataRequest: UsageDataRequest = {
      gwa: collectedData.gwa,
      trackingDurationDays: collectedData.trackingDurationDays,
      totalScreenTime: collectedData.usageMetrics.totalScreenTime,
      totalAppsTracked: collectedData.usageMetrics.totalAppsTracked,
      categoryBreakdown: collectedData.usageMetrics.categoryBreakdown,
      topApps: collectedData.usageMetrics.topApps,
      collectionTimestamp: collectedData.collectionTimestamp,
      platform: collectedData.platform,
    };

    const url = `${this.baseURL}${API_CONFIG.ENDPOINTS.GET_ML_ANALYSIS}`;

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

    const result = await response.json();
    return result as MLAnalysisResult;
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
