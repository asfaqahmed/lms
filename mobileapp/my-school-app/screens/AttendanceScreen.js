import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import api from '../lib/api';

export default function AttendanceScreen() {
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('present');

  const submitAttendance = async () => {
    try {
      await api.post('attendance/', {
        student: parseInt(studentId),
        present: status === 'present',
        method: 'QR', // or 'Fingerprint'
      });
      Alert.alert('Success', 'Attendance recorded!');
      setStudentId('');
    } catch (err) {
      Alert.alert('Error', 'Failed to submit attendance');
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Attendance</Text>
      <TextInput
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Submit" onPress={submitAttendance} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
