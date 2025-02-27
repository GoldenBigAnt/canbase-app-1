import React from "react";
import { Stack } from "expo-router";

const ProfileLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="membership" />
      <Stack.Screen name="edit" />
      <Stack.Screen name="setting" />
      <Stack.Screen name="forgot" />
      <Stack.Screen name="feedback" />
    </Stack>
  );
};

export default ProfileLayout;
