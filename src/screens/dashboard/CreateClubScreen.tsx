import React, { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { createClub } from "@/actions/club";
import { Card, ProfileInput } from "@/components";
import { message } from "@/lib/utils";
import { CreateClubFormDataType } from "@/types/form";

const BadgeImage = require("@/assets/images/badge.png");

const CreateClubScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateClubFormDataType>();

  const onSubmit = async (data: CreateClubFormDataType) => {
    setLoading(true);

    const result = await createClub(data);

    message({ message: result.msg });

    setLoading(false);

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
      dispatch(userActions.setUser({ user: result.user }));
      dispatch(membersActions.setMembers({ members: result.members }));

      router.replace("/(main)/home/search");
    }
  };

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Club erstellen
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView>
        <Card className="m-5 p-0">
          <View className="flex flex-col gap-2 p-5 border-b border-[#EAEAEA]">
            <Text className="font-bold text-lg">
              Lege deine Club-Daten fest
            </Text>
            <Text className="text-sm text-[#9F9F9F]">
              Du kannst alle Daten, später in den Einstellungen anpassen
            </Text>
          </View>
          <View className="space-y-5 p-5">
            <View className="space-y-3">
              <View className="space-y-2">
                <Text className="text-base">Name*</Text>
                <View>
                  <Controller
                    name="clubname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="CSC e.V."
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                  {errors.clubname && (
                    <Text className="m-1 text-sm text-red-500">
                      Dieses Feld muss ausgefüllt werden.
                    </Text>
                  )}
                </View>
              </View>
              <View className="space-y-2">
                <Text className="text-base">Adresse</Text>
                <View>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Straße"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Hausnummer"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name="postcode"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Postleitzahl"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Stadt"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="text"
                          placeholder="Deutschland"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
              <View className="space-y-2">
                <Text className="text-base">Beschreibung</Text>
                <View>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ProfileInput
                          value={value}
                          type="textarea"
                          placeholder="Beschreibung"
                          onChange={onChange}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
            <Pressable
              className="flex justify-center items-center py-2 bg-[#19A873] rounded-md"
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-base text-white">Club erstellen</Text>
              )}
            </Pressable>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default CreateClubScreen;
