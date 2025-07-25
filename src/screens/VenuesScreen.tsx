import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';
import Geolocation from 'react-native-geolocation-service';

// Haversine formula for distance in km
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Add mock coordinates and addresses to locations
const locations = [
  { id: '1', name: 'Repton Boxing Club', latitude: 51.5291, longitude: -0.0576, address: '116 Cheshire St, London E2 6EG' },
  { id: '2', name: 'Fitzroy Lodge Boxing Club', latitude: 51.4942, longitude: -0.1042, address: '180 Lambeth Rd, London SE1 7JY' },
  { id: '3', name: 'Peacock Gym', latitude: 51.5272, longitude: -0.0086, address: '15-17 Caxton St N, London E16 1JL' },
  { id: '4', name: 'Islington Boxing Club', latitude: 51.5572, longitude: -0.1207, address: '20 Hazellville Rd, London N19 3LP' },
  { id: '5', name: 'Miguel’s Boxing & Fitness Gym', latitude: 51.4747, longitude: -0.1176, address: '261 Hardess St, London SE24 0HN' },
  { id: '6', name: 'Double Jab Boxing Club', latitude: 51.4722, longitude: -0.0862, address: '389 New Cross Rd, London SE14 6LA' },
  { id: '7', name: 'Dale Youth Boxing Club', latitude: 51.5152, longitude: -0.1742, address: 'Grenfell Tower, London W11 1TQ' },
  { id: '8', name: 'All Stars Boxing Gym', latitude: 51.5237, longitude: -0.2052, address: '576 Harrow Rd, London W10 4NJ' },
  { id: '9', name: 'St. Pancras Amateur Boxing Club', latitude: 51.5432, longitude: -0.1331, address: '119 Drummond Cres, London NW1 1RL' },
  { id: '10', name: 'Earlsfield Amateur Boxing Club', latitude: 51.4447, longitude: -0.1912, address: '229 Garrett Ln, London SW18 4DU' },
];

const VenuesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (typeof Geolocation !== 'undefined' && Geolocation.getCurrentPosition) {
      Geolocation.getCurrentPosition(
        (position: any) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err: any) => {
          setError('Location access denied or unavailable.');
        }
      );
    } else {
      setError('Geolocation is not supported by this environment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venues</Text>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
        renderItem={({ item }) => {
          let distanceText = '';
          if (location) {
            const dist = getDistanceFromLatLonInKm(location.latitude, location.longitude, item.latitude, item.longitude);
            distanceText = ` - ${dist.toFixed(2)} km away`;
          }
          return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile', { club: item })}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.venueName}>{item.name}</Text>
                  <Text style={styles.venueAddress}>{item.address}</Text>
                </View>
                <Text style={styles.venueDistance}>{distanceText}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 1, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginHorizontal: 4,
    marginVertical: 6,
    minHeight: 48,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  venueAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  venueDistance: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 2,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default VenuesScreen; 