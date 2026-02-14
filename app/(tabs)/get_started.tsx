import { router } from "expo-router";
import {
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
  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Image
              source={require("@/assets/images/Logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Statera</Text>
          </View>

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
              onPress={() => router.push("/view-results")}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </Pressable>

            <Pressable>
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
    fontWeight: "700",
    color: "#2D3748",
  },
  illustration: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  textSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
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
    backgroundColor: "#0E7490",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  howItWorksText: {
    color: "#0E7490",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
});
