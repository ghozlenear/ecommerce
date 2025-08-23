import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CartOverlay from "../components/CartOverlay"; // adjust path if needed
import ProductCard from "../components/ProductCard"; // adjust path if needed


export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const router = useRouter();
  
  const categories = ["ALL", "Skin", "Body", "Hair"];
  
  const products = [
    {
      id: "1",
      name: "Anua Peach 70% Niacinamide Serum",
      price: "2,112.88 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    },
    {
      id: "2",
      name: "SKIN 1004 - Madagascar Centella Deep Cleansing Foam",
      price: "1,509.20 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    },
    {
      id: "3",
      name: "Vaseline Cocoa Radiant Gel Oil",
      price: "1,950.00 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    },
    {
      id: "4",
      name: "Chloé Rosa Damascena",
      price: "17,800.00 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    },
    {
      id: "5",
      name: "Lip Gloss",
      price: "850.00 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    },
    {
      id: "6",
      name: "Jade Roller & Gua Sha",
      price: "2,500.00 DA",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      isFavorite: false
    }
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
    console.log('🚨 addToCart called with productId:', productId);
    console.log('🚨 This should only happen when cart icon is clicked!');
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        // Increase quantity if already in cart
        setCartItems(cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        // Add new item to cart
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      // Don't navigate to cart page, just add to cart
    }
  };

  const toggleCartOverlay = () => {
    setShowCartOverlay(!showCartOverlay);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Search</Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={toggleCartOverlay}
          >
            <Ionicons name="cart" size={24} color="#ff6b81" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
          columnWrapperStyle={styles.productRow}
          scrollEnabled={false}
          style={styles.productsGrid}
        />
      </View>
      
      {/* Cart Overlay */}
      <CartOverlay
        visible={showCartOverlay}
        cartItems={cartItems}
        onClose={toggleCartOverlay}
        onRemoveItem={removeFromCart}
      />
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
    padding: 20 
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { 
    fontSize: 28, 
    fontFamily: "System",
    fontWeight: "800", 
    color: "#333"
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
  categoriesContainer: {
    marginBottom: 25,
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  categoryButtonActive: {
    backgroundColor: "#f7c8d0",
    borderColor: "#f7c8d0",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
    color: "#333",
  },
  categoryTextActive: {
    color: "#fff",
  },
  productsGrid: {
    marginBottom: 20,
  },
  productRow: {
    justifyContent: "space-between",
  },
  cartButton: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff6b81",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
