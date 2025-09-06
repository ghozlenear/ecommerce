import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";

const categoriesData = [
  { title: "Skincare", icon: "happy-outline" },
  { title: "Haircare", icon: "cut-outline" },
  { title: "Bodycare", icon: "body-outline" },
  { title: "Fragrance", icon: "flask-outline" },
];

export default function HomeScreen() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://192.168.100.4:8080/api/products"); // ⚡ adapte l’URL selon ton backend
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      if (favorites.some(item => item._id === productId)) {
        setFavorites(favorites.filter(item => item._id !== productId));
      } else {
        setFavorites([...favorites, product]);
      }
    }
  };

  const addToCart = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item._id === productId);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item._id === productId
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
        {/* Header */}
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

        {/* Carousel */}
        <View style={styles.carouselSection}>
          <Carousel
            images={[
              require("../../assets/images/ban1.jpg"),
              require("../../assets/images/ban2.jpg"),
            ]}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Categories data={categoriesData} />
        </View>

        {/* Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Self-Care Spotlight</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#F7C8D0" />
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ProductCard
                  item={{
                    ...item,
                    price: `${item.price} DA`, // ⚡ format prix pour ton UI
                  }}
                  isFavorited={favorites.some(fav => fav._id === item._id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                />
              )}
              keyExtractor={(item) => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          )}

          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Glow Up Tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tipCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200" }}
                style={styles.tipImage}
              />
              <View style={styles.tipContent}>
                <Text style={styles.tipCategory}>SKINCARE</Text>
                <Text style={styles.tipTitle}>Top Skincare</Text>
                <Text style={styles.tipDescription}>Lorem ipsum dolor sit amet, consectetur adipt.</Text>
                <TouchableOpacity>
                  <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.tipCard, { marginLeft: 15 }]}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x200" }}
                style={styles.tipImage}
              />
              <View style={styles.tipContent}>
                <Text style={styles.tipCategory}>SKINCARE</Text>
                <Text style={styles.tipTitle}>Leah Kateb</Text>
                <Text style={styles.tipDescription}>Lorem ipsum dolor sit amet, consectetur adipt.</Text>
                <TouchableOpacity>
                  <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore More Tips</Text>
          </TouchableOpacity>
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
    fontWeight: "800",
    marginBottom: 16,
    color: "#2c3e50",
  },
  tipsSection: {
    marginBottom: 40,
  },
  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 280,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  tipImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    color: "#666",
  },
  tipContent: {
    padding: 15,
  },
  tipCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  exploreButton: {
    backgroundColor: "#F7C8D0",
    opacity: 0.8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#F7C8D0",
    marginBottom: 60,
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  loadMoreButton: {
    backgroundColor: "#F7C8D0",
    opacity: 0.8,
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
    fontWeight: "700",
  },
});