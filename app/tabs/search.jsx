import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Search</Text>

      
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.text}>Search page not ready yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 15 
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  resultBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { 
    fontSize: 16, 
    color: "#666" 
  },
});
