import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ViewResultsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          onPress={() => router.push("/get_started")}
        >
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </Pressable>

        <View style={styles.content}>
          <Image
            source={require("@/assets/images/behavioral.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>View Behavioral</Text>
          <Text style={styles.title}>Results</Text>

          <View style={styles.progressRow}>
            <View style={styles.progressDot} />
            <View style={styles.progressPill} />
          </View>
        </View>

        <Pressable style={styles.continueButton} accessibilityRole="button">
          <Text style={styles.continueText}>Continue</Text>
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
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  illustration: {
    width: 220,
    height: 220,
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
    textAlign: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  progressPill: {
    width: 20,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#0F6A7A",
  },
  continueButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#0F6A7A",
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
