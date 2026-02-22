import {
  BEHAVIORAL_PROFILE_MAP,
  getCurrentBehavioralProfile,
  parseBehavioralProfileFromApi,
  setCurrentBehavioralProfile,
  type BehavioralProfileKey,
} from "@/services/behavioral-profile";
import { setLastActiveTab } from "@/services/last-active-tab";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DebugStatsPage from "./(debug)/debug_stats_page";
import Analysis from "./(tabs)/navigation-pages/analysis";
import Overview from "./(tabs)/navigation-pages/overview";
import Settings from "./(tabs)/navigation-pages/settings";

type NavTab = "overview" | "analysis" | "statistics" | "settings";

const resolveTabFromParam = (tabParam: string | string[] | undefined): NavTab => {
  const normalized = Array.isArray(tabParam) ? tabParam[0] : tabParam;
  if (
    normalized === "overview" ||
    normalized === "analysis" ||
    normalized === "statistics" ||
    normalized === "settings"
  ) {
    return normalized;
  }
  return "overview";
};

function AnimatedIconWrapper({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) {
  const progress = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isActive ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isActive, progress]);

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <View style={styles.iconWrapper}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.iconWrapperActive,
          {
            opacity: progress,
            transform: [{ scale }],
          },
        ]}
      />
      {children}
    </View>
  );
}

// Bottom Navigation Bar Component
function BottomNavBar({
  activeTab,
  setActiveTab,
  bottomInset,
}: {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  bottomInset: number;
}) {
  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(bottomInset, 8) }]}>
      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("overview")}
      >
        <AnimatedIconWrapper isActive={activeTab === "overview"}>
          <Ionicons
            name={activeTab === "overview" ? "bar-chart" : "bar-chart-outline"}
            size={24}
            color={activeTab === "overview" ? "#16B8C5" : "#757575"}
          />
        </AnimatedIconWrapper>
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
        <AnimatedIconWrapper isActive={activeTab === "analysis"}>
          <Ionicons
            name={activeTab === "analysis" ? "analytics" : "analytics-outline"}
            size={24}
            color={activeTab === "analysis" ? "#16B8C5" : "#757575"}
          />
        </AnimatedIconWrapper>
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
        onPress={() => setActiveTab("statistics")}
      >
        <AnimatedIconWrapper isActive={activeTab === "statistics"}>
          <Ionicons
            name={
              activeTab === "statistics"
                ? "stats-chart"
                : "stats-chart-outline"
            }
            size={24}
            color={activeTab === "statistics" ? "#16B8C5" : "#757575"}
          />
        </AnimatedIconWrapper>
        <Text
          style={[
            styles.navLabel,
            activeTab === "statistics" && styles.navLabelActive,
          ]}
        >
          Statistics
        </Text>
      </Pressable>

      <Pressable
        style={styles.navItem}
        onPress={() => setActiveTab("settings")}
      >
        <AnimatedIconWrapper isActive={activeTab === "settings"}>
          <Ionicons
            name={activeTab === "settings" ? "settings" : "settings-outline"}
            size={24}
            color={activeTab === "settings" ? "#16B8C5" : "#757575"}
          />
        </AnimatedIconWrapper>
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
  const { tab, profile } = useLocalSearchParams<{
    tab?: string | string[];
    profile?: string | string[];
  }>();
  const [activeTab, setActiveTab] = useState<NavTab>(() => resolveTabFromParam(tab));
  const insets = useSafeAreaInsets();
  const profileParam = Array.isArray(profile) ? profile[0] : profile;
  const parsedProfile = parseBehavioralProfileFromApi(profileParam);
  const resolvedProfile = parsedProfile
    ? BEHAVIORAL_PROFILE_MAP[parsedProfile as BehavioralProfileKey]
    : getCurrentBehavioralProfile();

  useEffect(() => {
    setActiveTab(resolveTabFromParam(tab));
  }, [tab]);

  useEffect(() => {
    setLastActiveTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (parsedProfile) {
      setCurrentBehavioralProfile(parsedProfile);
    }
  }, [parsedProfile]);

  return (
    <View style={styles.container}>
      <StatusBar
        style="dark"
        backgroundColor={
          activeTab === "overview" ? resolvedProfile.waveTopColor : "#FFFFFF"
        }
      />

      {/* Content Section - Keep screens mounted to avoid remount flicker */}
      <View style={styles.content}>
        <View
          style={[
            styles.tabScreen,
            activeTab === "overview" ? styles.tabVisible : styles.tabHidden,
          ]}
          pointerEvents={activeTab === "overview" ? "auto" : "none"}
        >
          <Overview profileKey={resolvedProfile.key} />
        </View>

        <View
          style={[
            styles.tabScreen,
            activeTab === "analysis" ? styles.tabVisible : styles.tabHidden,
          ]}
          pointerEvents={activeTab === "analysis" ? "auto" : "none"}
        >
          <Analysis />
        </View>

        <View
          style={[
            styles.tabScreen,
            activeTab === "statistics" ? styles.tabVisible : styles.tabHidden,
          ]}
          pointerEvents={activeTab === "statistics" ? "auto" : "none"}
        >
          <DebugStatsPage />
        </View>

        <View
          style={[
            styles.tabScreen,
            activeTab === "settings" ? styles.tabVisible : styles.tabHidden,
          ]}
          pointerEvents={activeTab === "settings" ? "auto" : "none"}
        >
          <Settings />
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bottomInset={insets.bottom}
      />
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
    position: "relative",
  },
  tabScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  tabVisible: {
    opacity: 1,
  },
  tabHidden: {
    opacity: 0,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    minHeight: 80,
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
    position: "relative",
    overflow: "hidden",
  },
  iconWrapperActive: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#d2f5f8",
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
    color: "#16B8C5",
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
