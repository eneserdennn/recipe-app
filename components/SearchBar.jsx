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

const SearchBar = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = database.recipeData.includes((recipe) =>
      recipe.ingredients.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
    console.log(searchResults);
  }, [searchText]);

  return (
    // text input for searching
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_COLOR,
        marginTop: 18,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: SIZES.radius * 1.5,
          fontWeight: "bold",
          color: COLORS.BLACK,
        }}
        placeholder="Ara..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <FlatList
        data={database.recipeData.filter((item) =>
          item.ingredients.includes(searchText)
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            item={item}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
            style={{
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.PRIMARY,
              alignItems: "center",
              justifyContent: "center",
              marginRight: SIZES.radius,
              marginBottom: SIZES.radius,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.radius * 1.5,
                fontWeight: "bold",
                color: COLORS.WHITE,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text
              style={{
                fontSize: SIZES.radius * 1.5,
                fontWeight: "bold",
                color: COLORS.BLACK,
              }}
            >
              Sonuclar
            </Text>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.PRIMARY,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.radius * 1.5,
                  fontWeight: "bold",
                  color: COLORS.WHITE,
                }}
              >
                Geri Dön
              </Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
};

export default SearchBar;
