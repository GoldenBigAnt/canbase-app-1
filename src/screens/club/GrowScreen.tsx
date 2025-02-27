import React from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import WebView from "react-native-webview";
import { WEBVIEW_GROW_CONTROL } from "@/config/env";
import { View } from 'react-native';

const GrowScreen: React.FC = () => {
  const handleNavigationStateChange = (navState: any) => {
    if (!navState.url.includes("/club/grow")) {
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
        source={{ uri: WEBVIEW_GROW_CONTROL }}
      />
    </View>
  );
};

export default GrowScreen;
