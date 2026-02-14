import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
      </SafeAreaView>

      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.overlay}
            onPress={() => setMenuOpen(false)}
            accessible={false}
          />
          <View style={styles.slideoutMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                onPress={() => setMenuOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close-outline" size={24} color="#2D3748" />
              </Pressable>
            </View>
            <View style={styles.menuItemsContainer}>
              <Pressable style={styles.menuItemHighlight}>
                <Text style={styles.menuItemTextHighlight}>Behavioral Test</Text>
              </Pressable>
              <Pressable style={styles.menuItem}>
                <Text style={styles.menuItemText}>Meet the Team</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  slideoutMenu: {
    width: 250,
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -8,
  },
  menuItemsContainer: {
    gap: 12,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  menuItemHighlight: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#B8ECF0",
    borderRadius: 12,
  },
  menuItemTextHighlight: {
    fontSize: 16,
    color: "#0E7490",
    fontWeight: "600",
  },
});
