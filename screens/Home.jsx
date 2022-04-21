import { View, Text, SafeAreaView, Platform, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements/dist/divider/Divider";

const YELP_API_KEY =
  "JUGjzDtEQuGcvyJ1MTNDm71-czGFGbqCD01IKrs-mmuFqUrvKzWpaqVYRTT3wmzXt5BufHRk1kCKrGIJ7TkOM4Q8_UqkdL7ZvA_29fpHdLbh4dhuij7dO1Vvnt9UYnYx";

const Home = () => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Fransico");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#eeee",
        flex: 1,
        paddingTop: Platform.OS === "android" ? 50 : 0,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
        }}
      >
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
};

export default Home;
