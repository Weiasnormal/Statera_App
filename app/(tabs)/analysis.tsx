import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Analysis() {
  const distributionData = [
    { label: "Academic Breakdown", percentage: 53, color: "#16B8C5" },
    { label: "Productivity apps", percentage: 20, color: "#16B8C5" },
    { label: "Social media apps", percentage: 33, color: "#16B8C5" },
    { label: "Entertainment/leisure apps", percentage: 67, color: "#16B8C5" },
    { label: "Overall app usage", percentage: 24, color: "#16B8C5" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Text style={styles.header}>Behavior Analysis</Text>

        {/* Academic Indicator Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Indicator</Text>
          <Text style={styles.sectionDescription}>
            Your GWA suggests consistent academic engagement during this period.
          </Text>
        </View>

        {/* Digital Distribution Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Digital Distribution</Text>

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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  distributionContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 24,
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
    fontSize: 14,
    color: "#666",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16B8C5",
  },
});
