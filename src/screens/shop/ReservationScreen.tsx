import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { Card } from "@/components";
import { isEmpty } from "@/lib/functions";

const BadgeImage = require("@/assets/images/badge.png");

const ReservationScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { reservation } = useAppSelector((state) => state.reservation);

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Reservierung abschließen
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <View className="flex flex-col space-y-5 m-5">
          <Card className="p-0">
            <View className="p-5 pb-3 border-b border-[#EAEAEA]">
              <Text className="text-base font-medium">Zusammenfassung</Text>
              <Text className="text-sm text-[#9F9F9F]">
                {`Diese Produkte werden für das Mitglied ${user?.username} reserviert.`}
              </Text>
            </View>
            <View className="flex flex-col space-y-3 px-5 py-3">
              {reservation.map((item, key) => (
                <View
                  className="flex flex-col space-y-1.5 py-1.5 border-b border-[#EAEAEA]"
                  key={key}
                >
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-base">{`${item.strain.strainname} (${item.amount}g)`}</Text>
                    <Text>{800 * item.amount} $</Text>
                  </View>
                  <View className="flex flex-row">
                    {!isEmpty(item.strain?.thc) && (
                      <Text className="text-sm text-[#9F9F9F]">
                        {item.strain.thc} % THC
                      </Text>
                    )}
                    {!isEmpty(item.strain?.thc) &&
                      !isEmpty(item.strain?.cbd) && (
                        <Text className="text-sm text-[#9F9F9F]">{` / `}</Text>
                      )}
                    {!isEmpty(item.strain?.cbd) && (
                      <Text className="text-sm text-[#9F9F9F]">
                        {item.strain.cbd} % CBD
                      </Text>
                    )}
                  </View>
                </View>
              ))}
              <View className="flex flex-col space-y-1.5 py-1.5 border-b border-[#EAEAEA]">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-[#9F9F9F]">
                    enthaltene MwSt. 19%
                  </Text>
                  <Text className="text-sm text-[#9F9F9F]">
                    {`${
                      reservation.reduce(
                        (accumulator, current) => accumulator + current.amount,
                        0
                      ) *
                      8 *
                      19
                    } $`}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm">Gesamt</Text>
                  <Text className="text-sm">
                    {800 *
                      reservation.reduce(
                        (accumulator, current) => accumulator + current.amount,
                        0
                      )}{" "}
                    $
                  </Text>
                </View>
              </View>
              <View className="flex flex-col space-y-1.5 py-1.5">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-[#9F9F9F]">
                    Cannabis Gesamt
                  </Text>
                  <Text className="text-sm text-[#9F9F9F]">
                    {`${reservation.reduce(
                      (accumulator, current) => accumulator + current.amount,
                      0
                    )}g`}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-[#9F9F9F]">
                    max. THC-Gehalt
                  </Text>
                  <Text className="text-sm text-[#9F9F9F]">20%</Text>
                </View>
              </View>
            </View>
          </Card>
          <Pressable
            className="flex items-center justify-center py-1.5 mx-5 bg-[#00C978] rounded-md"
            onPress={() => router.replace("/(main)/home/club")}
          >
            <Text className="text-base text-white">Reservierung bestätigen</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReservationScreen;
