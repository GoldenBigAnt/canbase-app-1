import React from "react";
import { Tabs, useSegments } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAppSelector } from "@/store/hook";
import { isEmpty } from "@/lib/functions";

const DashboardLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const segments: string[] = useSegments();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00C978",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={
          !segments.includes("create")
            ? {
                tabBarIcon: (props: any) => (
                  <Feather name="grid" size={24} color={props.color} />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="create"
        options={
          segments.includes("create")
            ? {
                tabBarIcon: (props: any) => (
                  <Feather name="grid" size={24} color={props.color} />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="chat"
        options={
          !isEmpty(user?.club)
            ? {
                tabBarIcon: (props: any) => (
                  <Feather
                    name="message-square"
                    size={24}
                    color={props.color}
                  />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="search"
        options={
          !isEmpty(user?.club)
            ? { href: null }
            : {
                tabBarIcon: (props: any) => (
                  <Feather name="search" size={24} color={props.color} />
                ),
              }
        }
      />
      <Tabs.Screen
        name="club"
        options={
          !isEmpty(user?.club)
            ? {
                tabBarIcon: (props: any) => (
                  <Feather name="home" size={24} color={props.color} />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="map"
        options={
          !isEmpty(user?.club)
            ? {
                tabBarIcon: (props: any) => (
                  <Feather name="map" size={24} color={props.color} />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="app"
        options={
          !isEmpty(user?.club)
            ? { href: null, tabBarStyle: { display: "none" } }
            : {
                tabBarIcon: (props: any) => (
                  <Feather name="home" size={24} color={props.color} />
                ),
                tabBarStyle: { display: "none" },
              }
        }
      />
      <Tabs.Screen
        name="shop"
        options={
          !isEmpty(user?.club)
            ? {
                tabBarIcon: (props: any) => (
                  <Feather name="shopping-bag" size={24} color={props.color} />
                ),
              }
            : { href: null }
        }
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: (props: any) => (
            <Feather name="user" size={24} color={props.color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default DashboardLayout;
