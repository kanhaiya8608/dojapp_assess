import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FC261B',
        tabBarInactiveTintColor: '#757575',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Delivery',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? 'delivery-dining' : 'delivery-dining'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Dining',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? 'restaurant' : 'restaurant'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? 'shopping-cart' : 'shopping-cart'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reorder"
        options={{
          title: 'Reorder',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? 'repeat' : 'repeat'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishList"
        options={{
          title: 'WishList',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? 'favorite' : 'favorite-border'} 
              color={color} 
              size={24} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 10,
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    elevation: 10, // For Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: -1, height: -1 }, // Direction of the shadow
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    borderWidth: 0, // Optional: Remove border width if necessary
  },
});
