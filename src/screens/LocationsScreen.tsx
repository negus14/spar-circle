import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';

const locations = [
  { id: '1', name: 'Downtown Gym' },
  { id: '2', name: 'Eastside Boxing Club' },
  { id: '3', name: 'West End Dojo' },
];

const LocationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sparring Locations</Text>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
      <Button title="View Schedule" onPress={() => navigation.navigate('Schedule')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default LocationsScreen; 