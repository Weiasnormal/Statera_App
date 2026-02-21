import { ScreenHeader } from "@/components/ui/screen-header";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Analysis() {
  const distributionData = [
    { label: "Checking Frequency", percentage: 53, color: "#16B8C5" },
    { label: "Focus Stability", percentage: 20, color: "#27B1A8" },
    { label: "Session Immersion", percentage: 33, color: "#16B8C5" },
    { label: "Impulse Unlocking", percentage: 67, color: "#27B1A8" },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Behavior Analysis" align="left" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Academic Indicator Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Indicator</Text>
          <Text style={styles.sectionDescription}>
            Your GWA suggests consistent academic engagement during this period.
          </Text>
        </View>

        {/* Digital Behavior Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Digital Behavior</Text>

          <View style={styles.distributionContainer}>
            {distributionData.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
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

        {/* Pattern Interpretation Section */}
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
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    paddingBottom: 8,
    fontFamily: "Poppins_400Regular",
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
