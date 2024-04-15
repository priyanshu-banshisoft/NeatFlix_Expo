import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";

const Drawer = createDrawerNavigator();

export default function DrawerHandler() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Drawer.Screen name="Notifications" component={SearchScreen}  options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
