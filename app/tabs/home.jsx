import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-web";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";

const categoriesData=[
  { title: "Skincare", icon: "happy-outline" },
  { title: "Haircare", icon: "cut-outline" },
  { title: "Bodycare", icon: "body-outline" },
  { title: "Fragrance", icon: "flask-outline" },
];

export default function HomeScreen() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: "1", name: "SKIN 1004 - Madagascar Centella Deep Cleansing Foam", price: "1,509.20 DA", image: "https://via.placeholder.com/150", rating: 5 },
    { id: "2", name: "Anua Peach 70% Niacinamide Serum", price: "2,300.00 DA", image: "https://via.placeholder.com/150", rating: 4 },
    { id: "3", name: "Vaseline Cocoa Radiant Gel Oil", price: "3,000.00 DA", image: "https://via.placeholder.com/150", rating: 5 },
    { id: "4", name: "Chloé Rosa Damascena", price: "4,200.00 DA", image: "https://via.placeholder.com/150", rating: 4 },
  ];

  const toggleFavorite = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      if (favorites.some(item => item.id === productId)) {
        // Remove from favorites
        setFavorites(favorites.filter(item => item.id !== productId));
      } else {
        // Add to favorites
        setFavorites([...favorites, product]);
      }
    }
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

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
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                isFavorited={favorites.some(fav => fav.id === item.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
          
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Glow-Up Tips</Text>
          <FlatList
            data={[
              { id: "1", title: "Stay Hydrated", tip: "Drink at least 2L of water daily", icon: "water-outline" },
              { id: "2", title: "Skincare Routine", tip: "Cleanse, tone & moisturize twice a day", icon: "sparkles-outline" },
              { id: "3", title: "Beauty Sleep", tip: "Get 7–8 hours of quality rest", icon: "moon-outline" },
              { id: "4", title: "Eat Clean", tip: "Incorporate fruits & veggies in your diet", icon: "leaf-outline" },
            ]}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={styles.tipCard}>
                <View style={styles.tipHeader}>
                  <Ionicons name={item.icon} size={24} color="#ff6b81" style={styles.tipIcon} />
                  <Text style={styles.tipTitle}>{item.title}</Text>
                </View>
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
    fontFamily: "System",
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  subText: {
    fontSize: 14,
    fontFamily: "System",
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
    fontFamily: "System",
    fontWeight: "500",
    color: "#333",
  },
  carouselSection: {
    marginBottom: 20,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  productsSection: {
    marginBottom: 30,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontFamily: "System",
    fontWeight: "800", 
    marginBottom: 16,
    color: "#2c3e50",
  },
  tipsSection: {
    marginBottom: 40,
  },
  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#ff6b81",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b81",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tipIcon: {
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "700",
    color: "#ff6b81",
  },
  tipText: {
    fontSize: 14,
    fontFamily: "System",
    fontWeight: "400",
    color: "#555",
    lineHeight: 20,
    paddingLeft: 32,
  },
  loadMoreButton: {
    backgroundColor: "#F7C8D0",
    opacity: 0.80,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#F7C8D0",
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "700",
  },
});
