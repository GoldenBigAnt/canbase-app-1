import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { loadData } from "@/lib/storage";

const LogoImage = require("@/assets/images/logo.png");
const VectorImage = require("@/assets/images/vector.png");

const AppScreen: React.FC = () => {
  const handleLogin = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(main)/home");
    } else {
      router.push("/(auth)/login");
    }
  };

  const handleRegister = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(main)/home");
    } else {
      router.push("/(auth)/signup");
    }
  };

  return (
    <View className="w-full h-full flex flex-col justify-evenly items-center px-10">
      <View className="flex flex-row items-center">
        <Image className="w-8 h-8" source={LogoImage} placeholder="logo" />
        <Text className="font-bold text-3xl text-[#00C978]">canbase</Text>
      </View>
      <Image
        className="w-28 h-[120px]"
        source={VectorImage}
        placeholder="vector"
      />
      <View className="w-full flex flex-col space-y-7">
        <View className="flex flex-col items-center space-y-3">
          <Text className="font-bold text-lg">Club verwalten</Text>
          <Text className="text-base text-center text-[#9F9F9F]">
            Verwalte deinen Social Club{"\n"}jederzeit und von überall.
          </Text>
        </View>
        <View className="flex flex-col items-center space-y-5">
          <Pressable
            className="w-full py-2 bg-[#00C978] rounded-lg"
            onPress={handleRegister}
          >
            <Text className="font-bold text-base text-center text-white">
              Los geht's
            </Text>
          </Pressable>
          <Pressable onPress={handleLogin}>
            <Text className="text-sm text-[#00C978]">
              Ich habe bereits einen Account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AppScreen;
