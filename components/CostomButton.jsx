import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS } from "../constants";

const CostomButton = ({
  buttonText,
  buttonContainerStyle,
  colors,
  onPress,
}) => {
  if (colors.length > 0) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={{ ...buttonContainerStyle }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              fontSize: 18,
            }}
          >
            {buttonText}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          ...buttonContainerStyle,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            fontSize: 18,
          }}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CostomButton;
