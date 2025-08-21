import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Categories({data}) {
    return(
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer} >
            {data.map((item, index) =>(
                <TouchableOpacity key={index} style={styles.categoryCard}>
                    <Ionicons name={item.icon} size={40} color="#49454F"/>
                    <Text style={styles.categoryText}>{item.title}</Text>
                </TouchableOpacity>
            )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
      marginBottom: 20,
    },
    categoryCard: {
        width:85,
        height:90,
        backgroundColor: "#fde2e4",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryText: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: "600",
      color: "#333",
    },
  });