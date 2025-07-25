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

// Add mock coordinates, address, and sessions to locations
const locations = [
  {
    id: '1',
    name: 'Downtown Gym',
    latitude: 51.5074,
    longitude: -0.1278,
    address: '123 Main St, London',
    details: 'Open 7am-10pm, full-size ring, showers',
    sessions: [
      { id: 's1', date: '2024-07-25', time: '18:00' },
      { id: 's2', date: '2024-07-28', time: '19:00' },
    ],
  },
  {
    id: '2',
    name: 'Eastside Boxing Club',
    latitude: 51.515,
    longitude: -0.09,
    address: '456 East Rd, London',
    details: 'Beginner classes, equipment rental',
    sessions: [
      { id: 's3', date: '2024-07-27', time: '17:00' },
    ],
  },
  {
    id: '3',
    name: 'West End Dojo',
    latitude: 51.52,
    longitude: -0.14,
    address: '789 West Ave, London',
    details: 'Mixed martial arts, private lessons',
    sessions: [],
  },
];

const VenueScreen = () => {
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
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          let distanceText = '';
          if (location) {
            const dist = getDistanceFromLatLonInKm(location.latitude, location.longitude, item.latitude, item.longitude);
            distanceText = ` - ${dist.toFixed(2)} km away`;
          }
          return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile', { club: item })}>
              <Text style={styles.venueName}>{item.name}</Text>
              <Text style={styles.venueAddress}>{item.address}</Text>
              <Text style={styles.venueDistance}>{distanceText}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
      <Button title="View Schedule" onPress={() => navigation.navigate('Schedule' as never)} />
      <View style={{ marginTop: 24 }}>
        <Button title="Find My Location" onPress={getLocation} />
        {location && (
          <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  venueName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#222' },
  venueAddress: { fontSize: 15, color: '#666', marginBottom: 4 },
  venueDistance: { fontSize: 14, color: '#007AFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default VenueScreen; 