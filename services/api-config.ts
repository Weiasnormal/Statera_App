// API Configuration
const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

const API_CONFIG = {
  // Base URL for API requests
  // Override with EXPO_PUBLIC_API_URL environment variable if needed
  // Set it in your .env.local file or build environment
  BASE_URL:
    configuredApiUrl && configuredApiUrl.length > 0
      ? configuredApiUrl
      : __DEV__
        ? "http://localhost:5189" // Dev
        : "https://statera-api.onrender.com", // Production 
  
  // Alternative HTTPS endpoint for development
  BASE_URL_HTTPS: "https://localhost:7120",
  
  ENDPOINTS: {
    GET_ML_ANALYSIS: "/getMl/",
  },
  
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
