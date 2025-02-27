import React, { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { acceptRequest, cancelRequest } from "@/actions/user";
import { Card } from "@/components";
import { getCleanDate, isEmpty } from "@/lib/functions";
import { message } from "@/lib/utils";

const BadgeImage = require("@/assets/images/badge.png");

const MemberScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [tempData, setTempData] = useState<any>();

  const handleDialog = (param: any) => {
    setTempData(param);
    setOpen(true);
  };

  const handleAcceptRequest = async () => {
    const result = await acceptRequest({ clubID: tempData.club._id });

    message({ message: result.msg });

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));

      setOpen(false);
    }
  };

  const handleCancelRequest = async () => {
    const result = await cancelRequest({ clubID: tempData.club._id });

    message({ message: result.msg });

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));

      setOpen(false);
    }
  };

  return (
    <>
      <View className="w-full h-full">
        <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
          <Text className="p-5 font-extrabold	text-2xl text-white">
            Hallo, {user?.username}
          </Text>
          <Image
            className="absolute w-10 h-full right-2"
            source={BadgeImage}
            placeholder="badge"
          />
        </View>
        <ScrollView>
          <View className="m-5">
            {!isEmpty(user?.clublist) ? (
              <View className="flex flex-col gap-3">
                {user?.clublist?.map((item, key) => {
                  return (
                    <Card key={key} className="p-0">
                      <View className="flex flex-col p-3 border-b border-[#EAEAEA]">
                        <Text className="text-xl font-semibold">
                          {item.club.clubname}
                        </Text>
                        <Text className="text-sm text-[#9F9F9F]">
                          {item.club.clubID} / {user?.memberID}
                        </Text>
                      </View>
                      <View className="flex flex-col gap-5 p-3 border-b border-[#EAEAEA]">
                        {item.status === "club-accept" && (
                          <View className="flex flex-row gap-1.5 p-3 bg-[#00C97815] border border-[#00C978] rounded-xl">
                            <View className="mt-0.5">
                              <Feather name="info" size={16} color="#00C978" />
                            </View>
                            <View className="flex flex-col space-y-1.5">
                              <Text className="text-base font-semibold text-[#00C978]">
                                Genehmigt
                              </Text>
                              <Text className="text-sm text-[#00C978]">
                                Deine Mitgliedschaftsanfrage wurde von Club
                                akzeptiert. Du kannst dich nun entscheiden, ob
                                du wartest oder die Mitgliedschaft akzeptierst.
                                Sobald du akzeptierst, werden alle anderen
                                Anfragen automatisch abgelehnt.
                              </Text>
                            </View>
                          </View>
                        )}
                        {item.status === "pending" && (
                          <View className="flex flex-row gap-1.5 p-3 bg-[#55A3FF15] border border-[#55A3FF] rounded-xl">
                            <View className="mt-0.5">
                              <Feather name="info" size={16} color="#55A3FF" />
                            </View>
                            <View className="flex flex-col space-y-1.5">
                              <Text className="text-base font-semibold text-[#55A3FF]">
                                Mitgliedsanfrage gestellt
                              </Text>
                              <Text className="text-sm text-[#55A3FF]">
                                Deine Mitgliedsanfrage ist beim Club eingegangen
                                und wird aktuell geprüft. Wir informieren dich,
                                sobald über deine Mitgliedschaft entschieden
                                wurde.
                              </Text>
                            </View>
                          </View>
                        )}
                        {item.status === "waitlist" && (
                          <View className="flex flex-col gap-1.5">
                            <View className="flex flex-row gap-1.5 p-3 bg-[#FBCB1515] border border-[#FBCB15] rounded-xl">
                              <View className="mt-0.5">
                                <Feather
                                  name="info"
                                  size={16}
                                  color="#FBCB15"
                                />
                              </View>
                              <View className="flex flex-col space-y-1.5">
                                <Text className="text-base font-semibold text-[#FBCB15]">
                                  Mitgliedsanfrage gestellt
                                </Text>
                                <Text className="text-sm text-[#FBCB15]">
                                  Du wurdest auf die Warteliste des Clubs
                                  gepackt. Aber deine Mitgliedsanfrage ist
                                  eingegangen und wird zeitnah geprüft. Wir
                                  informieren dich, sobald über deine
                                  Mitgliedschaft entschieden wurde.
                                </Text>
                              </View>
                            </View>
                            <View className="flex flex-row gap-1.5 p-3 bg-[#00C97815] border border-[#00C978] rounded-xl">
                              <View className="mt-0.5">
                                <Feather
                                  name="info"
                                  size={16}
                                  color="#00C978"
                                />
                              </View>
                              <View className="flex flex-col space-y-1.5">
                                <Text className="text-base font-semibold text-[#00C978]">
                                  Empfehlung
                                </Text>
                                <Text className="text-sm text-[#00C978]">
                                  Bewirb dich auch bei anderen Club in deiner
                                  Umgebung, um die Chance in einem Club
                                  angenommen zu werden zu erhöhen.
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                        <View className="flex flex-col space-y-1.5">
                          <Text className="text-sm text-[#9F9F9F]">Status</Text>
                          {item.status === "club-accept" && (
                            <View className="inline-flex self-start items-center p-1 bg-[#00C97825] rounded-md">
                              <Text className="text-sm text-[#00C978]">
                                Genehmigt
                              </Text>
                            </View>
                          )}
                          {item.status === "pending" && (
                            <View className="inline-flex self-start items-center p-1 bg-[#55A3FF25] rounded-md">
                              <Text className="text-sm text-[#55A3FF]">
                                Angefragt
                              </Text>
                            </View>
                          )}
                          {item.status === "waitlist" && (
                            <View className="inline-flex self-start items-center p-1 bg-[#FBCB1525] rounded-md">
                              <Text className="text-sm text-[#FBCB15]">
                                Warteliste
                              </Text>
                            </View>
                          )}
                        </View>
                        <View className="flex flex-col">
                          <Text className="text-sm text-[#9F9F9F]">
                            Angefragt am
                          </Text>
                          <Text className="text-base font-semibold">
                            {getCleanDate(String(item.memberdate), 2)}
                          </Text>
                        </View>
                      </View>
                      <View className="flex flex-col gap-1.5 p-3">
                        {item.status === "club-accept" && (
                          <Pressable
                            className="flex items-center py-1.5 bg-red-500 rounded-md"
                            onPress={() => handleDialog(item)}
                          >
                            <Text className="text-sm font-medium text-white">
                              Anfrage zurückziehen
                            </Text>
                          </Pressable>
                        )}
                        {item.status === "pending" && (
                          <Pressable
                            className="flex items-center py-1.5 bg-red-500 rounded-md"
                            onPress={() => handleDialog(item)}
                          >
                            <Text className="text-sm font-medium text-white">
                              Anfrage zurückziehen
                            </Text>
                          </Pressable>
                        )}
                        {item.status === "waitlist" && (
                          <View className="w-full flex justify-end gap-3 mobile:flex-col">
                            <Pressable
                              className="flex items-center py-1.5 border border-[#EAEAEA] rounded-md"
                              onPress={() => router.push("/(main)/home/search")}
                            >
                              <Text className="text-sm font-medium">
                                Nach weiteren Clubs suchen
                              </Text>
                            </Pressable>
                            <Pressable
                              className="flex items-center py-1.5 bg-red-500 rounded-md"
                              onPress={() => handleDialog(item)}
                            >
                              <Text className="text-sm font-medium text-white">
                                Anfrage zurückziehen
                              </Text>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    </Card>
                  );
                })}
              </View>
            ) : (
              <View className="flex flex-col items-center gap-5 pt-10">
                <Feather name="check-circle" size={32} color="black" />
                <View className="flex flex-col items-center space-y-3">
                  <Text className="text-3xl font-semibold">
                    Alles erledigt.
                  </Text>
                  <Text className="text-xl text-center">
                    Neuigkeiten für dich erscheinen hier, sobald es etwas zu
                    berichten gibt.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="h-full flex flex-col">
          <Pressable
            className="flex-1 bg-black/50"
            onPress={() => setOpen(false)}
          />
          <View className="bg-black/50">
            <View className="flex flex-col gap-3 m-5 p-3 bg-white rounded-md">
              {tempData?.status === "club-accept" && (
                <View className="flex flex-col">
                  <Text className="text-base font-medium">
                    Mitgliedschaft akzeptieren
                  </Text>
                  <Text className="text-sm text-[#9F9F9F]">
                    Bist du sicher das du die Mitgliedschaft final akzeptieren
                    möchtest? Alle anderen Anfragen werden automatisch
                    zurückgezogen.
                  </Text>
                </View>
              )}
              {(tempData?.status === "pending" ||
                tempData?.status === "waitlist") && (
                <View className="flex flex-col">
                  <Text className="text-base font-medium">
                    Anfrage zurückziehen?
                  </Text>
                  <Text className="text-sm text-[#9F9F9F]">
                    Das Zurückziehen deiner Anfrage ist endgültig und kann nicht
                    rückgängig gemacht werden. Möchtest du fortfahren?
                  </Text>
                </View>
              )}
              <View className="flex flex-col gap-3">
                <Pressable
                  className="flex items-center py-1.5 border border-[#EAEAEA] rounded-md"
                  onPress={() => setOpen(false)}
                >
                  <Text>Abbrechen</Text>
                </Pressable>
                {tempData?.status === "club-accept" && (
                  <Pressable
                    className="flex items-center py-1.5 bg-[#00C978] rounded-md"
                    onPress={handleAcceptRequest}
                  >
                    <Text className="text-sm font-medium">
                      Mitgliedschaft akzeptieren
                    </Text>
                  </Pressable>
                )}
                {(tempData?.status === "pending" ||
                  tempData?.status === "waitlist") && (
                  <Pressable
                    className="flex items-center py-1.5 bg-red-500 rounded-md"
                    onPress={handleCancelRequest}
                  >
                    <Text className="text-sm font-medium text-white">
                      Anfrage zurückziehen
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MemberScreen;
