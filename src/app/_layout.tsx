import React, { useEffect } from "react";
import { Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "@/store/store";
// import { GluestackUIProvider } from '@ui/gluestack-ui-provider';
import "@/style/global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RootSiblingParent>
            <SafeAreaProvider>
              <Slot screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
          </RootSiblingParent>
        </QueryClientProvider>
      </StoreProvider>
      {/* <StatusBar style="light" backgroundColor="#00C978" /> */}
    </>
  );
};

export default RootLayout;
