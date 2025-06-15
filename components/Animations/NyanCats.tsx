import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const NyanCats = () => {
    const translateX1 = new Animated.Value(-400);
    const translateX2 = new Animated.Value(-400);
    const translateX3 = new Animated.Value(-400);

    const translateY1 = new Animated.Value(height);
    const translateY2 = new Animated.Value(height);
    const translateY3 = new Animated.Value(height);

    useEffect(() => {
        const loopX1 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX1, {
                    toValue: width,
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX1, {
                    toValue: -300,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        const loopX2 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX2, {
                    toValue: width,
                    duration: 6000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX2, {
                    toValue: -300,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        const loopX3 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX3, {
                    toValue: width,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX3, {
                    toValue: -300,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );

        const loopY1 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY1, {
                    toValue: -300,
                    duration: 7000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY1, {
                    toValue: height,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        const loopY2 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY2, {
                    toValue: -300,
                    duration: 8000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY2, {
                    toValue: height,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        const loopY3 = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY3, {
                    toValue: -300,
                    duration: 6000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY3, {
                    toValue: height,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );

        loopX1.start();
        loopX2.start();
        loopX3.start();

        loopY1.start();
        loopY2.start();
        loopY3.start();

        return () => {
            loopX1.stop();
            loopX2.stop();
            loopX3.stop();

            loopY1.stop();
            loopY2.stop();
            loopY3.stop();
        };
    }, []);

    return (
        <View style={StyleSheet.absoluteFill}>
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
        top: height * 0.025, // Moved slightly up
        width: 300,
        height: 120,
    },
    catX2: {
        position: "absolute",
        top: height * 0.45, // Different Y-position
        width: 300,
        height: 120,
    },
    catX3: {
        position: "absolute",
        top: height * 0.8, // Different Y-position
        width: 300,
        height: 120,
    },

    catY1: {
        position: "absolute",
        left: width * 0.01, // Spread out horizontally
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