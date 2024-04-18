import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";
import { Fonts } from "../Components/Fonts";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import { Ionicons } from "@expo/vector-icons";
// import { AirbnbRating, Rating } from "react-native-ratings";
import { StatusBar } from "expo-status-bar";
import { Rating } from "@kolking/react-native-rating";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [genre, setGenres] = useState([]);
  const [searchResponse, setSearchResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [write, setWrite] = useState(false);
  useEffect(() => {
    genreData();
  }, [genreData]);

  const genreData = async () => {
    try {
      const genreResponse = await axios.get(
        `${Url.BASE_URL}genre/movie/list?api_key=${NEATFLIX_API_KEY}`
      );
      const genreResponseTv = await axios.get(
        `${Url.BASE_URL}genre/tv/list?api_key=${NEATFLIX_API_KEY}`
      );

      if (genreResponse.status === 200 && genreResponseTv.status === 200) {
        setGenres([
          ...genre,
          ...genreResponse.data.genres,
          ...genreResponseTv.data.genres,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (_text) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Url.BASE_URL}/search/multi?query=${_text}&api_key=${NEATFLIX_API_KEY}`
      );

      if (response.status === 200) {
        setSearchResponse(
          response.data.results.filter(
            (res) => res.media_type === "movie" || res.media_type === "tv"
          )
        );
        console.log(response.data.results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const searchFunction = (text) => {
    setSearch(text);
    text = text.toLowerCase();
    if (text === "") {
      setLoading(false);
      setWrite(false);
      setSearchResponse([]);
    } else {
      setWrite(true);
      fetchData(text);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          >
            <Ionicons name="arrow-back-circle" color={"#423460"} size={42} />
          </TouchableOpacity>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              flex: 1,
              color: "white",
              fontSize: 25,
              marginEnd: 80,
              fontFamily: "quicksand_semibold",
            }}
          >
            Search
          </Text>
        </View>
        <View style={[styles.searchbox]}>
          <TextInput
            style={{ width: "100%", marginHorizontal: 10, color: "white" }}
            placeholder="Search..."
            placeholderTextColor={"white"}
            value={search}
            onChangeText={(text) => searchFunction(text)}
          />
          {write ? (
            <Ionicons
              name="close"
              size={24}
              color="white"
              style={{ alignSelf: "center" }}
              onPress={() => searchFunction("")}
            />
          ) : (
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={{ alignSelf: "center" }}
            />
          )}
        </View>
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            style={{ marginTop: 10 }}
            data={searchResponse}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate("ShowDetails", {
                  item: item.id,
                  type: item.media_type,
                });
              }}
            >
              <View
                style={{
                  margin: 5,
                  flexDirection: "row",
                  backgroundColor: "#423460",
                  borderRadius: 10,
                }}
              >
                <View>
                  <Image
                    source={{
                      uri: `${Url.BASE_BACKDROP_IMAGE_URL}` + item.poster_path,
                    }}
                    style={{
                      width: 70,
                      height: 120,
                      borderRadius: 10,
                      margin: 8,
                    }}
                  />
                </View>
                <View style={{ flex: 1, width: "100%" }}>
                  <Text
                    style={{
                      marginTop: 5,
                      color: "white",
                      backgroundColor: "#CCCCCC33",
                      borderRadius: 5,
                      alignSelf: "flex-start",
                      alignItems: "baseline",
                      padding: 5,
                      fontSize: 12,
                    }}
                    numberOfLines={1}
                  >
                    {item.media_type}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      opacity: 0.78,
                      maxWidth: 250,
                    }}
                    numberOfLines={2}
                  >
                    {item.name ? item.name : item.title}
                  </Text>
                  <Text style={{ color: "white", fontSize: 12, opacity: 0.78 }}>
                    {item.first_air_date || item.release_date}
                  </Text>
                  <Rating
                    disabled={true}
                    fillColor="#C9F964"
                    rating={item.vote_average / 2}
                    size={15}
                  />
                  <FlatList
                    style={{ marginBottom: 5 }}
                    data={item.genre_ids}
                    numColumns={3}
                    renderItem={({ item }) => (
                      <View style={{alignSelf:'baseline'}}>
                        <Text
                          style={{
                            color: "#C9F964",
                            padding: 4,
                            backgroundColor: "#C9F96429",
                            borderRadius: 8,
                            margin: 2,
                          }}
                        >
                          {
                            genre.filter((gen) => {
                              return gen.id === item;
                            })[0]?.name
                          }
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#180E36",
    paddingTop: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  searchbox: {
    flexDirection: "row",
    width: "100%",
    height: 54,
    borderRadius: 50,
    marginTop: 20,
    paddingEnd: 60,
    alignSelf: "flex-start",
    backgroundColor: "#423460",
  },
});

export default SearchScreen;
