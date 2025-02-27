import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Card from "../Card";
import { ClubCardPropsInterface } from "@/types/component";

const ClubCard: React.FC<ClubCardPropsInterface> = ({
  title,
  icon,
  content,
  btnIcon,
  btnText,
  route,
}) => {
  return (
    <Card className="flex flex-col gap-5">
      <View className="flex flex-col gap-2">
        <View className="flex flex-row gap-2">
          {icon}
          <Text className="font-semibold text-xl">{title}</Text>
        </View>
        <Text className="text-sm text-[#7F7F88]">{content}</Text>
      </View>
      <Pressable
        className="flex flex-row justify-center items-center gap-2 py-2 bg-black rounded-lg"
        onPress={() => router.push(route)}
      >
        {btnIcon}
        <Text className="font-medium text-base text-center text-white">
          {btnText}
        </Text>
      </Pressable>
    </Card>
  );
};

export default ClubCard;
