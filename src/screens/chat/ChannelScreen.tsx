import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { channelActions } from "@/store/reducers/channelReducer";
import { Card, ProfileInput } from "@/components";
import Socket from "@/lib/socket";
import { cn, message } from "@/lib/utils";
import { ChannelFormDataType } from "@/types/form";

const BadgeImage = require("@/assets/images/badge.png");

const ChatCreateScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { members } = useAppSelector((state) => state.members);

  const [channeltype, setChannelType] = useState("public");
  const [memberData, setMemberData] = React.useState<any>([]);
  const [selected, setSelected] = useState("");
  const [memberError, setMemberError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChannelFormDataType>();

  useEffect(() => {
    if (user) {
      Socket.on("createChannel", async (data) => {
        data.userID === user?._id && message({ message: data.msg });

        data.userID === user?._id && setLoading(false);

        if (data.success) {
          await dispatch(channelActions.setChannel({ channel: data.channel }));

          data.userID === user?._id && router.push("/(main)/home/chat");
        }
      });
    }

    return () => {
      Socket.off("createChannel");
    };
  }, [user, dispatch, router]);

  useEffect(() => {
    const data = members
      .filter((f) => f.status === "active" && f.role !== "owner")
      .map((item) => {
        return {
          key: item._id,
          value: item.username,
        };
      });

    setMemberData(data);
  }, [members]);

  const onSubmit = async (data: ChannelFormDataType) => {
    if (channeltype === "private" && selected === "") {
      setMemberError(true);
    } else {
      setLoading(true);

      if (channeltype === "public") {
        Socket.emit("createPublicChannel", {
          userID: user?._id,
          ...data,
        });
      } else {
        Socket.emit("createPrivateChannel", {
          userID: user?._id,
          user: selected,
          ...data,
        });
      }
    }
  };

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Chat erstellen
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <Card className="m-5">
          <View className="w-full flex flex-col space-y-5">
            <View className="flex flex-col space-y-3">
              <View className="space-y-2">
                <Text className="text-base">Name*</Text>
                <View>
                  <Controller
                    name="channelname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="z.B Allgemein"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.channelname && (
                    <Text className="m-1 text-sm text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
              </View>
              <View className="space-y-2">
                <Text className="text-base">Beschreibung</Text>
                <View>
                  <Controller
                    name="channeldesc"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="textarea"
                          placeholder="Beschreibung des Chats"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
              <View className="space-y-2">
                <View className="flex flex-col space-y-1">
                  <Text className="text-base">Neuer Status</Text>
                  <Text className="text-sm text-[#9F9F9F]">
                    Das Mitglied wird über die Änderung per E-Mail oder
                    Push-Nachricht informiert.
                  </Text>
                </View>
                <View className="flex flex-col gap-1">
                  <Pressable
                    className={cn(
                      "flex flex-row items-center gap-1.5 p-2 rounded-md",
                      channeltype === "public" && "bg-[#00C978]/25"
                    )}
                    onPress={() => setChannelType("public")}
                  >
                    {channeltype === "public" ? (
                      <Feather name="check-circle" size={16} color="black" />
                    ) : (
                      <Feather name="circle" size={16} color="black" />
                    )}
                    <View className="flex-1 flex flex-col">
                      <Text className="text-sm">Öffentlich</Text>
                      <Text className="text-sm text-[#9F9F9F]">
                        Jeder kann den Chat sehen und{"\n"}beitreten.
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    className={cn(
                      "flex flex-row items-center gap-1.5 p-2 rounded-md",
                      channeltype === "private" && "bg-[#00C978]/25"
                    )}
                    onPress={() => setChannelType("private")}
                  >
                    {channeltype === "private" ? (
                      <Feather name="check-circle" size={16} color="black" />
                    ) : (
                      <Feather name="circle" size={16} color="black" />
                    )}
                    <View className="flex-1 flex flex-col">
                      <Text className="text-sm">Privat</Text>
                      <Text className="text-sm text-[#9F9F9F]">
                        Mitglieder müssen von einem anderen Mitglied eingeladen
                        werden.
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View className="flex flex-col gap-1">
                {channeltype === "private" && (
                  <SelectList
                    setSelected={(value: string) => setSelected(value)}
                    data={memberData}
                    placeholder="Suche nach einem Mitglied"
                    searchPlaceholder="Suche nach einem Mitglied"
                    notFoundText="Keine Mitglied gefunden.s"
                    boxStyles={{
                      backgroundColor: "#F5F5F5",
                      borderColor: "transparent",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                    dropdownStyles={{
                      backgroundColor: "#F5F5F5",
                      borderColor: "transparent",
                      marginTop: 5,
                    }}
                    dropdownItemStyles={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  />
                )}
                {memberError && (
                  <Text className="m-1 text-sm text-red-500">
                    Dieses Feld muss ausgefüllt werden.
                  </Text>
                )}
              </View>
            </View>
            <Pressable
              className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-base text-white">Speichern</Text>
              )}
            </Pressable>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default ChatCreateScreen;
