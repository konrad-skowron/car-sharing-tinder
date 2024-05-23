import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";
import React from "react";

const days = {
  Monday: "M",
  Tuesday: "Tu",
  Wednesday: "W",
  Thursday: "Th",
  Friday: "F",
  Saturday: "Sa",
  Sunday: "Su",
};

const DaysPicker = ({ availableDays, isVisible, onDiscard, onConfirm, pickedDays, setPickedDays }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={{ padding: 24, gap: 24 }}>
          <Text style={{ fontFamily: FONTS.primaryRegular, color: COLORS.darkGray, fontSize: 16 }}>Choose from available days</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {availableDays &&
              Object.entries(days).map(([k, v]) => (
                <Pressable
                  key={k}
                  onPress={() => {
                    if (pickedDays.includes(k)) {
                      setPickedDays(pickedDays.filter((day) => day !== k));
                    } else {
                      setPickedDays([...pickedDays, k]);
                    }
                  }}
                  disabled={!availableDays.includes(k)}
                  style={availableDays.includes(k) ? (pickedDays.includes(k) ? styles.pressedDayButton : styles.dayButton) : styles.disabledDayButton}
                >
                  <Text style={availableDays.includes(k) ? (pickedDays.includes(k) ? styles.pressedDayText : styles.dayText) : styles.disabledDayText}>{v}</Text>
                </Pressable>
              ))}
          </View>
          <View style={{ flexDirection: "row", gap: 32, justifyContent: "space-between" }}>
            <Pressable onPress={onDiscard} style={{ flex: 1, padding: 10, backgroundColor: COLORS.white, borderColor: COLORS.darkGray, borderWidth: 3, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
              <Text style={{ fontFamily: FONTS.primaryBold, color: COLORS.darkGray, fontSize: 16 }}>Discard</Text>
            </Pressable>
            <Pressable onPress={onConfirm} disabled={!pickedDays.length} style={{ flex: 1, padding: 10, backgroundColor: COLORS.darkGray, justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
              <Text style={{ fontFamily: FONTS.primaryBold, color: "#eee", fontSize: 16 }}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DaysPicker;

const styles = StyleSheet.create({
  modalContent: {
    height: "30%",
    width: "100%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderWidth: 2,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  disabledDayButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#adadad",
    borderWidth: 2,
    borderRadius: 6,
  },

  dayButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center", borderColor: COLORS.primary, borderWidth: 2, borderRadius: 6 },

  pressedDayButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    color: "red",
    borderRadius: 6,
  },

  disabledDayText: {
    fontFamily: FONTS.primaryMedium,
    fontSize: 18,
    color: "#adadad",
  },

  dayText: { fontFamily: FONTS.primaryMedium, fontSize: 18, color: COLORS.primary },

  pressedDayText: { fontFamily: FONTS.primaryMedium, fontSize: 18, color: COLORS.white },
});
