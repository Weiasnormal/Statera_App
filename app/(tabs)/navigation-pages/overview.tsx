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
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

type OverviewProps = {
  profileKey?: BehavioralProfileKey;
};

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
  const usageData = useMemo(() => {
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
        },
        {
          label: "Social Media Apps",
          percentage: 27,
          value: 27,
          color: "#F3C23C",
        },
        {
          label: "Entertainment Apps",
          percentage: 20,
          value: 20,
          color: "#0F93B8",
        },
      ];
    }

    // Use top 5 categories from analysis result
    const colors = ["#25AFA8", "#F3C23C", "#0F93B8", "#E08A5D", "#BD8FA8"];
    return analysisResult.topCategories.slice(0, 5).map((cat, idx) => ({
      label: cat.category,
      percentage: cat.percentage,
      value: cat.percentage,
      color: colors[idx % colors.length],
    }));
  }, [analysisResult?.topCategories]);

  const academicBalanceData = [
    { label: "Academic", value: 40, color: "#25AFA8" },
    { label: "Leisure", value: 50, color: "#F3C23C" },
    { label: "Utility", value: 20, color: "#0F93B8" },
  ];
  const totalUsage = usageData.reduce((sum, item) => sum + item.value, 0);
  const chartSize = 140;
  const chartRadius = chartSize / 2;

  // Get match percentage from API score
  const matchPercentage = analysisResult
    ? Math.round(analysisResult.score * 100)
    : 72;

  const polarToCartesian = (center: number, radius: number, angle: number) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(chartRadius, chartRadius, endAngle);
    const end = polarToCartesian(chartRadius, chartRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${chartRadius} ${chartRadius}`,
      `L ${start.x} ${start.y}`,
      `A ${chartRadius} ${chartRadius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");
  };

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
              <View style={styles.usageBody}>
                <View style={styles.usageList}>
                  {usageData.map((item) => (
                    <View key={item.label} style={styles.usageRow}>
                      <Text style={styles.usageLabel}>{item.label}</Text>
                      <Text style={styles.usageTime}>
                        {item.percentage.toFixed(1)}%
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.chartWrap}>
                  <Svg width={chartSize} height={chartSize}>
                    <G>
                      {(() => {
                        let currentAngle = 0;
                        return usageData.map((slice) => {
                          const sliceAngle = (slice.value / totalUsage) * 360;
                          const startAngle = currentAngle;
                          const endAngle = currentAngle + sliceAngle;
                          currentAngle = endAngle;

                          const midAngle = startAngle + sliceAngle / 2;
                          const labelPoint = polarToCartesian(
                            chartRadius,
                            chartRadius * 0.6,
                            midAngle,
                          );

                          return (
                            <G key={slice.label}>
                              <Path
                                d={createArcPath(startAngle, endAngle)}
                                fill={slice.color}
                              />
                              <SvgText
                                x={labelPoint.x}
                                y={labelPoint.y}
                                fontSize={12}
                                fontWeight="600"
                                fill="#ffffff"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                              >
                                {Math.round((slice.value / totalUsage) * 100)}%
                              </SvgText>
                            </G>
                          );
                        });
                      })()}
                    </G>
                  </Svg>
                </View>
              </View>
            </View>

            <View style={styles.balanceCard}>
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
            </View>

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
                onPress={() => router.push("./(tabs)/gwa_input")}
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
    marginBottom: 16,
  },
  usageBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  usageList: {
    flex: 1,
    gap: 12,
  },
  usageRow: {
    gap: 4,
  },
  usageLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
  },
  usageTime: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#0F8BA0",
  },
  chartWrap: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
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
