import { StyleSheet } from "react-native";

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

export default registerStyles;