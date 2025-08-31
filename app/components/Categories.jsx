import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Categories({ data }) {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryCard}>
          <Ionicons name={item.icon} size={30} color="#333" />
          <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});
