import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0.00;
  const total = subtotal - discount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>{item.price.toFixed(2)} DZD</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityBtn}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Text style={styles.quantityBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityBtn}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceDetails}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sub Total:</Text>
            <Text style={styles.priceValue}>{subtotal.toFixed(2)} DZD</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount:</Text>
            <Text style={styles.priceValue}>-{discount.toFixed(2)} DZD</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{total.toFixed(2)} DZD</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: 'center',
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 4,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBtnText: {
    fontSize: 16,
    color: "#666",
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 14,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 80,
  },
  priceDetails: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkoutBtn: {
    backgroundColor: "#F7C8D0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 15,
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: '#FFF0F0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  removeText: {
    color: '#FF4C4C',
    fontSize: 12,
    fontWeight: '500',
  },
});