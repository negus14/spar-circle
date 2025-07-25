import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import LocationsScreen from '../screens/LocationsScreen';
import OpponentsScreen from '../screens/OpponentsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';

          if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Locations') iconName = 'map';
          else if (route.name === 'Opponents') iconName = 'people';
          else if (route.name === 'Schedule') iconName = 'calendar';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Opponents" component={OpponentsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
    </Tab.Navigator>
  );
}
