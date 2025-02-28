import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { strainsActions } from "@/store/reducers/strainsReducer";
import { getStrains } from "@/actions/shop";

const ShopLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const result = await getStrains();

      if (result.success) {
        dispatch(strainsActions.setStrains({ strains: result.strains }));
      }
    })();
  }, [dispatch]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="reservation" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ShopLayout;
