import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onBoarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addPlant"
        options={{
          title: "Add New Plant",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
