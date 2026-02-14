import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function AccessScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Usage Access Required</Text>
          <Text style={styles.body}>
            To generate accurate behavioral insights, STATERA needs access to
            your screen time and app usage duration.
          </Text>

          <Text style={styles.sectionLabel}>We only analyze:</Text>
          <Text style={styles.body}>• Time spent per app category</Text>
          <Text style={styles.body}>• Total daily usage duration</Text>

          <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
            We do NOT access:
          </Text>
          <Text style={styles.body}>• Messages</Text>
          <Text style={styles.body}>• Content inside apps</Text>
          <Text style={styles.body}>• Personal files</Text>

          <Text style={[styles.body, styles.footerNote]}>
            Your data remains private and is processed securely.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            accessibilityRole="button"
            onPress={() => router.push("/data_connected")}
          >
            <Text style={styles.primaryText}>Allow Access</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} accessibilityRole="button">
            <Text style={styles.secondaryText}>Not Now</Text>
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
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
    color: "#4B5563",
  },
  sectionLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
  },
  sectionSpacing: {
    marginTop: 14,
  },
  footerNote: {
    marginTop: 14,
  },
  actions: {
    gap: 14,
  },
  primaryButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#0F6A7A",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#0F6A7A",
    fontWeight: "700",
    fontSize: 13,
  },
});
