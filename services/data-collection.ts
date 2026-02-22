/**
 * Data Collection Service
 * Collects all necessary data for ML analysis including:
 * - GWA (General Weighted Average)
 * - Usage Statistics (time per app)
 * - Tracking duration
 */

import { getUsageStats, hasUsageStatsPermission } from "expo-android-usagestats";
import { Platform } from "react-native";
import { getTrackingDurationDays } from "./tracking-duration";

export interface AppUsageData {
  packageName: string;
  appName?: string;
  totalTimeInForeground: number; // in milliseconds
  category?: string;
}

export interface DeviceUsageMetrics {
  totalScreenTime: number; // Total time across all apps (milliseconds)
  totalAppsTracked: number; // Number of apps used
  topApps: AppUsageData[]; // Top 10 most used apps
  categoryBreakdown: {
    productivity: number;
    social: number;
    entertainment: number;
    other: number;
  };
}

export interface CollectedData {
  gwa: number; // General Weighted Average
  trackingDurationDays: number; // How many days of data
  usageMetrics: DeviceUsageMetrics;
  collectionTimestamp: string; // ISO timestamp
  platform: string; // "android" or "ios"
}

/**
 * Categorize apps based on package names
 */
function categorizeApp(packageName: string): string {
  const pkg = packageName.toLowerCase();
  
  // Productivity apps
  if (
    pkg.includes("office") ||
    pkg.includes("microsoft") ||
    pkg.includes("google.drive") ||
    pkg.includes("dropbox") ||
    pkg.includes("notion") ||
    pkg.includes("evernote") ||
    pkg.includes("calendar") ||
    pkg.includes("gmail") ||
    pkg.includes("outlook") ||
    pkg.includes("docs") ||
    pkg.includes("sheets")
  ) {
    return "productivity";
  }
  
  // Social media apps
  if (
    pkg.includes("facebook") ||
    pkg.includes("instagram") ||
    pkg.includes("twitter") ||
    pkg.includes("tiktok") ||
    pkg.includes("snapchat") ||
    pkg.includes("whatsapp") ||
    pkg.includes("messenger") ||
    pkg.includes("telegram") ||
    pkg.includes("discord") ||
    pkg.includes("reddit")
  ) {
    return "social";
  }
  
  // Entertainment apps
  if (
    pkg.includes("youtube") ||
    pkg.includes("netflix") ||
    pkg.includes("spotify") ||
    pkg.includes("hulu") ||
    pkg.includes("prime") ||
    pkg.includes("disney") ||
    pkg.includes("game") ||
    pkg.includes("music") ||
    pkg.includes("video") ||
    pkg.includes("twitch")
  ) {
    return "entertainment";
  }
  
  return "other";
}

/**
 * Get usage statistics for specified duration
 */
async function getUsageStatistics(durationDays: number): Promise<AppUsageData[]> {
  if (Platform.OS !== "android") {
    console.warn("Usage statistics only available on Android");
    return [];
  }

  try {
    const hasPermission = await hasUsageStatsPermission();
    if (!hasPermission) {
      throw new Error("Usage statistics permission not granted");
    }

    const endTime = Date.now();
    const startTime = endTime - durationDays * 24 * 60 * 60 * 1000;

    const stats = await getUsageStats(startTime, endTime);

    // Filter and map usage data
    const usageData: AppUsageData[] = stats
      .filter((stat: any) => {
        const pkg = stat.packageName?.toLowerCase() || "";
        return (
          stat.packageName &&
          stat.totalTimeInForeground > 0 &&
          !pkg.startsWith("com.android.") &&
          !pkg.startsWith("com.google.android.")
        );
      })
      .map((stat: any) => ({
        packageName: stat.packageName,
        totalTimeInForeground: Number(stat.totalTimeInForeground || 0),
        category: categorizeApp(stat.packageName),
      }))
      .sort((a: AppUsageData, b: AppUsageData) => 
        b.totalTimeInForeground - a.totalTimeInForeground
      );

    return usageData;
  } catch (error) {
    console.error("Error getting usage statistics:", error);
    throw error;
  }
}

/**
 * Calculate device usage metrics from raw usage data
 */
function calculateMetrics(usageData: AppUsageData[]): DeviceUsageMetrics {
  const totalScreenTime = usageData.reduce(
    (sum, app) => sum + app.totalTimeInForeground,
    0
  );

  const categoryBreakdown = usageData.reduce(
    (acc, app) => {
      const category = app.category || "other";
      acc[category as keyof typeof acc] =
        (acc[category as keyof typeof acc] || 0) + app.totalTimeInForeground;
      return acc;
    },
    { productivity: 0, social: 0, entertainment: 0, other: 0 }
  );

  return {
    totalScreenTime,
    totalAppsTracked: usageData.length,
    topApps: usageData.slice(0, 10), // Top 10 apps
    categoryBreakdown,
  };
}

/**
 * Collect all data for ML analysis
 */
export async function collectDataForAnalysis(
  gwa: number
): Promise<CollectedData> {
  try {
    // Get tracking duration
    const trackingDurationDays = getTrackingDurationDays();

    // Get usage statistics
    const usageData = await getUsageStatistics(trackingDurationDays);

    // Calculate metrics
    const usageMetrics = calculateMetrics(usageData);

    const collectedData: CollectedData = {
      gwa,
      trackingDurationDays,
      usageMetrics,
      collectionTimestamp: new Date().toISOString(),
      platform: Platform.OS,
    };

    console.log("Data collection summary:", {
      gwa: collectedData.gwa,
      duration: collectedData.trackingDurationDays,
      totalScreenTime: collectedData.usageMetrics.totalScreenTime,
      appsTracked: collectedData.usageMetrics.totalAppsTracked,
    });

    return collectedData;
  } catch (error) {
    console.error("Error collecting data:", error);
    throw error;
  }
}

/**
 * Format time in milliseconds to readable string
 */
export function formatMilliseconds(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
