import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
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
    },
})