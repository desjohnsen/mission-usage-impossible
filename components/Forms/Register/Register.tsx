import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = ({ setIsLogin }: Props): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassword1, setConfirmPassword1] = useState("");
  const [confirmPassword2, setConfirmPassword2] = useState("");
  const [confirmPassword3, setConfirmPassword3] = useState("");
  const [confirmPassword4, setConfirmPassword4] = useState("");
  const [confirmPassword5, setConfirmPassword5] = useState("");
  const [confirmPassword6, setConfirmPassword6] = useState("");
  const [confirmPassword7, setConfirmPassword7] = useState("");
  const [confirmPassword8, setConfirmPassword8] = useState("");
  const [confirmPassword9, setConfirmPassword9] = useState("");
  const [confirmPassword10, setConfirmPassword10] = useState("");
  const [error, setError] = useState("");

  const getBorderColor = (input: string, isValid: boolean): string => {
    if (input === "") return "transparent";
    return isValid ? "red" : "green"; // red = correct, green = incorrect
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
    confirmPassword10,
  ].every((p) => p === password);

  const handleRegister = async (): Promise<void> => {
    if (!allPasswordsMatch) {
      alert("All confirm password must match password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLogin(true);
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
    } catch (error: any) {
      console.error("Registration error:", error.message);
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <View style={registerStyles.containerRegister}>
      <Text style={registerStyles.titleRegister}>REGISTER</Text>

      <Text style={registerStyles.labelRegister}>Email:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(email, email.includes("@")) }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword1, confirmPassword1 === password) }]}
        value={confirmPassword1}
        onChangeText={setConfirmPassword1}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword2, confirmPassword2 === password) }]}
        value={confirmPassword2}
        onChangeText={setConfirmPassword2}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(password, password.length >= 6) }]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword, confirmPassword === password) }]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword3, confirmPassword3 === password) }]}
        value={confirmPassword3}
        onChangeText={setConfirmPassword3}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword4, confirmPassword4 === password) }]}
        value={confirmPassword4}
        onChangeText={setConfirmPassword4}
        secureTextEntry
      />

      <TouchableOpacity style={registerStyles.registerButton} onPress={handleRegister}>
        <Text style={registerStyles.buttonText}>Create</Text>
      </TouchableOpacity>

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword5, confirmPassword5 === password) }]}
        value={confirmPassword5}
        onChangeText={setConfirmPassword5}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword6, confirmPassword6 === password) }]}
        value={confirmPassword6}
        onChangeText={setConfirmPassword6}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword7, confirmPassword7 === password) }]}
        value={confirmPassword7}
        onChangeText={setConfirmPassword7}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword8, confirmPassword8 === password) }]}
        value={confirmPassword8}
        onChangeText={setConfirmPassword8}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword9, confirmPassword9 === password) }]}
        value={confirmPassword9}
        onChangeText={setConfirmPassword9}
        secureTextEntry
      />

      <Text style={registerStyles.labelRegister}>Confirm Password:</Text>
      <TextInput
        style={[registerStyles.inputRegister, { borderColor: getBorderColor(confirmPassword10, confirmPassword10 === password) }]}
        value={confirmPassword10}
        onChangeText={setConfirmPassword10}
        secureTextEntry
      />

      {error !== "" && <Text style={registerStyles.error}>{error}</Text>}

      <View style={registerStyles.toggleContainer}>
        <Text style={registerStyles.toggleTextWhite}>Already have an account?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={registerStyles.toggleText}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const registerStyles = StyleSheet.create({
  containerRegister: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 350,
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  titleRegister: {
    fontSize: 70,
    marginTop: 5,
    marginBottom: 5,
    color: "rgba(11, 156, 0, 0.4)",
    fontWeight: "900",
    letterSpacing: -10,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "orange",
    fontWeight: "bold",
  },
  labelRegister: {
    marginTop: 10,
    marginBottom: 5,
    color: "rgba(255, 100, 100, 0.9)",
    fontWeight: "bold",
  },
  inputRegister: {
    borderWidth: 2,
    borderColor: "lime",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "white",
    color: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: "100%",
  },
  registerButton: {
    backgroundColor: "rgba(11, 156, 0, 0.4)",
    paddingVertical: 18,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    color: "rgba(255, 100, 100, 0.9)",
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

export default Register;