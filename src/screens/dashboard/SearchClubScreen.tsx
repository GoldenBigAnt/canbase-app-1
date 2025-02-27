import React, { useEffect, useState, useMemo } from "react";
import { Image } from "expo-image";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import { getAllClubs } from "@/actions/club";
import { Card, Club, SearchMap } from "@/components";
import { compareStrings } from "@/lib/functions";
import { cn } from "@/lib/utils";

const BadgeImage = require("@/assets/images/badge.png");

const SearchClubScreen: React.FC = () => {
  const [clubData, setClubData] = useState<any>([]);
  const [tempClubData, setTempClubData] = useState<any>([]);
  const [search, setSearch] = useDebounceValue("", 500);
  const [tempSearch, setTempSearch] = useState("");
  const [mapPosition, setMapPosition] = useState([52.52, 13.405]);
  const [isMap, setIsMap] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await getAllClubs();

      setClubData(result.club);
      setTempClubData(result.club);
    })();
  }, []);

  useEffect(() => {
    if (tempSearch === "") {
      setTempClubData(clubData);
    }
  }, [tempSearch, clubData]);

  const mapMarkers = useMemo(() => {
    return tempClubData
      ?.filter((f: any) => f.lat !== undefined || f.lng !== undefined)
      ?.map((m: any, key: string) => ({
        id: key,
        position: { lat: m.lat, lng: m.lng },
        icon: `<svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="11" fill="white" />
        <circle cx="11" cy="11" r="9" fill="#19A873" />
        <path
          d="M12.7987 5.97364C12.9967 6.49375 13.014 7.7377 12.9932 8.6965C12.9803 9.29571 12.414 9.65521 11.9411 9.3626C11.1626 8.88089 10.1669 8.19768 9.87167 7.69297C9.44245 6.79891 9.74972 5.68925 10.558 5.21447C11.3663 4.73968 12.3695 5.07958 12.7987 5.97364Z"
          fill="white"
        />
        <path
          d="M12.7987 15.2764C12.9967 14.7563 13.014 13.5123 12.9932 12.5535C12.9803 11.9543 12.414 11.5948 11.9411 11.8874C11.1626 12.3691 10.1669 13.0523 9.87167 13.557C9.44245 14.4511 9.74972 15.5608 10.558 16.0355C11.3663 16.5103 12.3695 16.1704 12.7987 15.2764Z"
          fill="white"
        />
        <path
          d="M9.65518 8.85166C10.1634 8.90148 11.1653 9.46675 11.9216 9.93578C12.3943 10.2289 12.4165 10.9506 11.9614 11.276C11.2122 11.8115 10.2003 12.4651 9.65895 12.5175C8.74378 12.5187 8.00104 11.699 8 10.6867C7.99896 9.67438 8.74001 8.85281 9.65518 8.85166Z"
          fill="white"
        />
      </svg>`,
      }));
  }, [tempClubData]);

  const handleSearch = async (param: string) => {
    try {
      if (param === "postcode") {
        setTempClubData(
          clubData.filter(
            (f: any) =>
              f.postcode &&
              String(f.postcode)
                .toLowerCase()
                .includes(String(search).toLowerCase())
          )
        );
      } else if (param === "city") {
        const result = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: tempSearch + ", Germany",
              format: "json",
            },
            headers: {
              "User-Agent": "canbase-app",
            },
          }
        );

        result.data.length > 0 &&
          setMapPosition([result.data[0].lat, result.data[0].lon]);

        setTempClubData(
          clubData.filter(
            (f: any) =>
              f.city &&
              String(f.city)
                .toLowerCase()
                .includes(String(search).toLowerCase())
          )
        );
      } else {
        setTempClubData(
          clubData.filter((f: any) =>
            String(f.clubname)
              .toLowerCase()
              .includes(String(search).toLowerCase())
          )
        );
      }

      setSearch("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOwnLocation = async () => {};

  const fetch = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const from = (pageParam - 1) * 10;

    const result = tempClubData
      .sort((a: any, b: any) => {
        if (b.users !== a.users) {
          return b.users - a.users;
        } else if (b.city !== a.city) {
          return compareStrings(b.city, a.city);
        } else {
          return compareStrings(b.clubname, a.clubname);
        }
      })
      .slice(from, from + 10);

    return {
      data: result,
      hasNextPage: result.length === 10,
    };
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [tempClubData],
    fetch,
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasNextPage ? pages.length + 1 : undefined,
    }
  );

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="w-full h-full">
      <View className="relative overflow-hidden bg-[#00C978] rounded-b-xl">
        <View className="p-5 flex flex-col space-y-2">
          <Text className="font-extrabold	text-2xl text-white">
            Social Club finden
          </Text>
          <View className="py-1.5 bg-white rounded-md z-10">
            <TextInput
              className="h-5 px-2 outline-none"
              placeholder="Nach Clubs suchen"
              onChangeText={(text) => {
                setSearch(text);
                setTempSearch(text);
              }}
            />
          </View>
        </View>
        <Image
          className="absolute w-16 h-full right-2"
          source={BadgeImage}
          placeholder="badge"
        />
      </View>
      {search.length > 0 && (
        <Card className="absolute top-24 left-5 bg-white p-0 z-20">
          <Pressable
            className="px-2 py-1.5 text-base rounded-sm"
            onPress={() => handleSearch("postcode")}
          >
            <Text>{`Suchen nach PLZ für: ${search}`}</Text>
          </Pressable>
          <Pressable
            className="px-2 py-1.5 text-base rounded-sm"
            onPress={() => handleSearch("city")}
          >
            <Text>{`Suchen nach Ort für: ${search}`}</Text>
          </Pressable>
          <Pressable
            className="px-2 py-1.5 text-base rounded-sm"
            onPress={() => handleSearch("clubname")}
          >
            <Text>{`Suchen nach Clubname für: ${search}`}</Text>
          </Pressable>
        </Card>
      )}
      <View
        className="absolute top-28 left-2 flex flex-row items-center p-1 bg-white rounded-md z-10"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
      >
        <Pressable
          className={cn("p-1 rounded-md", isMap && "bg-[#00C978]")}
          onPress={() => setIsMap(true)}
        >
          <Feather name="map" size={16} color={isMap ? "white" : "black"} />
        </Pressable>
        <Pressable
          className={cn("p-1 rounded-md", !isMap && "bg-[#00C978]")}
          onPress={() => setIsMap(false)}
        >
          <Feather name="menu" size={16} color={!isMap ? "white" : "black"} />
        </Pressable>
      </View>
      {isMap && (
        <View
          className="absolute bottom-2 right-2 bg-white rounded-md z-10"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <Pressable
            className="p-1 rounded-md bg-[#00C978]"
            onPress={handleOwnLocation}
          >
            <MaterialIcons name="location-pin" size={16} color="white" />
          </Pressable>
        </View>
      )}
      {isMap ? (
        <View className="absolute w-full h-screen -z-10">
          <SearchMap latLng={mapPosition} mapMarkers={mapMarkers} />
        </View>
      ) : (
        <FlatList
          className="mt-12"
          data={data?.pages.flatMap((page) => page.data) || []}
          keyExtractor={(item) => item.clubID}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
          ListEmptyComponent={() => (
            <Text className="px-2">No clubs found.</Text>
          )}
          renderItem={({ item }) => (
            <View className="px-3 pb-3">
              <Club
                clubname={item.clubname}
                badge={item.badge}
                avatar={item.avatar}
                users={item.users}
                maxUser={item.maxUser}
                description={item.description}
                prevent_info={item.prevent_info}
                email={item.email}
                phone={item.phone}
                website={item.website}
                instagram={item.instagram}
                discord={item.discord}
                facebook={item.facebook}
                youtube={item.youtube}
                clubStatus={item.status}
                clubID={item.clubID}
                allowRequest={item.allow_request}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchClubScreen;
