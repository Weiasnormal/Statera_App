import { ScreenHeader } from "@/components/ui/screen-header";
import { useAnalysis } from "@/context/AnalysisContext";
import { formatMilliseconds } from "@/services/data-collection";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Analysis() {
  const { collectedData, analysisResult, backendResponse } = useAnalysis();

  const getKnownAppName = (packageName: string): string | null => {
    const knownNames: Record<string, string> = {
      "com.facebook.orca": "Messenger",
      "com.facebook.katana": "Facebook",
      "com.instagram.android": "Instagram",
      "com.zhiliaoapp.musically": "TikTok",
      "com.whatsapp": "WhatsApp",
      "com.facebook.lite": "Facebook Lite",
      "com.google.android.youtube": "YouTube",
      "com.google.android.gm": "Gmail",
      "com.spotify.music": "Spotify",
      "com.twitter.android": "X",
      "com.netflix.mediaclient": "Netflix",
      "com.google.android.apps.maps": "Google Maps",
      "com.android.chrome": "Chrome",
    };

    return knownNames[packageName.toLowerCase()] ?? null;
  };

  const formatAppName = (packageName: string): string => {
    const knownAppName = getKnownAppName(packageName);
    if (knownAppName) {
      return knownAppName;
    }

    const tail = packageName.split(".").pop() || packageName;
    const cleaned = tail
      .replace(/[._-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleaned) return packageName;

    return cleaned
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Merge apps with similar names (normalize for consistent merging)
  const mergedApps = useMemo(() => {
    if (!collectedData?.usageMetrics.apps) return [];

    const mergedMap = new Map<
      string,
      { packageName: string; totalTimeInForeground: number }
    >();

    collectedData.usageMetrics.apps.forEach((app) => {
      const appName = formatAppName(app.packageName);
      // Normalize: lowercase, trim whitespace, remove extra spaces
      const normalizedKey = appName.toLowerCase().trim().replace(/\s+/g, " ");

      const existing = mergedMap.get(normalizedKey);
      if (existing) {
        // Merge: sum the usage time
        existing.totalTimeInForeground += app.totalTimeInForeground;
      } else {
        mergedMap.set(normalizedKey, {
          packageName: appName,
          totalTimeInForeground: app.totalTimeInForeground,
        });
      }
    });

    // Convert back to array and sort by usage time
    return Array.from(mergedMap.values()).sort(
      (a, b) => b.totalTimeInForeground - a.totalTimeInForeground,
    );
  }, [collectedData?.usageMetrics.apps]);

  const usageCards = collectedData
    ? [
        {
          title: "Total Screen Time",
          value: formatMilliseconds(collectedData.usageMetrics.totalScreenTime),
          icon: "time-outline" as const,
          iconBackground: "#EAF6FF",
          iconColor: "#2B8ED9",
        },
        {
          title: "Apps Tracked",
          value: String(collectedData.usageMetrics.totalAppsTracked),
          icon: "apps-outline" as const,
          iconBackground: "#EEF8EA",
          iconColor: "#4C8F2F",
        },
        {
          title: "Pickups",
          value: String(collectedData.usageMetrics.pickups),
          icon: "phone-portrait-outline" as const,
          iconBackground: "#FFF3E8",
          iconColor: "#D97D2B",
        },
        {
          title: "Device Unlocks",
          value: String(collectedData.usageMetrics.deviceUnlocks),
          icon: "lock-open-outline" as const,
          iconBackground: "#F1EEF9",
          iconColor: "#7D58C2",
        },
      ]
    : [];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Behavior Analysis" align="left" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Indicator</Text>
          {collectedData ? (
            <View style={styles.infoCard}>
              <Text style={styles.dataLabel}>
                Your GWA: {collectedData.gwa.toFixed(2)}
              </Text>
              <Text style={styles.sectionDescription}>
                {collectedData.gwa < 2.0
                  ? "Your GWA suggests excellent academic engagement during this period."
                  : collectedData.gwa < 3.0
                    ? "Your GWA suggests consistent academic engagement during this period."
                    : "Your GWA suggests room for improvement in academic engagement."}
              </Text>
            </View>
          ) : (
            <Text style={styles.sectionDescription}>
              Your GWA suggests consistent academic engagement during this
              period.
            </Text>
          )}
        </View>

        {collectedData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Device Activity</Text>
            <View style={styles.metricCardsGrid}>
              {usageCards.map((item) => (
                <View key={item.title} style={styles.metricCard}>
                  <View style={[styles.metricIconWrap, { backgroundColor: item.iconBackground }]}>
                    <Ionicons name={item.icon} size={18} color={item.iconColor} />
                  </View>
                  <Text style={styles.metricTitle}>{item.title}</Text>
                  <Text style={styles.metricValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Top Apps by Usage</Text>
              {mergedApps.slice(0, 5).map((app, index) => {
                const total = collectedData.usageMetrics.totalScreenTime;
                const percentage = total > 0
                  ? Math.round((app.totalTimeInForeground / total) * 200)
                  : 0;

                return (
                  <View
                    key={`${app.packageName}-${index}`}
                    style={styles.appRowCard}
                  >
                    <View style={styles.categoryHeader}>
                      <Text style={styles.categoryRank}>{index + 1}.</Text>
                      <Text style={[styles.categoryLabel, styles.categoryLabelName]} numberOfLines={1}>
                        {app.packageName || "Unknown App"}
                      </Text>
                      <Text style={styles.categoryValue}>
                        {formatMilliseconds(app.totalTimeInForeground)}
                      </Text>
                    </View>
                    <View style={styles.appShareRow}>
                      <Text style={styles.appMetaText}>{percentage}%</Text>
                      <View style={styles.appShareTrack}>
                        <View style={[styles.appShareFill, { width: `${Math.max(percentage, 2)}%` }]} />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {analysisResult && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ML Analysis Result</Text>
            <View style={styles.responseCard}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Dominant Profile</Text>
                <Text style={styles.resultValue}>{analysisResult.dominantProfile}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Confidence</Text>
                <Text style={styles.resultValue}>
                  {(analysisResult.dominantScore * 100).toFixed(1)}%
                </Text>
              </View>
              <View style={styles.resultRowNoBorder}>
                <Text style={styles.resultLabel}>Analyzed</Text>
                <Text style={styles.resultValueMuted}>
                  {new Date(analysisResult.dateAnalyzed).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}

        {!analysisResult && backendResponse && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ML Analysis Result (Raw)</Text>
            <View style={styles.responseCard}>
              <Text style={styles.rawResponseText}>{backendResponse}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pattern Interpretation</Text>
          <View style={styles.infoCardMuted}>
            <Text style={styles.sectionDescriptionCompact}>
              Your usage pattern shows frequent social interaction alongside
              moderate structured task engagement.
            </Text>
            <Text style={styles.sectionDescriptionCompactMuted}>
              This interpretation is descriptive and not a clinical or
              psychological diagnosis.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricCardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 132,
  },
  metricIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 15,
    color: "#2F2F2F",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 6,
    lineHeight: 20,
  },
  metricValue: {
    fontSize: 14,
    color: "#7C7C7C",
    fontFamily: "Poppins_400Regular",
  },
  dataLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#16B8C5",
    marginBottom: 10,
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 12,
  },
  appRowCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryRank: {
    fontSize: 13,
    color: "#16B8C5",
    fontFamily: "Poppins_700Bold",
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#343235",
  },
  categoryLabelName: {
    flex: 1,
  },
  categoryValue: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#4B5563",
  },
  appMetaText: {
    fontSize: 12,
    color: "#8A8A8A",
    fontFamily: "Poppins_400Regular",
  },
  appShareRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  appShareTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },
  appShareFill: {
    height: "100%",
    backgroundColor: "#16B8C5",
    borderRadius: 999,
  },
  responseCard: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  resultRowNoBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  resultLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins_500Medium",
  },
  resultValue: {
    fontSize: 14,
    color: "#1F2937",
    fontFamily: "Poppins_600SemiBold",
    maxWidth: "58%",
    textAlign: "right",
  },
  resultValueMuted: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
    maxWidth: "58%",
    textAlign: "right",
  },
  rawResponseText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#374151",
    fontFamily: "Poppins_400Regular",
  },
  infoCardMuted: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionDescriptionCompact: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#4B5563",
    lineHeight: 18,
    marginBottom: 6,
  },
  sectionDescriptionCompactMuted: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
    lineHeight: 18,
  },
});
