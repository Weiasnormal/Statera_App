import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
    <SafeAreaView style={styles.screen}>
      <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
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
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </Pressable>
        </View>

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
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 8 : 8,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#1F2937",
  },
  menuButton: {
    width: 32,
    height: 20,
    justifyContent: "space-between",
    paddingVertical: 2,
    alignItems: "flex-end",
    flexShrink: 0,
    marginLeft: "auto",
  },
  menuLine: {
    height: 2,
    width: 22,
    borderRadius: 999,
    backgroundColor: "#111827",
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
    backgroundColor: "#E9F5F6",
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
    width: 60,
    height: 60,
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
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#FFFFFF",
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
