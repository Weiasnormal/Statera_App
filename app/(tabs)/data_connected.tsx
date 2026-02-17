import { PrimaryButton } from "@/components/ui/primary-button";
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
              router.push(
                "./usage_request?animation=slide_from_left",
              )
            }
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Image source={require("@/assets/images/check.gif")} style={styles.placeholderIcon} />
            <Text style={styles.title}>Usage Data Connected</Text>
            <Text style={styles.subtitle}>
              We&apos;re now analyzing your digital behavior patterns.
            </Text>
          </View>
        </View>

        <PrimaryButton
          title="Generate My Profile"
          onPress={() => router.push("/nav")}
          style={styles.generateButton}
        />
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
    marginBottom: 75,
  },
});
