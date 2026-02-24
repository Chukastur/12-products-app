import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  // `style` será aplicado al contenedor (View). Use `inputStyle` para el TextInput interno.
  style?: any;
  inputStyle?: any;
}

const ThemedTextInput = ({ icon, style, inputStyle, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { style: textInputStyleFromRest, ...textInputProps } = rest as any;

  return (
    <View
      style={[
        styles.border,
        { borderColor: isActive ? primaryColor : "#ccc" },
        style,
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={textColor}
          style={{ marginRight: 10 }}
        />
      )}

      <TextInput
        ref={inputRef}
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={[
          { color: textColor, marginRight: 10, flex: 1 },
          textInputStyleFromRest,
          inputStyle,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
