import React from "react";
import { Stack } from "expo-router";

const ClubLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="member" />
      <Stack.Screen name="grow" />
      <Stack.Screen name="finance" />
      <Stack.Screen name="setting" />
      <Stack.Screen name="map" />
    </Stack>
  );
};

export default ClubLayout;
