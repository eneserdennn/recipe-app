import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { images, COLORS, SIZES } from "../constants";
import CostomButton from "../components/CostomButton";

const Login = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? "65%" : "60%",
        }}
      >
        <ImageBackground
          source={images.loginBackground}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: "80%",
                color: COLORS.white,
                fontSize: 40,
                fontWeight: "bold",
                lineHeight: 45,
              }}
            >
              Cooking a Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  const renderDetail = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginTop: SIZES.radius,
            width: "80%",
            color: COLORS.gray,
            fontSize: 18,
          }}
        >
          Discover more than 2500 food recieps in your hands and cooking it
          easily!
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <CostomButton
            buttonText="Login"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />

          <CostomButton
            buttonText="Sign Up"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkLime,
              borderWidth: 1,
            }}
            colors={[]}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      {renderDetail()}
    </View>
  );
};

export default Login;
