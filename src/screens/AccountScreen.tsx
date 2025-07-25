import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // If you see a type error, install @types/react-native-vector-icons or ignore for JS

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
  const handlePress = (key: string) => {
    // Add navigation or action logic here
    Alert.alert(key);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item.key)}>
            <Ionicons name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.text}>{item.key}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 18,
  },
  text: {
    fontSize: 18,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 24,
  },
});

export default AccountScreen;
