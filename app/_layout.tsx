import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)/dashboard"
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="(tabs)/input"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="(tabs)/modal/how_it_works"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
