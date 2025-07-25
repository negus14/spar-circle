import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';
import Geolocation from 'react-native-geolocation-service';

const locations = [
  { id: '1', name: 'Downtown Gym' },
  { id: '2', name: 'Eastside Boxing Club' },
  { id: '3', name: 'West End Dojo' },
];

const LocationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
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

  // Detect currency from browser locale
  React.useEffect(() => {
    try {
      // Get locale from device settings in React Native
      const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';
      // Try to infer currency from locale (not always accurate, fallback to USD)
      const region = locale.split('-')[1] || 'US';
      // Simple mapping for common regions
      const regionToCurrency: Record<string, string> = {
        US: 'USD',
        GB: 'GBP',
        EU: 'EUR',
        CA: 'CAD',
        AU: 'AUD',
        JP: 'JPY',
        IN: 'INR',
        NG: 'NGN',
        // Add more as needed
      };
      setCurrency(regionToCurrency[region] || 'USD');
    } catch {
      setCurrency('USD');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sparring Locations</Text>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
      <Button title="View Schedule" onPress={() => navigation.navigate('Opponents')} />
      <View style={{ marginTop: 24 }}>
        <Button title="Find My Location" onPress={getLocation} />
        {location && (
          <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Text style={{ marginTop: 12 }}>Detected Currency: {currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default LocationScreen; 