import { ScreenHeader } from "@/components/ui/screen-header";
import { useAnalysis } from "@/context/AnalysisContext";
import { formatMilliseconds } from "@/services/data-collection";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Analysis() {
  const { collectedData, analysisResult, backendResponse } = useAnalysis();

  // Merge apps with similar names (normalize for consistent merging)
  const mergedApps = useMemo(() => {
    if (!collectedData?.usageMetrics.apps) return [];

    const mergedMap = new Map<
      string,
      { packageName: string; totalTimeInForeground: number }
    >();

    collectedData.usageMetrics.apps.forEach((app) => {
      const appName = app.packageName.split(".").pop() || app.packageName;
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

  // Use real ML category scores if available, otherwise show placeholder
  const distributionData = analysisResult?.topCategories.map((item, index) => ({
    label: item.category,
    percentage: item.percentage,
    color: index % 2 === 0 ? "#16B8C5" : "#27B1A8",
  })) || [
    { label: "Social", percentage: 35, color: "#16B8C5" },
    { label: "Productivity", percentage: 25, color: "#27B1A8" },
    { label: "Entertainment", percentage: 20, color: "#16B8C5" },
    { label: "Academic", percentage: 15, color: "#27B1A8" },
    { label: "Other", percentage: 5, color: "#16B8C5" },
  ];

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
            <>
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
            </>
          ) : (
            <Text style={styles.sectionDescription}>
              Your GWA suggests consistent academic engagement during this
              period.
            </Text>
          )}
        </View>

        {collectedData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Usage Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Screen Time</Text>
                <Text style={styles.summaryValue}>
                  {formatMilliseconds(
                    collectedData.usageMetrics.totalScreenTime,
                  )}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Apps Tracked</Text>
                <Text style={styles.summaryValue}>
                  {collectedData.usageMetrics.totalAppsTracked}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tracking Period</Text>
                <Text style={styles.summaryValue}>
                  {collectedData.trackingDurationDays} days
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Pickups</Text>
                <Text style={styles.summaryValue}>
                  {collectedData.usageMetrics.pickups}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Device Unlocks</Text>
                <Text style={styles.summaryValue}>
                  {collectedData.usageMetrics.deviceUnlocks}
                </Text>
              </View>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Top Apps by Usage</Text>
              {mergedApps.slice(0, 10).map((app, index) => {
                const total = collectedData.usageMetrics.totalScreenTime;
                const percentage =
                  total > 0
                    ? Math.round((app.totalTimeInForeground / total) * 100)
                    : 0;

                return (
                  <View
                    key={`${app.packageName}-${index}`}
                    style={styles.categoryItem}
                  >
                    <View style={styles.categoryHeader}>
                      <Text style={styles.categoryLabel}>
                        {index + 1}. {app.packageName}
                      </Text>
                      <Text style={styles.categoryValue}>
                        {formatMilliseconds(app.totalTimeInForeground)} (
                        {percentage}%)
                      </Text>
                    </View>
                    <View style={styles.categoryBar}>
                      <View
                        style={[
                          styles.categoryBarFill,
                          { width: `${percentage}%` },
                        ]}
                      />
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
              <Text style={styles.responseText}>
                <Text style={styles.boldText}>Dominant Profile: </Text>
                {analysisResult.dominantProfile}
              </Text>
              <Text style={styles.responseText}>
                <Text style={styles.boldText}>Confidence: </Text>
                {(analysisResult.dominantScore * 100).toFixed(1)}%
              </Text>
              <Text style={styles.responseText}>
                <Text style={styles.boldText}>Analyzed: </Text>
                {new Date(analysisResult.dateAnalyzed).toLocaleString()}
              </Text>
            </View>
            <Text style={styles.note}>
              Your behavioral profile is based on machine learning analysis of
              your app usage patterns, academic performance, and device
              interaction habits.
            </Text>
          </View>
        )}

        {!analysisResult && backendResponse && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ML Analysis Result (Raw)</Text>
            <View style={styles.responseCard}>
              <Text style={styles.responseText}>{backendResponse}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {analysisResult
              ? "App Category Usage Breakdown"
              : "Digital Behavior (Sample)"}
          </Text>

          <View style={styles.distributionContainer}>
            {distributionData.map((item, index) => (
              <View key={item.label} style={styles.distributionItem}>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.progressDot,
                        { left: `${item.percentage}%` },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.distributionLabel}>
                  <Text style={styles.labelText}>{item.label}</Text>
                  <Text style={styles.percentageText}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pattern Interpretation</Text>
          <Text style={styles.sectionDescription}>
            Your usage pattern shows frequent social interaction alongside
            moderate structuredtask engagement.
          </Text>
          <Text style={styles.sectionDescription}>
            This interpretation is descriptive and not a clinical or
            psychological diagnosis.
          </Text>
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
    paddingBottom: 8,
    fontFamily: "Poppins_400Regular",
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins_400Regular",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
  },
  dataLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#16B8C5",
    marginBottom: 8,
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
    marginBottom: 12,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#343235",
  },
  categoryValue: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  categoryBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  categoryBarFill: {
    height: "100%",
    backgroundColor: "#16B8C5",
    borderRadius: 4,
  },
  responseCard: {
    backgroundColor: "#F0F9FF",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#16B8C5",
    marginBottom: 12,
  },
  responseText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#343235",
    lineHeight: 24,
    marginBottom: 8,
  },
  boldText: {
    fontFamily: "Poppins_700Bold",
    color: "#16B8C5",
  },
  note: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#9CA3AF",
    fontStyle: "italic",
    lineHeight: 18,
  },
  distributionContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    justifyContent: "center",
    gap: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  distributionItem: {
    justifyContent: "center",
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    position: "relative",
    overflow: "visible",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressDot: {
    position: "absolute",
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#16B8C5",
    marginLeft: -8,
    borderWidth: 3,
    borderColor: "#fff",
  },
  distributionLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelText: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Poppins_400Regular",
  },
  percentageText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#16B8C5",
  },
});
