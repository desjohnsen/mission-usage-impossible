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

    const getBorderColor = (input: string, isValid: boolean): string => {
        if (input === "") return "transparent";
        return isValid ? "red" : "green";
    };

    const allPasswordsMatch = [
        confirmPassword,
        confirmPassword1,
        confirmPassword2,
        confirmPassword3,
        confirmPassword4,
        confirmPassword5,
        confirmPassword6,
        confirmPassword7,
        confirmPassword8,
        confirmPassword9,
        confirmPassword10
    ].every(p => p === password);

    const handleSubmit = async (): Promise<void> => {
        if (!isLogin && !allPasswordsMatch) {
            alert("Alla bekräftelsefält måste matcha lösenordet.");
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/about");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                router.push("/index");
            }
        } catch (error: any) {
            console.error("Firebase error:", error);
            setError("Fel användarnamn eller lösenord");
        }
    };

    return (
        <View style={[isLogin ? styles.containerLogin : styles.containerRegister]}>
            <Text style={isLogin ? styles.titleLogin : styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

            <Text style={[isLogin ? styles.labelEmailLogin : styles.labelRegister]}>Email:</Text>
            <TextInput 
                style={[isLogin ? styles.inputEmailLogin : styles.inputRegister, { borderColor: getBorderColor(email, email.includes("@")) }]}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {!isLogin && (
                <>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword1, confirmPassword1 === password) }]} secureTextEntry value={confirmPassword1} onChangeText={setConfirmPassword1} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword2, confirmPassword2 === password) }]} secureTextEntry value={confirmPassword2} onChangeText={setConfirmPassword2} />
                </>
            )}

            <Text style={[isLogin ? styles.labelPasswordLogin : styles.label]}>Password:</Text>
            <TextInput
                style={[isLogin ? styles.inputPasswordLogin : styles.inputRegister, { borderColor: getBorderColor(password, password.length >= 6) }]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {!isLogin && (
                <>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword, confirmPassword === password) }]} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword3, confirmPassword3 === password) }]} secureTextEntry value={confirmPassword3} onChangeText={setConfirmPassword3} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword4, confirmPassword4 === password) }]} secureTextEntry value={confirmPassword4} onChangeText={setConfirmPassword4} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword5, confirmPassword5 === password) }]} secureTextEntry value={confirmPassword5} onChangeText={setConfirmPassword5} />

                    <TouchableOpacity
                        style={[styles.registerButton, !isFormValid && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword6, confirmPassword6 === password) }]} secureTextEntry value={confirmPassword6} onChangeText={setConfirmPassword6} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword7, confirmPassword7 === password) }]} secureTextEntry value={confirmPassword7} onChangeText={setConfirmPassword7} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword8, confirmPassword8 === password) }]} secureTextEntry value={confirmPassword8} onChangeText={setConfirmPassword8} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword9, confirmPassword9 === password) }]} secureTextEntry value={confirmPassword9} onChangeText={setConfirmPassword9} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={[styles.inputRegister, { borderColor: getBorderColor(confirmPassword10, confirmPassword10 === password) }]} secureTextEntry value={confirmPassword10} onChangeText={setConfirmPassword10} />
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
                <TouchableOpacity onPress={() => {
                    setIsLogin(!isLogin);
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setConfirmPassword1("");
                    setConfirmPassword2("");
                    setConfirmPassword3("");
                    setConfirmPassword4("");
                    setConfirmPassword5("");
                    setConfirmPassword6("");
                    setConfirmPassword7("");
                    setConfirmPassword8("");
                    setConfirmPassword9("");
                    setConfirmPassword10("");
                    setError("");
                }}>
                    <Text style={styles.toggleText}>{isLogin ? "Registrera dig här" : "Logga in här"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;