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
    const response = await fetch(
      "https://recipe-app-nodeserver.herokuapp.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsList,
        }),
      }
    );

    let data = await response.json();
    setRecipes(data);
  };

  // Set the recipes state
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [ingredientsList]);

  const addIngredient = (ingredient) => {
    // if the ingredient name's first is lowercase, make it uppercase
    if (ingredient[0] === ingredient[0].toLowerCase()) {
      ingredient = ingredient[0].toUpperCase() + ingredient.slice(1);
    }
    // if the ingredient name's last has an empty space, remove it
    if (ingredient[ingredient.length - 1] === " ") {
      ingredient = ingredient.slice(0, -1);
    }

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
      <View
        style={{
          backgroundColor: COLORS.lightGreen,
          padding: 10,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
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
          style={{}}
          data={ingredientsList}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "40%",
                marginHorizontal: 25,
                marginBottom: 10,
                borderRadius: SIZES.radius,
                borderWidth: 1,
                borderColor: COLORS.darkGreen,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  padding: SIZES.radius,
                }}
              >
                {item}
              </Text>
              <TouchableOpacity onPress={() => removeIngredient(item)}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.red,
                    borderColor: COLORS.red,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                >
                  Sil
                </Text>
              </TouchableOpacity>
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
