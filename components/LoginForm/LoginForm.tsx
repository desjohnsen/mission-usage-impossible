import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/firebase.config";
import styles from "./LoginFormStyles";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [confirmPassword1, setConfirmPassword1] = useState<string>("");
    const [confirmPassword2, setConfirmPassword2] = useState<string>("");
    const [confirmPassword3, setConfirmPassword3] = useState<string>("");
    const [confirmPassword4, setConfirmPassword4] = useState<string>("");
    const [confirmPassword5, setConfirmPassword5] = useState<string>("");
    const [confirmPassword6, setConfirmPassword6] = useState<string>("");
    const [confirmPassword7, setConfirmPassword7] = useState<string>("");
    const [confirmPassword8, setConfirmPassword8] = useState<string>("");
    const [confirmPassword9, setConfirmPassword9] = useState<string>("");
    const [confirmPassword10, setConfirmPassword10] = useState<string>("");

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const isFormValid: boolean = email.trim() !== "" && password.trim() !== "";
    const router = useRouter();

    const handleSubmit = async (): Promise<void> => {
        if (
            !isLogin &&
            (
                password !== confirmPassword ||
                password !== confirmPassword1 ||
                password !== confirmPassword2 ||
                password !== confirmPassword3 ||
                password !== confirmPassword4 ||
                password !== confirmPassword5 ||
                password !== confirmPassword6 ||
                password !== confirmPassword7 ||
                password !== confirmPassword8 ||
                password !== confirmPassword9 ||
                password !== confirmPassword10
            )
        ) {
            alert("Alla bekräftelsefält måste matcha lösenordet.");
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
            setError("Fel användarnamn eller lösenord");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={isLogin ? styles.titleLogin : styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={isLogin ? styles.inputLogin : styles.inputRegister}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {!isLogin && (
                <>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword1} onChangeText={setConfirmPassword1} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword2} onChangeText={setConfirmPassword2} />
                </>
            )}

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={isLogin ? styles.inputLogin : [styles.inputRegister, { borderColor: "red" }]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {!isLogin && (
                <>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword3} onChangeText={setConfirmPassword3} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword4} onChangeText={setConfirmPassword4} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword5} onChangeText={setConfirmPassword5} />

                    <TouchableOpacity
                        style={[styles.registerButton, !isFormValid && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword6} onChangeText={setConfirmPassword6} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword7} onChangeText={setConfirmPassword7} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword8} onChangeText={setConfirmPassword8} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword9} onChangeText={setConfirmPassword9} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.inputRegister} secureTextEntry value={confirmPassword10} onChangeText={setConfirmPassword10} />
                </>
            )}

            {isLogin && (
                <TouchableOpacity
                    style={[styles.loginButton, !isFormValid && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={!isFormValid}
                >
                    <Text style={styles.buttonText}>Logga in</Text>
                </TouchableOpacity>
            )}

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleTextWhite}>{isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}</Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>{isLogin ? "Registrera dig här" : "Logga in här"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;