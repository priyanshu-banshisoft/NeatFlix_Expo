import React, { useState } from "react";
import  SweetAlert ,{ showSweetAlert } from "../Components/sweetAlert";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    if (username.length == 0) {
      console.error("Please enter username");
      return;
    }
    if (password.length == 0) {
      console.error("Please enter Password");
      return;
    }
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        await AsyncStorage.setItem("userModel", JSON.stringify(response.data));
        navigation.replace("Home");
        console.log("Success");
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      // Alert.alert(
      //  'Error',err.message
      // );
      showSweetAlert({
        title: 'Failed',
        text: err.message,
        showCancelButton: false,
        confirmButtonText: 'OK',
        onConfirm: () => {
          console.log('OK');
        },
        type: 'danger', // 'info', 'success', 'danger', veya 'warning' olabilir
      });
      
    }
  };

  return (
    <View style={styles.container}>
      <SweetAlert />
      <Image
        source={require("../assets/images/neatflix_name.png")}
        style={{ marginTop: 50, height: 50, width: 180, alignSelf: "center" }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontFamily: "quicksand_bold",
          marginTop: 50,
        }}
      >
        Log IN
      </Text>
      <TextInput
        style={{
          marginTop: 30,
          borderRadius: 0,
          borderBottomWidth: 1,
          borderColor: "white",
          color: "white",
        }}
        placeholder="Username"
        placeholderTextColor={"#FFFFFF80"}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          borderRadius: 0,
          borderBottomWidth: 1,
          borderColor: "white",
          marginTop: 30,
        }}
      >
        <TextInput
          style={{
            width: "90%",
            color: "white",
          }}
          secureTextEntry={hidePassword}
          placeholder="Password"
          placeholderTextColor={"#FFFFFF80"}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {hidePassword ? (
          <Ionicons
            name="eye"
            color={"white"}
            size={24}
            onPress={() => setHidePassword(!hidePassword)}
          />
        ) : (
          <Ionicons
            name="eye-off"
            color={"white"}
            size={24}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 20,
          backgroundColor: "white",
          alignItems: "center",
          marginTop: 30,
          height: 40,
          justifyContent: "center",
          marginHorizontal: 20,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "black", fontFamily: "quicksand_bold" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#180E36",
    paddingHorizontal: 30,
    width: "100%",
    justifyContent: "center",
  },
});

export default SignUpPage;
