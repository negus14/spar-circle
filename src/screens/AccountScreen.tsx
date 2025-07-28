import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Alert, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // If you see a type error, install @types/react-native-vector-icons or ignore for JS
import { useNavigation } from '@react-navigation/native';

const options = [
  { key: 'Profile', icon: 'person' },
  { key: 'Followers', icon: 'people' },
  { key: 'Wallet', icon: 'wallet' },
  { key: 'Settings', icon: 'settings' },
  { key: 'Update Email', icon: 'mail' },
  { key: 'Password', icon: 'lock-closed' },
  { key: 'Language', icon: 'language' },
  { key: 'About', icon: 'information-circle' },
  { key: 'Sign Out', icon: 'log-out' },
  { key: 'Delete Account', icon: 'trash' },
];

const AccountScreen = () => {
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      // Example: minimum card width 90, with some margin
      const columns = Math.floor(screenWidth / 90);
      setNumColumns(columns > 1 ? columns : 1);
    };
    updateColumns();
    const subscription = Dimensions.addEventListener('change', updateColumns);
    return () => subscription?.remove && subscription.remove();
  }, []);

  const handlePress = (key: string) => {
    if (key === 'Profile') {
      navigation.navigate('Profile' as never);
    } else {
      Alert.alert(key);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={item => item.key}
        numColumns={4}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.key)}>
            <Ionicons name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.text}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%', // 4 per row with spacing
    aspectRatio: 1,
    marginHorizontal: '1%',
  },
  icon: {
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
  },
});

export default AccountScreen;
