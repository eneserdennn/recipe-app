import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}
      key={categoryItem.id}
    >
      <Image
        source={{ uri: categoryItem.image }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          width: "65%",
          paddingHorizontal: 20,
        }}
      >
        {/* Name */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {categoryItem.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
