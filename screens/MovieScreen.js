import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import axios from "axios";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import ListView from "../Components/ListView";

const MovieScreen = () => {
  const [popular, setPopular] = useState([]);
  const [trending,setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenres] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [nowplaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const fetchData = async () => {
    try {
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

      if (popularResponse.status === 200 
        && trendingResponse.status === 200 
        && genreResponse.status === 200 
        && topratedResponse.status === 200 
        && nowplayingResponse.status === 200
        && upcomingResponse.status === 200) {
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView >
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
                    <View style={{ marginHorizontal: 5,backgroundColor:'#423460',padding:10,borderRadius:15 }}>
                      <Text style={{color:'white'}} >
                        {item.name}
                      </Text>
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
                    <View style={{ marginHorizontal: 5 }}>
                      <Image
                        source={{
                          uri:
                            `${Url.BASE_POSTER_IMAGE_URL}` + item.backdrop_path,
                        }}
                        style={{ width: 200, height: 140, borderRadius: 10 }}
                      />
                      <Text style={{color:'white',maxWidth:200,marginTop:5}} ellipsizeMode='tail' numberOfLines={1} >
                        {item.title}
                      </Text>
                    </View>
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
