import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../../screens/Login";
import Recipe from "../../screens/Recipe";
import Home from "../../screens/Home";
import TabIcon from "../TabIcon";

import { COLORS, icons } from "../../constants";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "red",
          borderTopColor: "transparent",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={Recipe}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.bookmark} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
