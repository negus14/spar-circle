import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation param list
export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Profile: undefined;
  Locations: undefined;
  Opponents: undefined;
  Schedule: undefined;
};

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SparRing!</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Locations" onPress={() => navigation.navigate('Locations')} />
      <Button title="Opponents" onPress={() => navigation.navigate('Opponents')} />
      <Button title="Schedule" onPress={() => navigation.navigate('Schedule')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
});

export default WelcomeScreen; 