import { theme } from "@/theme";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import * as Haptics from "expo-haptics";

interface PlantlyButtonI {
  onPress: () => void;
  text: string;
}

const PlantlyButton: React.FC<PlantlyButtonI> = ({ onPress, text }) => {
  const handlePressWithHaptics = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };
  return (
    <Pressable
      onPress={handlePressWithHaptics}
      style={(state) => {
        if (state.pressed) {
          return [styles.button, styles.buttonPressed];
        } else {
          return [styles.button];
        }
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.colorGreen,
  },
  buttonPressed: {
    backgroundColor: theme.colorLeafyGreen,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colorWhite,
    textAlign: "center",
  },
});

export default PlantlyButton;
