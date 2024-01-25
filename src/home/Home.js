import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Auth with Firebase</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
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

export default Home;
