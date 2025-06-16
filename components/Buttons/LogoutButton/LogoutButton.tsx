import { auth } from "@/firebase/firebase.config";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";

const RotatingLogoutButton = (): React.ReactElement => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Animated.View
        style={{
          transform: [{ rotate }],
          backgroundColor: "rgba(255, 100, 100, 0.9)",
          borderRadius: 40,
          paddingVertical: 20,
          paddingHorizontal: 10,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              color: "#a0d8ef",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RotatingLogoutButton;