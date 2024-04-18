import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { Rating } from "@kolking/react-native-rating";
import Svg, { Path } from "react-native-svg";
import ListView from "../Components/ListView";

const ShowDetailsScreen = ({ navigation, route }) => {
  const { item, type } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vid, setVid] = useState("");
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);

  const handleAppLoad = async (movie) => {
    const movieToSave = {
      mediaId: movie.id,
      imagePath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average / 2,
      addedOn: new Date().toISOString(),
    };
    setAdded(true);
  };

  const videoFetchData = async (id) => {
    try {
      const videoResponse = await axios.get(
        `${Url.BASE_URL}movie/${id}/videos?api_key=${NEATFLIX_API_KEY}`
      );
      if (videoResponse.status === 200) {
        setVid(
          videoResponse.data.results.find((item) => item.type === "Trailer")
            ?.key
        );
        setVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = async () => {
    try {
      const movieResponse = await axios.get(
        `${Url.BASE_URL}${type}/${item}?api_key=${NEATFLIX_API_KEY}`
      );

      const castResponse = await axios.get(
        `${Url.BASE_URL}${type}/${item}/credits?api_key=${NEATFLIX_API_KEY}`
      );

      const similarResponse = await axios.get(
        `${Url.BASE_URL}${type}/${item}/similar?api_key=${NEATFLIX_API_KEY}`
      );

      if (
        movieResponse.status === 200 &&
        castResponse.status === 200 &&
        similarResponse.status === 200
      ) {
        setSimilar(similarResponse.data);
        setCast(castResponse.data);
        setMovie(movieResponse.data);
        console.log(movieResponse.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View
          style={{
            justifyContent: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Ionicons
            name="close"
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              marginEnd: 50,
            }}
            color={"white"}
            size={24}
            onPress={() => setVisible(false)}
          />
          <View
            style={{
              width: 320,
              height: 200,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <WebView
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: 320,
                height: 200,
              }}
              source={{
                uri: `https://www.youtube.com/embed/${vid}`,
              }}
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View
            style={{ width: "100%", height: "100%", flexDirection: "column" }}
          >
            <View style={{ width: "100%", height: "35%" }}>
              <ImageBackground
                source={{
                  uri: `${Url.BASE_BACKDROP_IMAGE_URL}` + movie.backdrop_path,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 28 }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 80,
                  position: "absolute",
                }}
              />
              <Ionicons
                name="arrow-back-circle"
                color={"#423460"}
                size={42}
                style={{ margin: 10 }}
                onPress={() => navigation.goBack()}
              />
              <LinearGradient colors={["transparent", "#180E36CC", "#180E36"]}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    top: 150,
                    display: "flex",
                  }}
                >
                  <Image
                    source={{
                      uri: `${Url.BASE_POSTER_IMAGE_URL}` + movie.poster_path,
                    }}
                    style={{
                      width: 115,
                      height: 172.5,
                      borderRadius: 5,
                      marginStart: 20,
                      flex: 1,
                    }}
                  />
                  <View
                    style={{
                      height: 172.5,
                      marginStart: 30,
                      marginTop: 5,
                      flex: 2,
                    }}
                  >
                    <Text style={{ color: "white", opacity: 0.8 }}>{type}</Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        marginTop: 2,
                        fontFamily: "quicksand_bold",
                      }}
                    >
                      {movie.title ? movie.title : movie.name}
                    </Text>
                    <Text
                      style={{ color: "white", marginTop: 5, opacity: 0.7 }}
                    >
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </Text>
                    <Rating
                      disabled={true}
                      fillColor="#C9F964"
                      baseColor="#CCCCCC4D"
                      rating={movie.vote_average / 2}
                      size={15}
                      style={{ marginTop: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          borderRadius: 20,
                          backgroundColor: "gray",
                          alignContent: "center",
                          width: "50%",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          videoFetchData(movie.id);
                        }}
                      >
                        <Ionicons
                          name="play-circle"
                          size={25}
                          color={"white"}
                        />
                        <Text
                          style={{
                            marginStart: 2,
                            justifyContent: "center",
                            alignSelf: "center",
                            color: "white",
                          }}
                        >
                          Show Trailer
                        </Text>
                      </TouchableOpacity>
                      {added ? (
                        <TouchableOpacity
                          style={{
                            marginStart: 5,
                            flexDirection: "row",
                            marginTop: 10,
                            borderRadius: 20,
                            borderColor: "gray",
                            borderWidth: 1,
                            paddingEnd: 5,
                          }}
                          onPress={() => {
                            videoFetchData(movie.id);
                          }}
                        >
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color={"white"}
                          />
                          <Text
                            style={{
                              marginStart: 2,
                              justifyContent: "center",
                              alignSelf: "center",
                              color: "white",
                            }}
                          >
                            Added
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            marginHorizontal: 5,
                            flexDirection: "row",
                            marginTop: 10,
                            borderRadius: 20,
                            borderColor: "gray",
                            borderWidth: 1,
                            paddingEnd: 5,
                          }}
                          onPress={() => {
                            handleAppLoad(movie);
                          }}
                        >
                          <Ionicons
                            name="add-circle"
                            size={24}
                            color={"white"}
                          />
                          <Text
                            style={{
                              marginStart: 2,
                              justifyContent: "center",
                              alignSelf: "center",
                              color: "white",
                            }}
                          >
                            Add Watch
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <View style={{ marginTop: 50 }}>
                <FlatList
                  horizontal={true}
                  style={{ margin: 10 }}
                  data={movie.genres}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: 2,
                        backgroundColor: "#423460",
                        padding: 8,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          opacity: 0.78,
                          fontSize: 14,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  )}
                />
                <Text
                  style={{
                    color: "white",
                    marginHorizontal: 10,
                    opacity: 0.78,
                  }}
                >
                  {movie.overview}
                </Text>
                  <Text
                    style={{
                      opacity: 0.78,
                      margin: 10,
                      color: "white",
                      fontSize: 18,
                      fontFamily: "quicksand_bold",
                    }}
                  >
                    Cast
                  </Text>
                  <FlatList
                    horizontal={true}
                    style={{ marginStart: 10 }}
                    data={cast.cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          marginHorizontal: 2,
                        }}
                      >
                        {item.profile_path ? (
                          <Image
                            source={{
                              uri:
                                `${Url.BASE_POSTER_IMAGE_URL}` +
                                item.profile_path,
                            }}
                            style={{
                              height: 70,
                              width: 70,
                              borderRadius: 70,
                              alignSelf: "baseline",
                            }}
                          />
                        ) : (
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={70}
                            height={70}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <Path
                              d="M12,2c-4.97,0 -9,4.03 -9,9 0,4.17 2.84,7.67 6.69,8.69L12,22l2.31,-2.31C18.16,18.67 21,15.17 21,11c0,-4.97 -4.03,-9 -9,-9zM12,4c1.66,0 3,1.34 3,3s-1.34,3 -3,3 -3,-1.34 -3,-3 1.34,-3 3,-3zM12,18.3c-2.5,0 -4.71,-1.28 -6,-3.22 0.03,-1.99 4,-3.08 6,-3.08 1.99,0 5.97,1.09 6,3.08 -1.29,1.94 -3.5,3.22 -6,3.22z"
                              fill="white"
                              opacity={0.78}
                            />
                          </Svg>
                        )}
                        <Text
                          style={{
                            color: "#FFFFFF",
                            opacity: 0.78,
                            fontSize: 14,
                            maxWidth: 100,
                            alignSelf: "center",
                            alignItems: "center",
                          }}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          {item.name.length < 10
                            ? item.name
                            : item.name.substr(0, 8) + "..."}
                        </Text>
                      </View>
                    )}
                  />
              </View>
            </View>
          </View>
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
    paddingTop: 40,
    width: "100%",
  },
});

export default ShowDetailsScreen;
