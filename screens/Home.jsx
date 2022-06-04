import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../components/CategoryCard";

import TrendingCard from "../components/TrendingCard";

import {
  COLORS,
  SIZES,
  icons,
  images,
  dummyData,
  database,
  categories,
} from "../constants";

const Home = ({ navigation }) => {
  const recipeDatas = database.recipeData;

  // Write a ingredinets array to store the ingredientsList
  const [ingredientsList, setingredientsList] = useState([]);
  const [text, setText] = useState("");

  // Fetch data from API
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

  // Set the recipes state
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [ingredientsList]);

  const addIngredient = (ingredient) => {
    setingredientsList([...ingredientsList, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setingredientsList(ingredientsList.filter((i) => i !== ingredient));
  };

  const clearingredientsList = () => {
    setingredientsList([]);
  };

  async function functionCombined() {
    await getRecipes();
    await navigation.navigate("SearchResult", { recipes: recipes });
  }

  const renderSearchBar = () => {
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
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Text */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGreen,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Merhaba Kullanıcı,
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              marginTop: 3,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Bugün ne pişirebilirsin?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Image
            source={images.profile}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeeRecipeCard = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGreen,
        }}
      >
        <View
          style={{
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={images.recipe}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: SIZES.radius,
          }}
        >
          <Text
            style={{
              width: "70%",
              fontSize: 16,
            }}
          >
            Yapabileceğin {recipes.length} tarifin var
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => functionCombined()}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: "underline",
                fontSize: 14,
              }}
            >
              Tarifleri Gör
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTrendingSection = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: SIZES.padding,
          }}
        >
          Trend Tarifler
        </Text>
        <FlatList
          style={{
            backgroundColor: COLORS.lightGreen1,
          }}
          data={recipeDatas}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 0,
                  marginBottom: 12,
                }}
                recipeItem={item}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
              />
            );
          }}
        />
      </View>
    );
  };

  const renderCategoryHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* Section Title */}
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Kategoriler
        </Text>
        {/* View All */}
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text
            style={{
              color: COLORS.gray,
              fontSize: 14,
            }}
          >
            Hepsi
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <FlatList
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}
            {/* Search Bar */}
            {renderSearchBar()}
            {/* See Recipe Card */}
            {renderSeeRecipeCard()}
            {/* Trending Section */}
            {renderTrendingSection()}
            {/* Category Header */}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <CategoryCard
              data={categories}
              containerStyle={{
                marginHorizontal: SIZES.padding,
              }}
              categoryItem={item}
              onPress={() =>
                navigation.navigate("Categories", { category: item })
              }
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          ></View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
