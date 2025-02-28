import React, { useRef, useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-qr-code";
import { useAppSelector } from "@/store/hook";
import { Card } from "@/components";
import { UPLOAD_URI } from "@/config/env";
import { cardBGColorData, cardTextColorData } from "@/lib/color";
import { isEmpty } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BadgeImage = require("@/assets/images/badge.png");
const LogoWhite = require("@/assets/images/logo_white.png");
const CardLogo = require("@/assets/images/card_logo.png");

const ProfileScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { club } = useAppSelector((state) => state.club);

  const { top } = useSafeAreaInsets();

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

  return (
    <View className="w-full h-full">
      {/* Header */}
      <View
        className="relative overflow-hidden bg-[#00C978] rounded-b-xl"
        style={{ paddingTop: top }}
      >
        <View className="flex flex-row justify-between items-center p-5">
          <Text className="font-extrabold	text-2xl text-white">Profil</Text>
          <Pressable
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full z-10"
            onPress={() => router.push("/(main)/home/profile/setting")}
          >
            <FontAwesome name="sliders" size={16} color="black" />
          </Pressable>
        </View>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView
        className="p-5 flex flex-col"
        contentContainerClassName="gap-5"
      >
        {/* {!isEmpty(user?.club) && 
        <ProfileCard />
        } */}
        <View className="flex flex-col gap-3">
          {!isEmpty(user?.club) && (
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
                          className="w-full h-full rounded-full"
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
                      className={cn(
                        "text-base font-medium",
                        club?.card?.textColor
                          ? cardTextColorData.find(
                              (f) => f.name === club.card?.textColor
                            )?.textColor
                          : ""
                      )}
                    >
                      {user?.username}
                    </Text>
                    <Text className="text-sm text-white">{club?.clubname}</Text>
                    <Text className="text-sm text-white">
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
          )}
          <Card className="p-0">
            <View className="flex flex-col gap-3 p-5 border-b border-[#EAEAEA]">
              <View className="w-16 h-16">
                {user?.avatar === undefined ? (
                  <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] rounded-full">
                    <FontAwesome name="user" size={24} color="black" />
                  </View>
                ) : (
                  <Image
                    className="w-full h-full rounded-full"
                    placeholder="avatar"
                    source={{ uri: UPLOAD_URI + user.avatar }}
                  />
                )}
              </View>
              <View className="flex flex-col space-y-1">
                <Text className="text-sm font-semibold">{user?.username}</Text>
                <Text className="text-sm text-[#9F9F9F]">{user?.email}</Text>
              </View>
            </View>
            {!isEmpty(user?.club) && (
              <>
                <View className="px-5 py-3 border-b border-[#EAEAEA]">
                  <Pressable
                    className="flex flex-row items-center gap-3"
                    onPress={() => router.push("/(main)/home/profile/booking")}
                  >
                    <MaterialCommunityIcons
                      name="checkbook"
                      size={16}
                      color="black"
                    />
                    <Text className="text-base">Buchungen</Text>
                  </Pressable>
                </View>
                <View className="px-5 py-3 border-b border-[#EAEAEA]">
                  <Pressable
                    className="flex flex-row items-center gap-3"
                    onPress={() =>
                      router.push("/(main)/home/profile/membership")
                    }
                  >
                    <MaterialCommunityIcons
                      name="ticket-confirmation-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="text-base">Mitgliedschaft</Text>
                  </Pressable>
                </View>
              </>
            )}
            <View className="px-5 py-3">
              <Pressable
                className="flex flex-row items-center gap-3"
                onPress={() => router.push("/(main)/home/profile/edit")}
              >
                <Feather name="user" size={16} color="black" />
                <Text className="text-base">Profil bearbeiten</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileCard = () => {
  return <View className="w-full aspect-video bg-black/95 rounded-xl p-4 relative overflow-hidden">
          <View className="flex flex-row items-center justify-end">
            <Image
              source={LogoWhite}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </View>

          <View className="flex items-start justify-end grow gap-1 p-2">
            <Text className="text-white font-semibold text-sm">@maxmustermann</Text>
            <Text className="text-white text-sm">CSC Berlin</Text>
            <Text className="text-white py-0.5 text-sm">ABCD-001-332</Text>
          </View>

          <Image source={CardLogo}  contentFit="contain" className="aspect-[158/104]" style={{width: '66%', height: '100%', position: 'absolute', bottom: 0, right: 0}} />
        </View>
}

export default ProfileScreen;
