import { View, Text } from "react-native";
import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Categories from "./screens/Categories";
import RootNavigation from "./navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/home/BottomTabs";
import Recipe from "./screens/Recipe";
import SearchResult from "./screens/SearchResult";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="SearchResult" component={SearchResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
