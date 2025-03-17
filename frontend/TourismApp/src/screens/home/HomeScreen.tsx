import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { NavigationProp } from '../../types/navigation';

const { width } = Dimensions.get('window');

interface Destination {
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

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      // TODO: Implement actual API call
      // Simulated data
      const mockDestinations: Destination[] = [
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
          description: 'Experience the beauty of Bali\'s beaches and culture.',
        },
        // Add more mock destinations
      ];

      setDestinations(mockDestinations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDestinations();
    setRefreshing(false);
  };

  const renderDestinationCard = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DestinationDetails', { destination: item })}
    >
      <Image
        source={{ uri: item.images[0].url }}
        style={styles.cardImage}
        defaultSource={require('../../assets/images/placeholder.jpg')}
      />
      <View style={styles.cardContent}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>
            {item.location.city}, {item.location.country}
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          <Icon
            name={viewMode === 'list' ? 'map-outline' : 'list-outline'}
            size={24}
            color="#2196F3"
          />
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? (
        <FlatList
          data={filteredDestinations}
          renderItem={renderDestinationCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="search" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No destinations found</Text>
            </View>
          }
        />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 100,
            longitudeDelta: 100,
          }}
        >
          {filteredDestinations.map(destination => (
            <Marker
              key={destination.id}
              coordinate={{
                latitude: destination.location.coordinates[0],
                longitude: destination.location.coordinates[1],
              }}
              title={destination.name}
              description={`${destination.location.city}, ${destination.location.country}`}
              onPress={() => navigation.navigate('DestinationDetails', { destination })}
            />
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  viewModeButton: {
    padding: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen; 