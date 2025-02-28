import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Card } from "@/components";
import { clearData } from "@/lib/storage";
import Constants from "expo-constants";


const LogoImage = require("@/assets/images/logo.png");
const BadgeImage = require("@/assets/images/badge.png");

const SettingScreen: React.FC = () => {
  const handleLogout = async () => {
    await clearData("token");

    router.replace("/");
  };

  const top = Constants.statusBarHeight;

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl" style={{
        paddingTop: top,
      }}>
        <Pressable className="absolute z-10 m-5" onPress={() => router.back()}>
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
          <View className="shadow-soft-1">
          <Card className="p-0 bg-white border-transparent">
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-lg font-semibold">Mein Account</Text>
            </View>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]"
              onPress={() => router.push("/(main)/home/profile/forgot")}
            >
              <MaterialIcons name="mail-outline" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">
                E-Mail / Passwort ändern
              </Text>
            </Pressable>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3"
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">Logout</Text>
            </Pressable>
          </Card>
          </View>
          <View className="shadow-soft-1">
          <Card className="p-0 bg-white border-transparent">
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-lg font-semibold">
                Feedback & Kontakt
              </Text>
            </View>
            <Pressable
              className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]"
              onPress={() => router.push("/(main)/home/profile/feedback")}
            >
              <MaterialIcons name="feedback" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">
                Feeback zur Canbase App
              </Text>
            </Pressable>
          </Card>
          </View>
          <View className="shadow-soft-1">
          <Card className="p-0 bg-white border-transparent">
          
            <View className="px-5 py-3 border-b border-[#EAEAEA]">
              <Text className="text-lg font-semibold">Rechtliches</Text>
            </View>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">
                Datenschutzerklärung
              </Text>
            </Pressable>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">Impressum</Text>
            </Pressable>
            <Pressable className="flex flex-row items-center gap-3 px-5 py-3 border-b border-[#EAEAEA]">
              <Feather name="external-link" size={16} color="#9F9F9F" />
              <Text className="text-sm text-muted-foreground">AGB</Text>
            </Pressable>
          </Card>
          </View>
          <Card className="flex flex-col gap-1.5 justify-center items-center p-5">
          <View
          className="flex flex-row items-center justify-center mb-2"
        >
          <Image style={{ width: 24, height: "100%" }} source={LogoImage} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 32,
              color: "#00C978",
              letterSpacing: -2,
              marginTop: -5,
            }}
          >
            canbase
          </Text>
        </View>
            <View className="flex flex-col justify-center items-center">
              <Text className="text-sm font-medium text-muted-foreground">Version 1.0</Text>
              <Text className="text-sm font-medium text-muted-foreground">© 2024 Canbase</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
