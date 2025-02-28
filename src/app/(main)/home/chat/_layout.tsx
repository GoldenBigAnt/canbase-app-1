import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { channelActions } from "@/store/reducers/channelReducer";
import { getAllChannels } from "@/actions/chat";

const ClubLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const result = await getAllChannels();

      if (result.success) {
        dispatch(channelActions.setChannel({ channel: result.channel }));
      }
    })();
  }, [dispatch]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="channel" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ClubLayout;
