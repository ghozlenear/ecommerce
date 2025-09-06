// app/product/[id].jsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/price';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { cartItems, addToCart: addItemToCart, removeFromCart, updateQuantity: updateCartQuantity } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // 👉 Fetch produit par ID depuis ton backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://192.168.100.4:8080/api/products/${id}`); // mets l’URL de ton API
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors du fetch produit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBack = () => router.back();
  const toggleCartOverlay = () => setShowCartOverlay(!showCartOverlay);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    if (cartItems.length === 1) setShowCartOverlay(false);
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    setShowCartOverlay(true);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    updateCartQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    setShowCartOverlay(false);
    router.push('/tabs/cart');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#f7c8d0" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#666" }}>Produit introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* --- NAVBAR --- */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={toggleCartOverlay}>
          <Ionicons name="cart" size={24} color="#333" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* --- IMAGE + FAVORI --- */}
      <View style={styles.imageSection}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            if (isFavorite(product._id)) {
              removeFromFavorites(product._id);
            } else {
              addToFavorites(product);
            }
          }}
        >
          <Ionicons
            name={isFavorite(product._id) ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite(product._id) ? "#FF4C4C" : "#666"}
          />
        </TouchableOpacity>
      </View>

      {/* --- DETAILS --- */}
      <ScrollView style={styles.detailsSection}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < Math.floor(product.rating) ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
              <Text style={styles.ratingText}>{product.rating} ({product.reviews} avis)</Text>
            </View>
          </View>
        </View>

        {/* --- TABS --- */}
        <View style={styles.tabs}>
          {['Description', 'How To Use', 'Reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- CONTENU --- */}
        <View style={styles.tabContent}>
          <Text style={styles.contentText}>
            {activeTab === 'Description' && product.description}
            {activeTab === 'How To Use' && product.howToUse}
            {activeTab === 'Reviews' && 'Avis des utilisateurs à venir...'}
          </Text>
        </View>
      </ScrollView>

      {/* --- ACTION BAR --- */}
      <View style={styles.actionBar}>
        <Text style={styles.price}>{formatPrice(product.price)} DA</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 25,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20, 
    height: 20, 
    borderRadius: 10,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageSection: {
    height: 300,
    backgroundColor: '#fdf2f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  paginationDots: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbb6ce',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f7c8d0',
  },
  detailsSection: {
    flex: 1,
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 10,
    color: '#999',
    fontSize: 14,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#f7c8d0',
    borderColor: '#f7c8d0',
  },
  tabText: {
    textAlign: 'center',
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    marginBottom: 100,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#f7c8d0',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cartOverlay: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    position: 'relative',
    zIndex: 11,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  cartItemName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7c8d0',
  },
  removeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  removeText: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#f7c8d0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
  },
});