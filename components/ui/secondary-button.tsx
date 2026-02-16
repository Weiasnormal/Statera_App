import React from "react";
import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    ViewStyle,
} from "react-native";

type SecondaryButtonProps = {
  title: string;
  style?: ViewStyle;
} & Pick<PressableProps, "onPress" | "disabled">;

export function SecondaryButton({ title, onPress, disabled, style }: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && !disabled && styles.buttonPressed, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: "#6b6b6b",
    fontSize: 14,
    fontWeight: "500",
  },
});
