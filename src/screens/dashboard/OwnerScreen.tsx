import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import * as Progress from "react-native-progress";
import { useAppSelector } from "@/store/hook";
import { Card, ClubStatus } from "@/components";
import { isEmpty } from "@/lib/functions";
import Constants from "expo-constants";

const BadgeImage = require("@/assets/images/badge.png");

const OwnerScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { club } = useAppSelector((state) => state.club);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;

    !isEmpty(club?.document) && count++;

    !isEmpty(club?.street) &&
      !isEmpty(club?.address) &&
      !isEmpty(club?.postcode) &&
      !isEmpty(club?.city) &&
      !isEmpty(club?.country) &&
      count++;

    (!isEmpty(club?.discord) ||
      !isEmpty(club?.tiktok) ||
      !isEmpty(club?.youtube) ||
      !isEmpty(club?.twitch) ||
      !isEmpty(club?.facebook)) &&
      count++;

    !isEmpty(club?.badge) && !isEmpty(club?.avatar) && count++;

    (club?.users as number) >= 2 && count++;

    setProgress(count / 5);
  }, [club]);

  return (
    <View className="w-full h-full">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <Text style={styles.headerText}>Hallo, {user?.username}</Text>
        <Image className="absolute right-0 bottom-0" source={BadgeImage} />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Card style={styles.cardContainer}>
            <View style={styles.cardHeaderContainer}>
              <View className="flex flex-col gap-1">
                <Text className="text-base font-bold">Erste Schritte</Text>
                <Text className="text-xs text-[#7F7F88]">
                  Erledige alle offenen Aufgaben, um Deinen Club weiter nach
                  vorne zu bringen.
                </Text>
              </View>
              <View className="flex flex-col gap-1">
                <Progress.Bar
                  height={9}
                  progress={progress}
                  color="black"
                  unfilledColor="#F5F5F5"
                  borderWidth={0}
                />
                <Text className="text-xs text-[#7F7F88] font-medium">
                  {Math.round(progress * 100)}%
                </Text>
              </View>
            </View>
            <View className="flex flex-col">
              <ClubStatus
                done={!isEmpty(club?.document)}
                title="Satzung erstellen & hochladen"
                content="Erstelle und lade die Vereinssatzung deines Clubs in Canbase, um sie zentral zu verwalten."
              />
              <ClubStatus
                done={
                  !isEmpty(club?.street) &&
                  !isEmpty(club?.address) &&
                  !isEmpty(club?.postcode) &&
                  !isEmpty(club?.city) &&
                  !isEmpty(club?.country)
                }
                title="Vereinssitz bestimmen"
                content="Lege den offiziellen Club-Sitz fest für rechtliche Klarheit."
              />
              <ClubStatus
                done={
                  !isEmpty(club?.discord) ||
                  !isEmpty(club?.tiktok) ||
                  !isEmpty(club?.youtube) ||
                  !isEmpty(club?.twitch) ||
                  !isEmpty(club?.facebook)
                }
                title="Social Media verbinden"
                content="Verknüpfe deine Social-Media-Kanäle für direkte Kommunikation."
              />
              <ClubStatus
                done={!isEmpty(club?.badge) && !isEmpty(club?.avatar)}
                title="Clublogo und Banner hinzufügen"
                content="Füge ein Logo und Banner hinzu, um die Club-Identität zu stärken."
              />
              <ClubStatus
                done={(club?.users as number) >= 2}
                title="Lade dein erstes Mitglied ein"
                content="Lade dein erstes Mitglied ein und starte den Aufbau deiner Community."
                last={true}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    padding: 20,
    fontWeight: 800,
    fontSize: 20,
    lineHeight: 32,
    color: "#ffffff",
    marginTop: Constants.statusBarHeight,
  },
  mainContainer: {
    margin: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  cardContainer: {
    backgroundColor: "#ffffff", // Add a background color
    padding: 0, // Adjust padding for better appearance
    borderRadius: 15,
    shadowColor: "#bebebe", // Change shadow color to a darker shade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Adjust opacity for a softer shadow
    shadowRadius: 3.5, // Adjust radius for a smoother shadow
    elevation: 2, // Elevation for Android
  },
  cardHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    padding: 18,
    paddingLeft: 26,
    paddingRight: 26,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
  },
});

export default OwnerScreen;
