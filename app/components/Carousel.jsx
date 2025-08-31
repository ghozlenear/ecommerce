import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function Carousel({ images }) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.carouselContainer}
    >
      {images.map((img, index) => (
        <Image key={index} source={img} style={styles.carouselImage} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: width - 40, 
    height: 180,
    borderRadius: 15,
  },
});
