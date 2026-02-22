// API Configuration
const API_CONFIG = {
  // Development URLs from launchSettings.json
  BASE_URL: __DEV__ 
    ? "http://localhost:5189" // HTTP endpoint
    : "https://your-production-url.com", // Update with production URL when deployed
  
  // Alternative HTTPS endpoint for development
  BASE_URL_HTTPS: "https://localhost:7120",
  
  ENDPOINTS: {
    GET_ML_ANALYSIS: "/getMl/",
  },
  
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
