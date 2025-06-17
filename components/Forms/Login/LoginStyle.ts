import { StyleSheet } from "react-native";

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

export default loginStyles;