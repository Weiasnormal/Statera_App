import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
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
            onPress={() =>
              router.push("./usage_request?animation=slide_from_left")
            }
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/check.gif")}
              style={styles.placeholderIcon}
            />
            <Text style={styles.title}>Usage Data Connected</Text>
            <Text style={styles.subtitle}>
              We&apos;re now analyzing your digital behavior patterns.
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.generateButton}
            accessibilityRole="button"
            onPress={() => router.push("/nav")}
          >
            <Text style={styles.generateText}>Generate My Profile</Text>
          </Pressable>

          <Pressable
            style={styles.debugButton}
            accessibilityRole="button"
            onPress={() => router.push("/(debug)/debug_stats_page")}
          >
            <Text style={styles.debugText}>View Debug Stats</Text>
          </Pressable>
        </View>
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
    marginBottom: 8,
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
    width: 150,
    height: 150,
    borderRadius: 16,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    gap: 12,
  },
  generateButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#006B8F",
    alignItems: "center",
    justifyContent: "center",
  },
  generateText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  debugButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 75,
  },
  debugText: {
    color: "#006B8F",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
});
