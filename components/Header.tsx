import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from './SearchBar';

export default function Header() {
  const [currentLocation, setCurrentLocation] = useState('Fetching location...');

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setCurrentLocation('Permission to access location was denied.');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (address.length > 0) {
          const { city, region, name } = address[0];
          const locationName = city || region || name || 'Current Location';
          setCurrentLocation(locationName);
        } else {
          setCurrentLocation('Location not found.');
        }
      } catch (error) {
        setCurrentLocation('Error fetching location.');
      }
    };

    getLocation();
  }, []);

  return (
    <LinearGradient
      colors={['rgba(255,84,112,1)', 'rgba(255,141,141,1)', 'rgba(255,214,214,1)']}
      locations={[0, 0.51, 1]}
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
    >
      <View style={styles.contentContainer}>
        {/* Location and Profile Icon Row */}
        <View style={styles.locationContainer}>
          <View style={styles.locationInfo}>
            <Entypo name="location-pin" size={24} color="#000000" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </View>
          <View style={styles.profileCircle}>
            <MaterialIcons name="person" size={24} color="#FFFFFF" />
          </View>
        </View>

        {/* Search Bar below the location row */}
        <SearchBar />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8, // Adds spacing below the row
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
  },
  profileCircle: {
    width: 50, 
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#FC261B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10, 
    borderColor: '#FC261B38', 
  },
});


