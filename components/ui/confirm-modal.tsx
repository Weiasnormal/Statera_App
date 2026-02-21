import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  onRequestClose?: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
  onRequestClose,
}: ConfirmModalProps) {
  const handleRequestClose = () => {
    if (onRequestClose) {
      onRequestClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleRequestClose}
    >
      <TouchableWithoutFeedback onPress={handleRequestClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <Text style={styles.title}>{title}</Text>
              {message ? <Text style={styles.message}>{message}</Text> : null}

              <View style={styles.actions}>
                <PrimaryButton title={primaryLabel} onPress={onPrimaryPress} />
                {secondaryLabel && onSecondaryPress ? (
                  <SecondaryButton
                    title={secondaryLabel}
                    onPress={onSecondaryPress}
                    style={styles.secondaryButton}
                  />
                ) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#343235",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  actions: {
    alignItems: "stretch",
  },
  secondaryButton: {
    marginTop: 8,
  },
});
