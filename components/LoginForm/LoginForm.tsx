import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/firebase.config";

import { useRouter } from "expo-router";
import styles from "./LoginFormStyles";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const isFormValid = email.trim() !== "" && password.trim() !== "";
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isLogin && password !== confirmPassword) {
            alert("Lösenorden matchar inte");
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/explore");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                router.push("/explore");
            }
        } catch (error: any) {
            console.error("Firebase error:", error);

            if (error.code) {
                console.log("Error code:", error.code);
                console.log("Error message:", error.message);
            } else {
                console.log("Raw error object:", JSON.stringify(error));
            }

            setError("Fel användarnamn eller lösenord");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

            {/* <Link href="/about">About</Link> */}

            <Text style={styles.label}>E-post</Text>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Lösenord</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {!isLogin && (
                <>
                    <Text style={styles.label}>Bekräfta lösenord</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </>
            )}

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
                style={[styles.button, !isFormValid && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={!isFormValid}
            >
                <Text style={styles.buttonText}>
                    {isLogin ? "Logga in" : "Registrera"}
                </Text>
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleTextWhite}>
                    {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>
                        {isLogin ? "Registrera dig här" : "Logga in här"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;