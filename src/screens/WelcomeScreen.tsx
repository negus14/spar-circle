import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  // ...other screens
};

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require('C:/Users/Abel/ReactNative/Spar-ring-app/src/assets/sparring_background.png')} // Replace with your actual image path
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.icon}>🥊</Text>
        <Text style={styles.title}>Welcome to SparRing</Text>
        <Text style={styles.subtitle}>Find your next sparring partner</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
  },
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    fontSize: 40,
    marginBottom: 20,
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FF3C3C',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: '100%',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
