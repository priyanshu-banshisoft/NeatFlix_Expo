import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Fonts } from "../Components/Fonts";
import { NEATFLIX_API_KEY } from "@env";
import { Url } from "../Constants/Url";
import { useNavigation } from "@react-navigation/native";
import ListView from "../Components/ListView";

const TvShowScreen = () => {
  const navigation = useNavigation();
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
          `${Url.BASE_URL}tv/popular?page=1&api_key=${NEATFLIX_API_KEY}`
        );
        const trendingResponse = await axios.get(
          `${Url.BASE_URL}trending/tv/day?page=1&api_key=${NEATFLIX_API_KEY}`
        );
        const genreResponse = await axios.get(
          `${Url.BASE_URL}genre/tv/list?api_key=${NEATFLIX_API_KEY}`
        );
        const topratedResponse = await axios.get(
          `${Url.BASE_URL}tv/top_rated?api_key=${NEATFLIX_API_KEY}`
        );

        const nowplayingResponse = await axios.get(
          `${Url.BASE_URL}tv/on_the_air?api_key=${NEATFLIX_API_KEY}`
        );
  
  
  
        if (popularResponse.status === 200 
          && trendingResponse.status === 200 
          && genreResponse.status === 200 
          && topratedResponse.status === 200 
          && nowplayingResponse.status === 200) {
          setPopular(popularResponse.data.results);
          setTrending(trendingResponse.data.results);
          setGenres(genreResponse.data.genres);
          setToprated(topratedResponse.data.results)
          setNowPlaying(nowplayingResponse.data.results)
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
    <ScrollView>
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
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ marginHorizontal: 5 }}
                        onPress={() => {
                          navigation.navigate("ShowDetails", {
                            item: item.id,
                            type: "tv",
                          });
                        }}
                      >
                    <View style={{ marginHorizontal: 5 }}>
                      <Image
                        source={{
                          uri:
                            `${Url.BASE_POSTER_IMAGE_URL}` + item.backdrop_path,
                        }}
                        style={{ width: 200, height: 140, borderRadius: 10 }}
                      />
                      <Text style={{color:'white',maxWidth:200,marginTop:5}} ellipsizeMode='tail' numberOfLines={1} >
                        {item.name}
                      </Text>
                    </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <ListView title="Popular" item={popular} type="tv"/>
              <ListView title="Top Rated" item={toprated} type="tv"/>
              <ListView title="Now Playing" item={nowplaying} type="tv"/>
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

export default TvShowScreen;
