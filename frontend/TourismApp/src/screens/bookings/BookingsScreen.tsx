import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '../../types/navigation';

interface Booking {
  id: string;
  destination: {
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
  };
  date: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const BookingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  // Mock data - replace with actual API call
  const bookings: Booking[] = [
    {
      id: '1',
      destination: {
        id: '1',
        name: 'Paris, France',
        location: {
          city: 'Paris',
          country: 'France',
          coordinates: [48.8566, 2.3522],
        },
        images: [{ url: 'https://example.com/paris.jpg' }],
        price: 600,
        rating: 4.8,
        description: 'Experience the magic of Paris with its iconic landmarks, world-class museums, and charming cafes.',
      },
      date: '2024-06-15',
      numberOfGuests: 2,
      totalPrice: 1200,
      status: 'upcoming',
    },
    {
      id: '2',
      destination: {
        id: '2',
        name: 'Tokyo, Japan',
        location: {
          city: 'Tokyo',
          country: 'Japan',
          coordinates: [35.6762, 139.6503],
        },
        images: [{ url: 'https://example.com/tokyo.jpg' }],
        price: 800,
        rating: 4.9,
        description: 'Discover the perfect blend of traditional culture and modern technology in Tokyo.',
      },
      date: '2024-03-20',
      numberOfGuests: 1,
      totalPrice: 800,
      status: 'completed',
    },
  ];

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('DestinationDetails', { destination: item.destination })}
    >
      <Image
        source={{ uri: item.destination.images[0].url }}
        style={styles.bookingImage}
        defaultSource={require('../../assets/images/placeholder.jpg')}
      />
      <View style={styles.bookingInfo}>
        <Text style={styles.destinationName}>{item.destination.name}</Text>
        <Text style={styles.location}>
          {item.destination.location.city}, {item.destination.location.country}
        </Text>
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.numberOfGuests} guests</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailText}>${item.totalPrice}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bookingInfo: {
    flex: 1,
    padding: 15,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bookingDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default BookingsScreen; 