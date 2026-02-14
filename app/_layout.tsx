import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)/get_started"
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="(tabs)/input"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/view-results"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/modal/how_it_works"
        options={{ presentation: "transparentModal", headerShown: false }}
      />
    </Stack>
  );
}
