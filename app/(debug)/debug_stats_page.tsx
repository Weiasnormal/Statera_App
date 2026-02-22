import { ScreenHeader } from "@/components/ui/screen-header";
import { Ionicons } from "@expo/vector-icons";
import {
  getInstalledApps,
  getUsageStats,
  hasUsageStatsPermission,
  requestUsageStatsPermission,
} from "expo-android-usagestats";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UsageStatItem {
  packageName: string;
  totalTimeInForeground: number;
}

interface InstalledAppInfo {
  packageName: string;
  appName: string;
  icon: string;
  category?: string;
}

interface EnrichedUsageItem extends UsageStatItem {
  appName: string;
  icon?: string;
}

export default function DebugStatsPage() {
  const [usageStats, setUsageStats] = useState<UsageStatItem[]>([]);
  const [installedApps, setInstalledApps] = useState<InstalledAppInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [durationDays, setDurationDays] = useState(1);

  useEffect(() => {
    checkPermission();
  }, []);

  // Auto-refresh when duration changes
  useEffect(() => {
    if (hasPermission) {
      fetchData();
      loadInstalledApps();
    }
  }, [durationDays]);

  const checkPermission = async () => {
    try {
      const permission = await hasUsageStatsPermission();
      setHasPermission(permission);
      if (permission) {
        fetchData();
        loadInstalledApps();
      }
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  };

  const loadInstalledApps = async () => {
    try {
      const apps = await getInstalledApps();
      setInstalledApps(apps as InstalledAppInfo[]);
    } catch (error) {
      console.error("Error loading installed apps:", error);
    }
  };

  const handleRequestPermission = async () => {
    try {
      await requestUsageStatsPermission();
      // After requesting, user needs to manually enable in settings
      // They'll need to come back and press refresh
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const endTime = Date.now();
      const startTime = endTime - (durationDays * 24 * 60 * 60 * 1000);

      const stats = await getUsageStats(startTime, endTime);

      // Filter out system apps
      const filteredStats = stats.filter((stat: UsageStatItem) => {
        const pkg = stat.packageName.toLowerCase();
        return (
          !pkg.startsWith("com.android") &&
          !pkg.startsWith("com.google.android") &&
          stat.totalTimeInForeground > 0
        );
      });

      // Sort by usage time (descending)
      const sortedStats = filteredStats.sort(
        (a: UsageStatItem, b: UsageStatItem) =>
          b.totalTimeInForeground - a.totalTimeInForeground
      );

      setUsageStats(sortedStats);
    } catch (error) {
      console.error("Error fetching usage stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return `${hours}h ${remainingMins}m`;
  };

  const formatPackageAsName = (packageName: string): string => {
    const packageParts = packageName.split(".");
    const candidate = packageParts[packageParts.length - 1] ?? packageName;
    return candidate
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  };

  const getInitials = (appName: string): string => {
    const words = appName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return "?";
    }
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
  };

  const getColorFromPackage = (packageName: string): string => {
    const palette = ["#16B8C5", "#25AFA8", "#0F93B8", "#00838F", "#0A7EA4", "#006B8F"];
    const hashValue = packageName
      .split("")
      .reduce((total, character) => total + character.charCodeAt(0), 0);
    return palette[hashValue % palette.length];
  };

  const appInfoByPackage = useMemo(() => {
    return installedApps.reduce<Record<string, InstalledAppInfo>>((map, app) => {
      map[app.packageName] = app;
      return map;
    }, {});
  }, [installedApps]);

  const enrichedUsageStats = useMemo<EnrichedUsageItem[]>(() => {
    return usageStats.map((item) => {
      const appInfo = appInfoByPackage[item.packageName];
      return {
        ...item,
        appName: appInfo?.appName || formatPackageAsName(item.packageName),
        icon: appInfo?.icon,
      };
    });
  }, [usageStats, appInfoByPackage]);

  const maxUsage = useMemo(() => {
    return enrichedUsageStats.reduce((maximum, item) => {
      return item.totalTimeInForeground > maximum ? item.totalTimeInForeground : maximum;
    }, 0);
  }, [enrichedUsageStats]);

  const totalUsage = useMemo(() => {
    return enrichedUsageStats.reduce((sum, item) => sum + item.totalTimeInForeground, 0);
  }, [enrichedUsageStats]);

  const renderItem = ({ item, index }: { item: EnrichedUsageItem; index: number }) => (
    <View style={styles.listItemCard}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>

      <View style={styles.iconContainer}>
        {item.icon ? (
          <Image
            source={{ uri: `data:image/png;base64,${item.icon}` }}
            style={styles.appIcon}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.fallbackIcon,
              { backgroundColor: getColorFromPackage(item.packageName) },
            ]}
          >
            <Text style={styles.fallbackIconText}>{getInitials(item.appName)}</Text>
          </View>
        )}
      </View>

      <View style={styles.appInfoContainer}>
        <View style={styles.appNameRow}>
          <Text style={styles.appName} numberOfLines={1}>
            {item.appName}
          </Text>
          <Text style={styles.usageTime}>
            {formatTime(item.totalTimeInForeground)}
          </Text>
        </View>
        <Text style={styles.packageName} numberOfLines={1}>
          {item.packageName}
        </Text>
        <View style={styles.usageBarTrack}>
          <View
            style={[
              styles.usageBarFill,
              {
                width: `${maxUsage > 0 ? (item.totalTimeInForeground / maxUsage) * 100 : 0}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );

  const renderDurationSelector = () => (
    <View style={styles.durationContainer}>
      <Pressable
        style={[
          styles.durationButton,
          durationDays === 1 && styles.durationButtonActive,
        ]}
        onPress={() => setDurationDays(1)}
      >
        <Text
          style={[
            styles.durationButtonText,
            durationDays === 1 && styles.durationButtonTextActive,
          ]}
        >
          1 Day
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.durationButton,
          durationDays === 7 && styles.durationButtonActive,
        ]}
        onPress={() => setDurationDays(7)}
      >
        <Text
          style={[
            styles.durationButtonText,
            durationDays === 7 && styles.durationButtonTextActive,
          ]}
        >
          7 Days
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.durationButton,
          durationDays === 30 && styles.durationButtonActive,
        ]}
        onPress={() => setDurationDays(30)}
      >
        <Text
          style={[
            styles.durationButtonText,
            durationDays === 30 && styles.durationButtonTextActive,
          ]}
        >
          30 Days
        </Text>
      </Pressable>
    </View>
  );

  if (!hasPermission) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={["left", "right", "top"]}
      >
        <ScreenHeader
          title="Statistics"
          align="left"
          rightAction={
            <Pressable
              style={styles.refreshIconButton}
              onPress={checkPermission}
              accessibilityLabel="Refresh statistics"
              hitSlop={10}
            >
              <Ionicons name="refresh" size={18} color="#16B8C5" />
            </Pressable>
          }
        />
        <View style={styles.centeredContainer}>
          <Text style={styles.permissionTitle}>Permission Required</Text>
          <Text style={styles.permissionText}>
            This app needs access to usage statistics to display your app usage
            data.
          </Text>
          <Pressable
            style={styles.grantButton}
            onPress={handleRequestPermission}
          >
            <Text style={styles.grantButtonText}>Grant Permission</Text>
          </Pressable>
          <Text style={styles.instructionText}>
            After granting permission in Settings, return here and tap Refresh.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScreenHeader
        title="Statistics"
        align="left"
        rightAction={
          <Pressable
            style={styles.refreshIconButton}
            onPress={hasPermission ? fetchData : checkPermission}
            accessibilityLabel="Refresh statistics"
            hitSlop={10}
          >
            <Ionicons name="refresh" size={18} color="#16B8C5" />
          </Pressable>
        }
      />
      <View style={styles.container}>
        {renderDurationSelector()}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Usage</Text>
            <Text style={styles.summaryValue}>{formatTime(totalUsage)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Apps Tracked</Text>
            <Text style={styles.summaryValue}>{enrichedUsageStats.length}</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#16B8C5" />
            <Text style={styles.loadingText}>Loading usage data...</Text>
          </View>
        ) : (
          <FlatList
            data={enrichedUsageStats}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.packageName}-${index}`}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No usage data available for this range.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  refreshIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EAF9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#E5E7EB",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: "Poppins_400Regular",
  },
  summaryValue: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
  },
  listItemCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 12,
    marginBottom: 10,
  },
  rankBadge: {
    minWidth: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EAF9FA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  rankText: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: "#16B8C5",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 2,
  },
  appIcon: {
    width: 32,
    height: 32,
  },
  fallbackIcon: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackIconText: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  appInfoContainer: {
    flex: 1,
  },
  appNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  appName: {
    flex: 1,
    fontSize: 14,
    color: "#343235",
    fontFamily: "Poppins_600SemiBold",
  },
  packageName: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
    fontFamily: "Poppins_400Regular",
  },
  usageTime: {
    fontSize: 14,
    color: "#16B8C5",
    fontFamily: "Poppins_600SemiBold",
  },
  usageBarTrack: {
    marginTop: 8,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  usageBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#16B8C5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
    fontFamily: "Poppins_400Regular",
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
  grantButton: {
    backgroundColor: "#16B8C5",
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginBottom: 16,
  },
  grantButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  instructionText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "Poppins_400Regular",
  },
  durationContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  durationButtonActive: {
    backgroundColor: "#16B8C5",
    borderColor: "#16B8C5",
  },
  durationButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#64748B",
  },
  durationButtonTextActive: {
    color: "#FFFFFF",
  },
});
