import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Platform } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { useNavigation } from '@react-navigation/native';

const webClientId = '317205727945-g0q5hhditfj22g4lkcnvorqd6f0oh88l.apps.googleusercontent.com';

export default function SignInScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Most versions: userInfo.user.name
      const name = (userInfo as any)?.user?.name || 'User';
      Alert.alert('Success', `Welcome ${name}!`);
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Alert.alert('Cancelled', 'User cancelled the login flow');
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert('In Progress', 'Sign in is in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert('Error', 'Play services not available or outdated');
          break;
        default:
          Alert.alert('Error', error.message || 'An unknown error occurred');
      }
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      Alert.alert('Success', `Welcome ${appleAuthRequestResponse.fullName?.givenName || 'User'}!`);
    } catch (error: any) {
      Alert.alert('Apple Sign-In Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.buttonGoogle} onPress={signInWithGoogle}> */}
      <TouchableOpacity style={styles.buttonGoogle} onPress={() => navigation.navigate('Main')}>
        <AntDesign name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      {/* </TouchableOpacity> */}
        {Platform.OS === 'ios' && (
          <AppleButton
            style={styles.appleButton}
            cornerRadius={5}
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={signInWithApple}
          />
        )}
        {/* Fallback for Android */}
        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.appleButton} onPress={() => Alert.alert('Apple Sign-In is only available on iOS.')}>
            <AntDesign name="apple1" size={20} color="#ffffff" style={styles.icon} />
            <Text style={styles.buttonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  buttonGoogle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DB4437', padding: 14, borderRadius: 8 },
  icon: { marginRight: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  appleButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#000000', padding: 14, borderRadius: 8, marginTop: 16 },
});