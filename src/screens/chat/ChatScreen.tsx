import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { Card } from "@/components";
import { isEmpty } from "@/lib/functions";
import { cn } from "@/lib/utils";

const BadgeImage = require("@/assets/images/badge.png");

const ChatScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { channel } = useAppSelector((state) => state.channel);

  return (
    <View className="w-full h-full border">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <Text className="p-5 font-extrabold	text-2xl text-white">Chat</Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <View className="flex flex-col gap-5 p-5">
        <Pressable
          className="inline-flex self-start flex-row items-center gap-1.5 px-2 py-1 border border-[#EAEAEA] rounded-xl"
          onPress={() => router.push("/(main)/home/chat/channel")}
        >
          <Feather name="plus" size={16} color="black" />
          <Text className="text-sm font-medium">Chat erstellen</Text>
        </Pressable>
        {!isEmpty(channel) && (
          <Card className="p-0">
            <ScrollView>
              {channel
                ?.filter(
                  (f) =>
                    f.channeltype === "public" ||
                    (f.channeltype === "private" &&
                      (f.user === user?._id || f.owner?._id === user?._id))
                )
                .map((item, key) => {
                  return (
                    <View
                      key={key}
                      className={cn(
                        "px-5 py-3",
                        key !==
                          channel?.filter(
                            (f) =>
                              f.channeltype === "public" ||
                              (f.channeltype === "private" &&
                                (f.user === user?._id ||
                                  f.owner?._id === user?._id))
                          ).length -
                            1 && "border-b border-[#EAEAEA]"
                      )}
                    >
                      {item.channeltype === "public" ? (
                        <View className="flex flex-row items-center space-x-3">
                          <View className="p-3 rounded-full bg-[#F8F8F8]">
                            <FontAwesome name="users" size={16} color="black" />
                          </View>
                          <View className="flex flex-col space-y-1">
                            <Pressable
                              onPress={() =>
                                router.push({
                                  pathname: "/(main)/home/chat/[id]",
                                  params: { id: item.channelID as string },
                                })
                              }
                            >
                              <Text className="text-base font-medium">
                                {item.channelname}
                              </Text>
                              <Text className="text-sm text-[#9F9F9F]">
                                {item.channelID}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      ) : (
                        <View className="flex flex-row items-center space-x-3">
                          <View className="p-3 rounded-full bg-[#F8F8F8]">
                            <Feather name="lock" size={16} color="black" />
                          </View>
                          <View className="flex flex-col space-y-1">
                            <Pressable
                              onPress={() =>
                                router.push({
                                  pathname: "/(main)/home/chat/[id]",
                                  params: { id: item.channelID as string },
                                })
                              }
                            >
                              <Text className="text-base font-medium">
                                {item.user === user?._id
                                  ? item.owner?.username
                                  : item.channelname}
                              </Text>
                              <Text className="text-sm text-[#9F9F9F]">
                                {item.channelID}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </ScrollView>
          </Card>
        )}
      </View>
    </View>
  );
};

export default ChatScreen;
