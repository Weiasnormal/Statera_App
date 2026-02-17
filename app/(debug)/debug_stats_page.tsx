import {
    getUsageStats,
    hasUsageStatsPermission,
    requestUsageStatsPermission,
} from "expo-android-usagestats";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface UsageStatItem {
  packageName: string;
  totalTimeInForeground: number;
}

export default function DebugStatsPage() {
  const [usageStats, setUsageStats] = useState<UsageStatItem[]>([]);
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
    }
  }, [durationDays]);

  const checkPermission = async () => {
    try {
      const permission = await hasUsageStatsPermission();
      setHasPermission(permission);
      if (permission) {
        fetchData();
      }
    } catch (error) {
      console.error("Error checking permission:", error);
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

  const renderItem = ({ item }: { item: UsageStatItem }) => (
    <View style={styles.listItem}>
      <Text style={styles.packageName}>{item.packageName}</Text>
      <Text style={styles.usageTime}>
        {formatTime(item.totalTimeInForeground)}
      </Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Usage Statistics</Text>
      <Pressable
        style={styles.refreshButton}
        onPress={hasPermission ? fetchData : checkPermission}
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </Pressable>
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
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {renderHeader()}
        {renderDurationSelector()}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a7ea4" />
            <Text style={styles.loadingText}>Loading usage data...</Text>
          </View>
        ) : (
          <FlatList
            data={usageStats}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.packageName}-${index}`}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No usage data available for the last 24 hours.
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  refreshButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  refreshButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  packageName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    marginRight: 12,
  },
  usageTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
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
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  grantButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginBottom: 16,
  },
  grantButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  instructionText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
  durationContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  durationButtonTextActive: {
    color: "#FFFFFF",
  },
});
