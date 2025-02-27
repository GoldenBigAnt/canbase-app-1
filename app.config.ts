import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

// if (!process.env.EXPO_BUILD_MAPBOX_SDK) {
//   throw new Error('[EXPO]: EXPO_BUILD_MAPBOX_SDK not set!');
// }

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "canbase-app",
  slug: "canbase-app",
  version: "0.0.4",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "de.canbase.club",
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "Wir nutzen deinen Standort für die Bubatzkarte.",
      NSLocationAlwaysAndWhenInUseUsageDescription: "Wir nutzen deinen Standort für die Bubatzkarte."
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "de.canbase.club"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png"
  },
  owner: "cupid20103",
  plugins: [
    "expo-router",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location."
      }
    ],
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsDownloadToken: process.env.EXPO_BUILD_MAPBOX_SDK,
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: "317d5d88-8fcb-4f28-81fe-93d1af765a02"
    }
  }
});