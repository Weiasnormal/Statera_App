import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Text style={styles.header}>Settings</Text>

        {/* Tracking Duration Card */}
        <View style={styles.durationCard}>
          <Text style={styles.durationLabel}>Tracking Duration</Text>
          <View style={styles.durationValue}>
            <Text style={styles.currentlyText}>Currently:</Text>
            <Text style={styles.daysText}>7 Days</Text>
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.menuContainer}>
          {/* Tracking Duration Menu */}
          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/tracking_duration")}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="time-outline" size={22} color="#1a1a1a" />
              <Text style={styles.menuText}>Tracking Duration</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          {/* Meet the Team Menu */}
          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/meet-the-team")}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="people-outline" size={22} color="#1a1a1a" />
              <Text style={styles.menuText}>Meet the Team</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          {/* About STATERA Menu */}
          <Pressable
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() => router.push("/about_statera")}
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#1a1a1a"
              />
              <Text style={styles.menuText}>About STATERA</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>
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
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  durationCard: {
    backgroundColor: "#E8F4F5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  durationValue: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  currentlyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  daysText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16B8C5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
});
