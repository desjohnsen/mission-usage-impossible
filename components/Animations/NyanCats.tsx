import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const NyanCats = (): React.ReactElement => {
  const translateX1 = new Animated.Value(-400);
  const translateX2 = new Animated.Value(-400);
  const translateX3 = new Animated.Value(-400);

  const translateY1 = new Animated.Value(height);
  const translateY2 = new Animated.Value(height);
  const translateY3 = new Animated.Value(height);

  useEffect(() => {
    const createXLoop = (anim: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: width,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: -300,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    const createYLoop = (anim: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -300,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: height,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    const loops = [
      createXLoop(translateX1, 5000),
      createXLoop(translateX2, 6000),
      createXLoop(translateX3, 4000),
      createYLoop(translateY1, 7000),
      createYLoop(translateY2, 8000),
      createYLoop(translateY3, 6000),
    ];

    loops.forEach(loop => loop.start());
    return () => loops.forEach(loop => loop.stop());
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.Image
        source={require("@/assets/images/nyan-cat-x.png")}
        style={[styles.catX1, { transform: [{ translateX: translateX1 }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@/assets/images/nyan-cat-x.png")}
        style={[styles.catX2, { transform: [{ translateX: translateX2 }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@/assets/images/nyan-cat-x.png")}
        style={[styles.catX3, { transform: [{ translateX: translateX3 }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@/assets/images/nyan-cat-y.png")}
        style={[styles.catY1, { transform: [{ translateY: translateY1 }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@/assets/images/nyan-cat-y.png")}
        style={[styles.catY2, { transform: [{ translateY: translateY2 }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require("@/assets/images/nyan-cat-y.png")}
        style={[styles.catY3, { transform: [{ translateY: translateY3 }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  catX1: {
    position: "absolute",
    top: height * 0.025,
    width: 300,
    height: 120,
  },
  catX2: {
    position: "absolute",
    top: height * 0.45,
    width: 300,
    height: 120,
  },
  catX3: {
    position: "absolute",
    top: height * 0.8,
    width: 300,
    height: 120,
  },
  catY1: {
    position: "absolute",
    left: width * 0.01,
    width: 160,
    height: 300,
  },
  catY2: {
    position: "absolute",
    left: width * 0.3,
    width: 160,
    height: 300,
  },
  catY3: {
    position: "absolute",
    left: width * 0.6,
    width: 160,
    height: 300,
  },
});

export default NyanCats;
