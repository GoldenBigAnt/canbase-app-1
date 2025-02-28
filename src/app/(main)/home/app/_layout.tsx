import React from "react";
import { Stack } from "expo-router";

const AppStartLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AppStartLayout;
