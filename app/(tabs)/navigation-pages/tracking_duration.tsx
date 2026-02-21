import { ConfirmModal } from "@/components/ui/confirm-modal";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ScreenHeader } from "@/components/ui/screen-header";
import {
  getTrackingDurationDays,
  setTrackingDurationDays,
} from "@/services/tracking-duration";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TrackingDuration() {
  const dayOptions = [1, 7, 30];
  const [savedDays, setSavedDays] = useState(getTrackingDurationDays());
  const [selectedDays, setSelectedDays] = useState(getTrackingDurationDays());
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const hasChanges = selectedDays !== savedDays;

  const handleSave = () => {
    setSavedDays(selectedDays);
    setTrackingDurationDays(selectedDays);
    router.back();
  };

  const handleBackPress = () => {
    if (hasChanges) {
      setShowDiscardModal(true);
    } else {
      router.back();
    }
  };

  const handleStay = () => {
    setShowDiscardModal(false);
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    setSelectedDays(savedDays);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Tracking Duration"
        showBack
        onBackPress={handleBackPress}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title & Description */}
        <View style={styles.section}>
          <Text style={styles.title}>Adjust Analysis Period</Text>
          <Text style={styles.subtitle}>
            Select how many days of usage data should be included.
          </Text>
        </View>

        {/* Static Options */}
        <View style={styles.optionsContainer}>
          {dayOptions.map((option) => {
            const isSelected = selectedDays === option;
            return (
              <Pressable
                key={option}
                style={[styles.optionButton, isSelected && styles.optionButtonActive]}
                onPress={() => setSelectedDays(option)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                  {option} {option === 1 ? "day" : "days"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Range Info */}
        <View style={styles.infoRow}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#6b6b6b"
          />
          <Text style={styles.infoText}>
            Longer periods provide more stable behavioral patterns.
          </Text>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <PrimaryButton
          title="Save Changes"
          onPress={handleSave}
          disabled={!hasChanges}
        />
      </View>

      <ConfirmModal
        visible={showDiscardModal}
        title="Discard Changes?"
        message="Your changes haven't been saved."
        primaryLabel="Stay"
        secondaryLabel="Discard"
        onPrimaryPress={handleStay}
        onSecondaryPress={handleDiscard}
        onRequestClose={handleStay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  optionButtonActive: {
    borderColor: "#0a7ea4",
    backgroundColor: "#EAF7FB",
  },
  optionText: {
    fontSize: 16,
    color: "#343235",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  optionTextActive: {
    color: "#0a7ea4",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#666666",
    lineHeight: 18,
    fontFamily: "Poppins_400Regular",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
