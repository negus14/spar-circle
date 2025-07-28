import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';

const schedule = [
  { id: '1', date: '2024-07-25', time: '18:00', location: 'Downtown Gym' },
  { id: '2', date: '2024-07-27', time: '17:00', location: 'Eastside Boxing Club' },
];

const ScheduleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
      <FlatList
        data={schedule}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Opponents', { booking: item })}
          >
            <Text style={styles.item}>{item.date} {item.time} - {item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
});

export default ScheduleScreen; 