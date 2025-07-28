import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';

const opponents = [
  { id: '1', name: 'Alex', skill: 'Intermediate', height: 180, weight: 75, reach: 185 },
  { id: '2', name: 'Jordan', skill: 'Beginner', height: 170, weight: 68, reach: 175 },
  { id: '3', name: 'Taylor', skill: 'Advanced', height: 185, weight: 80, reach: 190 },
  { id: '4', name: 'Chris', skill: 'Intermediate', height: 178, weight: 72, reach: 182 },
  { id: '5', name: 'Morgan', skill: 'Beginner', height: 172, weight: 70, reach: 178 },
];

const OpponentsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [minReach, setMinReach] = useState('');
  const [maxReach, setMaxReach] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 16 }}>
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Filter</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const filteredOpponents = opponents.filter(o => {
    const h = o.height, w = o.weight, r = o.reach;
    return (
      (!minHeight || h >= Number(minHeight)) &&
      (!maxHeight || h <= Number(maxHeight)) &&
      (!minWeight || w >= Number(minWeight)) &&
      (!maxWeight || w <= Number(maxWeight)) &&
      (!minReach || r >= Number(minReach)) &&
      (!maxReach || r <= Number(maxReach))
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredOpponents}
        keyExtractor={item => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.squareCard} onPress={() => navigation.navigate('Profile', { opponent: item })}>
            <Text style={styles.cardName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Opponents</Text>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Height</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                value={minHeight}
                onChangeText={setMinHeight}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                value={maxHeight}
                onChangeText={setMaxHeight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Weight</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                value={minWeight}
                onChangeText={setMinWeight}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                value={maxWeight}
                onChangeText={setMaxWeight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Reach</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                value={minReach}
                onChangeText={setMinReach}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                value={maxReach}
                onChangeText={setMaxReach}
                keyboardType="numeric"
              />
            </View>
            <Button title="Apply" onPress={() => setModalVisible(false)} />
            <Button title="Close" color="#888" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  filterRow: { flexDirection: 'row', marginBottom: 12, justifyContent: 'space-between' },
  filterGroup: { flex: 1, marginHorizontal: 2 },
  filterLabel: { fontSize: 12, color: '#555', marginBottom: 2, textAlign: 'center' },
  filterInputsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 13,
    width: 44,
    marginHorizontal: 1,
    textAlign: 'center',
  },
  item: { fontSize: 18, padding: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  squareCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    width: '22%', // 4 per row with spacing
    aspectRatio: 1,
    marginHorizontal: '1%',
  },
  cardName: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 24, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, justifyContent: 'space-between' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, fontSize: 14, width: 60, marginHorizontal: 4, textAlign: 'center' },
});

export default OpponentsScreen; 