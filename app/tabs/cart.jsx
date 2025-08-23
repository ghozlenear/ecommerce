import { StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Cart is Empty </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#333" 
  },
});
