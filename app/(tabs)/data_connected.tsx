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
        <View style={styles.spacer} />

        <View style={styles.content}>
          <Text style={styles.title}>Usage Data Connected</Text>
          <Text style={styles.subtitle}>
            We&apos;re now analyzing your digital behavior patterns.
          </Text>
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
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    gap: 8,
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
