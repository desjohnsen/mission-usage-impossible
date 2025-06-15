import bg from "@/assets/images/pixel-bg.png";
import NyanCats from "@/components/Animations/NyanCats";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
    const [isLogin, setIsLogin] = useState(true);

    const content = (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </ScrollView>
    );

    return isLogin ? content : (
        <ImageBackground source={bg} style={styles.background} resizeMode="cover">
            <View style={{ flex: 1 }}>
                <NyanCats />
                {content}
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
});