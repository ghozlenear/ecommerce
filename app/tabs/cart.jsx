import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { formatPrice, parsePrice } from '../utils/price';

export default function CartScreen() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);
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
              <Text style={styles.itemPrice}>{formatPrice(item.price)} DZD</Text>
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
            <Text style={styles.priceValue}>{formatPrice(subtotal)} DZD</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount:</Text>
            <Text style={styles.priceValue}>-{formatPrice(discount)} DZD</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{formatPrice(total)} DZD</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => setShowCheckoutModal(true)}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCheckoutModal}
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Payment Method</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowCheckoutModal(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.paymentOption}
              onPress={() => {
                setShowCheckoutModal(false);
                setShowLocationModal(true);
              }}
            >
              <View style={styles.paymentOptionIcon}>
                <Ionicons name="cash-outline" size={24} color="#F7C8D0" />
              </View>
              <View style={styles.paymentOptionInfo}>
                <Text style={styles.paymentOptionTitle}>Cash on Delivery</Text>
                <Text style={styles.paymentOptionDesc}>Pay when you receive your order</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.paymentOption}
              onPress={() => {
                setShowCheckoutModal(false);
                setShowCardModal(true);
              }}
            >
              <View style={styles.paymentOptionIcon}>
                <Ionicons name="card-outline" size={24} color="#F7C8D0" />
              </View>
              <View style={styles.paymentOptionInfo}>
                <Text style={styles.paymentOptionTitle}>Credit Card</Text>
                <Text style={styles.paymentOptionDesc}>Pay securely with your card</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>

            <Text style={styles.totalAmount}>Total: {formatPrice(total)} DA</Text>
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationModal}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delivery Address</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowLocationModal(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your delivery address"
              value={address}
              onChangeText={setAddress}
              multiline
            />

            <TouchableOpacity 
              style={[styles.checkoutBtn, !address && styles.disabledButton]}
              disabled={!address}
              onPress={() => {
                setShowLocationModal(false);
                setShowConfirmation(true);
                clearCart();
              }}
            >
              <Text style={styles.checkoutBtnText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationContent}>
            <View style={styles.confirmationIcon}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.confirmationTitle}>Order Confirmed!</Text>
            <Text style={styles.confirmationText}>Thank you for your purchase</Text>
            <TouchableOpacity 
              style={styles.confirmationButton}
              onPress={() => setShowConfirmation(false)}
            >
              <Text style={styles.confirmationButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCardModal}
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Card Information</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowCardModal(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />

            <View style={styles.cardDetailsRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.checkoutBtn,
                (!cardNumber || !expiryDate || !cvv) && styles.disabledButton
              ]}
              disabled={!cardNumber || !expiryDate || !cvv}
              onPress={() => {
                setShowCardModal(false);
                setShowConfirmation(true);
                clearCart();
              }}
            >
              <Text style={styles.checkoutBtnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationContent}>
            <View style={styles.confirmationIcon}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.confirmationTitle}>Order Confirmed!</Text>
            <Text style={styles.confirmationText}>Thank you for your purchase</Text>
            <TouchableOpacity 
              style={styles.confirmationButton}
              onPress={() => setShowConfirmation(false)}
            >
              <Text style={styles.confirmationButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentOptionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF0F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentOptionInfo: {
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentOptionDesc: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInput: {
    width: '48%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  confirmationIcon: {
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  confirmationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationButton: {
    backgroundColor: '#F7C8D0',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  confirmationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});