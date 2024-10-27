import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function WishList() {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Reorder screen</Text>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'red',
      fontSize: 24,
      fontWeight: '700',
    },
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
    },
  });
  