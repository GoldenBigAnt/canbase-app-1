import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { loadData } from "@/lib/storage";
import AppIntroSlider from "react-native-app-intro-slider";

const LogoImage = require("@/assets/images/icon.png");
const VectorImage = require("@/assets/images/vector.png");

interface Slide {
  key: string;
  title: string;
  text: string;
}

const slides = [
  {
    key: "one",
    title: "Club verwalten1",
    text: "Verwalte deinen Social Club\njederzeit und von überall.",
  },
  {
    key: "two",
    title: "Club verwalten2",
    text: "Verwalte deinen Social Club\njederzeit und von überall.",
  },
];

export default class AppScreen extends React.Component {
  state = {
    currentSlideIndex: 0,
  };

  _renderItem = ({ item }: { item: Slide }) => {
    return (
      <View className="flex flex-col items-center gap-4">
        <Image className="w-28 h-[120px]" source={VectorImage} />
        <Text className="font-bold text-3xl mt-10">{item.title}</Text>
        <Text className="text-lg text-center text-[#9F9F9F] leading-5">
          {item.text}
        </Text>
      </View>
    );
  };

  handleLogin = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(main)/home");
    } else {
      router.push("/(auth)/login");
    }
  };

  handleRegister = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(main)/home");
    } else {
      router.push("/(auth)/signup");
    }
  };

  handleSlideChange = (index: any) => {
    this.setState({ currentSlideIndex: index });
  };

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 50 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 24, height: "100%" }}
            source={LogoImage}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 32,
              color: "#00C978",
              letterSpacing: -2,
              marginTop: -5
            }}
          >
            canbase
          </Text>
        </View>

        <View style={{ flex: 1, marginTop: 60 }}>
          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onSlideChange={this.handleSlideChange}
            showNextButton={false}
            showDoneButton={false}
          />
        </View>

        <View style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
          <Pressable
            style={{
              width: "100%",
              paddingVertical: 8,
              backgroundColor: "#00C978",
              borderRadius: 8,
            }}
            onPress={this.handleRegister}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                textAlign: "center",
                color: "white",
              }}
            >
              Los geht's
            </Text>
          </Pressable>
          <Pressable onPress={this.handleLogin}>
            <Text style={{ fontSize: 14, color: "#00C978" }}>
              Ich habe bereits einen Account
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}
