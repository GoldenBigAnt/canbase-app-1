import React, { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { Card, ClubLink, Overview } from "@/components";
import { cn } from "@/lib/utils";
import { UPLOAD_URI } from "@/config/env";
import { isEmpty } from "@/lib/functions";

const BadgeImage = require("@/assets/images/badge.png");

const ClubScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { club } = useAppSelector((state) => state.club);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="w-full h-full">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <View className="flex flex-row justify-between items-center p-5">
          <Text className="font-extrabold	text-2xl text-white">Mein Club</Text>
          <Pressable
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full z-10"
            onPress={() => router.push("/(main)/home/club/map")}
          >
            <Feather name="map" size={16} color="black" />
          </Pressable>
        </View>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <View className="flex flex-col gap-5 m-5">
          <View className="flex flex-col gap-1.5">
            <View className="flex flex-row items-center gap-1.5">
              <View className="flex-1">
                <ClubLink
                  title="Mitglieder"
                  icon={<Feather name="users" size={16} color="black" />}
                  link="/(main)/home/club/member"
                  disabled={
                    !(
                      user?.role === "owner" ||
                      user?.functions?.includes("club-members-menu-members") ||
                      user?.functions?.includes("club-members-menu-invite") ||
                      user?.functions?.includes(
                        "club-members-menu-membership"
                      ) ||
                      user?.functions?.includes("club-members-menu-role")
                    )
                  }
                />
              </View>
              <View className="flex-1">
                <ClubLink
                  title="Grow Control"
                  icon={
                    <MaterialCommunityIcons
                      name="sprout"
                      size={16}
                      color="black"
                    />
                  }
                  link="/(main)/home/club/grow"
                  disabled={
                    !(
                      user?.role === "owner" ||
                      user?.functions?.includes("club-grow-read") ||
                      user?.functions?.includes("club-grow-manage")
                    )
                  }
                />
              </View>
            </View>
            <View className="flex flex-row items-center gap-1.5">
              <View className="flex-1">
                <ClubLink
                  title="Finanzen"
                  icon={
                    <MaterialCommunityIcons
                      name="bank"
                      size={16}
                      color="black"
                    />
                  }
                  link="/(main)/home/club/finance"
                  disabled={
                    !(
                      user?.role === "owner" ||
                      user?.functions?.includes("club-finance-book_read") ||
                      user?.functions?.includes("club-finance-book_write") ||
                      user?.functions?.includes("club-finance-book_manange") ||
                      user?.functions?.includes(
                        "club-finance-transactions-read"
                      ) ||
                      user?.functions?.includes(
                        "club-finance-transactions-manange"
                      ) ||
                      user?.functions?.includes("club-finance-setting-read") ||
                      user?.functions?.includes("club-finance-setting-manange")
                    )
                  }
                />
              </View>
              <View className="flex-1">
                <ClubLink
                  title="Einstellungen"
                  icon={<Feather name="settings" size={16} color="black" />}
                  link="/(main)/home/club/setting"
                  disabled={
                    !(
                      user?.role === "owner" ||
                      user?.functions?.includes("club-settings-menu-profile") ||
                      user?.functions?.includes("club-settings-menu-general") ||
                      user?.functions?.includes("club-settings-menu-design") ||
                      user?.functions?.includes("club-settings-menu-documents")
                    )
                  }
                />
              </View>
            </View>
          </View>
          <Card className="p-0">
            <View className="relative h-28 bg-[#EAEAEA] border-b border-[#D9D9D9]">
              {club?.badge === undefined ? (
                <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8]">
                  <Feather name="home" size={28} color="black" />
                </View>
              ) : (
                <Image
                  className="w-full h-full"
                  placeholder="badge"
                  source={{ uri: UPLOAD_URI + club.badge }}
                />
              )}
              <View className="absolute top-3 right-3 z-10">
                {club?.status === "default" && (
                  <View className="inline-flex self-start items-center p-1 bg-[#FBCB1526] rounded-md">
                    <Text className="text-sm text-[#FBCB15]">In Gründung</Text>
                  </View>
                )}
                {club?.status === "verify" && (
                  <View className="inline-flex self-start items-center p-1 bg-[#55A3FF26] rounded-md">
                    <Text className="text-sm text-[#55A3FF]">
                      Eingetragener Verein
                    </Text>
                  </View>
                )}
                {club?.status === "license" && (
                  <View className="inline-flex self-start items-center p-1 bg-[#00C97825] rounded-md">
                    <Text className="text-sm text-[#00C978]">
                      Lizensierter Verein
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="relative mx-5 bg-white">
              <View className="absolute -top-7 w-14 h-14">
                {club?.avatar === undefined ? (
                  <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] border-2 border-white rounded-full">
                    <Feather name="home" size={20} color="black" />
                  </View>
                ) : (
                  <Image
                    className="w-full h-full border-2 border-white rounded-full"
                    placeholder="avatar"
                    source={{ uri: UPLOAD_URI + club.avatar }}
                  />
                )}
              </View>
              {club?.status === "license" && (
                <View className="absolute top-2 left-10 z-10">
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={16}
                    color="#00C978"
                  />
                </View>
              )}
              <Text
                className={cn(
                  "mt-10 text-xl font-medium",
                  isEmpty(club?.description) && "mb-10"
                )}
              >
                {club?.clubname}
              </Text>
            </View>
            {!isEmpty(club?.description) && (
              <>
                <View className={cn("relative", isOpen ? "h-auto" : "h-16")}>
                  {!isOpen && (
                    <LinearGradient
                      className="absolute w-full h-full z-10"
                      colors={["transparent", "white"]}
                      start={[0, 0]}
                      end={[0, 1]}
                    />
                  )}
                  <View className="px-5 py-3">
                    <Text className="text-sm">{club?.description}</Text>
                  </View>
                </View>
                <Pressable
                  className="flex flex-col justify-center items-center pb-1.5"
                  onPress={() => setIsOpen((prev) => !prev)}
                >
                  {!isOpen ? (
                    <>
                      <Feather name="chevron-down" size={16} color="#9F9F9F" />
                      <Text className="text-[10px] text-[#9F9F9F]">
                        Mehr anzeigen
                      </Text>
                    </>
                  ) : (
                    <>
                      <Feather name="chevron-up" size={16} color="#9F9F9F" />
                      <Text className="text-[10px] text-[#9F9F9F]">
                        Weniger anzeigen
                      </Text>
                    </>
                  )}
                </Pressable>
              </>
            )}
          </Card>
          {club?.info_members && (
            <Overview
              title="Information für Mitglieder"
              contnet={club.info_members}
            />
          )}
          {club?.prevent_info && (
            <Overview
              title="Jugendschutz & Prävention"
              description="Weitere Informationen findest du auf cannabispraevention.de"
              contnet={club.prevent_info}
            />
          )}
          <Card className="flex flex-col space-y-1 px-5 py-3">
            <Text className="text-xl font-medium">Standort</Text>
            <Text className="text-sm text-[#9F9F9F]">Deutschland</Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClubScreen;
