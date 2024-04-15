import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { Rating } from "@kolking/react-native-rating";

const ShowDetailsScreen = ({ navigation, route }) => {
  const { item, type } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vid, setVid] = useState("");
  const [visible, setVisible] = useState(false);

  const videoFetchData = async (id) => {
    try {
      const videoResponse = await axios.get(
        `${Url.BASE_URL}movie/${id}/videos?api_key=${NEATFLIX_API_KEY}`
      );
      if (videoResponse.status === 200) {
        console.log(videoResponse.data);
        setVid(videoResponse.data.results.find(item => item.type === 'Trailer')?.key);
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
      console.log(item);
      const movieResponse = await axios.get(
        `${Url.BASE_URL}movie/${item}?api_key=${NEATFLIX_API_KEY}`
      );
      if (movieResponse.status === 200) {
        console.log(movieResponse.data);
        setMovie(movieResponse.data);
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
            style={{ alignSelf: "flex-end", justifyContent: "flex-end",marginEnd:50 }}
            color={'white'}
            size={24}
            onPress={()=>setVisible(false)}
          />
          <View style={{width:320,height:200,justifyContent:'center',alignSelf:'center'}}>
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
                  display:'flex'
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
                    flex:1
                  }}
                />
                <View style={{height: 172.5, marginStart: 30, marginTop: 5,flex:2,}}>
                  <Text style={{ color: "white", opacity: 0.8 }}>{type}</Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginTop: 2,
                      fontFamily: "quicksand_bold",
                    }}
                  >
                    {movie.title}
                  </Text>
                  <Text style={{ color: "white", marginTop: 5, opacity: 0.7 }}>
                    {movie.release_date}
                  </Text>
                  <Rating
                    disabled={true}
                    fillColor="#C9F964"
                    baseColor="#CCCCCC4D"
                    rating={movie.vote_average / 2}
                    size={15}
                    style={{ marginTop: 10 }}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      borderRadius: 20,
                      backgroundColor: "gray",
                      width:"50%",
                    }}
                    onPress={() => {videoFetchData(movie.id);}}
                  >
                    <Ionicons name="play-circle" size={22} color={"white"} />
                    <Text
                      style={{
                        marginStart: 5,
                        justifyContent: "center",
                        alignSelf: "center",
                        color: "white",
                      }}
                    >
                      Show Trailer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
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
