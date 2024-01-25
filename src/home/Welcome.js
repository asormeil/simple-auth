import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Welcome = ({ navigation, route }) => {
  const email = route.params?.email;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {email}!</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
});
