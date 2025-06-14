import bg from "@/assets/images/pixel-bg.png";
import LoginForm from "@/components/LoginForm/LoginForm";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";

export default function Index() {
    const [isLogin, setIsLogin] = useState(true);

    const content = (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </ScrollView>
    );

    return isLogin ? content : (
        <ImageBackground source={bg} style={styles.background} resizeMode="cover">
            {content}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
});