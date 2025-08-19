import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      
      <Image
          source={require("../../assets/images/profilepic.png")}
          resizeMode="contain"
        style={styles.avatar}
      />

      
      <Text style={styles.name}>Ghozlene</Text>
      <Text style={styles.email}>ghozlene@example.com</Text>

      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff6b81",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
