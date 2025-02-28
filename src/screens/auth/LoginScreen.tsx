import React from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";
import { saveData } from "@/lib/storage";
import { message } from "@/lib/utils";
import { WEBVIEW_LOGIN } from "@/config/env";
import { View, Text } from 'react-native';

const LoginScreen: React.FC = () => {
  const top = Constants.statusBarHeight;
  const injectedJavaScript = `
    (function() {
      const originalXHR = window.XMLHttpRequest;
      const xhr = new originalXHR();
      window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const send = xhr.send;
        const open = xhr.open;

        xhr.open = function() {
          open.apply(xhr, arguments);
        };

        xhr.send = function() {
          xhr.addEventListener('load', function() {
            if (xhr.responseText) {
              const response = JSON.parse(xhr.responseText);
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
            }
          });

          send.apply(xhr, arguments);
        };

        return xhr;
      };
    })();
  `;

  const handleMessage = async (event: any) => {
    try {
      const response = JSON.parse(event.nativeEvent.data);
      console.log(response);


      if (response.success && response.token && response.msg) {
        await saveData("token", response.token);

        message({ message: response.msg });

        router.replace("/(main)/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigationStateChange = (navState: any) => {
    if (navState.url.includes("/forgot") || navState.url.includes("/signup")) {
      router.replace("/");
    }
  };

  return (
    <View className="w-full h-full overflow-hidden" style={{ paddingTop: top }}>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: WEBVIEW_LOGIN }}
      />
    </View>
  );
};

export default LoginScreen;
