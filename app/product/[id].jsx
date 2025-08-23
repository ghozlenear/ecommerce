// app/product/[id].jsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const { cartItems, addToCart: addItemToCart, removeFromCart, updateQuantity: updateCartQuantity } = useCart();
  
  const handleBack = () => {
    router.back(); 
  };

  const toggleCartOverlay = () => {
    setShowCartOverlay(!showCartOverlay);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    if (cartItems.length === 1) {
      setShowCartOverlay(false);
    }
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
    setShowCartOverlay(false); // Close the overlay
    router.push('/tabs/cart'); // Navigate to cart page
  };
  
  const product = {
    id: id,
    name: "Peach 70% Niacinamide Serum",
    brand: "Anua",
    price: 2112.88,  
    rating: 4.5,
    reviews: 100,
    image: "https://via.placeholder.com/300",
    description: " Blah BLAH BLAH",
    howToUse: "BLAH BLAH BLAH",
    reviews: []
  };

  return (
    <View style={styles.container}>
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
      {showCartOverlay && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBackground} onPress={toggleCartOverlay} />
          <View style={styles.cartOverlay}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>My Cart</Text>
              <TouchableOpacity onPress={toggleCartOverlay}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemBrand}>{item.brand}</Text>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemPrice}>{item.price.toFixed(2)} DA</Text>
                      <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveFromCart(item.id)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              </View>
            )}
          </View>
        </View>
      )}

      
      <View style={styles.imageSection}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.paginationDots}>
          {[1, 2, 3, 4, 5].map((dot, index) => (
            <View key={index} style={[styles.dot, index === 0 && styles.activeDot]} />
          ))}
        </View>
      </View>


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
              <Text style={styles.ratingText}>{product.rating} (+{product.reviews})</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

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

        
        <View style={styles.tabContent}>
          <Text style={styles.contentText}>
            {activeTab === 'Description' && product.description}
            {activeTab === 'How To Use' && product.howToUse}
            {activeTab === 'Reviews' && 'Reviews content...'}
          </Text>
        </View>
      </ScrollView>

      
      <View style={styles.actionBar}>
        <Text style={styles.price}>{product.price.toFixed(2)} DA</Text>
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