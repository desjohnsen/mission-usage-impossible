import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const NyanCats = () => {
    const translateX = new Animated.Value(-400);
    const translateY = new Animated.Value(height);

    useEffect(() => {
        const loopX = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: width,
                    duration: 6000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -300,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );

        const loopY = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -300,
                    duration: 8000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: height,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );

        loopX.start();
        loopY.start();

        return () => {
            loopX.stop();
            loopY.stop();
        };
    }, []);

    return (
        <View style={StyleSheet.absoluteFill}>
            <Animated.Image
                source={require("@/assets/images/nyan-cat-x.png")}
                style={[styles.catX, { transform: [{ translateX }] }]}
                resizeMode="contain"
            />
            <Animated.Image
                source={require("@/assets/images/nyan-cat-y.png")}
                style={[styles.catY, { transform: [{ translateY }] }]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    catX: {
        position: "absolute",
        top: 330,
        width: 300,
        height: 120,
    },
    catY: {
        position: "absolute",
        left: "50%",
        width: 160,
        height: 300,
        marginLeft: -70,
    },
});

export default NyanCats;