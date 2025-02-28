import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { getStrain } from "@/actions/shop";
import { Card, TextGroup } from "@/components";
import { isEmpty } from "@/lib/functions";
import { UPLOAD_URI } from "@/config/env";

const BadgeImage = require("@/assets/images/badge.png");

const StrailDetailScreen: React.FC = () => {
  const { reservation } = useAppSelector((state) => state.reservation);

  const { id } = useLocalSearchParams();

  const [strain, setStrain] = useState<any>();
  const [avatar, setAvatar] = useState<any>();

  useEffect(() => {
    (async () => {
      const result = await getStrain({ strainID: id });

      if (result.success) {
        setStrain(result.strain);
      }
    })();
  }, [id]);

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          {strain?.strainname}
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView className="flex-1">
        <View className="m-5">
          <Card className="p-0">
            <View className="p-5 pb-3 border-b border-[#EAEAEA]">
              <Text className="text-base font-medium">{strain?.strainname}</Text>
            </View>
            <View className="flex flex-col items-center space-y-3 p-5">
              <View className="w-16 h-16">
                {strain?.avatar === undefined ? (
                  <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] rounded-full">
                    <MaterialCommunityIcons
                      name="dna"
                      size={24}
                      color="black"
                    />
                  </View>
                ) : (
                  <Image
                    className="w-full h-full rounded-full"
                    placeholder="avatar"
                    source={{ uri: UPLOAD_URI + strain.avatar }}
                  />
                )}
              </View>
              <View className="w-full">
                <TextGroup title="Name" content={strain?.strainname} />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Beschreibung"
                  content={
                    !isEmpty(strain?.description) ? strain.description : "-"
                  }
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="THC-Gehalt"
                  content={!isEmpty(strain?.thc) ? `${strain.thc}%` : "-"}
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="CBD-Gehalt"
                  content={!isEmpty(strain?.cbd) ? `${strain.cbd}%` : "-"}
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Genetik"
                  content={!isEmpty(strain?.genetics) ? strain.genetics : "-"}
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Züchter"
                  content={!isEmpty(strain?.breeder) ? strain.breeder : "-"}
                />
              </View>
              <View className="w-full">
                {!isEmpty(strain?.type) ? (
                  <>
                    {strain.type === "photo-period" && (
                      <TextGroup title="Blütentyp" content="Photoperiodisch" />
                    )}
                    {strain.type === "auto-flowering" && (
                      <TextGroup title="Blütentyp" content="Autoflowering" />
                    )}
                  </>
                ) : (
                  <TextGroup title="Blütentyp" content="-" />
                )}
              </View>
              <View className="w-full">
                <TextGroup
                  title="Pflanzenhöhe"
                  content={
                    !isEmpty(strain?.avg_height) ? strain.avg_height : "-"
                  }
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Ertrag pro Pflanze"
                  content={
                    !isEmpty(strain?.yield_per_plant)
                      ? strain.yield_per_plant
                      : "-"
                  }
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Wirkung"
                  content={!isEmpty(strain?.effect) ? strain.effect : "-"}
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Terpene"
                  content={!isEmpty(strain?.terpene) ? strain.terpene : "-"}
                />
              </View>
              <View className="w-full">
                <TextGroup
                  title="Mögliche medizinische oder therapeutische Wirkungen"
                  content={!isEmpty(strain?.area) ? strain.area : "-"}
                />
              </View>
              <View className="max-w-48 w-full flex flex-col space-y-1">
                <Text className="text-sm text-[#9F9F9F]">
                  {`Anbaudauer (${
                    (strain?.growth_germination || 0) +
                    (strain?.growth_cutting || 0) +
                    (strain?.growth_vegetative || 0) +
                    (strain?.growth_flowering || 0) +
                    (strain?.growth_curing || 0)
                  } Tage)`}
                </Text>
                <View className="flex flex-col">
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-[#9F9F9F]">Keimung</Text>
                    <Text className="text-sm">
                      {!isEmpty(strain?.growth_germination)
                        ? strain.growth_germination
                        : "0 "}
                      Tage
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-[#9F9F9F]">Steckling</Text>
                    <Text className="text-sm">
                      {!isEmpty(strain?.growth_cutting)
                        ? strain.growth_cutting
                        : "0 "}
                      Tage
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-[#9F9F9F]">
                      Vegetative Phase
                    </Text>
                    <Text className="text-sm">
                      {!isEmpty(strain?.growth_vegetative)
                        ? strain.growth_vegetative
                        : "0 "}
                      Tage
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-[#9F9F9F]">Blütephase</Text>
                    <Text className="text-sm">
                      {!isEmpty(strain?.growth_flowering)
                        ? strain.growth_flowering
                        : "0 "}
                      Tage
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-[#9F9F9F]">Aushärtung</Text>
                    <Text className="text-sm">
                      {!isEmpty(strain?.growth_curing)
                        ? strain.growth_curing
                        : "0 "}
                      Tage
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
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

export default StrailDetailScreen;
