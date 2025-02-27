import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Card } from "@/components";
import { clearData } from "@/lib/storage";

const LogoImage = require("@/assets/images/logo.png");
const BadgeImage = require("@/assets/images/badge.png");

const SettingScreen: React.FC = () => {
  const handleLogout = async () => {
    await clearData("token");

    router.replace("/");
  };

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Weitere Einstellungen
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <View className="flex flex-col gap-5 m-5">
          <Card className="p-0">
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-xl font-semibold">Mein Account</Text>
            </View>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]"
              onPress={() => router.push("/(main)/home/profile/forgot")}
            >
              <MaterialIcons name="mail-outline" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">
                E-Mail / Passwort ändern
              </Text>
            </Pressable>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3"
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">Logout</Text>
            </Pressable>
          </Card>
          <Card className="p-0">
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-xl font-semibold">
                Feedback & Kontakt
              </Text>
            </View>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]"
              onPress={() => router.push("/(main)/home/profile/feedback")}
            >
              <MaterialIcons name="feedback" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">
                Feeback zur Canbase App
              </Text>
            </Pressable>
          </Card>
          <Card className="p-0">
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-xl font-semibold">Rechtliches</Text>
            </View>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">
                Datenschutzerklärung
              </Text>
            </Pressable>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">Impressum</Text>
            </Pressable>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-base text-[#9F9F9F]">AGB</Text>
            </Pressable>
          </Card>
          <Card className="flex flex-col gap-1.5 justify-center items-center p-5">
            <View className="flex flex-row items-center">
              <Image
                className="w-8 h-8"
                source={LogoImage}
                placeholder="logo"
              />
              <Text className="font-bold text-3xl text-[#00C978]">canbase</Text>
            </View>
            <View className="flex flex-col justify-center items-center">
              <Text className="text-base text-[#9F9F9F]">Version 1.0</Text>
              <Text className="text-base text-[#9F9F9F]">© 2024 Canbase</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
