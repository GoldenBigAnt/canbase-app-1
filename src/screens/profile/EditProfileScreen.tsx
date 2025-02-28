import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { updateUser } from "@/actions/user";
import { Card, ProfileInput } from "@/components";
import { message } from "@/lib/utils";
import { UPLOAD_URI } from "@/config/env";
import { MyProfileFormDataType } from "@/types/form";
import Constants from "expo-constants";

const BadgeImage = require("@/assets/images/badge.png");

const EditProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const top = Constants.statusBarHeight;  

  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MyProfileFormDataType>({
    defaultValues: {
      username: user?.username,
      alias: user?.alias,
      birth: user?.birth,
      email: user?.email,
      phone: user?.phone,
      street: user?.street,
      address: user?.address,
      postcode: user?.postcode,
      city: user?.city,
      country: user?.country,
      bio: user?.bio,
    },
  });

  useEffect(() => {
    if (user?.avatar) setImage(UPLOAD_URI + user?.avatar);
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: MyProfileFormDataType) => {
    setLoading(true);

    const result = await updateUser({ avatar: image, form: data });

    message({ message: result.msg });

    setLoading(false);

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));
    }
  };

  return (
    <View className="w-full h-full">
      <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl" style={{ paddingTop: top }}>
        <Pressable className="absolute m-5 z-10" onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="p-5 font-extrabold	text-2xl text-white text-center">
          Mein Profil
        </Text>
        <Image
          className="absolute w-10 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      <ScrollView className="p-5">
        <Card className="p-0">
          <View className="flex flex-col space-y-1 p-5 border-b border-[#EAEAEA]">
            <Text className="text-xl font-semibold">Profil</Text>
            <Text className="text-sm text-[#9F9F9F]">
              Dein Club kann diese Daten einsehen, um dich zu verifizieren und
              um deine Mitgliedschaft zu verwalten.
            </Text>
          </View>
          <View className="flex justify-center items-center gap-5 p-5">
            <View className="relative">
              {image ? (
                <Image
                  className="w-36 h-36 rounded-full"
                  source={{ uri: image }}
                />
              ) : (
                <View className="w-36 h-36 flex flex-col justify-center items-center bg-[#F8F8F8] rounded-full">
                  <MaterialIcons name="image" size={20} color="#9F9F9F" />
                  <Text className="text-sm text-center text-muted-foreground">
                    .jpg, .jpeg,{'\n'}.png, .webp
                  </Text>
                </View>
              )}
              <Pressable
                className="absolute right-0 bottom-0 z-10"
                onPress={pickImage}
              >
                <View className="w-10 h-10 flex justify-center items-center bg-white border border-[#EAEAEA] rounded-full">
                  {image ? (
                    <MaterialIcons name="edit" size={20} color="#00C978" />
                  ) : (
                    <MaterialIcons
                      name="add-a-photo"
                      size={20}
                      color="#00C978"
                    />
                  )}
                </View>
              </Pressable>
            </View>
            <View className="w-full flex flex-col gap-5">
              <View className="flex flex-col gap-3">
                <View className="gap-1">
                  <Text className="text-base">Name*</Text>
                  <View>
                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="text"
                            placeholder="Max Mustermann"
                            onChange={onChange}
                          />
                        </View>
                      )}
                    />
                    {errors.username && (
                      <Text className="m-1 text-sm text-red-500">
                        Dieses Feld muss ausgefüllt werden.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-base">Alias</Text>
                  <View>
                    <Controller
                      name="alias"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="text"
                            placeholder="Max"
                            onChange={onChange}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-base">Geburtsdatum*</Text>
                  <View>
                    <Controller
                      name="birth"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="date"
                            placeholder="tt.mm.jjjj*"
                            onChange={onChange}
                          />
                        </View>
                      )}
                    />
                    {errors.birth && (
                      <Text className="m-1 text-sm text-red-500">
                        Dieses Feld muss ausgefüllt werden.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-base">E-Mail*</Text>
                  <View>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="email"
                            placeholder="info@beispiel.de"
                            onChange={onChange}
                          />
                        </View>
                      )}
                    />
                    {errors.email && (
                      <Text className="m-1 text-sm text-red-500">
                        Dieses Feld muss ausgefüllt werden.
                      </Text>
                    )}
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-base">Telefon</Text>
                  <View>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="text"
                            placeholder="0123456789"
                            onChange={onChange}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
                <View className="gap-1">
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
                <View className="gap-2">
                  <View>
                    <Text className="text-base">Biografie</Text>
                    <Text className="text-sm text-[#9F9F9F]">
                      Bitte beachte, dass deine Bio eventuell für andere
                      Mitglieder sichtbar ist. Teile nur Infos, die du auch
                      öffentlich machen möchtest.
                    </Text>
                  </View>
                  <View>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <ProfileInput
                            value={value}
                            type="textarea"
                            placeholder="Biografie"
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
                  <Text className="text-base text-white">Speichern</Text>
                )}
              </Pressable>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
