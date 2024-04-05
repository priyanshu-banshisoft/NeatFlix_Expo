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
  Pressable
} from "react-native";
import axios from "axios";
import { Fonts } from "../Components/Fonts";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating, Rating } from "react-native-ratings";
import { StatusBar } from "expo-status-bar";

const SearchScreen = ({ navigation}) => {
  const [search, setSearch] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);
  const fetchData = async (_text) => {
    try {
      const response = await axios
        .get(
        `${Url.BASE_URL}/search/multi?query=${_text}&api_key=${NEATFLIX_API_KEY}`
        );

      if (response.status === 200) {
        setSearchResponse(response.data.results);
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
      setSearchResponse([]);
    } else {
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
          <Ionicons
            name="search"
            size={24}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </View>
        <FlatList
          horizontal={true}
          style={{ marginTop: 10 }}
          data={searchResponse}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5 }}>
              <Image
                source={{
                  uri: `${Url.BASE_BACKDROP_IMAGE_URL}` + item.poster_path,
                }}
                style={{ width: 140, height: 240, borderRadius: 10 }}
              />
            
              <AirbnbRating 
              reviewSize={0}
              isDisabled={true}
              size={20}

              />
            </View>
          )}
        />
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
    width: "95%",
    height: 54,
    borderRadius: 50,
    marginTop: 20,
    paddingEnd: 60,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    backgroundColor: "#423460",
  },
});

export default SearchScreen;
