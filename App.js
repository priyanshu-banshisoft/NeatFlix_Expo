import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import { loadFonts } from './Components/Fonts';
import SignUpPage from './screens/SignUpPage';
import DrawerHandler from './screens/DrawerHandle';
import ShowDetailsScreen from './screens/ShowDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  loadFonts()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name = "Signup" component={SignUpPage} options={{headerShown: false}} />
        <Stack.Screen name='Drawer' component={DrawerHandler} options={{headerShown: false}} />
        <Stack.Screen name='ShowDetails' component={ShowDetailsScreen} options={{headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}