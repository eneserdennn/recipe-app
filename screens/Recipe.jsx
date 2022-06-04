import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  FlatList,
} from "react-native";

import Viewers from "../components/Viewers";

import { BlurView } from "expo-blur";

import { SIZES, COLORS, icons } from "../constants";

const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* Screen Overlay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* Header Bar Title */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        ></Animated.View>

        {/* Back Button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>

        {/* Bookmark */}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
          }}
        >
          <Image
            source={
              selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark
            }
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.darkGreen,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const rednerRecipeCardHeader = () => {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Animated.Image
          source={{ uri: selectedRecipe?.image }}
          key={selectedRecipe?.id}
          keyExtractor={(item) => item.id}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
      </View>
    );
  };

  const renderRecipeInfo = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 130,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        {/* Recipe */}

        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
            }}
          >
            {selectedRecipe?.name
              ? selectedRecipe?.name
              : selectedRecipe?.title}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: COLORS.lightGray2,
              fontSize: 12,
            }}
          >
            {selectedRecipe?.diff} | {selectedRecipe?.serving}
          </Text>
        </View>

        {/* Viewers */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* <Viewers viewersList={selectedRecipe?.viewers} /> */}
        </View>
      </View>
    );
  };

  const renderIngredientHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 18,
          }}
        >
          Malzemeler
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            fontSize: 12,
          }}
        >
          {selectedRecipe?.ingredients.length} öğeler
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {rednerRecipeCardHeader()}

            {/* Info */}
            {renderRecipeInfo()}

            {/* Ingredient Title */}
            {renderIngredientHeader()}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FlatList
                data={selectedRecipe?.ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        marginLeft: 30,
                        fontWeight: "bold",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                )}
              />
              <FlatList
                data={selectedRecipe?.measures}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        marginRight: 30,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                )}
              />
            </View>
            {/* Description */}
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 20,
                marginTop: SIZES.radius,
                marginBottom: SIZES.padding,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Hazırlanışı
              </Text>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {selectedRecipe?.description}
              </Text>
            </View>
          </View>
        }
      />

      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
