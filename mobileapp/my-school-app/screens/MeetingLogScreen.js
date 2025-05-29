import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import api from '../lib/api';

export default function MeetingLogScreen() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [actionPoints, setActionPoints] = useState('');

  const submitMeetingLog = async () => {
    try {
      await api.post('meetings/', {
        student: parseInt(studentId),
        date,
        participants,
        action_points: actionPoints,
      });
      Alert.alert('Success', 'Meeting log submitted!');
      // Reset form fields
      setStudentId('');
      setDate('');
      setParticipants('');
      setActionPoints('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit meeting log');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meeting Log</Text>
      <TextInput
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Participants"
        value={participants}
        onChangeText={setParticipants}
        style={styles.input}
      />
      <TextInput
        placeholder="Action Points"
        value={actionPoints}
        onChangeText={setActionPoints}
        style={styles.input}
        multiline
      />
      <Button title="Submit" onPress={submitMeetingLog} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
