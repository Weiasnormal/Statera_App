import { ScreenHeader } from "@/components/ui/screen-header";
import { getTrackingDurationDays } from "@/services/tracking-duration";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const [days, setDays] = useState(getTrackingDurationDays());

  useFocusEffect(
    useCallback(() => {
      setDays(getTrackingDurationDays());
    }, []),
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" align="left" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tracking Duration Card */}
        <View style={styles.durationCard}>
          <Text style={styles.durationLabel}>Tracking Duration</Text>
          <View style={styles.durationValue}>
            <Text style={styles.currentlyText}>Currently:</Text>
            <Text style={styles.daysText}>{days} {days === 1 ? "Day" : "Days"}</Text>
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.menuContainer}>
          {/* Tracking Duration Menu */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/tracking_duration")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons name="timer-outline" size={22} color="#343235" />
              <Text style={styles.menuText}>Tracking Duration</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          {/* Meet the Team Menu */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/meet-the-team")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons name="people-outline" size={22} color="#343235" />
              <Text style={styles.menuText}>Meet the Team</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          {/* About STATERA Menu */}
          <Pressable
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/about_statera")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#343235"
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
  durationCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
  },
  durationValue: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    justifyContent: "space-between",
  },
  currentlyText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    flexShrink: 1,
  },
  daysText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#16B8C5",
    flex: 1,
    textAlign: "right",
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
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
    fontSize: 14,
    color: "#343235",
    fontFamily: "Poppins_400Regular",
  },
});
