import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './WelcomeScreen';
import { addDays, format, startOfWeek, subWeeks, addWeeks } from 'date-fns';
import { useState } from 'react';

const schedule = [
  { id: '1', date: '2024-07-25', time: '18:00', location: 'Downtown Gym' },
  { id: '2', date: '2024-07-27', time: '17:00', location: 'Eastside Boxing Club' },
];

function getWeekDays(weekStart: Date) {
  return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
}

const FightScheduleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const weekDays = getWeekDays(currentWeekStart);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sparring Schedule</Text>
      <View style={styles.weekScrollerRow}>
        <TouchableOpacity onPress={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>{'←'}</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekDays}>
          {weekDays.map((dateObj, idx) => {
            const dateStr = format(dateObj, 'yyyy-MM-dd');
            const isSelected = dateStr === selectedDate;
            return (
              <TouchableOpacity
                key={dateStr + idx}
                style={[styles.day, isSelected && styles.selectedDay]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                  {format(dateObj, 'EEE')}
                </Text>
                <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
                  {format(dateObj, 'd')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity onPress={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>{'→'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={schedule}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Opponents', { booking: item })}
          >
            <Text style={styles.item}>{item.date} {item.time} - {item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: { fontSize: 18, padding: 8 },
  weekScrollerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  arrowText: {
    fontSize: 22,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  weekStrip: {
    flex: 1,
    marginHorizontal: 8,
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56, // ~4rem
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  selectedDay: {
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  weekDays: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default FightScheduleScreen; 