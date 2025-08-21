// app/product/[id].jsx
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  
  // Fetch product data based on id
  const product = {
    id: id,
    name: "Peach 70% Niacinamide Serum",
    brand: "Anua",
    price: "2,112.88 DA",
    rating: 4.5,
    reviews: 100,
    image: "https://via.placeholder.com/300",
    description: "Lorem ipsum...",
    howToUse: "Apply 2-3 drops...",
    reviews: []
  };

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="cart" size={24} color="#333" />
          <View style={styles.cartBadge} />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.imageSection}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.paginationDots}>
          {[1, 2, 3, 4, 5].map((dot, index) => (
            <View key={index} style={[styles.dot, index === 0 && styles.activeDot]} />
          ))}
        </View>
      </View>

      {/* Product Details */}
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

        {/* Tabs */}
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

        {/* Tab Content */}
        <View style={styles.tabContent}>
          <Text style={styles.contentText}>
            {activeTab === 'Description' && product.description}
            {activeTab === 'How To Use' && product.howToUse}
            {activeTab === 'Reviews' && 'Reviews content...'}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <Text style={styles.price}>{product.price}</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Ionicons name="remove" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
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
    paddingTop: 60,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff0000',
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
});