import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { channelActions } from "@/store/reducers/channelReducer";
import { IChat, chatActions } from "@/store/reducers/chatReducer";
import { getChatData } from "@/actions/chat";
import { Message, ProfileInput } from "@/components";
import Socket from "@/lib/socket";
import { cn, message } from "@/lib/utils";
import { ChannelFormDataType, ChatFormDataType } from "@/types/form";

const BadgeImage = require("@/assets/images/badge.png");

const ChatDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { chat } = useAppSelector((state) => state.chat);

  const { id } = useLocalSearchParams();

  const chatBox = useRef<ScrollView>(null);
  const richText = useRef<any>();

  const [chatData, setChatData] = useState<IChat>();
  const [openModal, setOpenModal] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChatFormDataType>();

  const {
    control: channelControl,
    formState: { errors: channelErros },
    handleSubmit: handleChannelSubmit,
  } = useForm<ChannelFormDataType>();

  useEffect(() => {
    (async () => {
      if (id) {
        const result = await getChatData(id as string);

        if (result?.success) {
          dispatch(
            chatActions.updateChat({
              channelID: id[0],
              chat: result?.chatData,
            })
          );
        }
      }
    })();
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      const index = chat.findIndex((item) => item.channelID === id);

      if (index !== -1) {
        setChatData(chat[index]);
      }
    }
  }, [id, chat]);

  useEffect(() => {
    setTimeout(() => {
      if (chatBox.current === null) return;

      chatBox.current.scrollToEnd();
    }, 100);
  }, [chatBox]);

  useEffect(() => {
    if (id) {
      Socket.emit("joinChannel", {
        channeID: id,
      });

      Socket.on("updateChannel", async (data) => {
        data.userID === user?._id && message({ message: data.msg });

        if (data.success) {
          await dispatch(channelActions.setChannel({ channel: data.channel }));

          await dispatch(
            chatActions.updateChat({
              channelID: id,
              chat: data.chatData,
            })
          );
        }
      });

      Socket.on("leaveChannel", async (data) => {
        data.userID === user?._id && message({ message: data.msg });

        await dispatch(
          channelActions.removeChannel({
            channelID: data.channelID,
          })
        );

        await dispatch(
          chatActions.removeChat({
            channelID: data.channelID,
          })
        );

        id === data.channelID && router.push("/(main)/home/chat");
      });

      Socket.on(`${id}_message`, async (data) => {
        await dispatch(
          chatActions.updateChat({
            channelID: id,
            chat: data.chatData,
          })
        );

        setTimeout(() => {
          if (chatBox.current === null) return;
          chatBox.current.scrollToEnd();
        }, 100);
      });

      return () => {
        Socket.off(`${id}_message`);
      };
    }
  }, [id, dispatch]);

  useEffect(() => {
    setOpenEditForm(false);
  }, [openModal]);

  const onSubmit = async (data: ChatFormDataType) => {
    const { message } = data;

    if (message === "") return;

    id &&
      Socket.emit("message", {
        userID: user?._id,
        channelID: id,
        message: message,
      });

    reset();

    richText.current?.setContentHTML("");
  };

  const onChannelSubmit = async (data: ChannelFormDataType) => {
    setOpenModal(false);

    id &&
      Socket.emit("updateChannel", {
        userID: user?._id,
        channelID: id,
        ...data,
      });
  };

  const handleRemoveChannel = () => {
    setOpenModal(false);

    id &&
      Socket.emit("leaveChannel", {
        userID: user?._id,
        channelID: id,
      });
  };

  return (
    <>
      <View className="w-full h-full">
        <View className="relative justify-center overflow-hidden bg-[#00C978] rounded-b-xl">
          <View className="flex flex-row justify-between items-center p-5">
            <Pressable className="z-10" onPress={() => router.back()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="white"
              />
            </Pressable>
            <View className="flex flex-row items-center gap-1.5">
              {chatData?.channeltype === "public" ? (
                <FontAwesome name="users" size={16} color="white" />
              ) : (
                <Feather name="lock" size={16} color="white" />
              )}
              <Text className="font-extrabold	text-2xl text-white text-center">
                {chatData?.channelname}
              </Text>
            </View>
            <Pressable
              className="z-10"
              onPress={() => setOpenModal((prev) => !prev)}
            >
              <Feather name="list" size={24} color="white" />
            </Pressable>
          </View>
          <Image
            className="absolute w-10 h-full right-2"
            source={BadgeImage}
            placeholder="badge"
          />
        </View>
        <View className="flex-1 flex flex-col">
          <ScrollView className="flex-1" ref={chatBox}>
            <View className="flex flex-col gap-3 m-3">
              {chatData?.chat?.map((item, key) => {
                return (
                  <View key={key}>
                    <Message item={item} />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View className="p-2 bg-[#F8F8F8] rounded-t-md">
            <View className="flex flex-col py-1 bg-white border border-[#EAEAEA] rounded-md">
              <View className="w-full flex justify-start items-start">
                <RichToolbar
                  editor={richText}
                  iconSize={14}
                  selectedButtonStyle={{
                    width: 24,
                    height: 24,
                    marginRight: 4,
                    borderRadius: 4,
                    backgroundColor: "#EAEAEA",
                  }}
                  unselectedButtonStyle={{
                    width: 24,
                    height: 24,
                    marginRight: 4,
                    borderRadius: 4,
                    backgroundColor: "transparent",
                  }}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.blockquote,
                  ]}
                  style={{
                    height: 24,
                    backgroundColor: "transparent",
                    paddingHorizontal: 8,
                  }}
                />
              </View>
              <View className="flex flex-row items-center">
                <Controller
                  name="message"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <View className="h-8 flex-1 flex justify-center overflow-hidden">
                      <RichEditor
                        ref={richText}
                        initialFocus={true}
                        initialContentHTML=""
                        placeholder="Schreiben Sie Ihre Nachricht"
                        onChange={onChange}
                      />
                    </View>
                  )}
                />
                <Pressable className="mx-2" onPress={handleSubmit(onSubmit)}>
                  <Feather name="send" size={16} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={openModal}>
        <View className="h-full flex flex-col">
          <Pressable
            className="flex-1 bg-black/50"
            onPress={() => setOpenModal(false)}
          />
          <View className="bg-black/50">
            {!openEditForm ? (
              <View className="flex flex-col justify-center items-center gap-3 m-5 p-3 bg-white rounded-md">
                <Pressable
                  className={cn(
                    user?.role !== "owner" &&
                      !user?.functions?.includes("club-chat-edit-channel") &&
                      "opacity-50"
                  )}
                  onPress={() => setOpenEditForm(true)}
                  disabled={
                    user?.role !== "owner" &&
                    !user?.functions?.includes("club-chat-edit-channel")
                  }
                >
                  <Text className="text-base">Bearbeiten</Text>
                </Pressable>
                <Pressable
                  className={cn(
                    user?.role !== "owner" &&
                      !user?.functions?.includes("club-chat-delete-channel") &&
                      "opacity-50"
                  )}
                  onPress={handleRemoveChannel}
                  disabled={
                    user?.role !== "owner" &&
                    !user?.functions?.includes("club-chat-delete-channel")
                  }
                >
                  <Text className="text-base text-red-500">Chat verlassen</Text>
                </Pressable>
              </View>
            ) : (
              <View className="m-5 p-3 bg-white rounded-md">
                <View className="flex flex-col space-y-5">
                  <View className="flex flex-col space-y-3">
                    <View className="space-y-2">
                      <Text className="text-base">Name*</Text>
                      <View>
                        <Controller
                          name="channelname"
                          control={channelControl}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <ProfileInput
                                value={value}
                                type="text"
                                placeholder="z.B Allgemein"
                                onChange={onChange}
                              />
                            </View>
                          )}
                        />
                        {channelErros.channelname && (
                          <Text className="m-1 text-sm text-red-500">
                            Dieses Feld muss ausgefüllt werden.
                          </Text>
                        )}
                      </View>
                    </View>
                    <View className="space-y-2">
                      <Text className="text-base">Beschreibung</Text>
                      <View>
                        <Controller
                          name="channeldesc"
                          control={channelControl}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <ProfileInput
                                value={value}
                                type="textarea"
                                placeholder="Beschreibung des Chats"
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
                    onPress={handleChannelSubmit(onChannelSubmit)}
                  >
                    <Text className="text-base text-white">Speichern</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ChatDetailScreen;
