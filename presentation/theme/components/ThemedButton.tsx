import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";
import { ThemedText } from "./themed-text";

interface Props extends PressableProps {
  title?: string;
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? primaryColor + "90" : primaryColor,
        },
        styles.button,
      ]}
      {...rest}
    >
      <ThemedText style={{ paddingVertical: 4, color: "white" }}>
        {children}
      </ThemedText>

      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginLeft: 10 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 5,
  },
});
