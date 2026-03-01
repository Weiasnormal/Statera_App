/**
 * Data Collection Service
 * Collects all necessary data for ML analysis including:
 * - GWA (General Weighted Average)
 * - Usage Statistics (time per app)
 * - Tracking duration
 */

import { getUsageEvents, getUsageStats, hasUsageStatsPermission } from "expo-android-usagestats";
import { Platform } from "react-native";
import { getAnalysisWindowStatus } from "./tracking-duration";

// Android UsageEvents event types (raw Android system IDs)
const EVENT_SCREEN_INTERACTIVE = 15; // Screen turned on (pickups)
const EVENT_KEYGUARD_HIDDEN = 18;   // Lock screen bypassed (unlocks)

export interface AppUsageData {
  packageName: string;
  appName?: string;
  totalTimeInForeground: number; // in milliseconds
}

export interface DeviceUsageMetrics {
  totalScreenTime: number; // Total time across all apps (milliseconds)
  totalAppsTracked: number; // Number of apps used
  pickups: number; // Number of screen activations
  deviceUnlocks: number; // Number of lock screen bypasses
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
 * Get usage statistics for specified time range
 * Returns raw app data without categorization
 */
async function getUsageStatisticsForRange(
  startTime: number,
  endTime: number,
  durationDays: number,
): Promise<AppUsageData[]> {
  if (Platform.OS !== "android") {
    console.warn("Usage statistics only available on Android");
    return [];
  }

  try {
    const hasPermission = await hasUsageStatsPermission();
    if (!hasPermission) {
      throw new Error("Usage statistics permission not granted");
    }

    const stats = await getUsageStats(startTime, endTime);

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
        b.totalTimeInForeground - a.totalTimeInForeground,
      );

    if (__DEV__) {
      console.log(`Collected usage stats for custom ${durationDays}-day window`);
    }

    return usageData;
  } catch (error) {
    console.error("Error getting usage statistics:", error);
    throw error;
  }
}

/**
 * Get pickups and device unlocks from system events in a time range
 */
async function getDeviceInteractionsForRange(
  startTime: number,
  endTime: number,
  durationDays: number,
): Promise<{
  pickups: number;
  deviceUnlocks: number;
}> {
  if (Platform.OS !== "android") {
    console.warn("Device interactions only available on Android");
    return { pickups: 0, deviceUnlocks: 0 };
  }

  try {
    const hasPermission = await hasUsageStatsPermission();
    if (!hasPermission) {
      throw new Error("Usage statistics permission not granted");
    }

    const events = await getUsageEvents(startTime, endTime);

    let pickups = 0;
    let deviceUnlocks = 0;

    events.forEach((event: any) => {
      if (event.eventType === EVENT_SCREEN_INTERACTIVE) {
        pickups++;
      } else if (event.eventType === EVENT_KEYGUARD_HIDDEN) {
        deviceUnlocks++;
      }
    });

    if (__DEV__) {
      console.log(
        `Detected ${pickups} pickups and ${deviceUnlocks} unlocks over custom ${durationDays}-day window`,
      );
    }

    return { pickups, deviceUnlocks };
  } catch (error) {
    console.error("Error getting device interactions:", error);
    return { pickups: 0, deviceUnlocks: 0 };
  }
}

/**
 * Calculate device usage metrics from raw usage data
 */
function calculateMetrics(
  usageData: AppUsageData[],
  pickups: number,
  deviceUnlocks: number
): DeviceUsageMetrics {
  const totalScreenTime = usageData.reduce(
    (sum, app) => sum + app.totalTimeInForeground,
    0
  );

  return {
    totalScreenTime,
    totalAppsTracked: usageData.length,
    pickups,
    deviceUnlocks,
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
    const analysisWindow = getAnalysisWindowStatus();
    if (!analysisWindow.isReady) {
      throw new Error(
        `Analysis data period is not ready yet. ${analysisWindow.remainingDays} day(s) remaining.`,
      );
    }

    const trackingDurationDays = analysisWindow.trackingDurationDays;
    const windowStartTime = analysisWindow.startDate.getTime();
    const windowEndTime = Math.min(
      Date.now(),
      analysisWindow.readyDate.getTime() + 24 * 60 * 60 * 1000,
    );

    // Get usage statistics and device interactions in parallel
    const [usageData, deviceInteractions] = await Promise.all([
      getUsageStatisticsForRange(windowStartTime, windowEndTime, trackingDurationDays),
      getDeviceInteractionsForRange(windowStartTime, windowEndTime, trackingDurationDays),
    ]);

    // Calculate metrics
    const usageMetrics = calculateMetrics(
      usageData,
      deviceInteractions.pickups,
      deviceInteractions.deviceUnlocks
    );

    const collectedData: CollectedData = {
      gwa,
      trackingDurationDays,
      usageMetrics,
      collectionTimestamp: new Date().toISOString(),
      platform: Platform.OS,
    };

    if (__DEV__) {
      console.log("Data collection summary:", {
        gwa: collectedData.gwa,
        duration: collectedData.trackingDurationDays,
        totalScreenTime: collectedData.usageMetrics.totalScreenTime,
        appsTracked: collectedData.usageMetrics.totalAppsTracked,
        pickups: collectedData.usageMetrics.pickups,
        deviceUnlocks: collectedData.usageMetrics.deviceUnlocks,
      });
    }

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
