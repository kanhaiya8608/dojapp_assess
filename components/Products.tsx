import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Switch, Button, Image, Pressable, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  rating: { rate: number };
}
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;


const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}products/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories. Please try again.');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}products`);
      const data: Product[] = await response.json();
      setAllProducts(data);
    } catch (error) {
      setError('Error fetching products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const applyFilters = () => {
    let filtered = allProducts.filter(product => {
      const ratingCondition = product.rating.rate >= minRating;
      const categoryCondition = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return ratingCondition && categoryCondition;
    });

    // Apply sorting
    if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [minRating, selectedCategories, sortOption, allProducts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const resetFilters = () => {
    setMinRating(0);
    setSelectedCategories([]);
    setSortOption('');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productRating}>Rating: {item.rating.rate}</Text>
    </View>
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }} 
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.filterBar}>
              {categories.slice(0, 3).map(category => (
                <TouchableOpacity
                  key={category}
                  onPress={() => toggleCategory(category)}
                  style={[
                    styles.filterButton,
                    selectedCategories.includes(category) && styles.activeFilterButton
                  ]}
                >
                  <Text style={[
                    styles.filterText,
                    selectedCategories.includes(category) && styles.activeFilterText
                  ]}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
                <Ionicons name="funnel-outline" size={24} />
              </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={error ? <Text style={styles.errorText}>{error}</Text> : null}
        />
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text>                
              <Ionicons name="filter" size={24} color="white" />
            </Text>
            <Text style={styles.modalLabel}>Sort By:</Text>
            <Picker
              selectedValue={sortOption}
              onValueChange={(value) => setSortOption(value)}
              style={styles.picker}
            >
              <Picker.Item label="None" value="" />
              <Picker.Item label="Rating" value="rating" />
              <Picker.Item label="Title" value="title" />
            </Picker>
            <Text style={styles.modalLabel}>Minimum Rating:</Text>
            <Picker
              selectedValue={minRating}
              onValueChange={(value) => setMinRating(value)}
              style={styles.picker}
            >
              <Picker.Item label="All Ratings" value={0} />
              <Picker.Item label="4.5+" value={4.5} />
              <Picker.Item label="4.0+" value={4.0} />
              <Picker.Item label="3.0+" value={3.0} />
            </Picker>
            <Text style={styles.modalLabel}>Categories:</Text>
            {categories.map(category => (
              <View style={styles.toggleContainer} key={category}>
                <Text style={styles.toggleLabel}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                <Switch
                  value={selectedCategories.includes(category)}
                  onValueChange={() => toggleCategory(category)}
                />
              </View>
            ))}
            <Pressable onPress={resetFilters} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </Pressable>
            <Button title="Close Filters" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 15,
  },
  filterButton: {
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757575', 
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  filterText: {
    fontWeight: '500',
    color: '#757575', 
    fontSize: 16,
    marginLeft: 5,
  },
  activeFilterButton: {
    borderColor: '#FFA500', 
  },
  activeFilterText: {
    color: '#FFA500',
  },
  productContainer: {
    padding: 15,
    marginVertical: 8, 
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain', 
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  productCategory: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  productRating: {
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Products;
