import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute() as any;
  // Example mock data – replace with real user input later
  const user = {
    fullName: 'John Doe',
    dob: '1995-06-15',
    gender: 'Male',
    weight: '75 kg',
    height: '180 cm',
    reach: '185 cm',
    experienceLevel: 'Intermediate',
    yearsTraining: '3',
    sparringHistory: 'Weekly',
    fightRecord: '5-1 Amateur',
    boxingStyle: 'Technical',
    medicalClearance: 'Yes',
    injuries: 'None',
    consentWaiver: 'Signed',
    gear: 'Headgear, Mouthguard, Groin Guard',
    gym: 'Downtown Boxing Club',
    coachApproval: 'Approved',
    contact: 'coach@example.com',
  };

  // If opponent is passed, use their details
  const opponent = route.params && 'opponent' in route.params ? route.params.opponent : null;
  const display = opponent
    ? {
        fullName: opponent.name,
        dob: '-',
        gender: '-',
        weight: opponent.weight + ' kg',
        height: opponent.height + ' cm',
        reach: opponent.reach + ' cm',
        experienceLevel: opponent.skill,
        yearsTraining: '-',
        sparringHistory: '-',
        fightRecord: '-',
        boxingStyle: '-',
        medicalClearance: '-',
        injuries: '-',
        consentWaiver: '-',
        gear: '-',
        gym: '-',
        coachApproval: '-',
        contact: '-',
      }
    : user;

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      {photoUrl && (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 24 }}
        />
      )}
      <Text style={styles.header}>🥊Sparring Profile</Text>

      {/* Section 1: Personal Information */}
      <Text style={styles.sectionTitle}>1. Personal Information</Text>
      <Field label="Full Name" value={display.fullName} />
      <Field label="Date of Birth / Age" value={display.dob} />
      <Field label="Gender" value={display.gender} />
      <Field label="Weight" value={display.weight} />
      <Field label="Height & Reach" value={`${display.height} / ${display.reach}`} />

      {/* Section 2: Boxing Experience */}
      <Text style={styles.sectionTitle}>2. Boxing Experience</Text>
      <Field label="Experience Level" value={display.experienceLevel} />
      <Field label="Years Training" value={display.yearsTraining} />
      <Field label="Sparring History" value={display.sparringHistory} />
      <Field label="Fight Record" value={display.fightRecord} />
      <Field label="Boxing Style" value={display.boxingStyle} />

      {/* Section 3: Medical & Safety Info */}
      <Text style={styles.sectionTitle}>3. Medical & Safety Info</Text>
      <Field label="Medical Clearance" value={display.medicalClearance} />
      <Field label="Injuries" value={display.injuries} />
      <Field label="Consent Waiver" value={display.consentWaiver} />
      <Field label="Gear" value={display.gear} />

      {/* Section 4: Gym & Supervision */}
      <Text style={styles.sectionTitle}>4. Gym & Supervision</Text>
      <Field label="Gym Affiliation" value={display.gym} />
      <Field label="Coach Approval" value={display.coachApproval} />
      <Field label="Contact Info" value={display.contact} />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

type FieldProps = { label: string; value: string };
const Field = ({ label, value }: FieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f2f2f2',
    marginTop: 20,
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#bbb',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default ProfileScreen;
