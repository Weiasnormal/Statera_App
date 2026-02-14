import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Image source={require("@/assets/images/Logo.png")} style={styles.logo} />
            <Text style={styles.title}>Statera</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
            accessibilityState={{ expanded: menuOpen }}
            onPress={() => setMenuOpen((prev) => !prev)}
            style={styles.menuButton}
          >
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </Pressable>
        </View>
        {menuOpen ? (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Home</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Explore</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Settings</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 8 : 8,
  },
  header: {
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  content: {
    paddingBottom: 24,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 4,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "600",
    color: "#1F2937",
  },
  menuButton: {
    width: 32,
    height: 20,
    justifyContent: "space-between",
    paddingVertical: 2,
    alignItems: "flex-end",
    flexShrink: 0,
    marginLeft: "auto",
  },
  menuLine: {
    height: 2,
    width: 22,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  menuPanel: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  menuItem: {
    paddingVertical: 6,
  },
  menuText: {
    fontSize: 16,
    color: "#111827",
  },
});
