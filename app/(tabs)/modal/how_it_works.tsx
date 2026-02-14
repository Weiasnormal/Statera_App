import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function HowItWorks() {
	return (
		<View style={styles.overlay}>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
			<Pressable
				style={styles.backdrop}
				accessibilityRole="button"
				accessibilityLabel="Close"
				onPress={() => router.back()}
			/>
			<SafeAreaView style={styles.sheet}>
				<View style={styles.header}>
					<View style={styles.headerSpacer} />
					<Text style={styles.title}>How STATERA Works</Text>
					<Pressable
						style={styles.closeButton}
						accessibilityRole="button"
						accessibilityLabel="Close"
						onPress={() => router.back()}
					>
						<Ionicons name="close" size={20} color="#111827" />
					</Pressable>
				</View>

				<ScrollView contentContainerStyle={styles.content}>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>1. Allow Usage Access</Text>
						<Text style={styles.cardBody}>
							Your phone&apos;s usage duration helps identify digital behavior
							patterns.
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>2. Enter Your GWA</Text>
						<Text style={styles.cardBody}>
							We use academic performance as a structured behavioral
							indicator.
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>3. Get Your Behavioral Profile</Text>
						<Text style={styles.cardBody}>
							Receive insights across five behavioral dimensions.
						</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(15, 23, 42, 0.35)",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
	},
	sheet: {
		width: "92%",
		maxWidth: 420,
		maxHeight: "80%",
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		paddingBottom: 8,
	},
	header: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerSpacer: {
		width: 32,
		height: 32,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	closeButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		gap: 12,
	},
	card: {
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: "#FFFFFF",
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 6,
	},
	cardBody: {
		fontSize: 12,
		lineHeight: 18,
		color: "#6B7280",
	},
});
