import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import { COLORS, SIZES } from "../constants";

import SearchBar from "../components/SearchBar";

const Categories = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let { category } = route.params;
    setSelectedCategory(category);
  }, []);

  const renderHeaderCategories = () => {
    return (
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
        <Text
          style={{
            fontSize: SIZES.radius * 1.5,
            fontWeight: "bold",
            color: COLORS.BLACK,
          }}
        >
          {selectedCategory ? selectedCategory.name : "Kategori"}
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
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
      }}
    >
      {/* Header */}
      {renderHeaderCategories()}
      {/* Search Bar */}
      <SearchBar />
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
