import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import registerStyles from "./RegisterStyle";

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
    } catch (err: any) {
      console.error("Registration error:", err.message);
      setError("Registration failed: " + err.message);
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

export default Register;