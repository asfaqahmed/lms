import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import api from '../lib/api';

export default function NonAcademicRecordScreen() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Behavior');
  const [notes, setNotes] = useState('');

  const submitRecord = async () => {
    try {
      await api.post('nonacademic/', {
        student: parseInt(studentId),
        date,
        category,
        notes,
      });
      Alert.alert('Success', 'Record submitted!');
      // Reset form fields
      setStudentId('');
      setDate('');
      setCategory('Behavior');
      setNotes('');
    } catch (err) {
      Alert.alert('Error', 'Failed to submit record');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Non-Academic Record</Text>
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
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Behavior" value="Behavior" />
        <Picker.Item label="Goals" value="Goals" />
        <Picker.Item label="Skills" value="Skills" />
        <Picker.Item label="Interests" value="Interests" />
        <Picker.Item label="Quran" value="Quran" />
        <Picker.Item label="Language" value="Language" />
      </Picker>
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />
      <Button title="Submit" onPress={submitRecord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
