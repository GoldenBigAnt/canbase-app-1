import React from "react";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";
import { ClubStatusPropsInterface } from "@/types/component";

const ClubStatus: React.FC<ClubStatusPropsInterface> = ({
  done,
  title,
  content,
  last = false,
}) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center gap-5 px-5 py-3",
        !last && "border-b border-[#EAEAEA]"
      )}
    >
      {done ? (
        <Feather name="check-circle" size={16} color="#00C978" />
      ) : (
        <Feather name="circle" size={16} color="#00C978" />
      )}
      <View className="flex flex-col space-y-1">
        <Text className="text-base font-medium">{title}</Text>
        <Text className="text-sm text-[#9F9F9F]">{content}</Text>
      </View>
    </View>
  );
};

export default ClubStatus;
