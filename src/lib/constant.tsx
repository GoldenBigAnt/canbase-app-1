import { Feather } from "@expo/vector-icons";
import { ClubCardPropsInterface } from "@/types/component";
import Constants from "expo-constants";

export const clubCardData: ClubCardPropsInterface[] = [
  {
    title: "Club erstellen",
    icon: <Feather name="home" size={24} color="black" />,
    content:
      "Erstelle deinen eigenen Cannabis Social Club in wenigen Sekunden und lade die ersten Mitglieder ein.",
    btnText: "Club erstellen",
    btnIcon: <Feather name="plus" size={16} color="white" />,
    route: "/(main)/home/create",
  },
  {
    title: "Social Club finden",
    icon: <Feather name="map" size={24} color="black" />,
    content:
      "Finde Social Clubs in Deutschland, stelle eine Mitgliedsanfrage und werde Mitglied.",
    btnText: "Clubs suchen",
    btnIcon: <Feather name="search" size={16} color="white" />,
    route: "/(main)/home/search",
  },
];

export const statusBarHeight = Constants.statusBarHeight;