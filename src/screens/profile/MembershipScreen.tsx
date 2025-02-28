import React, { useState, useRef } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-qr-code";
import { useAppSelector } from "@/store/hook";
import { Card } from "@/components";
import { UPLOAD_URI } from "@/config/env";
import { cardBGColorData, cardTextColorData } from "@/lib/color";
import { getCleanDate } from "@/lib/functions";
import { cn } from "@/lib/utils";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
} from "@expo-google-fonts/ubuntu";

const BadgeImage = require("@/assets/images/badge.png");
const LogoWhite = require("@/assets/images/logo_white.png");
const CardLogo = require("@/assets/images/card_logo.png");

const MembershipScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { club } = useAppSelector((state) => state.club);

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;

    Animated.spring(animatedValue, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Mitgliedschaft
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <View className="flex flex-col gap-3 m-5">
          <Pressable className="group" onPress={flipCard}>
            <View className="aspect-[16/9]">
              <Animated.View
                className={cn(
                  "absolute w-full h-full border rounded-2xl overflow-hidden",
                  club?.card?.cardColor
                    ? cardBGColorData.find(
                        (f) => f.name === club.card?.cardColor
                      )?.bgColor
                    : ""
                )}
                style={{
                  transform: [{ rotateY: frontInterpolate }],
                  backfaceVisibility: "hidden",
                }}
              >
                {club?.card?.frontBadge && (
                  <Image
                    className="absolute w-full h-full rounded-2xl"
                    source={{
                      uri: UPLOAD_URI + club.card.frontBadge,
                    }}
                  />
                )}
                {club?.card?.clubShown && (
                  <View className="absolute top-4 left-4 w-14 h-14">
                    {club.avatar === undefined ? (
                      <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] rounded-full">
                        <Feather name="home" size={20} color="black" />
                      </View>
                    ) : (
                      <Image
                        className="w-full h-full  rounded-full"
                        placeholder="avatar"
                        source={{ uri: UPLOAD_URI + club.avatar }}
                      />
                    )}
                  </View>
                )}
                <View className="absolute flex items-center top-4 right-4">
                  <Image
                    className="w-3 h-6"
                    source={LogoWhite}
                    placeholder="logo-white"
                  />
                </View>
                <View className="absolute flex flex-col gap-1 bottom-4 left-4">
                  <Text
                    style={{ fontFamily: "Ubuntu_500Medium" }}
                    className={cn(
                      "text-sm",
                      club?.card?.textColor
                        ? cardTextColorData.find(
                            (f) => f.name === club.card?.textColor
                          )?.textColor
                        : ""
                    )}
                  >
                    {user?.username}
                  </Text>
                  <Text
                    className="text-xs text-white"
                    style={{ fontFamily: "Ubuntu_400Regular" }}
                  >
                    {club?.clubname}
                  </Text>
                  <Text
                    className="text-xs text-white"
                    style={{ fontFamily: "Ubuntu_400Regular" }}
                  >
                    {user?.memberID &&
                      club?.clubID &&
                      `${club.clubID}-${user.memberID}`}
                  </Text>
                </View>
                {club?.card?.logoShown && (
                  <View className="absolute bottom-0 right-16">
                    <Image
                      className="w-20 h-32"
                      source={CardLogo}
                      placeholder="card-logo"
                    />
                  </View>
                )}
              </Animated.View>
              <Animated.View
                className={cn(
                  "absolute w-full h-full border rounded-2xl overflow-hidden",
                  club?.card?.cardColor
                    ? cardBGColorData.find(
                        (f) => f.name === club.card?.cardColor
                      )?.bgColor
                    : ""
                )}
                style={{
                  transform: [{ rotateY: backInterpolate }],
                  backfaceVisibility: "hidden",
                }}
              >
                {club?.card?.backBadge && (
                  <Image
                    className="absolute w-full h-full rounded-2xl"
                    source={{
                      uri: UPLOAD_URI + club.card.backBadge,
                    }}
                  />
                )}
                <View
                  className={cn(
                    "absolute w-full h-full flex items-center px-5",
                    club?.card?.position === "left"
                      ? "justify-start"
                      : club?.card?.position === "right"
                      ? "justify-end"
                      : "justify-center"
                  )}
                >
                  <View className="flex flex-col justify-center items-center gap-1">
                    <View className="border border-white">
                      <QRCode
                        size={85}
                        value={`${club?.clubID}-${user?.memberID}`}
                      />
                    </View>
                    <Text className="text-sm text-white">{`${club?.clubID}-${user?.memberID}`}</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </Pressable>
          <Card className="p-0 shadow-md bg-white rounded-2xl">
            <View className="flex flex-row items-center gap-3 px-6 p-5 border-b border-[#EAEAEA]">
              {/* <FontAwesome name="user" size={24} color="black" /> */}
              <Feather name="user" size={20} color="black" />
              <View className="flex flex-col">
                <Text className="text-base font-medium">
                  Meine Mitgliedschaft
                </Text>
                <Text className="text-xs">{`${club?.clubname} / ${user?.memberID}`}</Text>
              </View>
            </View>
            <View className="flex flex-col gap-5 px-6 p-5">
              <View className="flex flex-col gap-1">
                <Text className="text-sm text-[#9F9F9F]">Status</Text>
                {user?.status === "active" && (
                  <View className="inline-flex self-start items-center px-3 py-2 rounded-lg" style={{backgroundColor: '#00C97826'}}>
                    <Text className="text-xs text-[#00C978]">Aktiv</Text>
                  </View>
                )}
                {user?.status === "inactive" && (
                  <View className="inline-flex self-start items-center px-3 py-2 bg-[#FEF0F2] rounded-lg">
                    <Text className="text-xs text-[#BD4C4D]">Inaktiv</Text>
                  </View>
                )}
              </View>
              <View className="flex flex-col gap-1">
                <Text className="text-sm text-[#9F9F9F]">Mitglied seit</Text>
                <Text className="text-sm">
                  {getCleanDate(String(user?.memberdate), 2)}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default MembershipScreen;
