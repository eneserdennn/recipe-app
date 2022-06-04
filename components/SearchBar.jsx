import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";

import {
  COLORS,
  SIZES,
  icons,
  images,
  dummyData,
  database,
  categories,
} from "../constants";

import { LinearGradient } from "expo-linear-gradient";

const SearchBar = ({ navigation }) => {
  // Write a ingredinets array to store the ingredientsList
  const [ingredientsList, setingredientsList] = useState([]);
  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState([]);
  // Write a function to add ingredientsList to the array
  const addIngredient = (ingredient) => {
    // Add the ingredient to the array
    setingredientsList([...ingredientsList, ingredient]);
  };
  // Write a function to remove ingredientsList from the array
  const removeIngredient = (ingredient) => {
    // Remove the ingredient from the array
    setingredientsList(ingredientsList.filter((i) => i !== ingredient));
  };
  // Write a function to clear the array
  const clearingredientsList = () => {
    // Clear the array
    setingredientsList([]);
  };

  const getRecipes = async () => {
    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
      }),
    });

    let data = await response.json();
    setRecipes(data);
    console.log(recipes);
  };

  const renderSearchButton = () => {
    if (ingredientsList.length > 0) {
      return (
        <TouchableOpacity
          recipes={recipes}
          style={{
            backgroundColor: COLORS.PRIMARY,
            padding: SIZES.radius,
            borderRadius: SIZES.radius,
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginHorizontal: 25,
          }}
          onPress={() => console.log(recipes)}
        >
          <Text>Tariflerde Ara</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.PRIMARY,
          padding: SIZES.radius,
          borderRadius: SIZES.radius,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => addIngredient(text)}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLORS.black,
            padding: SIZES.radius,
            margin: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            fontSize: SIZES.radius * 1.5,
          }}
          placeholder="Malzeme Ekleyin"
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <Text
          style={{
            fontSize: 16,
            color: COLORS.black,
            //marginHorizontal: SIZES.radius,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.darkGreen,
            padding: SIZES.radius,
            color: COLORS.darkGreen,
          }}
        >
          Ekle
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.PRIMARY,
            padding: SIZES.radius,
          }}
          onPress={() => clearingredientsList()}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.red,
              //marginHorizontal: SIZES.radius,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.red,
              padding: SIZES.radius,
            }}
          >
            Temizle
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <FlatList
        data={ingredientsList}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                marginHorizontal: 24,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: COLORS.black,
                padding: 5,
                marginBottom: SIZES.radius,
              }}
            >
              {item}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />

      {renderSearchButton()}
    </View>
  );
};

export default SearchBar;
