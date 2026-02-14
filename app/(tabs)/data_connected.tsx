import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function DataConnectedScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            accessibilityRole="button"
            onPress={() => router.push("/access?animation=slide_from_left")}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <View style={styles.placeholderIcon} />
            <Text style={styles.title}>Usage Data Connected</Text>
            <Text style={styles.subtitle}>
              We&apos;re now analyzing your digital behavior patterns.
            </Text>
          </View>
        </View>

        <Pressable style={styles.generateButton} accessibilityRole="button">
          <Text style={styles.generateText}>Generate My Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    height: 40,
    justifyContent: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: 8,
  },
  placeholderIcon: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  generateButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#0F6A7A",
    alignItems: "center",
    justifyContent: "center",
  },
  generateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
