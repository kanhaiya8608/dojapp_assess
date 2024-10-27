import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router'; 
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Category from '@/components/Category';
import Products from '@/components/Products';

// Define a type for the data items
interface DataItem {
  id: string;
  component: JSX.Element; // specify the type of component
}

const DATA: DataItem[] = [
  { id: 'header', component: <Header /> },
  { id: 'hero', component: <Hero /> },
  { id: 'category', component: <Category /> },
  { id: 'products', component: <Products /> },
];

export default function Index() {
  const renderItem = ({ item }: { item: DataItem }) => item.component; // Specify the type for item

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent} // optional styling
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    backgroundColor: '#fff',
  },
});
