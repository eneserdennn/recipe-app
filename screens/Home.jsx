import React from "react";
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
  const recipes = database.recipeData;

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

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray,
          }}
        />
        <TextInput
          style={{
            marginLeft: SIZES.radius,
            fontSize: 16,
          }}
          placeholderTextColor={COLORS.gray}
          placeholder="Lütfen malzemelerinizi ekleyin"
        ></TextInput>
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
            source={recipes.image}
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
            Yapabileceğin 12 tarifin var
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => console.log(categories)}
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
          data={recipes}
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
