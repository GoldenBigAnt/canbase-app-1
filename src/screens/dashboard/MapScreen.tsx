import React from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { BroccoliMap } from '@/components/features/broccoli-map';

const BadgeImage = require("@/assets/images/badge.png");

const MapScreen: React.FC = () => {
  return (
    <View className="w-full h-full">
      <BroccoliMap />

      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <Text className="p-5 font-extrabold	text-2xl text-white">
          Brokkolikarte
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
    </View>
  );
};

export default MapScreen;
