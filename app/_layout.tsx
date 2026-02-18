import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="_loading_screen"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="(tabs)/get_started"
        options={{ animation: "fade" }}
      />
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
        name="(tabs)/modal/how_it_works"
        options={{ 
          presentation: "transparentModal", 
          animation: "fade",
          headerShown: false 
        }}
      />
    </Stack>
  );
}
