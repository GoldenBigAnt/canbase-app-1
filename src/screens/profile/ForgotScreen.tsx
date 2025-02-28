import React from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import WebView from "react-native-webview";
import { WEBVIEW_FORGOT } from "@/config/env";
import { message } from "@/lib/utils";
import { View } from 'react-native';

const ForgotScreen: React.FC = () => {
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

      if (response.success) {
        message({ message: response.msg });

        router.replace("/(main)/home/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full h-full overflow-hidden">
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        source={{ uri: WEBVIEW_FORGOT }}
      />
    </View>
  );
};

export default ForgotScreen;
