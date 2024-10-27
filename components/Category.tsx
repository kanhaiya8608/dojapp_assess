import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the Product type based on the expected structure from the Fake Store API
interface Product {
  id: number;
  title: string;
  image: string;
}

const API_URL = 'https://fakestoreapi.com/products';

const Category: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Product[] = await response.json();
        setProducts(data.slice(0, 5)); // Load only the first 5 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What would you like to order</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#D9D9D900', '#F7CEAF']}
            style={styles.gradientBackground}
          >
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
          </LinearGradient>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#757575',
  },
  gradientBackground: {
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  productContainer: {
    width: 150, // Set a fixed width for uniformity
    height: 160, // Set a fixed height for uniformity
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  productTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    maxWidth: 120, // Ensure the title fits within the product container
  },
});

export default Category;
