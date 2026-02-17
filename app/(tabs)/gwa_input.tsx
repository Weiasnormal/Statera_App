import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function InputScreen() {
  const { animation } = useLocalSearchParams<{ animation?: string }>();
  const screenAnimation =
    animation === "slide_from_left" ? "slide_from_left" : "slide_from_right";
  return (
    <>
      <Stack.Screen options={{ animation: screenAnimation }} />
      <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Pressable
            style={styles.backButton}
            accessibilityRole="button"
            onPress={() => router.push("/(tabs)/get_started")}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>

          <Text style={styles.title}>Enter Your General Weighted Average</Text>
          <Text style={styles.subtitle}>
            This helps us understand your academic behavior patterns.
          </Text>

          <Text style={styles.label}>GWA</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. 1.32"
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            keyboardType="numeric"
            inputMode="decimal"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.helperText}>
            Please enter a valid GWA between 1.00 and 5.00.
          </Text>
        </View>

        <Pressable
          style={styles.continueButton}
          accessibilityRole="button"
          onPress={() => router.push("/usage_request")}
        >
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </>
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
  content: {
    gap: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 18,
    color: "#6B7280",
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  helperText: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 11,
    color: "#9CA3AF",
  },
  continueButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#006B8F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 75,
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
