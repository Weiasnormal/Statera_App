// API Configuration
const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

const API_CONFIG = {
  // Development URLs from launchSettings.json
  BASE_URL:
    configuredApiUrl && configuredApiUrl.length > 0
      ? configuredApiUrl
      : __DEV__
        ? "http://localhost:5189"
        : "",
  
  // Alternative HTTPS endpoint for development
  BASE_URL_HTTPS: "https://localhost:7120",
  
  ENDPOINTS: {
    GET_ML_ANALYSIS: "/getMl/",
  },
  
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
