import { PrimaryButton } from "@/components/ui/primary-button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ViewResultsScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideTimer = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set timer to switch slides
    timerRef.current = setTimeout(() => {
      goToSlide((currentSlide + 1) % 2);
    }, 3000) as unknown as NodeJS.Timeout;
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);

    // Animate horizontal slide transition
    Animated.timing(slideAnim, {
      toValue: -slideIndex,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50 && currentSlide === 1) {
          // Swipe right, go to previous slide
          goToSlide(0);
        } else if (gestureState.dx < -50 && currentSlide === 0) {
          // Swipe left, go to next slide
          goToSlide(1);
        }
      },
    }),
  ).current;

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide]);

  const handleProgressDotPress = (index: number) => {
    goToSlide(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          onPress={() => router.push("./get_started")}
        >
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.carouselContainer} {...panResponder.panHandlers}>
            <Animated.View
              style={[
                styles.slidesWrapper,
                {
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [-(SCREEN_WIDTH - 40), 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Slide 1 */}
              <View style={styles.slide}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/input.webp")}
                    style={styles.illustration}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Input Academic</Text>
                  <Text style={styles.title}>Performance</Text>
                </View>
              </View>

              {/* Slide 2 */}
              <View style={styles.slide}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/behavioral.webp")}
                    style={styles.illustration}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>View Behavioral</Text>
                  <Text style={styles.title}>Results</Text>
                </View>
              </View>
            </Animated.View>
          </View>

          <View style={styles.progressRow}>
            <Pressable onPress={() => handleProgressDotPress(0)}>
              <View
                style={[
                  styles.progressDot,
                  currentSlide === 0 && styles.progressDotActive,
                ]}
              />
            </Pressable>
            <Pressable onPress={() => handleProgressDotPress(1)}>
              <View
                style={[
                  styles.progressDot,
                  currentSlide === 1 && styles.progressDotActive,
                ]}
              />
            </Pressable>
          </View>
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => router.push("./gwa_input?animation=slide_from_right")}
          style={styles.continueButton}
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
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 12,
    flex: 1,
  },
  carouselContainer: {
    width: SCREEN_WIDTH - 40,
    overflow: "hidden",
  },
  slidesWrapper: {
    flexDirection: "row",
    width: (SCREEN_WIDTH - 40) * 2,
  },
  slide: {
    width: SCREEN_WIDTH - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 8,
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
    gap: 8,
    marginTop: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  progressDotActive: {
    backgroundColor: "#006B8F",
  },
  continueButton: {
    marginBottom: 50,
  },
});
