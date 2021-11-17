import React from 'react';

import HomeScreen from '../screens/Home/index';
import DetailScreen from '../screens/ShowDetails/ShowDetails';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab= createBottomTabNavigator();



export default function HomeStack() {
  return (
    <Tab.Navigator  headerMode='none'

screenOptions={({ route }) => ({

  tabBarIcon: ({ focused, color, size }) => {

    let iconName;



    if (route.name === "home") {

      iconName = focused

        ? "ios-home"

        : "ios-home";

    } else if (route.name === "Details") {

      iconName = "ios-cart";

    }else if(route.name === "listcart"){
      iconName = "ios-list";

    }

    return <Ionicons name={iconName} size={size} color={color} />;

  },

  tabBarActiveTintColor: "black",

  tabBarInactiveTintColor: "grey",
})}
>
      <Tab.Screen  name='Home' component={HomeScreen} />
      <Tab.Screen  name='Details' component={DetailScreen} />
    </Tab.Navigator>

  
  );
}
