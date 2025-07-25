import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationScreen from '../screens/LocationScreen';
import OpponentsScreen from '../screens/OpponentsScreen';
import FightScheduleScreen from '../screens/FightScheduleScreen';
import AccountScreen from '../screens/AccountScreen';
import VenuesScreen from '../screens/VenuesScreen';
import HomeScreen from '../screens/HomeScreen';
import InboxScreen from '../screens/InboxScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Opponents') iconName = 'people';
          else if (route.name === 'Venues') iconName = 'map';
          else if (route.name === 'Schedule') iconName = 'calendar';
          else if (route.name === 'Inbox') iconName = 'mail';
          else if (route.name === 'Account') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Opponents" component={OpponentsScreen} />
      <Tab.Screen name="Venues" component={VenuesScreen} />
      <Tab.Screen name="Schedule" component={FightScheduleScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
