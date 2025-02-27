import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { Card } from "@/components";

const BadgeImage = require("@/assets/images/badge.png");

const BookingScreen: React.FC = () => {
  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Buchungen
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <Card className="flex flex-col gap-3 m-5">
        <View className="flex flex-row items-center gap-3">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={16}
            color="black"
          />
          <Text className="text-base">Noch keine Buchungen</Text>
        </View>
        <Text className="text-sm">
          Hier findest du alle Buchungen, die dein Club für dich erstellt hat.
          Buchungen können z.B. für Aufnahmegebühren oder Mitgliedsbeiträge
          anfallen. Canbase informiert dich automatisch, sobald eine neue
          Buchung erstellt wird.
        </Text>
      </Card>
    </View>
  );
};

export default BookingScreen;
