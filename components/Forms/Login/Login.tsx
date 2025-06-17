import { auth } from "@/firebase/firebase.config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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

const loginStyles = StyleSheet.create({
  containerLogin: {
    padding: 0,
    flex: 1,
  },
  titleLogin: {
    fontSize: 15,
    marginTop: 130,
    fontWeight: "bold",
    textAlign: "right",
    color: "rgba(255, 100, 100, 0.5)",
  },
  labelEmailLogin: {
    marginTop: 140,
    marginBottom: 5,
    color: "rgba(255, 100, 100, 0.5)",
    fontWeight: "bold",
  },
  inputEmailLogin: {
    borderRadius: 17,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "rgba(255, 100, 100, 0.5)",
    color: "green",
    fontWeight: "bold",
    marginRight: 120,
  },
  labelPasswordLogin: {
    marginTop: 10,
    marginBottom: 5,
    color: "rgba(11, 156, 0, 0.4)",
    fontWeight: "bold",
    paddingLeft: 120,
  },
  inputPasswordLogin: {
    borderColor: "green",
    borderRadius: 17,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "rgba(11, 156, 0, 0.4)",
    color: "red",
    fontWeight: "bold",
    marginLeft: 120,
  },
  loginButton: {
    backgroundColor: "rgba(255, 100, 100, 0.5)",
    marginRight: 220,
    padding: 10,
    marginTop: 30,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    marginBottom: 170,
  },
  buttonText: {
    fontSize: 14,
    color: "rgba(11, 156, 0, 0.4)",
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  toggleText: {
    color: "rgba(255, 100, 100, 0.9)",
    paddingLeft: 5,
    textDecorationLine: "underline",
  },
  toggleTextWhite: {
    color: "rgba(255, 127, 25, 0.9)",
  },
  error: {
    marginTop: 10,
    color: "#ff0000",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#ffeeee",
    padding: 10,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 1,
  },
});

export default Login;