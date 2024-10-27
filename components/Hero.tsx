import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';

// Import local images
const image1 = require('@/assets/images/1.png');
const image2 = require('@/assets/images/2.png');
const image3 = require('@/assets/images/3.png');

interface CarouselEntry {
  title: string;
  subtitle: string;
  illustration: any; 
}

const ENTRIES: CarouselEntry[] = [
  {
    subtitle: 'Get 50% Off',
    title: 'Domino’s Pizza',
    illustration: image1,
  },
  {
    subtitle: 'Chole Bhature',
    title: 'Get Buy 1 Get 1',
    illustration: image2,
  },
  {
    subtitle: 'Burger Combo',
    title: 'Combo Offer 60% Off',
    illustration: image3,
  },
];

const titleColors = ['#FF5722', '#2196F3', '#4CAF50']; 
const gradients = [
  ['#D9D9D900', '#007CB080', '#063448'], 
  ['#D9D9D900', '#FBBC0580', '#CF600B'], 
  ['#D9D9D900', '#74FB054A', '#68A60B'], 
];

export default function Hero() {
  const windowWidth = Dimensions.get('window').width;

  return (
    <Carousel
      loop
      width={windowWidth}
      height={200} 
      autoPlay={true}
      autoPlayInterval={3500}
      data={ENTRIES}
      scrollAnimationDuration={1000}
      renderItem={({ item, index }) => (
        <LinearGradient
          key={index}
          colors={gradients[index % gradients.length]} 
          style={styles.container}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: titleColors[index % titleColors.length] }]}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <Image source={item.illustration} style={styles.image} />
        </LinearGradient>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    margin: 15,
    borderRadius: 20, 
  },
  textContainer: {
    flex: 0.4, 
    justifyContent: 'center', 
    paddingRight: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 5,
  },
  image: {
    flex: 0.6, 
    height: 200,
    justifyContent: 'flex-end', 
    resizeMode: 'contain',
    borderRadius: 8, 
  },
});
