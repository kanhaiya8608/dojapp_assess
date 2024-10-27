import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      {/* Search Input Field */}
      <View style={styles.inputWrapper}>
        <MaterialIcons name="search" size={28} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find for food or restaurant..."
          placeholderTextColor="#757575"
        />
        <TouchableOpacity style={styles.micIconContainer}>
          <MaterialIcons name="mic" size={28} color="red" />
        </TouchableOpacity>
      </View>

      {/* Veg Icon Button */}
      <TouchableOpacity style={styles.vegButton}>
        <FontAwesome5 name="leaf" size={18} color="green" />
        <Text style={styles.vegText}>Veg</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Shadow only at the bottom
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#757575',
  },
  micIconContainer: {
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
    paddingHorizontal: 8,
  },
  vegButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
    flexDirection: 'column',
  },
  vegText: {
    color: 'green',
    fontWeight: '700',
    marginLeft: 4,
  },
});
