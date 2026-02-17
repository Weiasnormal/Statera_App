import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type SecondaryButtonProps = {
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
} & Pick<PressableProps, "onPress" | "disabled">;

export function SecondaryButton({
  title,
  icon,
  iconPosition = "left",
  onPress,
  disabled,
  style,
  textStyle,
}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        style,
      ]}
    >
      {icon && iconPosition === "left" ? (
        <View style={styles.icon}>{icon}</View>
      ) : null}
      <Text style={[styles.text, icon ? styles.textWithIcon : null, textStyle]}>
        {title}
      </Text>
      {icon && iconPosition === "right" ? (
        <View style={styles.icon}>{icon}</View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: "#6b6b6b",
    fontSize: 14,
    fontWeight: "500",
  },
  textWithIcon: {
    marginHorizontal: 6,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
