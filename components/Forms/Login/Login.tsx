import { auth } from "@/firebase/firebase.config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import loginStyles from "./LoginStyle";

type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLogin }: Props): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#5b9f91");
  const [error, setError] = useState("");
  const router = useRouter();

  const colors = [
    "#5b9f91",
    "#f5a623",
    "#7B61FF",
    "#FF6F61",
    "#2EC4B6",
    "#FFD23F",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setBackgroundColor(colors[index]);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/(tabs)/profile");
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError("Incorrect email or password.");
    }
  };

  return (
    <View style={[loginStyles.containerLogin, { backgroundColor }]}>
      <Text style={loginStyles.titleLogin}>Login</Text>

      <Text style={loginStyles.labelEmailLogin}>Email:</Text>
      <TextInput
        style={loginStyles.inputEmailLogin}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={loginStyles.labelPasswordLogin}>Password:</Text>
      <TextInput
        style={loginStyles.inputPasswordLogin}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {error !== "" && <Text style={loginStyles.error}>{error}</Text>}

      <View style={loginStyles.toggleContainer}>
        <Text style={loginStyles.toggleTextWhite}>You dont have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={loginStyles.toggleText}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;