import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ item, isFavorited: propFavorited, onToggleFavorite, onAddToCart }) {
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleProductPress = () => {
    console.log('Product card pressed, navigating to:', `/product/${item.id}`);
    router.push(`/product/${item.id}`);
  };

  const handleFavoritePress = () => {
    console.log('Favorite button pressed for product:', item.id);
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }


    if (typeof onToggleFavorite === 'function') {
      try {
        onToggleFavorite(item.id);
      } catch (e) {
        console.warn('onToggleFavorite threw:', e);
      }
    }
  };

  const handleCartPress = () => {
    console.log('Cart button pressed for product:', item.id);
    if (typeof onAddToCart === 'function') {
      onAddToCart(item.id);
      return;
    }
    addToCart(item, 1);
  };

  return (
    <View style={styles.productCard}>
      
      <Pressable 
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
        hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      >
        <Ionicons 
          name={(typeof propFavorited !== 'undefined' ? propFavorited : isFavorite(item.id)) ? "heart" : "heart-outline"} 
          size={20} 
          color={(typeof propFavorited !== 'undefined' ? propFavorited : isFavorite(item.id)) ? "#ff6b81" : "#666"} 
        />
      </Pressable>

      
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>

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

        <Pressable 
          style={styles.addToCartButton}
          onPress={handleCartPress}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
        </Pressable>
      </View>

      <Pressable 
        style={styles.cardClickArea}
        onPress={handleProductPress}
      />
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
    zIndex: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
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
    zIndex: 15,
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
    bottom: 8,
    right: 8,
    backgroundColor: "#f7c8d0",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    zIndex: 20,
  },
  cardClickArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    zIndex: 5,
  },
});