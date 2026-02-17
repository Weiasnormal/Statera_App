import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStarted() {
  const heroOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heroOpacity, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heroOpacity]);

  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.content}>
          <Animated.View style={[styles.hero, { opacity: heroOpacity }]}>
            <Image
              source={require("@/assets/images/Intro_logo.webp")}
              style={styles.logo}
            />
            <Text style={styles.title}>Statera</Text>
          </Animated.View>

          <View style={styles.illustration}>
            <Image
              source={require("@/assets/images/get_started.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.textSection}>
            <Text style={styles.heading}>
              Understand Student Behavior Through Data
            </Text>
          </View>

          <View style={styles.buttonSection}>
            <Pressable
              style={styles.getStartedButton}
              accessibilityRole="button"
              onPress={() => router.push("./instruction_page")}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/modal/how_it_works")}>
              <Text style={styles.howItWorksText}>How it Works</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
  },
  illustration: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  heading: {
    marginTop: -60,
    marginBottom: 70,
    fontSize: 24,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
    lineHeight: 28,
  },
  buttonSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: "#006B8F",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  howItWorksText: {
    color: "#006B8F",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
});
