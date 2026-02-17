import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ViewResultsScreen() {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [textSwitch] = useState(new Animated.Value(1)); // 1 for Input, 0 for Results

  useEffect(() => {
    // Fade animation: input.png visible (1) -> behavioral.png visible (0) and back, looping every 2 seconds
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Slide animation for the blue progress element - loops back and forth
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Text switching animation: alternates between Input and Results every 2 seconds
    Animated.loop(
      Animated.sequence([
        Animated.timing(textSwitch, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(textSwitch, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, slideAnim, textSwitch]);
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
          <View style={styles.imageContainer}>
            {/* input.png with fade out */}
            <Animated.Image
              source={require("@/assets/images/input.png")}
              style={[styles.illustration, { opacity: fadeAnim }]}
              resizeMode="contain"
            />
            {/* behavioral.png with fade in */}
            <Animated.Image
              source={require("@/assets/images/behavioral.png")}
              style={[
                styles.illustration,
                styles.absoluteImage,
                { opacity: Animated.subtract(1, fadeAnim) },
              ]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Animated.View
              style={[
                styles.textContent,
                {
                  opacity: textSwitch,
                },
              ]}
            >
              <Text style={styles.title}>Input Academic</Text>
              <Text style={styles.title}>Performance</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.textContent,
                styles.absoluteText,
                {
                  opacity: Animated.subtract(1, textSwitch),
                },
              ]}
            >
              <Text style={styles.title}>View Behavioral</Text>
              <Text style={styles.title}>Results</Text>
            </Animated.View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressDot} />
            <Animated.View
              style={[
                styles.progressPill,
                {
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 20],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>

        <Pressable
          style={styles.continueButton}
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/gwa_input?animation=slide_from_right")}
        >
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
    paddingHorizontal: 20, // Adjust left/right margins (e.g., 32 for more space) // Increase to move back button down (e.g., 20)
    paddingBottom: 48, // Increase to move continue button up (e.g., 40)
    justifyContent: "space-between", // Keeps back button at top, continue at bottom
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  imageContainer: {
    position: "relative",
    width: 250, // Adjust image size (e.g., 280 for larger, 180 for smaller)
    height: 250, // Keep same as width for square aspect ratio
    marginBottom: 8, // Increase to add more space below image (e.g., 32)
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12, // Increase to move content down (e.g., 50), decrease to move up (e.g., -20)
    gap: 12, // Increase to add more space between image, text, and progress (e.g., 24)
  },
  textContainer: {
    position: "relative",
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    alignItems: "center",
  },
  absoluteText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 8,
  },
  absoluteImage: {
    position: "absolute",
    top: 0,
    left: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
    textAlign: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 24, // Increase to add more space above progress dots (e.g., 24)
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
    backgroundColor: "#006B8F",
  },
  continueButton: {
    height: 48, // Adjust button height (e.g., 56 for taller button)
    borderRadius: 999,
    backgroundColor: "#006B8F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50, // Add marginBottom: 20 to move button up from bottom
    // Add marginBottom: 20 to move button up from bottom
  },
  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
