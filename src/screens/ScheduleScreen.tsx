import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const schedule = [
  { id: '1', date: '2024-07-25', time: '18:00', location: 'Downtown Gym' },
  { id: '2', date: '2024-07-27', time: '17:00', location: 'Eastside Boxing Club' },
];

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sparring Schedule</Text>
      <FlatList
        data={schedule}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.date} {item.time} - {item.location}</Text>
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