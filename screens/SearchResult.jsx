import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../constants";

// api = http://localhost:5000/api/recipes

const SearchResult = ({ navigation, route }) => {
  const [selectedSearch, setSelectedSearch] = useState(null);

  useEffect(() => {
    let { recipes } = route.params;
    setSelectedSearch(recipes);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 50,
      }}
    >
      <TouchableOpacity style={{}}>
        <FlatList
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}
          data={selectedSearch}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.gray2,
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("Recipe", {
                  recipe: item,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",

                  alignItems: "center",
                }}
              >
                <View>
                  <View
                    style={{
                      flex: 1.5,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        maxWidth: "70%",
                      }}
                    >
                      {item.name ? item.name : item.title}
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        color: COLORS.lightGray2,
                        fontSize: 12,
                      }}
                    >
                      {item.diff} | {item.serving}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchResult;
