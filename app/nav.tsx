import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Analysis from "./(tabs)/analysis";
import Overview from "./(tabs)/overview";
import Settings from "./(tabs)/settings";

// Bottom Navigation Bar Component
function BottomNavBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <View style={styles.bottomNav}>
      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("overview")}
      >
        <Ionicons
          name="grid-outline"
          size={24}
          color={activeTab === "overview" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === "overview" && styles.navLabelActive,
          ]}
        >
          Overview
        </Text>
        {activeTab === "overview" && <View style={styles.activeIndicator} />}
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("analysis")}
      >
        <Ionicons
          name="bulb-outline"
          size={24}
          color={activeTab === "analysis" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === "analysis" && styles.navLabelActive,
          ]}
        >
          Analysis
        </Text>
        {activeTab === "analysis" && <View style={styles.activeIndicator} />}
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("settings")}
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color={activeTab === "settings" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === "settings" && styles.navLabelActive,
          ]}
        >
          Settings
        </Text>
        {activeTab === "settings" && <View style={styles.activeIndicator} />}
      </Pressable>
    </View>
  );
}

// Main Component
export default function Nav() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <View style={styles.container}>
      {/* Content Section - Conditionally render based on active tab */}
      <View style={styles.content}>
        {activeTab === "overview" && <Overview />}
        {activeTab === "analysis" && <Analysis />}
        {activeTab === "settings" && <Settings />}
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: "space-evenly",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  navLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  navLabelActive: {
    color: "#2196F3",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -12,
    width: 60,
    height: 3,
    backgroundColor: "#2196F3",
    borderRadius: 2,
  },
});
