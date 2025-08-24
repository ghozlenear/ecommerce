import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';

export default function CartOverlay({ 
  visible, 
  onClose
}) {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart();

  const handleCheckout = () => {
    onClose(); 
    router.push('/tabs/cart'); 
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.overlayBackground} onPress={onClose} />
      <View style={styles.cartOverlay}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>My Cart</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemBrand}>Brand</Text>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{formatPrice(item.price)} DA</Text>
                  <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
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
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
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
    zIndex: 1001,
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
