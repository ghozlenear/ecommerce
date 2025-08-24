import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatPrice } from '../utils/price';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [selected, setSelected] = useState({});
  const router = useRouter();

  const handleBuyNow = (product) => {
    addToCart(product, 1);
  };

  const toggleSelect = (id) => {
    setSelected(s => ({ ...s, [id]: !s[id] }));
  };

  const buySelected = () => {
    const selectedItems = favorites.filter(f => selected[f.id]);
    selectedItems.forEach(item => addToCart(item, 1));
    setSelected({});
    router.push('/tabs/cart');
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubText}>Items you favorite will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {favorites.map((item) => (
          <View key={item.id} style={styles.favItemCartLike}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleSelect(item.id)}>
              <Ionicons name={selected[item.id] ? 'checkbox' : 'square-outline'} size={22} color="#F7C8D0" />
            </TouchableOpacity>

            <Image
              source={item.image}
              style={styles.itemImage}
              contentFit="cover"
            />

            <View style={styles.itemInfoCartLike}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)} DZD</Text>
            </View>

            <View style={styles.itemActions}>
              <TouchableOpacity style={styles.removeButtonSmall} onPress={() => removeFromFavorites(item.id)}>
                <Ionicons name="trash" size={18} color="#FF4C4C" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.checkoutBtn, Object.values(selected).every(v => !v) && styles.disabledButton]} disabled={Object.values(selected).every(v => !v)} onPress={buySelected}>
          <Text style={styles.checkoutBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  itemsContainer: {
  flex: 1,
  padding: 16,
  paddingBottom: 140,
  },
  favItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favItemCartLike: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  checkbox: {
    marginRight: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemInfoCartLike: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F7C8D0",
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buyButtonSmall: {
    backgroundColor: '#F7C8D0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buyButtonTextSmall: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  removeButtonSmall: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  paddingVertical: 16,
  paddingHorizontal: 12,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#eee',
  alignItems: 'center',
  zIndex: 20,
  elevation: 8,
  paddingBottom: 30,
  marginBottom: 60,
  },
  checkoutBtn: {
    backgroundColor: '#FCEEF0',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: 'center',
  width: '80%',
    alignSelf: 'center',
    shadowColor: '#F7C8D0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  checkoutBtnText: {
    color: '#8B2E3A',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
