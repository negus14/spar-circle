import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const fights = [
  { id: '1', date: '2024-07-30', time: '19:00', fighters: 'Alex vs Jordan', location: 'Repton Boxing Club' },
  { id: '2', date: '2024-08-02', time: '18:30', fighters: 'Taylor vs Chris', location: 'Fitzroy Lodge Boxing Club' },
  { id: '3', date: '2024-08-05', time: '20:00', fighters: 'Morgan vs Sam', location: 'Peacock Gym' },
];

const mockBalance = 120.0;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Upcoming Fights</Text>
        <View style={styles.walletContainer}>
          <Ionicons name="wallet" size={26} color="#222" />
          <Text style={styles.walletText}>£{mockBalance.toFixed(2)}</Text>
        </View>
      </View>
      {fights.length === 0 ? (
        <Text style={styles.noFights}>No fights scheduled</Text>
      ) : (
        <FlatList
          data={fights}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.fightItem}>
              <Text style={styles.fightText}>{item.date} at {item.time}</Text>
              <Text style={styles.fightText}>{item.fighters}</Text>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  walletText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  fightItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  fightText: {
    fontSize: 16,
    color: '#222',
  },
  locationText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  separator: {
    height: 12,
  },
  noFights: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default HomeScreen;
