import React from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { ClubCard } from "@/components";
import { clubCardData } from "@/lib/constant";
import Constants from "expo-constants";

const BadgeImage = require("@/assets/images/badge.png");

const CommonScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const top = Constants.statusBarHeight;
  
  return (
    <View className="w-full h-full">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl" style={{ paddingTop: top }}>
        <Text className="p-5 font-extrabold	text-2xl text-white">
          Hallo, {user?.username}
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <View className="flex flex-col gap-5 m-5">
        {clubCardData.map((item, key) => (
          <View key={key}>
            <ClubCard
              title={item.title}
              icon={item.icon}
              content={item.content}
              btnIcon={item.btnIcon}
              btnText={item.btnText}
              route={item.route}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CommonScreen;
