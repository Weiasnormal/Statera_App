import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ScreenHeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  align?: "center" | "left";
  rightAction?: React.ReactNode;
};

export function ScreenHeader({
  title,
  showBack = false,
  onBackPress,
  align = "center",
  rightAction,
}: ScreenHeaderProps) {
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
            <Ionicons name="arrow-back" size={22} color="#343235" />
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

        {rightAction ? (
          <View style={styles.rightAction}>{rightAction}</View>
        ) : !isLeft ? (
          <View style={styles.placeholder} />
        ) : null}
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
  rightAction: {
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#343235",
  },
  titleLeft: {
    textAlign: "left",
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  titleLeftWithBack: {
    marginLeft: 12,
  },
});
