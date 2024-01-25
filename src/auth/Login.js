import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { loginValidator } from "./validation";
import { auth, signInWithEmailAndPassword } from "../../firebase";

const Login = ({ navigation, route }) => {
  const emailFromRegister = route.params?.email || "";

  const [formData, setFormData] = useState({
    email: emailFromRegister,
    password: "",
  });

  const [errors, setErrors] = useState({ email: [], password: [], auth: [] });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ email: [], password: [], auth: [] });
  };
  const submitForm = () => {
    // // Logic to submit form or validate inputs
    const validationErrors = loginValidator(formData);
    try {
      if (
        validationErrors.email.length > 0 ||
        validationErrors.password.length > 0
      ) {
        setErrors(validationErrors);
      } else {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredentials) => {
            const email = userCredentials.user.email;
            navigation.navigate("Welcome", { email: email });
          })
          .catch((error) => {
            const errorCode = error.code;
            setErrors({ ...errors, auth: [errorCode] });
          });
      }
    } catch (error) {
      console.log(`Error in handle submit ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login Screen</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        {errors.email.length > 0 &&
          errors.email.map((message, index) => (
            <Text key={index} style={styles.errorMessage}>
              {message}
            </Text>
          ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
        />
      </View>

      <Pressable style={styles.button} onPress={submitForm}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {errors.auth.length > 0 &&
        errors.auth.map((message, index) => (
          <Text key={index} style={styles.errorMessage}>
            {message}
          </Text>
        ))}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 4,
    padding: 5,
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  errorMessage: {
    color: "red",
    fontSize: "small",
  },

  button: {
    borderColor: "#007BFF",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
