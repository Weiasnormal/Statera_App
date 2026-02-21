import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ScreenHeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  align?: "center" | "left";
};

export function ScreenHeader({ title, showBack = false, onBackPress, align = "center" }: ScreenHeaderProps) {
  const isLeft = align === "left";
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inner,
          isLeft && styles.innerLeft,
          { paddingTop: Math.max(insets.top, 8) + 8 },
        ]}
      >
        {showBack ? (
          <Pressable style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </Pressable>
        ) : !isLeft ? (
          <View style={styles.placeholder} />
        ) : null}

        <Text
          style={[
            styles.title,
            isLeft && styles.titleLeft,
            isLeft && showBack && styles.titleLeftWithBack,
          ]}
        >
          {title}
        </Text>

        {/* Right placeholder only for centered layout */}
        {!isLeft && <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  innerLeft: {
    justifyContent: "flex-start",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  titleLeft: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "700",
  },
  titleLeftWithBack: {
    marginLeft: 12,
  },
});
