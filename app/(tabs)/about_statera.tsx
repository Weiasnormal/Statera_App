import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutStatera() {
	const handleBack = () => {
		router.back();
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.headerContainer}>
				<View style={styles.headerInner}>
					<Pressable style={styles.backButton} onPress={handleBack}>
						<Ionicons name="arrow-back" size={22} color="#1a1a1a" />
					</Pressable>
					<Text style={styles.headerTitle}>About STATERA</Text>
					<View style={styles.headerSpacer} />
				</View>
				<View style={styles.headerDivider} />
			</View>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* What is STATERA? */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>What is STATERA?</Text>
					<Text style={styles.bodyText}>
						STATERA is a digital usage and academic pattern tracker.
					</Text>
					<Text style={styles.bodyText}>
						It analyzes screen time distribution and academic indicators over a
						selected period to generate a descriptive behavioral status.
					</Text>
					<Text style={styles.bodyText}>
						STATERA does not diagnose personality traits or provide
						psychological advice. It is designed to support digital awareness
						and self-reflection.
					</Text>
					<Text style={styles.bodyText}>
						Your data remains private and under your control.
					</Text>
					<View style={styles.sectionDivider} />
				</View>

				{/* How It Works */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>How It Works</Text>
					<Text style={styles.bodyText}>STATERA analyzes:</Text>
					<View style={styles.bulletList}>
						<Text style={styles.bulletItem}>{"\u2022"} Your selected tracking duration (default: 7 days)</Text>
						<Text style={styles.bulletItem}>{"\u2022"} App usage time distribution</Text>
						<Text style={styles.bulletItem}>{"\u2022"} Your academic performance input (e.g., GWA)</Text>
					</View>
					<Text style={styles.bodyText}>
						It then generates a behavioral status that reflects observable
						patterns between digital engagement and academic activity.
					</Text>
					<Text style={styles.bodyText}>
						The results are descriptive, not clinical.
					</Text>
					<View style={styles.sectionDivider} />
				</View>

				{/* Our Purpose */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Our Purpose</Text>
					<Text style={styles.bodyText}>STATERA was built to:</Text>
					<View style={styles.bulletList}>
						<Text style={styles.bulletItem}>{"\u2022"} Promote digital awareness</Text>
						<Text style={styles.bulletItem}>{"\u2022"} Encourage balanced screen habits</Text>
						<Text style={styles.bulletItem}>{"\u2022"} Provide transparency in usage patterns</Text>
						<Text style={styles.bulletItem}>{"\u2022"} Support self-reflection</Text>
					</View>
					<View style={styles.sectionDivider} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	headerContainer: {
		backgroundColor: "#ffffff",
	},
	headerInner: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 24,
		paddingHorizontal: 20,
		paddingBottom: 12,
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
	headerDivider: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		paddingBottom: 40,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1a1a1a",
		marginBottom: 8,
	},
	bodyText: {
		fontSize: 14,
		color: "#333333",
		lineHeight: 20,
		marginBottom: 8,
	},
	bulletList: {
		marginVertical: 4,
		marginLeft: 8,
		marginBottom: 8,
	},
	bulletItem: {
		fontSize: 14,
		color: "#333333",
		lineHeight: 20,
		marginBottom: 4,
	},
	sectionDivider: {
		height: 1,
		backgroundColor: "#E0E0E0",
		marginTop: 12,
	},
});

