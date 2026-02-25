// API Configuration
const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

const API_CONFIG = {
  // Base URL for API requests
  // IMPORTANT: EXPO_PUBLIC_API_URL environment variable MUST be set for production builds
  // Set it in your .env.local file or build environment
  BASE_URL:
    configuredApiUrl && configuredApiUrl.length > 0
      ? configuredApiUrl
      : __DEV__
        ? "http://localhost:5189" // Development default
        : "", // Production requires EXPO_PUBLIC_API_URL to be set
  
  // Alternative HTTPS endpoint for development
  BASE_URL_HTTPS: "https://localhost:7120",
  
  ENDPOINTS: {
    GET_ML_ANALYSIS: "/getMl/",
  },
  
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
