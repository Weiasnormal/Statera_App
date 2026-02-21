import { ScreenHeader } from "@/components/ui/screen-header";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutStatera() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="About STATERA" showBack onBackPress={handleBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* What is STATERA? */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is STATERA?</Text>
          <Text style={styles.bodyText}>
            STATERA is a digital usage and academic pattern tracker.
          </Text>
          <Text style={styles.bodyText}>
            It analyzes screen time distribution and academic indicators over a
            selected period to generate a descriptive behavioral status.
          </Text>
          <Text style={styles.bodyText}>
            STATERA does not diagnose personality traits or provide
            psychological advice. It is designed to support digital awareness
            and self-reflection.
          </Text>
          <Text style={styles.bodyText}>
            Your data remains private and under your control.
          </Text>
          <View style={styles.sectionDivider} />
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <Text style={styles.bodyText}>STATERA analyzes:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              {"\u2022"} Your selected tracking duration (default: 7 days)
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} App usage time distribution
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} Your academic performance input (e.g., GWA)
            </Text>
          </View>
          <Text style={styles.bodyText}>
            It then generates a behavioral status that reflects observable
            patterns between digital engagement and academic activity.
          </Text>
          <Text style={styles.bodyText}>
            The results are descriptive, not clinical.
          </Text>
          <View style={styles.sectionDivider} />
        </View>

        {/* Our Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Purpose</Text>
          <Text style={styles.bodyText}>STATERA was built to:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              {"\u2022"} Promote digital awareness
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} Encourage balanced screen habits
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} Provide transparency in usage patterns
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} Support self-reflection
            </Text>
          </View>
          <Text style={styles.bodyText}>
            It is a tool for awareness, not judgment.
          </Text>
          <View style={styles.sectionDivider} />
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              {"\u2022"} Your data remains on your device unless explicitly
              shared by you.
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} STATERA only accesses usage statistics required for
              analysis.
            </Text>
            <Text style={styles.bulletItem}>
              {"\u2022"} We do not sell or distribute personal data.
            </Text>
          </View>
          <View style={styles.sectionDivider} />
        </View>

        {/* Disclaimer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.bodyText}>
            STATERA does not provide medical, psychological, or academic
            advising services.
          </Text>
          <Text style={styles.bodyText}>
            The behavioral status and analysis are generated from measurable
            usage patterns and should be interpreted as informational only.
          </Text>
          <View style={styles.sectionDivider} />
        </View>

        {/* Version Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version Information</Text>
          <Text style={styles.bodyText}>STATERA App Version: 1.0.0</Text>
          <Text style={styles.bodyText}>Release Date: February 2025</Text>
          <Text style={styles.bodyText}>Developed by: The Team SEBEN</Text>
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
    paddingVertical: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: "Poppins_400Regular",
  },
  bulletList: {
    marginVertical: 4,
    marginLeft: 8,
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: "Poppins_400Regular",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 12,
  },
});
