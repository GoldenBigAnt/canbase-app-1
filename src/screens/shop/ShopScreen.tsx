import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StrainCard } from "@/components";

const BadgeImage = require("@/assets/images/badge.png");

const ShopScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { strains } = useAppSelector((state) => state.strains);
  const { reservation } = useAppSelector((state) => state.reservation);

  return (
    <View className="w-full h-full">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <View className="flex flex-row justify-between items-center p-5">
          <Text className="font-extrabold	text-2xl text-white">Abgabe</Text>
          <Pressable
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full z-10"
            onPress={() => router.push("/(main)/home/shop/reservation")}
          >
            <Feather name="shopping-cart" size={14} color="black" />
          </Pressable>
        </View>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView className="flex-1">
        <View className="m-3.5">
          <View className="flex flex-row flex-wrap">
            {strains.map((item, key) => (
              <Pressable
                className="w-1/2"
                key={key}
                onPress={() =>
                  router.push({
                    pathname: "/(main)/home/shop/[id]",
                    params: { id: item.strainID as string },
                  })
                }
              >
                <StrainCard strain={item} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between items -center mx-5 my-3 p-1.5 bg-[#00C978] rounded-xl">
        <Text className="text-base text-white">
          {`Ausgewählt: ${reservation.reduce(
            (accumulator, current) => accumulator + current.amount,
            0
          )}g/20g heute`}
        </Text>
        <Pressable
          className="px-1.5 border border-white rounded-xl"
          onPress={() => router.push("/(main)/home/shop/reservation")}
        >
          <Text className="text-sm text-white">Reservieren</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ShopScreen;
