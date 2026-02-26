import { computeEnhancedAnalysis, useAnalysis } from "@/context/AnalysisContext";
import { apiClient } from "@/services/api-client";
import { collectDataForAnalysis } from "@/services/data-collection";
import { getGwa } from "@/services/gwa-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataConnectedScreen() {
  const {
    setCollectedData,
    setAnalysisResult,
    setBackendResponse,
    setIsLoading,
    setError,
  } = useAnalysis();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProfile = async () => {
    try {
      setIsGenerating(true);
      setIsLoading(true);
      setError(null);

      // Get stored GWA
      const gwa = getGwa();
      if (!gwa) {
        Alert.alert(
          "Error",
          "GWA not found. Please go back and enter your GWA.",
          [{ text: "OK", onPress: () => router.push("./gwa_input") }]
        );
        return;
      }

      console.log("Collecting usage data for GWA:", gwa);

      // Collect all data
      const collectedData = await collectDataForAnalysis(gwa);
      setCollectedData(collectedData);

      console.log("Sending data to backend...");

      // Submit to backend
      const response = await apiClient.submitUsageData(collectedData);
      
      // Compute enhanced analysis with dominant profile and distribution
      const enhancedAnalysis = computeEnhancedAnalysis(response);
      setAnalysisResult(enhancedAnalysis);
      
      // Keep raw response for backward compatibility (deprecated)
      setBackendResponse(JSON.stringify(response, null, 2));

      if (__DEV__) {
        console.log("ML Analysis Result:", enhancedAnalysis);
        console.log("Dominant Profile:", enhancedAnalysis.dominantProfile);
        console.log("Dominant Score:", (enhancedAnalysis.dominantScore * 100).toFixed(1) + "%");
      }

      console.log("Analysis complete, navigating to results...");

      // Navigate to results
      router.push("/nav");
    } catch (error) {
      console.error("Error generating profile:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);

      Alert.alert(
        "Error",
        "Failed to generate profile. Please make sure you have granted usage permissions and try again.",
        [
          { text: "Try Again", onPress: () => handleGenerateProfile() },
          {
            text: "Go Back",
            onPress: () => router.push("./usage_request"),
            style: "cancel",
          },
        ]
      );
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            accessibilityRole="button"
            onPress={() =>
              router.push("./usage_request?animation=slide_from_left")
            }
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/check.gif")}
              style={styles.placeholderIcon}
            />
            <Text style={styles.title}>Usage Data Connected</Text>
            <Text style={styles.subtitle}>
              We&apos;re now analyzing your digital behavior patterns.
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.generateButton,
              isGenerating && styles.generateButtonDisabled,
            ]}
            accessibilityRole="button"
            onPress={handleGenerateProfile}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.generateText}>Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles.generateText}>Generate My Profile</Text>
            )}
          </Pressable>
        </View>
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
  },
  header: {
    height: 40,
    justifyContent: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: 8,
  },
  placeholderIcon: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 75,
  },
  generateButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: "#006B8F",
    alignItems: "center",
    justifyContent: "center",
  },
  generateButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  generateText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

