import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Card } from "@/components";
import Constants from "expo-constants";

const BadgeImage = require("@/assets/images/badge.png");

const FeedbackScreen: React.FC = () => {
  const top = Constants.statusBarHeight;
  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl" style={{ paddingTop: top }}>
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Feedback
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView className="p-5">
        <Card className="flex flex-col gap-2">
          <Text className="text-xl font-normal">
            Wir freuen uns über dein Feedback zu Canbase
          </Text>
          <Text className="text-sm font-light">
            Hier findest du alle Buchungen, die dein Club für dich erstellt hat. 
            Buchungen können z.B. für Aufnahmegebühren oder Mitgliedsbeiträge
            anfallen. Canbase informiert dich automatisch, sobald eine neue
            Buchung erstellt wird.
          </Text>
          <Card className="flex flex-row items-center gap-6 p-3 border-transparent bg-[#F8F8F8] mt-4">
            <MaterialIcons name="mail-outline" className="self-start" size={32} color="black" />
            <View className="flex-1 flex flex-col gap-2">
              <Text className="text-base font-semibold">E-Mail Support</Text>
              <Text className="text-sm text-muted-foreground">
                Kontaktiere unser Support Team direkt persönlich per E-Mail
                unter info@canbase.de. Wir freuen uns Deine Nachricht und werden
                uns umgehend um Dein Anliegen kümmern.
              </Text>
            </View>
          </Card>
          <Card className="flex flex-row items-center gap-6 p-3 border-transparent bg-[#F8F8F8]">
            <MaterialIcons name="discord" className="self-start" size={32} color="black" />
            <View className="flex-1 flex flex-col gap-2">
              <Text className="text-base font-semibold">Discord Support</Text>
              <Text className="text-sm text-muted-foreground">
                Tritt unserem Discord bei und stelle alle deine Fragen, sei
                immer auf dem neusten Stand, nehme an exklusiven Webinaren teil
                und tausche Dich mit anderen Club Gründern aus.
              </Text>
            </View>
          </Card>
        </Card>
      </ScrollView>
    </View>
  );
};

export default FeedbackScreen;
