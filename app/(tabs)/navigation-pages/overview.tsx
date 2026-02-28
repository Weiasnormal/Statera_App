import BottomWave from "@/assets/images/waves/bottom-wave.svg";
import TopWave from "@/assets/images/waves/top-wave.svg";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { useAnalysis } from "@/context/AnalysisContext";
import {
  BEHAVIORAL_PROFILE_MAP,
  parseBehavioralProfileFromApi,
  type BehavioralProfileKey,
} from "@/services/behavioral-profile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G } from "react-native-svg";

type OverviewProps = {
  profileKey?: BehavioralProfileKey;
};

type UsageSlice = {
  label: string;
  percentage: number;
  value: number;
  color: string;
  markerBackground: string;
  badgeBackground: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  isOther?: boolean;
};

function getCategoryIconName(
  categoryLabel: string,
): React.ComponentProps<typeof Ionicons>["name"] {
  const normalized = categoryLabel.toLowerCase();

  if (normalized.includes("social") || normalized.includes("chat")) {
    return "chatbubbles-outline";
  }
  if (normalized.includes("product") || normalized.includes("work")) {
    return "briefcase-outline";
  }
  if (
    normalized.includes("entertain") ||
    normalized.includes("game") ||
    normalized.includes("video")
  ) {
    return "game-controller-outline";
  }
  if (normalized.includes("education") || normalized.includes("learn")) {
    return "school-outline";
  }
  if (normalized.includes("music") || normalized.includes("audio")) {
    return "musical-notes-outline";
  }
  if (normalized.includes("news") || normalized.includes("read")) {
    return "newspaper-outline";
  }
  if (normalized.includes("health") || normalized.includes("fitness")) {
    return "fitness-outline";
  }
  if (normalized.includes("utility") || normalized.includes("tools")) {
    return "construct-outline";
  }

  return "apps-outline";
}

export default function Overview({ profileKey }: OverviewProps) {
  const { analysisResult } = useAnalysis();

  // Determine which profile to display
  const profileKeyToUse = useMemo(() => {
    if (analysisResult?.label) {
      const parsedKey = parseBehavioralProfileFromApi(analysisResult.label);
      return parsedKey || ("minimal_digital_engager" as BehavioralProfileKey);
    }
    return profileKey || ("minimal_digital_engager" as BehavioralProfileKey);
  }, [analysisResult?.label, profileKey]);

  const profile = BEHAVIORAL_PROFILE_MAP[profileKeyToUse];

  // Convert top categories to usage data for display
  const usageData = useMemo<UsageSlice[]>(() => {
    if (
      !analysisResult?.topCategories ||
      analysisResult.topCategories.length === 0
    ) {
      return [
        {
          label: "Productivity Apps",
          percentage: 53,
          value: 53,
          color: "#25AFA8",
          markerBackground: "#DDF5F3",
          badgeBackground: "#EAF9F7",
          iconName: "briefcase-outline",
        },
        {
          label: "Social Media Apps",
          percentage: 27,
          value: 27,
          color: "#F3C23C",
          markerBackground: "#FDF4D8",
          badgeBackground: "#FFF8E8",
          iconName: "chatbubbles-outline",
        },
        {
          label: "Entertainment Apps",
          percentage: 20,
          value: 20,
          color: "#0F93B8",
          markerBackground: "#DFF1F7",
          badgeBackground: "#EBF8FC",
          iconName: "game-controller-outline",
        },
      ];
    }

    // Use top 5 categories from analysis result
    const categoryStyleScale = [
      { color: "#0F93B8", markerBackground: "#DFF1F7", badgeBackground: "#EBF8FC" },
      { color: "#25AFA8", markerBackground: "#DDF5F3", badgeBackground: "#EAF9F7" },
      { color: "#E2596F", markerBackground: "#F9E1E6", badgeBackground: "#FDECEF" },
      { color: "#6B8AFD", markerBackground: "#E7ECFF", badgeBackground: "#EEF1FF" },
      { color: "#F3C23C", markerBackground: "#FDF4D8", badgeBackground: "#FFF8E8" },
    ];

    return analysisResult.topCategories.slice(0, 5).map((cat, idx) => ({
      label: cat.category.replace(/_/g, " "),
      percentage: cat.percentage,
      value: cat.percentage,
      color: categoryStyleScale[idx % categoryStyleScale.length].color,
      markerBackground:
        categoryStyleScale[idx % categoryStyleScale.length].markerBackground,
      badgeBackground:
        categoryStyleScale[idx % categoryStyleScale.length].badgeBackground,
      iconName: getCategoryIconName(cat.category.replace(/_/g, " ")),
    }));
  }, [analysisResult?.topCategories]);

  // const academicBalanceData = [
  //   { label: "Academic", value: 40, color: "#25AFA8" },
  //   { label: "Leisure", value: 50, color: "#F3C23C" },
  //   { label: "Utility", value: 20, color: "#0F93B8" },
  // ];
  const chartData = useMemo<UsageSlice[]>(() => {
    const topCategoryTotal = usageData.reduce((sum, item) => sum + item.value, 0);
    const remainder = Math.max(0, 100 - topCategoryTotal);

    if (remainder >= 0.1) {
      return [
        ...usageData,
        {
          label: "Other Apps",
          percentage: remainder,
          value: remainder,
          color: "#D6E7EE",
          markerBackground: "#EEF4F7",
          badgeBackground: "#F5F8FA",
          iconName: "apps-outline",
          isOther: true,
        },
      ];
    }

    return usageData;
  }, [usageData]);

  const totalUsage = chartData.reduce((sum, item) => sum + item.value, 0);
  const chartSize = 184;
  const chartRadius = chartSize / 2;
  const donutStrokeWidth = 32;
  const donutRadius = chartRadius - donutStrokeWidth / 2 - 2;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const segmentGapAngle = 2.4;
  const minimumVisualPercent = 4;

  const chartVisualData = useMemo(() => {
    const visualWeights = chartData.map((slice) =>
      Math.max(slice.value, minimumVisualPercent),
    );
    const visualTotal = visualWeights.reduce((sum, weight) => sum + weight, 0);

    return chartData.map((slice, index) => ({
      ...slice,
      visualShare: visualWeights[index] / visualTotal,
    }));
  }, [chartData]);

  // Get match percentage from API score
  const matchPercentage = analysisResult
    ? Math.round(analysisResult.score * 100)
    : 72;

  const waveBaseColor = "#FFFFFF";
  const waveTopColor = profile.waveTopColor;
  const waveBottomColor = profile.waveBottomColor;
  const actionColor = "#00838F";

  return (
    <View style={[styles.container, { backgroundColor: waveBaseColor }]}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <View
          style={[styles.statusBarHeader, { backgroundColor: waveTopColor }]}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.waveFullBleed}>
            <View pointerEvents="none" style={styles.waveContainer}>
              <BottomWave
                width="100%"
                height={500}
                preserveAspectRatio="xMidYMin meet"
                color={waveBottomColor}
                style={[styles.waveSvg, styles.waveBottom]}
              />
              <TopWave
                width="100%"
                height={500}
                preserveAspectRatio="xMidYMin meet"
                color={waveTopColor}
                style={[styles.waveSvg, styles.waveTop]}
              />
            </View>
          </View>
          <View style={styles.contentWrap}>
            {/* Header */}
            <Text style={styles.headerText}>
              Your behavioral state profile:
            </Text>

            {/* Main Title */}
            <Text style={styles.mainTitle}>{profile.titleLines[0]}</Text>
            <Text style={styles.mainTitle}>{profile.titleLines[1]}</Text>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <Image
                source={profile.characterImage}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            {/* Pattern Match */}
            <View style={styles.matchContainer}>
              <Text style={styles.matchPercentage}>
                {matchPercentage}% Pattern Match
              </Text>
              <Text style={styles.matchDescription}>
                This status reflects your current academic and digital
                engagement patterns based on multiple usage indicators.
              </Text>
            </View>

            <View style={styles.usageCard}>
              <Text style={styles.usageTitle}>Usage Summary</Text>
              <Text style={styles.usageDescription}>
                Percentages are based on total screen time.
              </Text>
              <View style={styles.usageBody}>
                <View style={styles.chartWrap}>
                  <Svg width={chartSize} height={chartSize}>
                    <G>
                      <Circle
                        cx={chartRadius}
                        cy={chartRadius}
                        r={donutRadius}
                        stroke="#EEF4F8"
                        strokeWidth={donutStrokeWidth}
                        fill="none"
                      />
                      {(() => {
                        const gapLength =
                          (segmentGapAngle / 360) * donutCircumference;
                        let accumulatedLength = 0;

                        return chartVisualData.map((slice) => {
                          const sliceLength =
                            slice.visualShare * donutCircumference;
                          const visibleLength = Math.max(
                            sliceLength - gapLength,
                            0,
                          );
                          const offset = -(accumulatedLength + gapLength / 2);
                          accumulatedLength += sliceLength;

                          if (visibleLength <= 0) {
                            return null;
                          }

                          return (
                            <G key={slice.label}>
                              <Circle
                                cx={chartRadius}
                                cy={chartRadius}
                                r={donutRadius}
                                stroke={slice.color}
                                strokeWidth={donutStrokeWidth}
                                fill="none"
                                strokeLinecap="butt"
                                strokeDasharray={`${visibleLength} ${donutCircumference}`}
                                strokeDashoffset={offset}
                                transform={`rotate(-90 ${chartRadius} ${chartRadius})`}
                              />
                            </G>
                          );
                        });
                      })()}
                    </G>
                  </Svg>
                </View>
                <View style={styles.usageList}>
                  {chartData.map((item) => (
                    <View key={item.label} style={styles.usageSummaryRow}>
                      <View
                        style={[
                          styles.summaryMarkerBox,
                          { backgroundColor: item.markerBackground },
                        ]}
                      >
                        <Ionicons
                          name={item.iconName}
                          size={18}
                          color={item.color}
                        />
                      </View>

                      <View style={styles.summaryTextWrap}>
                        <Text style={styles.usageLabel} numberOfLines={1}>
                          {item.label}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.summaryBadge,
                          { backgroundColor: item.badgeBackground },
                        ]}
                      >
                        <Text style={[styles.usageTime, { color: item.color }]}>
                          {item.percentage.toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Academic Balance</Text>
              <View style={styles.balanceList}>
                {academicBalanceData.map((item) => (
                  <View key={item.label} style={styles.balanceRow}>
                    <Text style={styles.balanceLabel}>{item.label}</Text>
                    <View style={styles.balanceScaleWrap}>
                      <View style={styles.balanceScaleTrack}>
                        <View
                          style={[
                            styles.balanceScaleFill,
                            {
                              width: `${item.value}%`,
                              backgroundColor: item.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.balanceValue}>{item.value}%</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View> */}

            <View style={styles.actionGroup}>
              <SecondaryButton
                title="View Statistics"
                onPress={() =>
                  router.push({
                    pathname: "/nav",
                    params: { tab: "statistics" },
                  })
                }
                style={styles.secondaryAction}
                textStyle={styles.secondaryActionText}
                icon={
                  <Ionicons
                    name="stats-chart-outline"
                    size={16}
                    color={actionColor}
                  />
                }
                iconPosition="right"
              />
              <SecondaryButton
                title="Run New Analysis"
                onPress={() => router.push("/(tabs)/gwa_input")}
                style={{ ...styles.secondaryAction, marginTop: 12 }}
                textStyle={styles.secondaryActionText}
                icon={
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={actionColor}
                  />
                }
                iconPosition="right"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusBarHeader: {
    height: 30,
    width: "100%",
  },
  safeArea: {
    flex: 1,
  },
  waveContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 600,
    overflow: "hidden",
  },
  waveFullBleed: {
    position: "relative",
    width: "100%",
    alignSelf: "stretch",
  },
  waveSvg: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  waveTop: {
    top: 0,
  },
  waveBottom: {
    top: 100,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 40,
  },
  contentWrap: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#74767E",
    paddingTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    textAlign: "center",
    lineHeight: 42,
  },
  illustrationContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  illustration: {
    width: 650,
    height: 320,
  },
  matchContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  matchPercentage: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
    marginBottom: 8,
  },
  matchDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#74767E",
    textAlign: "center",
    lineHeight: 20,
  },
  usageCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E1E6EA",
    padding: 18,
    marginTop: 28,
  },
  usageTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 4,
  },
  usageDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
    marginBottom: 14,
  },
  usageBody: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 18,
  },
  chartWrap: {
    width: "100%",
    height: 196,
    alignItems: "center",
    justifyContent: "center",
  },
  usageList: {
    gap: 14,
  },
  usageSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summaryMarkerBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  usageLabel: {
    fontSize: 14,
    color: "#343235",
    fontFamily: "Poppins_500Medium",
  },
  summaryBadge: {
    minWidth: 54,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  usageTime: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#0F93B8",
  },
  balanceCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E1E6EA",
    padding: 18,
    marginTop: 14,
  },
  balanceTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 14,
  },
  balanceList: {
    gap: 12,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceLabel: {
    width: 70,
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
  },
  balanceScaleWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  balanceScaleTrack: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F4F7FA",
    borderWidth: 1,
    borderColor: "#E1E6EA",
    overflow: "hidden",
  },
  balanceScaleFill: {
    height: "100%",
    borderRadius: 6,
  },
  balanceValue: {
    width: 40,
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
  },
  actionGroup: {
    width: "100%",
    marginTop: 24,
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: "#00838F",
    borderRadius: 999,
    paddingVertical: 12,
  },
  secondaryActionText: {
    color: "#00838F",
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
  },
});
