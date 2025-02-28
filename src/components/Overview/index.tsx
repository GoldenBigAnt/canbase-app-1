import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Card from "../Card";
import { isEmpty } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { OverviewPropsInterface } from "@/types/component";

const Overview: React.FC<OverviewPropsInterface> = ({
  title,
  description = "",
  contnet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-0">
      <View className="flex flex-col space-y-1 px-5 py-3 border-b border-[#EAEAEA]">
        <Text className="text-xl font-medium">{title}</Text>
        {!isEmpty(description) && (
          <Text className="text-sm text-[#9F9F9F]">{description}</Text>
        )}
      </View>
      <View className={cn("relative", isOpen ? "h-auto" : "h-16")}>
        {!isOpen && (
          <LinearGradient
            className="absolute w-full h-full z-10"
            colors={["transparent", "white"]}
            start={[0, 0]}
            end={[0, 1]}
          />
        )}
        <View className="px-5 py-3">
          <Text className="text-sm">{contnet}</Text>
        </View>
      </View>
      <Pressable
        className="flex flex-col justify-center items-center pb-1.5"
        onPress={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen ? (
          <>
            <Feather name="chevron-down" size={16} color="#9F9F9F" />
            <Text className="text-[10px] text-[#9F9F9F]">Mehr anzeigen</Text>
          </>
        ) : (
          <>
            <Feather name="chevron-up" size={16} color="#9F9F9F" />
            <Text className="text-[10px] text-[#9F9F9F]">Weniger anzeigen</Text>
          </>
        )}
      </Pressable>
    </Card>
  );
};

export default Overview;
