import { useState } from "react";
import {
  Alert,
  FlatList,
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
import Header from "./components/header";
import Footer from "./components/footer";
import {
  getAppUsageData,
  requestUsagePermission,
  type AppUsageItem,
} from "@/services/usage-stats";

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
  const [usageData, setUsageData] = useState<AppUsageItem[]>([]);
  const [isFetchingUsage, setIsFetchingUsage] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const handleRefreshUsageStats = async () => {
    Alert.alert(
      "Screen Time Permission",
      "This app would like to access your screen time and device usage data to provide personalized insights.",
      [
        {
          text: "Deny",
          onPress: () => {
            setPermissionRequested(true);
            Alert.alert("Permission Denied", "You can enable this in Settings > Privacy > Screen Time");
          },
          style: "cancel",
        },
        {
          text: "Allow",
          onPress: async () => {
            setPermissionRequested(true);
            setIsFetchingUsage(true);
            const hasPermission = await requestUsagePermission();
            if (!hasPermission) {
              setIsFetchingUsage(false);
              return;
            }
            try {
              const data = await getAppUsageData();
              setUsageData(data);
            } catch {
              Alert.alert("Error", "Unable to fetch usage stats");
            } finally {
              setIsFetchingUsage(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.content}>
          <Header />

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

          <View style={styles.divider} />

          <View style={styles.usageButtonRow}>
            <Pressable style={styles.usageStatsButton} onPress={handleRefreshUsageStats}>
              <Text style={styles.usageStatsButtonText}>Check Your Screen Time</Text>
            </Pressable>
            <Pressable style={styles.refreshButton} onPress={handleRefreshUsageStats}>
              <Ionicons name="refresh" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          {isFetchingUsage ? (
            <Text style={styles.usageEmptyText}>Fetching usage data...</Text>
          ) : usageData.length > 0 ? (
            <FlatList
              data={usageData}
              keyExtractor={(item) => item.packageName}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.usageRow}>
                  <Text style={styles.usagePackage}>{item.packageName}</Text>
                  <Text style={styles.usageTime}>{Math.round(item.totalTimeVisible / 60000)} min</Text>
                </View>
              )}
            />
          ) : permissionRequested ? (
            <Text style={styles.usageEmptyText}>No usage data detected yet.</Text>
          ) : (
            <Text style={styles.usageEmptyText}>Tap Refresh after granting permission.</Text>
          )}
        </View>

        <Footer />
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  usageStatsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  usageButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  usageStatsButton: {
    flex: 1,
    backgroundColor: "#1F9D55",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  usageStatsButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    //textAlign: "center",
  },
  usageListTitle: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  refreshButton: {
    backgroundColor: "#0EA5A5",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 999,
  },
  usageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  usagePackage: {
    flex: 1,
    fontSize: 12,
    color: "#1F2937",
  },
  usageTime: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F172A",
  },
  usageEmptyText: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  footerSmall: {
    color: "#6B7280",
    fontSize: 11,
  },
});
