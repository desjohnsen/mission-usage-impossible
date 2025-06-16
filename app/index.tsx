// app/index.tsx
import bg from "@/assets/images/pixel-bg.png";
import NyanCats from "@/components/Animations/NyanCats";
import Login from "@/components/Forms/Login/Login";
import Register from "@/components/Forms/Register/Register";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function Index(): React.ReactElement {
  const [isLogin, setIsLogin] = useState(true);

  const content = (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <>
            <NyanCats />
            <Register setIsLogin={setIsLogin} />
          </>
        )}
      </ScrollView>
    </View>
  );

  if (isLogin) {
    return content;
  }

  // Wrap only register content in background
  return (
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});