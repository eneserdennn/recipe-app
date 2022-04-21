import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const food = [
  {
    title: "Chicken",
    descrption:
      "Chicken is a type of bird in the genus Corvus (raven), a genus of birds in the family Corvidae.",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: "$10.99",
  },
  {
    title: "Chilaquiles",
    descrption:
      "Chilaquiles are a type of Mexican dish made with corn tortillas, often stuffed with meat, cheese, or vegetables.",
    image:
      "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: "$12.99",
  },
  {
    title: "Pizza",
    descrption:
      "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (anchovies, olives, meat, etc.)",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: "$14.99",
  },
];

const MenuItems = () => {
  return (
    <View style={styles.menuItemStyle}>
      <FoodInfo food={food[0]} />
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
});

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.descrption}</Text>
    <Text>{props.food.price}</Text>
  </View>
);
