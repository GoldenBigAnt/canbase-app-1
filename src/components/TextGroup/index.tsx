import React from "react";
import { Text, View } from "react-native";
import { TextGroupPropsInterface } from "@/types/component";

const TextGroup: React.FC<TextGroupPropsInterface> = ({ title, content }) => {
  return (
    <View>
      <Text className="text-sm text-[#9F9F9F]">{title}</Text>
      <Text className="text-sm font-medium">{content}</Text>
    </View>
  );
};

export default TextGroup;
