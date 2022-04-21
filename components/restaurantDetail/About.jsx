import { View, Text, Image } from "react-native";
import React from "react";

const image =
  "https://images.unsplash.com/photo-1571162437205-8889ff2fee26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const title = "Farmhouse Kitchen Thai Cuisine";
const description = "Thai • Comfort Food • $$ • 🎫  • 4 ⭐  (2913+)";

const About = () => {
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantTitle title={title} />
      <RestaurantDescription description={description} />
    </View>
  );
};

export default About;

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 200 }} />
);

const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "bold",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.title}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      fontSize: 15.5,
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
    }}
  >
    {props.description}
  </Text>
);
