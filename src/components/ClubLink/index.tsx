import React from "react";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";
import { ClubLinkPropsInterface } from "@/types/component";

const ClubLink: React.FC<ClubLinkPropsInterface> = ({
  title,
  icon,
  link,
  disabled = false,
}) => {
  return (
    <Pressable
      className={cn(
        "flex flex-row items-center gap-3 px-3 py-1.5 border border-[#EAEAEA] rounded-3xl",
        disabled && "opacity-50"
      )}
      onPress={() => router.push(link)}
      disabled={disabled}
    >
      {icon}
      <Text className="text-base font-medium">{title}</Text>
    </Pressable>
  );
};

export default ClubLink;
