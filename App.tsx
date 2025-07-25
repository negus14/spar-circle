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

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Locations" component={VenueScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Opponents" component={OpponentsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
