import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '../../types/navigation';

const { width } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface FeaturedDestination {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    coordinates: [number, number];
  };
  images: { url: string }[];
  price: number;
  rating: number;
  description: string;
}

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const categories: Category[] = [
    { id: '1', name: 'Beach', icon: 'beach-outline', color: '#FF6B6B' },
    { id: '2', name: 'Mountain', icon: 'mountain-outline', color: '#4ECDC4' },
    { id: '3', name: 'City', icon: 'business-outline', color: '#45B7D1' },
    { id: '4', name: 'Culture', icon: 'museum-outline', color: '#96CEB4' },
    { id: '5', name: 'Adventure', icon: 'compass-outline', color: '#FFEEAD' },
  ];

  const featuredDestinations: FeaturedDestination[] = [
    {
      id: '1',
      name: 'Bali Paradise',
      location: {
        city: 'Bali',
        country: 'Indonesia',
        coordinates: [-8.4095, 115.1889],
      },
      images: [{ url: 'https://example.com/bali.jpg' }],
      price: 1200,
      rating: 4.8,
      description: 'Experience the perfect blend of culture and nature in Bali.',
    },
    {
      id: '2',
      name: 'Swiss Alps',
      location: {
        city: 'Zermatt',
        country: 'Switzerland',
        coordinates: [46.0207, 7.7491],
      },
      images: [{ url: 'https://example.com/alps.jpg' }],
      price: 2500,
      rating: 4.9,
      description: 'Discover the majestic beauty of the Swiss Alps.',
    },
    {
      id: '3',
      name: 'Tokyo Explorer',
      location: {
        city: 'Tokyo',
        country: 'Japan',
        coordinates: [35.6762, 139.6503],
      },
      images: [{ url: 'https://example.com/tokyo.jpg' }],
      price: 1800,
      rating: 4.7,
      description: 'Immerse yourself in the vibrant culture of Tokyo.',
    },
  ];

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: item.color },
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon name={item.icon} size={32} color="#fff" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDestinationCard = ({ item }: { item: FeaturedDestination }) => (
    <TouchableOpacity
      style={styles.destinationCard}
      onPress={() => navigation.navigate('DestinationDetails', { destination: item })}
    >
      <Image
        source={{ uri: item.images[0].url }}
        style={styles.destinationImage}
        defaultSource={require('../../assets/images/placeholder.jpg')}
      />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationLocation}>
          {item.location.city}, {item.location.country}
        </Text>
        <View style={styles.destinationDetails}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Destinations</Text>
          {featuredDestinations.map((destination) => (
            <View key={destination.id} style={styles.destinationCardContainer}>
              {renderDestinationCard({ item: destination })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  featuredSection: {
    padding: 20,
  },
  destinationCardContainer: {
    marginBottom: 20,
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  destinationInfo: {
    padding: 15,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  destinationLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  destinationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default ExploreScreen; 