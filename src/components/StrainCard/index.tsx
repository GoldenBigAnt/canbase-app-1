import React, { useState } from "react";
import { Image } from "expo-image";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { reservationActions } from "@/store/reducers/reserveReducer";
import Card from "../Card";
import { UPLOAD_URI } from "@/config/env";
import { isEmpty } from "@/lib/functions";
import { message } from "@/lib/utils";
import { StrainCardPropsInterface } from "@/types/component";

const StrainCard: React.FC<StrainCardPropsInterface> = ({ strain }) => {
  const dispatch = useAppDispatch();
  const { reservation } = useAppSelector((state) => state.reservation);

  const [count, setCount] = useState(0);

  const handlePlus = () => {
    if (
      reservation.reduce(
        (accumulator, current) => accumulator + current.amount,
        0
      ) < 20
    ) {
      dispatch(
        reservationActions.updateReservation({
          strainID: strain.strainID,
          strain: strain,
          amount: count + 1,
        })
      );
      setCount((prev) => prev + 1);
    } else {
      message({
        message:
          "Es tut uns leid, wir können keine Reservierungen mehr berücksichtigen.",
      });
    }
  };

  const handleMinus = () => {
    dispatch(
      reservationActions.updateReservation({
        strainID: strain.strainID,
        strain: strain,
        amount: count - 1,
      })
    );
    setCount((prev) => prev - 1);
  };

  return (
    <Card className="p-0 m-1.5">
      <View className="flex flex-col items-center space-y-1.5 p-3 border-b border-[#EAEAEA]">
        <View className="w-12 h-12">
          {strain?.avatar === undefined ? (
            <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] rounded-full">
              <MaterialCommunityIcons name="dna" size={16} color="black" />
            </View>
          ) : (
            <Image
              className="w-full h-full rounded-full"
              placeholder="avatar"
              source={{ uri: UPLOAD_URI + strain.avatar }}
            />
          )}
        </View>
        <Text className="text-base font-medium">{strain.strainname}</Text>
        <View className="px-1.5 bg-[#00C978]/25 rounded-xl">
          <Text className="text-sm text-[#00C978]">
            {strain.ratio > 50
              ? "Sativa"
              : strain.ratio < 50
              ? "Indica"
              : "Hybrid"}
          </Text>
        </View>
      </View>
      <View className="flex flex-col space-y-1.5 p-3">
        <View>
          <Text className="text-sm text-[#9F9F9F]">
            THC: {!isEmpty(strain?.thc) ? `${strain.thc}%` : "-"}
          </Text>
          <Text className="text-sm text-[#9F9F9F]">
            CBD: {!isEmpty(strain?.cbd) ? `${strain.cbd}%` : "-"}
          </Text>
        </View>
        {count === 0 ? (
          <Pressable
            className="w-full py-1.5 items-center border border-[#EAEAEA] rounded-md"
            onPress={handlePlus}
          >
            <Feather name="plus" size={16} color="black" />
          </Pressable>
        ) : (
          <View className="flex flex-row justify-between items-center">
            <Pressable
              className="px-3 py-1.5 items-center border border-[#EAEAEA] rounded-md"
              onPress={handlePlus}
            >
              <Feather name="plus" size={16} color="black" />
            </Pressable>
            <Text className="text-sm">{count}g</Text>
            <Pressable
              className="px-3 py-1.5 items-center border border-[#EAEAEA] rounded-md"
              onPress={handleMinus}
            >
              <Feather name="minus" size={16} color="black" />
            </Pressable>
          </View>
        )}
      </View>
    </Card>
  );
};

export default StrainCard;
