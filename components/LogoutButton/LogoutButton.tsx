import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/firebase.config";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            
            if (Platform.OS === "web") {
                window.location.href = "/";
            } else {
                router.replace("/");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: "red", padding: 12 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Logga ut</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;