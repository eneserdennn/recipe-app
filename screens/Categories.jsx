import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import { COLORS, SIZES } from "../constants";

const Categories = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let { category } = route.params;
    setSelectedCategory(category);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
      }}
    >
      <FlatList
        data={selectedCategory?.subCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginTop: 10,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.gray2,
            }}
            key={item.id}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
          >
            <Image
              source={{ uri: item.image }}
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
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Categories;
