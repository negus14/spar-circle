import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Button title="Sign in with Google" onPress={() => {}} />
      <Button title="Sign in with Apple" onPress={() => {}} />
      <Button title="Sign in with Email" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
});

export default SignInScreen; 