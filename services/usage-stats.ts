import { Linking, Platform } from "react-native";
import {
  checkForPermission,
  EventFrequency,
  queryUsageStats,
  showUsageAccessSettings,
} from "@brighthustle/react-native-usage-stats-manager";

export type AppUsageItem = {
  packageName: string;
  totalTimeVisible: number;
};

export async function requestUsagePermission(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  const hasPermission = await checkForPermission();
  if (hasPermission) {
    return true;
  }

  try {
    if (typeof Linking.sendIntent === "function") {
      await Linking.sendIntent("android.settings.USAGE_ACCESS_SETTINGS");
    } else {
      showUsageAccessSettings("");
    }
  } catch {
    showUsageAccessSettings("");
  }

  return false;
}

export async function getAppUsageData(): Promise<AppUsageItem[]> {
  if (Platform.OS !== "android") {
    return [];
  }

  const endTime = Date.now();
  const startTime = endTime - 86_400_000;
  const result = await queryUsageStats(EventFrequency.INTERVAL_DAILY, startTime, endTime);
  const items = Array.isArray(result) ? result : [];

  return items
    .map((item: any) => ({
      packageName: item.packageName ?? item.package ?? "unknown",
      totalTimeVisible: Number(item.totalTimeVisible ?? item.totalTimeInForeground ?? 0),
    }))
    .filter((item: AppUsageItem) => item.packageName !== "unknown")
    .sort((a: AppUsageItem, b: AppUsageItem) => b.totalTimeVisible - a.totalTimeVisible);
}