import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Clipboard,
  Animated
} from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const SplashScreen = ({ navigation }) => {
  const width = new Animated.Value(100);
  const height = new Animated.Value(35);
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(
        width,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        },
      ).start();
      Animated.timing(
        height,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        },
      ).start();
    },2000);
    
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

    const animation = useRef(null)

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height:'100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       <LottieView
        autoPlay
        ref={animation}
        loop={false}
        style={{
          width: 200,
          height: 200,
          position:'absolute',
        }}
        source={require('../assets/animation/bubble.json')}
      />
      <Animated.Image source={require('../assets/images/neatflix_name.png')} style={{width:width,height:height}} />


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
    backgroundColor: "#180E36",
    paddingTop: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
});

export default SplashScreen;
