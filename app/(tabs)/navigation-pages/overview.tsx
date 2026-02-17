import BottomWave from "@/assets/images/waves/bottom-wave.svg";
import TopWave from "@/assets/images/waves/top-wave.svg";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

export default function Overview() {
  const waveBaseColor = "#FFFFFF";
  const waveTopColor = "#C5E6E8";
  const waveBottomColor = "#EAF9FA";
  const actionColor = "#00838F";
  const usageData = [
    {
      label: "Productivity Apps",
      time: "3h 40m",
      value: 53,
      color: "#25AFA8",
    },
    {
      label: "Social Media Apps",
      time: "2h 15m",
      value: 27,
      color: "#F3C23C",
    },
    {
      label: "Entertainment Apps",
      time: "45m",
      value: 20,
      color: "#0F93B8",
    },
  ];
  const totalUsage = usageData.reduce((sum, item) => sum + item.value, 0);
  const chartSize = 140;
  const chartRadius = chartSize / 2;

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

  return (
    <View style={[styles.container, { backgroundColor: waveBaseColor }]}>
      <StatusBar style="dark" backgroundColor={waveTopColor} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Text style={styles.headerText}>Your behavioral state profile:</Text>

        {/* Main Title */}
        <Text style={styles.mainTitle}>Minimal Digital</Text>
        <Text style={styles.mainTitle}>Engager</Text>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/minimal-digital-engager.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Pattern Match */}
        <View style={styles.matchContainer}>
          <Text style={styles.matchPercentage}>72% Pattern Match</Text>
          <Text style={styles.matchDescription}>
            This status reflects your current balance between academic
            performance and digital usage duration.
          </Text>
        </View>

        <View style={styles.usageCard}>
          <Text style={styles.usageTitle}>Usage Summary</Text>
          <View style={styles.usageBody}>
            <View style={styles.usageList}>
              {usageData.map((item) => (
                <View key={item.label} style={styles.usageRow}>
                  <Text style={styles.usageLabel}>{item.label}</Text>
                  <Text style={styles.usageTime}>{item.time}</Text>
                </View>
              ))}
              <View style={styles.usageRow}>
                <Text style={styles.usageLabel}>Total Screen Time</Text>
                <Text style={styles.usageTime}>6h 10m</Text>
              </View>
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
                        midAngle
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

        <View style={styles.actionGroup}>
          <SecondaryButton
            title="Share results"
            style={styles.secondaryAction}
            textStyle={styles.secondaryActionText}
            icon={
              <Ionicons
                name="share-outline"
                size={16}
                color={actionColor}
              />
            }
            iconPosition="right"
          />
          <SecondaryButton
            title="Run New Analysis"
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  contentWrap: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    paddingTop: 40,
    marginBottom: 16,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    lineHeight: 38,
  },
  illustrationContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  illustration: {
    width: 200,
    height: 280,
  },
  matchContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  matchPercentage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  matchDescription: {
    fontSize: 14,
    color: "#555",
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
    fontWeight: "700",
    color: "#1F2937",
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
  },
  usageTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F8BA0",
  },
  chartWrap: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "700",
    fontSize: 14,
  },
});
