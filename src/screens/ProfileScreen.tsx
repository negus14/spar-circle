import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute() as any;
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => Alert.alert('Edit profile coming soon!')} style={{ marginRight: 16 }}>
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
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
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState(display);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setEditMode((prev) => !prev)}
          style={{ marginRight: 16 }}
        >
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>{editMode ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, editMode]);

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      {photoUrl && (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 24 }}
        />
      )}
      <Text style={styles.header}>Profile</Text>

      {/* Section 1: Personal Information */}
      <Text style={styles.sectionTitle}>1. Personal Information</Text>
      <EditableField label="Full Name" value={fields.fullName} editable={editMode} onChange={v => handleFieldChange('fullName', v)} />
      <EditableField label="Date of Birth / Age" value={fields.dob} editable={editMode} onChange={v => handleFieldChange('dob', v)} />
      <EditableField label="Gender" value={fields.gender} editable={editMode} onChange={v => handleFieldChange('gender', v)} />
      <EditableField label="Weight" value={fields.weight} editable={editMode} onChange={v => handleFieldChange('weight', v)} />
      <EditableField label="Height" value={fields.height} editable={editMode} onChange={v => handleFieldChange('height', v)} />
      <EditableField label="Reach" value={fields.reach} editable={editMode} onChange={v => handleFieldChange('reach', v)} />

      {/* Section 2: Boxing Experience */}
      <Text style={styles.sectionTitle}>2. Boxing Experience</Text>
      <EditableField label="Experience Level" value={fields.experienceLevel} editable={editMode} onChange={v => handleFieldChange('experienceLevel', v)} />
      <EditableField label="Years Training" value={fields.yearsTraining} editable={editMode} onChange={v => handleFieldChange('yearsTraining', v)} />
      <EditableField label="Sparring History" value={fields.sparringHistory} editable={editMode} onChange={v => handleFieldChange('sparringHistory', v)} />
      <EditableField label="Fight Record" value={fields.fightRecord} editable={editMode} onChange={v => handleFieldChange('fightRecord', v)} />
      <EditableField label="Boxing Style" value={fields.boxingStyle} editable={editMode} onChange={v => handleFieldChange('boxingStyle', v)} />

      {/* Section 3: Medical & Safety Info */}
      <Text style={styles.sectionTitle}>3. Medical & Safety Info</Text>
      <EditableField label="Medical Clearance" value={fields.medicalClearance} editable={editMode} onChange={v => handleFieldChange('medicalClearance', v)} />
      <EditableField label="Injuries" value={fields.injuries} editable={editMode} onChange={v => handleFieldChange('injuries', v)} />
      <EditableField label="Consent Waiver" value={fields.consentWaiver} editable={editMode} onChange={v => handleFieldChange('consentWaiver', v)} />
      <EditableField label="Gear" value={fields.gear} editable={editMode} onChange={v => handleFieldChange('gear', v)} />

      {/* Section 4: Gym & Supervision */}
      <Text style={styles.sectionTitle}>4. Gym & Supervision</Text>
      <EditableField label="Gym Affiliation" value={fields.gym} editable={editMode} onChange={v => handleFieldChange('gym', v)} />
      <EditableField label="Coach Approval" value={fields.coachApproval} editable={editMode} onChange={v => handleFieldChange('coachApproval', v)} />
      <EditableField label="Contact Info" value={fields.contact} editable={editMode} onChange={v => handleFieldChange('contact', v)} />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

type EditableFieldProps = { label: string; value: string; editable: boolean; onChange: (v: string) => void };
const EditableField = ({ label, value, editable, onChange }: EditableFieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}:</Text>
    {editable ? (
      <TextInput
        style={[styles.value, { backgroundColor: '#222', color: '#fff', borderRadius: 6, paddingHorizontal: 8, marginTop: 2 }]}
        value={value}
        onChangeText={onChange}
      />
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
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
