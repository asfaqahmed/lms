import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import api from '../lib/api';

export default function AssessmentScreen() {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [score, setScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [date, setDate] = useState('');

  const submitAssessment = async () => {
    try {
      await api.post('assessments/', {
        student: parseInt(studentId),
        subject,
        title,
        score: parseFloat(score),
        max_score: parseFloat(maxScore),
        date,
      });
      Alert.alert('Success', 'Assessment recorded!');
      // Reset form fields
      setStudentId('');
      setSubject('');
      setTitle('');
      setScore('');
      setMaxScore('');
      setDate('');
    } catch (err) {
      Alert.alert('Error', 'Failed to submit assessment');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Assessment</Text>
      <TextInput
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Score"
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Max Score"
        value={maxScore}
        onChangeText={setMaxScore}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <Button title="Submit" onPress={submitAssessment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
