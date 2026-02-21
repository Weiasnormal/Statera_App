import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, type TextProps } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});

const textWithDefaultProps = Text as typeof Text & {
  defaultProps?: TextProps;
};
const defaultTextStyle = textWithDefaultProps.defaultProps?.style;
textWithDefaultProps.defaultProps = {
  ...textWithDefaultProps.defaultProps,
  style: [{ fontFamily: "Poppins_400Regular" }, defaultTextStyle],
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="_loading_screen" options={{ animation: "fade" }} />
      <Stack.Screen name="(tabs)/get_started" options={{ animation: "fade" }} />
      <Stack.Screen
        name="(tabs)/instruction_page"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen name="(tabs)/gwa_input" />
      <Stack.Screen
        name="(tabs)/usage_request"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/data_connected"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/navigation-pages/overview"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/navigation-pages/analysis"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/navigation-pages/tracking_duration"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen name="nav" options={{ animation: "slide_from_right" }} />
      <Stack.Screen
        name="(tabs)/navigation-pages/meet-the-team"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/navigation-pages/about_statera"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/modal/how_it_works"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
