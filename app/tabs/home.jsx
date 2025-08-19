import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-web";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";

const categoriesData=[
  { title: "Skincare", icon: "happy-outline" },
  { title: "Haircare", icon: "cut-outline" },
  { title: "Bodycare", icon: "body-outline" },
  { title: "Fragrance", icon: "flask-outline" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Ghozlene</Text>
          <Text style={styles.subText}>Welcome to Miraé</Text>
        </View>
        <Image
          source={require("../../assets/images/profilepic.png")}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#777"
          style={styles.input}
        />
      </View>

      <Carousel
        images={[
          require("../../assets/images/ban1.jpg"),
          require("../../assets/images/ban2.jpg"),
        ]}
      />
      <Text style={styles.sectionTitle}>Categories</Text>
      <Categories data={categoriesData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginTop: 15,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  avatar: {
    width: 38,
    height: 45,
    borderRadius: 22,
    marginTop: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7C8D0",
    opacity: 0.5,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
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
  sectionTitle: { 
    fontSize: 20, 
    fontFamily: 'Poppins_800Bold', 
    marginBottom: 12 },
});
