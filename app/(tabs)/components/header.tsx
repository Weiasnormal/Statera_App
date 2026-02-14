import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.headerContainer}>
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
          <Ionicons name="menu-outline" size={24} color="#2D3748" />
        </Pressable>
      </View>

      {menuOpen ? (
        <View style={styles.menuPanel}>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Behavioral Test</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Meet the Team</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#2D3748",
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
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
