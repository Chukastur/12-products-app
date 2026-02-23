import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  const [loaded] = useFonts({
    Kanit: require("@/assets/fonts/Kanit-Regular.ttf"),
    KanitBold: require("@/assets/fonts/Kanit-Bold.ttf"),
    KanitThin: require("@/assets/fonts/Kanit-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        /> */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
