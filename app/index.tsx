import bg from "@/assets/images/pixel-bg.png";
import NyanCats from "@/components/Animations/NyanCats";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

const Index = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const content = (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
    </ScrollView>
  );

  if (isLogin) {
    return (
      <View style={styles.background}>
        <NyanCats />
        {content}
      </View>
    );
  }

  return (
    <ImageBackground
      source={bg}
      style={styles.background}
      resizeMode="cover"
    >
      <NyanCats />
      {content}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default Index;