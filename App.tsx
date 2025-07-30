/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen, { RootStackParamList } from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import ProfileScreen from './src/screens/ProfileScreen';
import FollowersScreen from './src/screens/FollowersScreen';
import WalletScreen from './src/screens/WalletScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import UpdateEmailScreen from './src/screens/UpdateEmailScreen';
// import PasswordScreen from './src/screens/PasswordScreen';
// import LanguageScreen from './src/screens/LanguageScreen';
// import AboutScreen from './src/screens/AboutScreen';
// import SignOutScreen from './src/screens/SignOutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Followers" component={FollowersScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: true }}/>
        {/* <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }}/> */}  
        {/* <Stack.Screen name="UpdateEmail" component={UpdateEmailScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: true }}/> */}
        {/* <Stack.Screen name="SignOut" component={SignOutScreen} options={{ headerShown: true }}/> */}

        {/* <Stack.Screen name="Locations" component={VenueScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Opponents" component={OpponentsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
