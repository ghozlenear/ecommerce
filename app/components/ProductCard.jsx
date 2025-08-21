import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ item, isFavorited, onToggleFavorite, onAddToCart }) {
  return (
    <View style={styles.productCard}>
      {/* Favorite button */}
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item.id)}
      >
        <Ionicons 
          name={isFavorited ? "heart" : "heart-outline"} 
          size={20} 
          color={isFavorited ? "#ff6b81" : "#666"} 
        />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.productImage} />

      {/* Info Section */}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons 
              key={index} 
              name={index < Math.floor(item.rating) ? "star" : 
                    index < item.rating ? "star-half" : "star-outline"} 
              size={14} 
              color="#FFD700" 
            />
          ))}
        </View>

        {/* Add to Cart */}
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => onAddToCart(item.id)}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#fde2e4",
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  productInfo: {
    position: "relative",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff6b81",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 2,
  },
  addToCartButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f7c8d0",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
