import { PrimaryButton } from "@/components/ui/primary-button";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputScreen() {
  const { animation } = useLocalSearchParams<{ animation?: string }>();
  const screenAnimation =
    animation === "slide_from_left" ? "slide_from_left" : "slide_from_right";

  const [gwa, setGwa] = useState("");

  // Validate GWA format (x.xx) and range (1.00 - 5.00)
  const isValidGwa = (value: string): boolean => {
    const regex = /^\d\.\d{2}$/;
    if (!regex.test(value)) return false;
    const num = parseFloat(value);
    return num >= 1.0 && num <= 5.0;
  };

  const handleGwaChange = (text: string) => {
    // Remove any non-numeric characters except dot
    const cleaned = text.replace(/[^0-9.]/g, "");

    // Only allow one dot
    const parts = cleaned.split(".");
    if (parts.length > 2) return;

    // Format: x.xx (max length 4)
    if (cleaned.length <= 4) {
      // Ensure proper format
      if (parts.length === 2) {
        // Limit first part to 1 digit and second part to 2 digits
        const formatted = parts[0].slice(0, 1) + "." + parts[1].slice(0, 2);
        setGwa(formatted);
      } else {
        setGwa(cleaned);
      }
    }
  };

  const isButtonEnabled = isValidGwa(gwa);

  return (
    <>
      <Stack.Screen options={{ animation: screenAnimation }} />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.container}>
          <View style={styles.content}>
            <Pressable
              style={styles.backButton}
              accessibilityRole="button"
              onPress={() => router.push("./get_started")}
            >
              <Ionicons name="arrow-back" size={20} color="#0F172A" />
            </Pressable>

            <Text style={styles.title}>
              Enter Your General Weighted Average
            </Text>
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
              value={gwa}
              onChangeText={handleGwaChange}
              onSubmitEditing={Keyboard.dismiss}
              maxLength={4}
            />
            <Text style={styles.helperText}>
              Please enter a valid GWA between 1.00 and 5.00.
            </Text>
          </View>

          <PrimaryButton
            title="Continue"
            onPress={() => router.push("./usage_request")}
            disabled={!isButtonEnabled}
            style={styles.continueButton}
          />
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
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    color: "#111827",
    marginBottom: 10,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    marginBottom: 24,
    fontFamily: "Poppins_400Regular",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
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
    fontFamily: "Poppins_400Regular",
  },
  helperText: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 11,
    color: "#9CA3AF",
    fontFamily: "Poppins_400Regular",
  },
  continueButton: {
    marginBottom: 75,
  },
});
