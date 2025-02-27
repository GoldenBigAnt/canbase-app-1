import React from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import WebView from "react-native-webview";
import { WEBVIEW_FINANCE } from "@/config/env";
import { View } from 'react-native';

const FinanceScreen: React.FC = () => {
  const handleNavigationStateChange = (navState: any) => {
    if (!navState.url.includes("/club/finance")) {
      router.replace("/(main)/home/club");
    }
  };

  return (
    <View className="w-full h-full overflow-hidden">
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: WEBVIEW_FINANCE }}
      />
    </View>
  );
};

export default FinanceScreen;
