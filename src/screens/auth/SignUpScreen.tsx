import React from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";
import { WEBVIEW_SIGNUP } from "@/config/env";
import { View } from 'react-native';

const SignUpScreen: React.FC = () => {
  const handleNavigationStateChange = (navState: any) => {
    if (navState.url.includes("/welcome") || navState.url.includes("/login")) {
      router.replace("/");
    }
  };

  return (
    <View className="w-full h-full overflow-hidden">
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: WEBVIEW_SIGNUP }}
      />
    </View>
  );
};

export default SignUpScreen;
