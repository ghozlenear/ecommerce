import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
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
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

        <View style={styles.carouselSection}>
          <Carousel
            images={[
              require("../../assets/images/ban1.jpg"),
              require("../../assets/images/ban2.jpg"),
            ]}
          />
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Categories data={categoriesData} />
        </View>

        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Self-Care Spotlight</Text>
          <FlatList
            data={[
              { id: "1", name: "Product 1", price: "1,500.00 DA", image: "https://via.placeholder.com/150" },
              { id: "2", name: "Product 2", price: "2,300.00 DA", image: "https://via.placeholder.com/150" },
              { id: "3", name: "Product 3", price: "3,000.00 DA", image: "https://via.placeholder.com/150" },
              { id: "4", name: "Product 4", price: "4,200.00 DA", image: "https://via.placeholder.com/150" },
            ]}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Glow-Up Tips</Text>
          <FlatList
          data={[
            { id: "1", title: "Stay Hydrated", tip: "Drink at least 2L of water daily " },
            { id: "2", title: "Skincare Routine", tip: "Cleanse, tone & moisturize twice a day " },
            { id: "3", title: "Beauty Sleep", tip: "Get 7–8 hours of quality rest " },
            { id: "4", title: "Eat Clean", tip: "Incorporate fruits & veggies in your diet " },
          ]}
          keyEctractor={(item)=>item.id}
          scrollEnabled={false}
          renderItem={({item})=>(
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>{item.title}</Text>
              <Text style={styles.tipText}>{item.tip}</Text>
              </View>
          )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  subText: {
    fontSize: 14,
    fontWeight: "600",
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
  carouselSection: {
    marginBottom: 20,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  productsSection: {
    marginBottom:20,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    marginBottom: 12 
  },
  productCard: {
    backgroundColor: "#fde2e4",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    width: "48%", 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff6b81",
  },
  tipsSection: {
    marginBottom: 40,
  },
  tipCard: {
    backgroundColor: "#fff0f5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff6b81",
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: "#444",
  },
});
