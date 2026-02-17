import {
  getUsageStats,
  hasUsageStatsPermission,
  requestUsageStatsPermission,
} from "expo-android-usagestats";
import { Platform } from "react-native";

export type AppUsageItem = {
  packageName: string;
  totalTimeVisible: number;
};

export async function requestUsagePermission(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  try {
    // Check if we already have permission
    const hasPermission = await hasUsageStatsPermission();
    if (hasPermission) {
      return true;
    }

    // Request permission (opens settings)
    await requestUsageStatsPermission();
    
    // Return false because user needs to manually enable in settings
    // The app will check again when they return
    return false;
  } catch (error) {
    console.error("Error requesting usage permission:", error);
    return false;
  }
}

export async function checkUsagePermission(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  try {
    return await hasUsageStatsPermission();
  } catch (error) {
    console.error("Error checking usage permission:", error);
    return false;
  }
}

export async function getAppUsageData(): Promise<AppUsageItem[]> {
  if (Platform.OS !== "android") {
    return [];
  }

  try {
    const endTime = Date.now();
    const startTime = endTime - 86_400_000; // Last 24 hours
    
    const stats = await getUsageStats(startTime, endTime);
    
    return stats
      .map((item: any) => ({
        packageName: item.packageName || "unknown",
        totalTimeVisible: Number(item.totalTimeInForeground || 0),
      }))
      .filter((item: AppUsageItem) => {
        const pkg = item.packageName.toLowerCase();
        return (
          item.packageName !== "unknown" &&
          item.totalTimeVisible > 0 &&
          !pkg.startsWith("com.android") &&
          !pkg.startsWith("com.google.android")
        );
      })
      .sort((a: AppUsageItem, b: AppUsageItem) => b.totalTimeVisible - a.totalTimeVisible);
  } catch (error) {
    console.error("Error getting app usage data:", error);
    return [];
  }
}