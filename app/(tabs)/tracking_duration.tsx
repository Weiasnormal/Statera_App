import { ConfirmModal } from "@/components/ui/confirm-modal";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function TrackingDuration() {
	const [savedDays, setSavedDays] = useState(7);
	const [daysInput, setDaysInput] = useState("7");
	const [showDiscardModal, setShowDiscardModal] = useState(false);

	const parsedDays = useMemo(() => {
		const value = parseInt(daysInput, 10);
		if (Number.isNaN(value)) return NaN;
		return value;
	}, [daysInput]);

	const isValidDays = !Number.isNaN(parsedDays) && parsedDays >= 3 && parsedDays <= 30;
	const hasChanges = isValidDays && parsedDays !== savedDays;

	const clampDays = (value: number) => {
		if (Number.isNaN(value)) return 3;
		return Math.min(30, Math.max(3, value));
	};

	const handleChangeBy = (delta: number) => {
		const current = Number.isNaN(parsedDays) ? savedDays : parsedDays;
		const next = clampDays(current + delta);
		setDaysInput(String(next));
	};

	const handleInputChange = (text: string) => {
		const sanitized = text.replace(/[^0-9]/g, "");
		setDaysInput(sanitized);
	};

	const handleInputBlur = () => {
		if (Number.isNaN(parsedDays)) {
			setDaysInput(String(savedDays));
			return;
		}
		const clamped = clampDays(parsedDays);
		setDaysInput(String(clamped));
	};

	const handleSave = () => {
		if (!isValidDays) return;
		setSavedDays(parsedDays);
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
		setDaysInput(String(savedDays));
		router.back();
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				{/* Header */}
				<View style={styles.headerRow}>
					<Pressable style={styles.backButton} onPress={handleBackPress}>
						<Ionicons name="arrow-back" size={22} color="#1a1a1a" />
					</Pressable>
					<Text style={styles.headerTitle}>Tracking Duration</Text>
					<View style={styles.headerSpacer} />
				</View>

				{/* Title & Description */}
				<View style={styles.section}>
					<Text style={styles.title}>Adjust Analysis Period</Text>
					<Text style={styles.subtitle}>
						Select how many days of usage data should be included.
					</Text>
				</View>

				{/* Counter */}
				<View style={styles.counterRow}>
					<Pressable
						style={[styles.counterButton, styles.counterButtonLeft]}
						onPress={() => handleChangeBy(-1)}
					>
						<Text style={styles.counterButtonText}>-</Text>
					</Pressable>

					<View style={styles.inputContainer}>
						<TextInput
							value={daysInput}
							onChangeText={handleInputChange}
							onBlur={handleInputBlur}
							keyboardType="number-pad"
							maxLength={2}
							style={styles.input}
							textAlign="center"
							returnKeyType="done"
						/>
					</View>

					<Pressable
						style={[styles.counterButton, styles.counterButtonRight]}
						onPress={() => handleChangeBy(1)}
					>
						<Text style={styles.counterButtonText}>+</Text>
					</Pressable>
				</View>

				<Text style={styles.daysLabel}>DAYS</Text>

				{/* Divider */}
				<View style={styles.divider} />

				{/* Range Info */}
				<Text style={styles.rangeText}>Range: 3–30 days</Text>

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
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	scrollContent: {
		paddingTop: 50,
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},
	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {
		flex: 1,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "600",
		color: "#1a1a1a",
	},
	headerSpacer: {
		width: 40,
	},
	section: {
		marginBottom: 32,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#1a1a1a",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: "#555555",
		lineHeight: 20,
	},
	counterRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	counterButton: {
		backgroundColor: "#0a7ea4",
		borderRadius: 12,
		width: 72,
		height: 72,
		alignItems: "center",
		justifyContent: "center",
	},
	counterButtonLeft: {
		marginRight: 16,
	},
	counterButtonRight: {
		marginLeft: 16,
	},
	counterButtonText: {
		color: "#ffffff",
		fontSize: 32,
		fontWeight: "700",
	},
	inputContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRadius: 12,
		height: 72,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1a1a1a",
		paddingVertical: 0,
		paddingHorizontal: 0,
		minWidth: 40,
	},
	daysLabel: {
		textAlign: "center",
		fontSize: 12,
		letterSpacing: 2,
		color: "#888888",
		marginBottom: 24,
	},
	divider: {
		height: 1,
		backgroundColor: "#e5e5e5",
		marginBottom: 16,
	},
	rangeText: {
		fontSize: 13,
		color: "#666666",
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
	},
	infoText: {
		flex: 1,
		fontSize: 13,
		color: "#666666",
		lineHeight: 18,
	},
	footer: {
		paddingHorizontal: 24,
		paddingBottom: 24,
	},
});

