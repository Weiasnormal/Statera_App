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
}

export interface DeviceUsageMetrics {
  totalScreenTime: number; // Total time across all apps (milliseconds)
  totalAppsTracked: number; // Number of apps used
  apps: AppUsageData[]; // All apps with usage data
}

export interface CollectedData {
  gwa: number; // General Weighted Average
  trackingDurationDays: number; // How many days of data
  usageMetrics: DeviceUsageMetrics;
  collectionTimestamp: string; // ISO timestamp
  platform: string; // "android" or "ios"
}

/**
 * Get usage statistics for specified duration
 * Returns raw app data without categorization
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

    // Filter and map usage data - send raw data to backend
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

  return {
    totalScreenTime,
    totalAppsTracked: usageData.length,
    apps: usageData, // Send all app data to backend
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
