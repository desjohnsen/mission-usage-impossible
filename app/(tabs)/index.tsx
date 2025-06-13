import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <LoginForm />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
});