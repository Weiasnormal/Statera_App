import { Image, StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
