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
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardHeaderTitle}>Erste Schritte</Text>
                <Text style={styles.cardHeaderBio}>
                  Erledige alle offenen Aufgaben, um Deinen Club weiter nach
                  vorne zu bringen.
                </Text>
              </View>
              <View className="flex flex-col gap-1 w-full">
                <Progress.Bar
                  height={8}
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
            <View className="flex flex-col justify-center">
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
    backgroundColor: "#ffffff",
    padding: 0,
    borderRadius: 12,
    shadowColor: "#bebebe",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
  },
  cardHeaderText: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  cardHeaderTitle: {
    fontSize: 15.5,
    fontWeight: "600"
  },
  cardHeaderBio: {
    fontSize: 11.5,
    color: "#7F7F88"
  }
});

export default OwnerScreen;
