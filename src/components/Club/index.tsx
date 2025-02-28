import React, { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import Card from "../Card";
import { joinClub } from "@/actions/club";
import { message } from "@/lib/utils";
import { isEmpty } from "@/lib/functions";
import { UPLOAD_URI } from "@/config/env";
import { ClubPropsInterface } from "@/types/component";

const Club: React.FC<ClubPropsInterface> = ({
  clubname,
  badge,
  avatar,
  users,
  maxUser,
  description,
  prevent_info,
  email,
  phone,
  website,
  instagram,
  discord,
  facebook,
  youtube,
  clubStatus,
  clubID,
  allowRequest,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  const handleJoinClub = async () => {
    const result = await joinClub({ clubID: clubID });

    message({ message: result.msg });

    setOpen(false);

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));
      dispatch(clubActions.setClub({ club: result.club }));
      dispatch(membersActions.setMembers({ members: result.members }));

      router.replace("/(main)/home");
    }
  };

  return (
    <>
      <Card className="p-0">
        <View className="h-28 bg-[#EAEAEA] border-b border-[#D9D9D9]">
          {badge === undefined ? (
            <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8]">
              <Feather name="home" size={28} color="black" />
            </View>
          ) : (
            <Image
              className="w-full h-full"
              placeholder="badge"
              source={{ uri: UPLOAD_URI + badge }}
            />
          )}
        </View>
        <View className="relative mx-5 bg-white">
          <View className="absolute -top-7 w-14 h-14">
            {avatar === undefined ? (
              <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] border-2 border-white rounded-full">
                <Feather name="home" size={20} color="black" />
              </View>
            ) : (
              <Image
                className="w-full h-full border-2 border-white rounded-full"
                placeholder="avatar"
                source={{ uri: UPLOAD_URI + avatar }}
              />
            )}
          </View>
          {clubStatus === "license" && (
            <View className="absolute top-2 left-10 z-10">
              <MaterialCommunityIcons
                name="check-decagram"
                size={16}
                color="#00C978"
              />
            </View>
          )}
          <View className="flex flex-col gap-2 py-7">
            <Pressable onPress={() => setOpen(true)}>
              <Text className="font-bold text-xl">{clubname}</Text>
            </Pressable>
            <View className="flex flex-row items-center gap-3">
              <View className="inline-flex items-center p-1 bg-[#F8F8F8] rounded-md">
                <Text className="text-sm font-semibold">
                  {users}/{maxUser} Mitglieder
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                {email && (
                  <Pressable onPress={() => handlePress(email)}>
                    <Feather name="mail" size={16} color="black" />
                  </Pressable>
                )}
                {phone && (
                  <Pressable onPress={() => handlePress(phone)}>
                    <Feather name="phone" size={16} color="black" />
                  </Pressable>
                )}
                {website && (
                  <Pressable onPress={() => handlePress(website)}>
                    <Feather name="globe" size={16} color="black" />
                  </Pressable>
                )}
                {instagram && (
                  <Pressable onPress={() => handlePress(instagram)}>
                    <Feather name="instagram" size={16} color="black" />
                  </Pressable>
                )}
                {discord && (
                  <Pressable onPress={() => handlePress(discord)}>
                    <MaterialIcons name="discord" size={16} color="black" />
                  </Pressable>
                )}
                {facebook && (
                  <Pressable onPress={() => handlePress(facebook)}>
                    <MaterialIcons name="facebook" size={24} color="black" />
                  </Pressable>
                )}
                {youtube && (
                  <Pressable onPress={() => handlePress(youtube)}>
                    <Feather name="youtube" size={16} color="black" />
                  </Pressable>
                )}
              </View>
            </View>
            <Text
              className="overflow-hidden text-sm text-[#9F9F9F] text-ellipsis"
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
        </View>
      </Card>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="flex flex-col">
          <Pressable
            className="h-1/3 bg-black/50"
            onPress={() => setOpen(false)}
          />
          <ScrollView className="h-2/3 bg-white">
            <View className="h-28 bg-[#EAEAEA] border-b border-[#D9D9D9]">
              {badge === undefined ? (
                <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8]">
                  <Feather name="home" size={28} color="black" />
                </View>
              ) : (
                <Image
                  className="w-full h-full"
                  placeholder="badge"
                  source={{ uri: UPLOAD_URI + badge }}
                />
              )}
            </View>
            <View className="relative mx-5">
              <View className="absolute -top-7 w-14 h-14">
                {avatar === undefined ? (
                  <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] border-2 border-white rounded-full">
                    <Feather name="home" size={20} color="black" />
                  </View>
                ) : (
                  <Image
                    className="w-full h-full border-2 border-white rounded-full"
                    placeholder="avatar"
                    source={{ uri: UPLOAD_URI + avatar }}
                  />
                )}
              </View>
              {clubStatus === "license" && (
                <View className="absolute top-2 left-10 z-10">
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={16}
                    color="#00C978"
                  />
                </View>
              )}
              <View className="flex flex-col space-y-2 py-7">
                <Text className="font-bold text-xl">{clubname}</Text>
                <View className="flex flex-col space-y-3">
                  <View className="flex flex-row items-center space-x-3">
                    <View className="inline-flex items-center p-1 bg-[#F8F8F8] rounded-md">
                      <Text className="text-sm font-semibold">
                        {users}/{maxUser} Mitglieder
                      </Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      {email && (
                        <Pressable onPress={() => handlePress(email)}>
                          <Feather name="mail" size={16} color="black" />
                        </Pressable>
                      )}
                      {phone && (
                        <Pressable onPress={() => handlePress(phone)}>
                          <Feather name="phone" size={16} color="black" />
                        </Pressable>
                      )}
                      {website && (
                        <Pressable onPress={() => handlePress(website)}>
                          <Feather name="globe" size={16} color="black" />
                        </Pressable>
                      )}
                      {instagram && (
                        <Pressable onPress={() => handlePress(instagram)}>
                          <Feather name="instagram" size={16} color="black" />
                        </Pressable>
                      )}
                      {discord && (
                        <Pressable onPress={() => handlePress(discord)}>
                          <MaterialIcons
                            name="discord"
                            size={16}
                            color="black"
                          />
                        </Pressable>
                      )}
                      {facebook && (
                        <Pressable onPress={() => handlePress(facebook)}>
                          <MaterialIcons
                            name="facebook"
                            size={24}
                            color="black"
                          />
                        </Pressable>
                      )}
                      {youtube && (
                        <Pressable onPress={() => handlePress(youtube)}>
                          <Feather name="youtube" size={16} color="black" />
                        </Pressable>
                      )}
                    </View>
                  </View>
                  {clubStatus === "verify" && (
                    <View className="flex flex-row flex-wrap gap-2">
                      <View className="inline-flex items-center p-1 bg-[#D5B100]/25 rounded-md">
                        <Text className="text-sm text-[#D5B100]">
                          In Gründung
                        </Text>
                      </View>
                      <View className="inline-flex items-center p-1 bg-[#1C73B2]/25 rounded-md">
                        <Text className="text-sm text-[#1C73B2]">
                          Eingetragener Verein
                        </Text>
                      </View>
                    </View>
                  )}
                  {clubStatus === "license" && (
                    <View className="flex flex-row flex-wrap gap-2">
                      <View className="inline-flex items-center p-1 bg-[#D5B100]/25 rounded-md">
                        <Text className="text-sm text-[#D5B100]">
                          In Gründung
                        </Text>
                      </View>
                      <View className="inline-flex items-center p-1 bg-[#1C73B2]/25 rounded-md">
                        <Text className="text-sm text-[#1C73B2]">
                          Eingetragener Verein
                        </Text>
                      </View>
                      <View className="inline-flex items-center p-1 bg-[#00C978]/25 rounded-md">
                        <Text className="text-sm text-[#19A873]">
                          Lizensierter Verein
                        </Text>
                      </View>
                    </View>
                  )}
                  <View className="max-w-56 w-full flex flex-col items-center gap-3 p-5 bg-[#F8F8F8] rounded-md">
                    {maxUser > users ? (
                      <>
                        <Text className="text-sm text-center text-[#9F9F9F]">
                          Du kannst keine Anfragen stellen, da du bereits eine
                          Mitgliedschaft oder eine Mitgliedschaftsanfrage in
                          einem Club hast.
                        </Text>
                        <Pressable
                          className="h-10 flex justify-center items-center px-2 rounded-md bg-[#9F9F9F]"
                          onPress={handleJoinClub}
                          disabled={
                            !isEmpty(user?.club) ||
                            !isEmpty(
                              user?.clublist?.filter(
                                (f) => f.club.clubID === clubID
                              ).length
                            ) ||
                            !allowRequest
                          }
                        >
                          <Text className="text-base text-white">
                            Mitglied werden
                          </Text>
                        </Pressable>
                      </>
                    ) : (
                      <>
                        <Text className="text-sm text-center text-[#9F9F9F]">
                          Dieser Club ist bereits voll. Du kannst dich auf die
                          Warteschlange setzen lassen. Und wirst informiert
                          sobald ein Platz für dich frei ist.
                        </Text>
                        <Pressable
                          className="h-10 flex justify-center items-center px-4 bg-[#FBCB15]/25 rounded-md"
                          onPress={handleJoinClub}
                          disabled={
                            !isEmpty(user?.club) ||
                            !isEmpty(
                              user?.clublist?.filter(
                                (f) => f.club.clubID === clubID
                              ).length
                            ) ||
                            !allowRequest
                          }
                        >
                          <Text className="text-base text-[#FBCB15]">
                            Auf die Warteschlange
                          </Text>
                        </Pressable>
                      </>
                    )}
                  </View>
                  {description && (
                    <View>
                      <Text className="text-sm text-[#9F9F9F]">
                        Beschreibung
                      </Text>
                      <Text className="text-sm">{description}</Text>
                    </View>
                  )}
                  {prevent_info && (
                    <View>
                      <Text className="text-sm text-[#9F9F9F]">
                        Jugendschutz & Prävention
                      </Text>
                      <Text className="text-sm">{prevent_info}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default Club;
