import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { registerValidator } from "./validation";
import { auth, createUserWithEmailAndPassword } from "../../firebase";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: [],
    password: [],
    auth: [],
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // reset errors with changing input
    setErrors({ email: [], password: [], auth: [] });
  };
  const submitForm = () => {
    // // Logic to submit form or validate inputs
    const validationErrors = registerValidator(formData);
    try {
      if (
        validationErrors.email.length > 0 ||
        validationErrors.password.length > 0
      ) {
        setErrors(validationErrors);
      } else {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredentials) => {
            const email = userCredentials.user.email;
            navigation.navigate("Login", { email: email });
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
        <Text style={styles.title}>Register Screen</Text>

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
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          secureTextEntry
        />
        {errors.password.length > 0 &&
          errors.password.map((message, index) => (
            <Text key={index} style={styles.errorMessage}>
              {message}
            </Text>
          ))}
      </View>

      <Pressable style={styles.button} onPress={submitForm}>
        <Text style={styles.buttonText}>Register</Text>
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

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
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
