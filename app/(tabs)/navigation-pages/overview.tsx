import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Overview() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5E6E8",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 16,
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
});
