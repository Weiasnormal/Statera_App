import { ScreenHeader } from "@/components/ui/screen-header";
import {
  getAnalysisStartDate,
  resetAnalysisStartDate,
  setAnalysisStartDate,
} from "@/services/tracking-duration";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const ANALYSIS_PERIOD_DAYS = 7;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Settings() {
  const [analysisStart, setAnalysisStart] = useState(getAnalysisStartDate());
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const today = normalizeDate(new Date());
  const startDate = normalizeDate(analysisStart);
  const isStartInFuture = startDate.getTime() > today.getTime();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / DAY_IN_MS);
  const collectedDays = isStartInFuture
    ? 0
    : Math.max(0, Math.min(daysSinceStart + 1, ANALYSIS_PERIOD_DAYS));
  const remainingDays = Math.max(ANALYSIS_PERIOD_DAYS - collectedDays, 0);
  const readyDate = addDays(startDate, ANALYSIS_PERIOD_DAYS - 1);
  const pastWindowStart = addDays(today, -(ANALYSIS_PERIOD_DAYS - 1));
  const isPastWindowSelected =
    startDate.getTime() === normalizeDate(pastWindowStart).getTime();
  const selectableDates = Array.from({ length: 29 }, (_, index) =>
    addDays(today, index - 14),
  ).filter(
    (date) =>
      normalizeDate(date).getTime() !== normalizeDate(pastWindowStart).getTime(),
  );

  useFocusEffect(
    useCallback(() => {
      setAnalysisStart(getAnalysisStartDate());
    }, []),
  );

  const handleSetStartDate = (date: Date) => {
    setAnalysisStartDate(date);
    setAnalysisStart(normalizeDate(date));
    setShowScheduleModal(false);
  };

  const handleResetDefault = () => {
    resetAnalysisStartDate();
    setAnalysisStart(getAnalysisStartDate());
    setShowScheduleModal(false);
  };

  const handleUsePast7Days = () => {
    const pastWindowStart = addDays(today, -(ANALYSIS_PERIOD_DAYS - 1));
    setAnalysisStartDate(pastWindowStart);
    setAnalysisStart(pastWindowStart);
    setShowScheduleModal(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" align="left" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tracking Duration Card */}
        {/* <View style={styles.durationCard}>
          <Text style={styles.durationLabel}>Tracking Duration</Text>
          <View style={styles.durationValue}>
            <Text style={styles.currentlyText}>Currently:</Text>
            <Text style={styles.daysText}>{days} {days === 1 ? "Day" : "Days"}</Text>
          </View>
        </View> */}

        {/* Data Collection Window Card */}
        <View style={styles.durationCard}>
          <View style={styles.analysisStatusHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#16B8C5" />
            <Text style={styles.analysisStatusTitle}>Next Analysis</Text>
          </View>
          <View style={styles.analysisStatusContent}>
            <Text style={styles.analysisReadyText}>
              {isPastWindowSelected ? (
                <>
                  <Text style={styles.daysHighlight}>Using past 7-day records</Text>
                </>
              ) : isStartInFuture ? (
                <>
                  Starts in <Text style={styles.daysHighlight}>{Math.max(daysSinceStart * -1, 0)} day{Math.max(daysSinceStart * -1, 0) !== 1 ? "s" : ""}</Text>
                </>
              ) : remainingDays > 0 ? (
                <>
                  Ready in <Text style={styles.daysHighlight}>{remainingDays} day{remainingDays !== 1 ? "s" : ""}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.daysHighlight}>Ready now</Text>
                </>
              )}
            </Text>
            <Text style={styles.analysisMetaText}>Start date: {formatDate(startDate)}</Text>
            <Text style={styles.analysisMetaText}>Target ready date: {formatDate(readyDate)}</Text>
            <Pressable
              style={styles.runAnalysisButton}
              onPress={() => router.push("./(tabs)/gwa_input")}
            >
              <Text style={styles.runAnalysisButtonText}>Run New Analysis</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={styles.configureWindowButton}
              onPress={() => setShowScheduleModal(true)}
            >
              <Text style={styles.configureWindowButtonText}>Choose 7-Day Start</Text>
            </Pressable>
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.menuContainer}>
          {/* Tracking Duration Menu - Hidden for now */}
          {/* <Pressable
            style={styles.menuItem}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/tracking_duration")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons name="timer-outline" size={22} color="#343235" />
              <Text style={styles.menuText}>Tracking Duration</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable> */}

          {/* Meet the Team Menu */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/meet-the-team")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons name="people-outline" size={22} color="#343235" />
              <Text style={styles.menuText}>Meet the Team</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>

          {/* About STATERA Menu */}
          <Pressable
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() =>
              router.push("/(tabs)/navigation-pages/about_statera")
            }
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#343235"
              />
              <Text style={styles.menuText}>About STATERA</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={showScheduleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowScheduleModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Start Date</Text>
            <Text style={styles.modalSubtitle}>Select when your next 7-day analysis window begins.</Text>
            <ScrollView style={styles.dateOptionsList} showsVerticalScrollIndicator={false}>
              <Pressable
                style={[styles.dateOption, isPastWindowSelected && styles.dateOptionSelected]}
                onPress={handleUsePast7Days}
              >
                <View style={styles.pastOptionContent}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={isPastWindowSelected ? "#16B8C5" : "#343235"}
                  />
                  <Text
                    style={[
                      styles.dateOptionText,
                      isPastWindowSelected && styles.dateOptionTextSelected,
                    ]}
                  >
                    Use Past 7 Days Records
                  </Text>
                </View>
              </Pressable>

              {selectableDates.map((date) => {
                const isSelected =
                  normalizeDate(date).getTime() === normalizeDate(startDate).getTime();

                return (
                  <Pressable
                    key={date.toISOString()}
                    style={[styles.dateOption, isSelected && styles.dateOptionSelected]}
                    onPress={() => handleSetStartDate(date)}
                  >
                    <Text style={[styles.dateOptionText, isSelected && styles.dateOptionTextSelected]}>
                      {formatDate(date)}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable style={styles.modalActionSecondary} onPress={handleResetDefault}>
                <Text style={styles.modalActionSecondaryText}>Reset to Default</Text>
              </Pressable>
              <Pressable
                style={styles.modalActionPrimary}
                onPress={() => setShowScheduleModal(false)}
              >
                <Text style={styles.modalActionPrimaryText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  durationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E1E6EA",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  analysisStatusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  analysisStatusTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
  },
  analysisStatusContent: {
    gap: 14,
  },
  analysisReadyText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    lineHeight: 22,
  },
  daysHighlight: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: "#16B8C5",
  },
  analysisMetaText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  runAnalysisButton: {
    backgroundColor: "#16B8C5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  runAnalysisButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  configureWindowButton: {
    borderWidth: 1,
    borderColor: "#16B8C5",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  configureWindowButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#16B8C5",
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontFamily: "Poppins_400Regular",
  },
  collectionInfo: {
    gap: 12,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#16B8C5",
    borderRadius: 4,
  },
  daysInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysCollectedText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
  },
  daysRemainingText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },
  durationValue: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    justifyContent: "space-between",
  },
  currentlyText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    flexShrink: 1,
  },
  daysText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#16B8C5",
    flex: 1,
    textAlign: "right",
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    color: "#343235",
    fontFamily: "Poppins_400Regular",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 12,
  },
  dateOptionsList: {
    maxHeight: 320,
    marginTop: 10,
  },
  pastOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateOption: {
    borderWidth: 1,
    borderColor: "#E1E6EA",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  dateOptionSelected: {
    borderColor: "#16B8C5",
    backgroundColor: "#EAF9FA",
  },
  dateOptionText: {
    fontSize: 14,
    color: "#343235",
    fontFamily: "Poppins_500Medium",
  },
  dateOptionTextSelected: {
    color: "#16B8C5",
    fontFamily: "Poppins_600SemiBold",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  modalActionSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#16B8C5",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  modalActionSecondaryText: {
    color: "#16B8C5",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  modalActionPrimary: {
    flex: 1,
    backgroundColor: "#16B8C5",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  modalActionPrimaryText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
