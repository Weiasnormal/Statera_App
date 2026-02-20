import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Analysis from "./(tabs)/navigation-pages/analysis";
import Overview from "./(tabs)/navigation-pages/overview";
import Settings from "./(tabs)/navigation-pages/settings";

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
        <View
          style={[
            styles.iconWrapper,
            activeTab === "overview" && styles.iconWrapperActive,
          ]}
        >
          <Ionicons
            name={activeTab === "overview" ? "bar-chart" : "bar-chart-outline"}
            size={24}
            color={activeTab === "overview" ? "#2196F3" : "#757575"}
          />
        </View>
        <Text
          style={[
            styles.navLabel,
            activeTab === "overview" && styles.navLabelActive,
          ]}
        >
          Overview
        </Text>
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("analysis")}
      >
        <View
          style={[
            styles.iconWrapper,
            activeTab === "analysis" && styles.iconWrapperActive,
          ]}
        >
          <Ionicons
            name={activeTab === "analysis" ? "analytics" : "analytics-outline"}
            size={24}
            color={activeTab === "analysis" ? "#2196F3" : "#757575"}
          />
        </View>
        <Text
          style={[
            styles.navLabel,
            activeTab === "analysis" && styles.navLabelActive,
          ]}
        >
          Analysis
        </Text>
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("settings")}
      >
        <View
          style={[
            styles.iconWrapper,
            activeTab === "settings" && styles.iconWrapperActive,
          ]}
        >
          <Ionicons
            name={activeTab === "settings" ? "settings" : "settings-outline"}
            size={24}
            color={activeTab === "settings" ? "#2196F3" : "#757575"}
          />
        </View>
        <Text
          style={[
            styles.navLabel,
            activeTab === "settings" && styles.navLabelActive,
          ]}
        >
          Settings
        </Text>
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
    justifyContent: "space-evenly",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperActive: {
    backgroundColor: "#DDF3FF",
    borderRadius: 12,
  },
  navLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontFamily: "Poppins_400Regular",
  },
  navLabelActive: {
    color: "#2196F3",
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
