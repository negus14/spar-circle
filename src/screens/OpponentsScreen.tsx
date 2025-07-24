import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';

const opponents = [
  { id: '1', name: 'Alex', skill: 'Intermediate' },
  { id: '2', name: 'Jordan', skill: 'Beginner' },
  { id: '3', name: 'Taylor', skill: 'Advanced' },
];

const OpponentsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Opponents</Text>
      <FlatList
        data={opponents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - {item.skill}</Text>
        )}
      />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default OpponentsScreen; 