import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";

import { BlurView } from "expo-blur";

import { SIZES, COLORS, icons } from "../constants";

const RecipeCardDetails = ({ recipeItem }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Name and Bookmark */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            width: "70%",
            color: COLORS.white,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {recipeItem.name}
        </Text>
        <Image
          source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
          style={{
            width: 20,
            height: 20,
            marginRight: SIZES.base,
            tintColor: COLORS.darkGreen,
          }}
        />
      </View>

      {/* Servings */}
      <Text
        style={{
          color: COLORS.lightGray,
          fontSize: 12,
        }}
      >
        {recipeItem.diff} | {recipeItem.serving} Porsiyon
      </Text>
    </View>
  );
};

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor: COLORS.transparentDarkGray,
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Background Image */}
      <Image
        source={{ uri: recipeItem.image }}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Category */}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {recipeItem.category}
        </Text>
      </View>

      {/* Card Info */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});

export default TrendingCard;
