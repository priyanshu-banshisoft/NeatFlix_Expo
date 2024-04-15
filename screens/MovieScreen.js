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
} from "react-native";
import axios from "axios";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import ListView from "../Components/ListView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";
import {useNavigation} from '@react-navigation/native';

const MovieScreen = () => {
  const navigation = useNavigation();
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenres] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [nowplaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [visible, setVisible] = useState(false);
  const [video, setVideo] = useState([]);
  const [vid, setVid] = useState("");

  const videoFetchData = async (id) => {
    try {
      const videoResponse = await axios.get(
        `${Url.BASE_URL}movie/${id}/videos?api_key=${NEATFLIX_API_KEY}`
      );
      if (videoResponse.status === 200) {
        // console.log(videoResponse.data.results);
        setVideo(videoResponse.data.results);
        setVid(videoResponse.data.results.map((item)=> {return item.type == 'Trailer'}));
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
      const data = await AsyncStorage.getItem("userModel");
      console.log(data);
      const obj = JSON.parse(data);
      console.log(obj.email);
      const popularResponse = await axios.get(
        `${Url.BASE_URL}movie/popular?page=1&api_key=${NEATFLIX_API_KEY}`
      );
      const trendingResponse = await axios.get(
        `${Url.BASE_URL}trending/movie/day?page=1&api_key=${NEATFLIX_API_KEY}`
      );
      const genreResponse = await axios.get(
        `${Url.BASE_URL}genre/movie/list?api_key=${NEATFLIX_API_KEY}`
      );
      const topratedResponse = await axios.get(
        `${Url.BASE_URL}movie/top_rated?api_key=${NEATFLIX_API_KEY}`
      );
      const nowplayingResponse = await axios.get(
        `${Url.BASE_URL}movie/now_playing?api_key=${NEATFLIX_API_KEY}`
      );

      const upcomingResponse = await axios.get(
        `${Url.BASE_URL}movie/upcoming?api_key=${NEATFLIX_API_KEY}`
      );

      if (
        popularResponse.status === 200 &&
        trendingResponse.status === 200 &&
        genreResponse.status === 200 &&
        topratedResponse.status === 200 &&
        nowplayingResponse.status === 200 &&
        upcomingResponse.status === 200
      ) {
        setPopular(popularResponse.data.results);
        setTrending(trendingResponse.data.results);
        setGenres(genreResponse.data.genres);
        setToprated(topratedResponse.data.results);
        setNowPlaying(nowplayingResponse.data.results);
        setUpcoming(upcomingResponse.data.results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView>
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
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 25,
                      fontFamily: "quicksand_bold",
                    }}
                  >
                    Genre
                  </Text>
                  <FlatList
                    horizontal={true}
                    style={{ marginTop: 10 }}
                    data={genre}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          marginHorizontal: 5,
                          backgroundColor: "#423460",
                          padding: 10,
                          borderRadius: 15,
                        }}
                      >
                        <Text style={{ color: "white" }}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 25,
                      fontFamily: "quicksand_bold",
                    }}
                  >
                    Trending
                  </Text>
                  <FlatList
                    horizontal={true}
                    style={{ marginTop: 10 }}
                    data={trending}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={() => {
                          navigation.navigate('ShowDetails',{item: item.id,type:'Movie'});
                          //videoFetchData(item.id);
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              `${Url.BASE_POSTER_IMAGE_URL}` +
                              item.backdrop_path,
                          }}
                          style={{ width: 200, height: 140, borderRadius: 10 }}
                        />
                        <Text
                          style={{
                            color: "white",
                            maxWidth: 200,
                            marginTop: 5,
                          }}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <ListView title="Popular" item={popular} />
                <ListView title="Top Rated" item={toprated} />
                <ListView title="Now Playing" item={nowplaying} />
                <ListView title="Upcoming" item={upcoming} />
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#180E36",
    paddingVertical: 10,
    width: "100%",
  },
});

export default MovieScreen;
