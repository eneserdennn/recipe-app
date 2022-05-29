import { View, Text, Image } from "react-native";
import React from "react";

import { COLORS } from "../constants";

const Viewers = ({ viewersList }) => {
  if (viewersList?.length === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            fontSize: 14,
          }}
        >
          Bu tarifi ilk deneyen siz olun
        </Text>
      </View>
    );
  } else if (viewersList?.length <= 4) {
    return (
      <View>
        {/* Profile */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          {viewersList?.map((item, index) => (
            <View
              key={index}
              style={{
                width: 50,
                height: 50,
                marginLeft: index === 0 ? 0 : -20,
              }}
            >
              <Image
                source={item.profilePic}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </View>
          ))}
        </View>

        {/* Text */}

        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} kişi
        </Text>

        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          Tarifi zaten denedi!
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        {/* Profile */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          {viewersList?.map((item, index) => {
            if (index <= 2) {
              return (
                <View
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: index === 0 ? 0 : -20,
                  }}
                >
                  <Image
                    source={item.profilePic}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                </View>
              );
            }
            if (index === 3) {
              return (
                <View
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: -20,
                    borderRadius: 25,
                    backgroundColor: COLORS.darkGreen,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 14,
                    }}
                  >
                    {viewersList?.length - 3}+
                  </Text>
                </View>
              );
            }
          })}
        </View>

        {/* Text */}
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} kişi
        </Text>

        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: "right",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          Tarifi zaten denedi!
        </Text>
      </View>
    );
  }
};

export default Viewers;
