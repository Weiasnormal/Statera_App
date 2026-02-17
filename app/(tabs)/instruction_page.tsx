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
          onPress={() => router.push("/(tabs)/navigation-pages/gwa_input")}
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
  imageContainer: {
    position: "relative",
    width: 220,
    height: 220,
    marginBottom: 18,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 12,
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
    width: 220,
    height: 220,
    marginBottom: 18,
  },
  absoluteImage: {
    position: "absolute",
    top: 0,
    left: 0,
    marginBottom: 0,
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
