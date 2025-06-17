import bg from "@/assets/images/pixel-bg.png";
import NyanCats from "@/components/Animations/NyanCats";
import Login from "@/components/Forms/Login/Login";
import Register from "@/components/Forms/Register/Register";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function Index(): React.ReactElement {
  const [isLogin, setIsLogin] = useState(true);

  if (isLogin) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Login setIsLogin={setIsLogin} />
        </ScrollView>
      </View>
    );
  }

  return (
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <NyanCats />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Register setIsLogin={setIsLogin} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
