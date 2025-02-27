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
        "flex flex-row items-center gap-2 px-5 py-3",
        !last && "border-b border-[#EAEAEA]"
      )}
    >
      {done ? (
        <Feather name="check-circle" size={14} color="#00C978" />
      ) : (
        <Feather name="circle" size={14} color="#00C978" />
      )}
      <View>
        <Text className="text-sm font-bold">{title}</Text>
        <Text className="text-[10px] text-[#9F9F9F]">{content}</Text>
      </View>
    </View>
  );
};

export default ClubStatus;
