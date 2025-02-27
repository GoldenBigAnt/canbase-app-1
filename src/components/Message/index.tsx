import React from "react";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useAppSelector } from "@/store/hook";
import { getTimeDifferenceInGerman } from "@/lib/functions";
import { UPLOAD_URI } from "@/config/env";
import { MessagePropsInterface } from "@/types/component";

const Message: React.FC<MessagePropsInterface> = ({ item }) => {
  const { width } = useWindowDimensions();

  const { user } = useAppSelector((state) => state.user);

  const tagsStyles: any = React.useMemo(
    () => ({
      p: {
        lineHeight: 20,
        margin: 0,
        color: item.type === 1 ? "black" : "#9F9F9F",
      },
      blockquote: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 0,
        color: "#9F9F9F",
        fontSize: 14,
        fontStyle: "italic",
        backgroundColor: "#F8F8F8",
        borderLeftWidth: 3,
        borderLeftColor: "#EAEAEA",
      },
    }),
    [item.type]
  );

  return (
    <View className="flex flex-row gap-3">
      <View className="w-10 h-10">
        {user?.avatar === undefined ? (
          <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] rounded-full">
            <FontAwesome name="user" size={20} color="black" />
          </View>
        ) : (
          <Image
            className="w-full h-full rounded-full"
            placeholder="avatar"
            source={{ uri: UPLOAD_URI + user.avatar }}
          />
        )}
      </View>
      <View className="flex flex-col">
        <View className="flex flex-row flex-wrap items-center gap-x-2">
          <Text className="text-base font-semibold">{item.user.username}</Text>
          <Text className="text-sm">
            {getTimeDifferenceInGerman(item.date)}
          </Text>
        </View>
        <RenderHtml
          contentWidth={width}
          source={{
            html: item.chat,
          }}
          tagsStyles={tagsStyles}
        />
      </View>
    </View>
  );
};

export default Message;
