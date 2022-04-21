import { View, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";

const RestaurantDetail = () => {
  return (
    <View>
      <About />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems />
    </View>
  );
};

export default RestaurantDetail;
