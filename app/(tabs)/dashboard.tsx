import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const steps = [
  {
    label: "STEP 1",
    title: "Input Academic Performance",
    description: "Enter your latest grade metrics (GWA).",
    accent: "#08A6A6",
    image: require("@/assets/images/Input_Acedemic.png"),
  },
  {
    label: "STEP 2",
    title: "Select App Usage Levels",
    description: "Choose how often you use apps each day.",
    accent: "#1F9D55",
    image: require("@/assets/images/Select_app.png"),
  },
  {
    label: "STEP 3",
    title: "View Behavioral Results",
    description: "See personalized insights and recommendations.",
    accent: "#D9A441",
    image: require("@/assets/images/View_Behavioral.png"),
  },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.content}>
          <SafeAreaView style={styles.headerSafeArea}>
            <View style={styles.headerContainer}>
              <View style={styles.brand}>
                <Image source={require("@/assets/images/Logo.png")} style={styles.logo} />
                <Text style={styles.title}>Statera</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Toggle menu"
                accessibilityState={{ expanded: menuOpen }}
                onPress={() => setMenuOpen((prev) => !prev)}
                style={styles.menuButton}
              >
                <Ionicons name="menu-outline" size={24} color="#2D3748" />
              </Pressable>
            </View>
          </SafeAreaView>

        {menuOpen ? (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Behavioral Test</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Meet the Team</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Image source={require("@/assets/images/Logo.png")} style={styles.heroLogo} />
            <Text style={styles.heroTitle}>Behavioral Test</Text>
            <Text style={styles.heroSubtitle}>Understand Student Behavior Through Data</Text>
          </View>
        </View>

        <View style={styles.section}>
          {steps.map((step) => (
            <View key={step.label} style={styles.card}>
              <View style={[styles.cardHeader, { backgroundColor: step.accent }]}>
                <Text style={styles.cardHeaderText}>{step.label}</Text>
              </View>
              <View style={styles.cardBody}>
                <Image source={step.image} style={styles.cardIcon} />
                <Text style={styles.cardTitle}>{step.title}</Text>
                <Text style={styles.cardDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>Step 1 of 2</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.question}>What&apos;s your General Weighted Average (GWA)?</Text>
          <TextInput
            placeholder="Ex. 1.32"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            keyboardType="numeric"
          />
          <Pressable style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next -&gt;</Text>
          </Pressable>
        </View>

        <View style={styles.footerWrapper}>
          <Image source={require("@/assets/images/Footer.png")} style={styles.footerBackground} />
          <View style={styles.footer}>
            <View style={styles.footerBrand}>
              <Image source={require("@/assets/images/Logo.png")} style={styles.footerLogo} />
              <Text style={styles.footerTitle}>Statera</Text>
            </View>
            <Text style={styles.footerDescription}>
              Machine Learning-Driven Student Behavior Analysis for personalized insights.
            </Text>
            <Text style={styles.footerNote}>
              Developed for academic and research purposes only. Results are predictive and not for
              clinical diagnosis.
            </Text>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Behavioral Test</Text>
              <Text style={styles.footerLink}>Meet the Team</Text>
            </View>
            <View style={styles.footerBottom}>
              <Text style={styles.footerSmall}>Terms and Conditions</Text>
              <Text style={styles.footerSmall}>Privacy Policy</Text>
              <Text style={styles.footerSmall}>2026 STATERA</Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    paddingBottom: 32,
  },
  headerSafeArea: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#2D3748",
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  menuPanel: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  menuItem: {
    paddingVertical: 6,
  },
  menuText: {
    fontSize: 16,
    color: "#111827",
  },
  hero: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  heroContent: {
    alignItems: "center",
    gap: 8,
  },
  heroLogo: {
    width: 70,
    height: 70,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#334155",
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    gap: 16,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.5)",
  },
  cardHeader: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cardHeaderText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  cardBody: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    padding: 18,
    alignItems: "center",
    gap: 10,
  },
  cardIcon: {
    width: 72,
    height: 72,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#475569",
    textAlign: "center",
  },
  formSection: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 80,
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#E5E7EB",
  },
  stepLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#0EA5A5",
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    alignSelf: "center",
    backgroundColor: "#08A6A6",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 999,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  footerWrapper: {
    marginTop: 28,
    minHeight: 380,
    paddingTop: 60,
    paddingBottom: 32,
  },
  footerBackground: {
    width: "100%",
    height: 380,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
    gap: 10,
  },
  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerLogo: {
    width: 22,
    height: 22,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  footerDescription: {
    fontSize: 12,
    color: "#334155",
    textAlign: "center",
  },
  footerNote: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  footerLinks: {
    marginTop: 6,
    gap: 8,
    alignItems: "center",
  },
  footerLink: {
    color: "#0E7490",
    fontSize: 12,
    fontWeight: "600",
  },
  footerBottom: {
    marginTop: 10,
    alignItems: "center",
    gap: 6,
  },
  footerSmall: {
    color: "#6B7280",
    fontSize: 11,
  },
});
