import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MovieScreen from "./MovieScreen";
import { Svg, Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import TvShowScreen from "./TvShowScreen";
import AsyncStorage from '@react-native-async-storage/async-storage'

const renderScene = SceneMap({
  first: MovieScreen,
  second: TvShowScreen,
});

const HomeScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Movie" },
    { key: "second", title: "TV Shows" },
  ]);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={{ flexDirection: "row",width:'100%',justifyContent:'space-between'}}>
        
          <Svg
            height={34}
            width={34}
            viewBox="0 0 34 34"
            xmlns="http://www.w3.org/2000/svg"
            onPress={()=> { navigation.openDrawer();}}
          >
            <Path
              fill="#ffffff"
              d="M12.75,17C14.4408,17 16.0623,16.3283 17.2578,15.1328C18.4534,13.9373 19.125,12.3158 19.125,10.625C19.125,8.9342 18.4534,7.3127 17.2578,6.1172C16.0623,4.9216 14.4408,4.25 12.75,4.25C11.0592,4.25 9.4377,4.9216 8.2422,6.1172C7.0466,7.3127 6.375,8.9342 6.375,10.625C6.375,12.3158 7.0466,13.9373 8.2422,15.1328C9.4377,16.3283 11.0592,17 12.75,17V17ZM2.125,29.75C2.125,29.75 0,29.75 0,27.625C0,25.5 2.125,19.125 12.75,19.125C23.375,19.125 25.5,25.5 25.5,27.625C25.5,29.75 23.375,29.75 23.375,29.75H2.125ZM23.375,7.4375C23.375,7.1557 23.4869,6.8855 23.6862,6.6862C23.8855,6.4869 24.1557,6.375 24.4375,6.375H32.9375C33.2193,6.375 33.4895,6.4869 33.6888,6.6862C33.8881,6.8855 34,7.1557 34,7.4375C34,7.7193 33.8881,7.9895 33.6888,8.1888C33.4895,8.3881 33.2193,8.5 32.9375,8.5H24.4375C24.1557,8.5 23.8855,8.3881 23.6862,8.1888C23.4869,7.9895 23.375,7.7193 23.375,7.4375ZM24.4375,12.75C24.1557,12.75 23.8855,12.8619 23.6862,13.0612C23.4869,13.2605 23.375,13.5307 23.375,13.8125C23.375,14.0943 23.4869,14.3645 23.6862,14.5638C23.8855,14.7631 24.1557,14.875 24.4375,14.875H32.9375C33.2193,14.875 33.4895,14.7631 33.6888,14.5638C33.8881,14.3645 34,14.0943 34,13.8125C34,13.5307 33.8881,13.2605 33.6888,13.0612C33.4895,12.8619 33.2193,12.75 32.9375,12.75H24.4375ZM28.6875,19.125C28.4057,19.125 28.1355,19.2369 27.9362,19.4362C27.7369,19.6355 27.625,19.9057 27.625,20.1875C27.625,20.4693 27.7369,20.7395 27.9362,20.9388C28.1355,21.1381 28.4057,21.25 28.6875,21.25H32.9375C33.2193,21.25 33.4895,21.1381 33.6888,20.9388C33.8881,20.7395 34,20.4693 34,20.1875C34,19.9057 33.8881,19.6355 33.6888,19.4362C33.4895,19.2369 33.2193,19.125 32.9375,19.125H28.6875ZM28.6875,25.5C28.4057,25.5 28.1355,25.6119 27.9362,25.8112C27.7369,26.0105 27.625,26.2807 27.625,26.5625C27.625,26.8443 27.7369,27.1145 27.9362,27.3138C28.1355,27.5131 28.4057,27.625 28.6875,27.625H32.9375C33.2193,27.625 33.4895,27.5131 33.6888,27.3138C33.8881,27.1145 34,26.8443 34,26.5625C34,26.2807 33.8881,26.0105 33.6888,25.8112C33.4895,25.6119 33.2193,25.5 32.9375,25.5H28.6875Z"
            />
          </Svg>
          <Image
            source={require("../assets/images/neatflix_name.png")}
            style={{ width: 90, height: 25, alignSelf:'center'}}
          />
          <TouchableOpacity onPress={()=>navigation.navigate('Search')} >
          <Ionicons name="search" size={34} color={'white'} />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled={false}
          initialLayout={{ width: '100%' }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: "transparent",
                marginHorizontal: 70,
              }}
              indicatorStyle={{
                backgroundColor: "#FFF",
              }}
            />
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
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default HomeScreen;
