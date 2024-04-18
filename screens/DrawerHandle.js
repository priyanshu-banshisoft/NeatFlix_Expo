import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import CustomDrawer from "../Components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerHandler() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />} >
        <Drawer.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Drawer.Screen name="Search" component={SearchScreen}  options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
