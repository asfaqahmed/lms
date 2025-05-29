import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../lib/api';

export default function ScheduleScreen() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weekday, setWeekday] = useState('0');

  const submitSchedule = async () => {
    try {
      await api.post('schedules/', {
        title,
        start_time: startTime,
        end_time: endTime,
        weekday: parseInt(weekday),
      });
      Alert.alert('Success', 'Schedule recorded!');
      // Reset form fields
      setTitle('');
      setStartTime('');
      setEndTime('');
      setWeekday('0');
    } catch (err) {
      Alert.alert('Error', 'Failed to submit schedule');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Schedule</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Start Time (HH:MM)"
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
      />
      <TextInput
        placeholder="End Time (HH:MM)"
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
      />
      <Picker
        selectedValue={weekday}
        onValueChange={(itemValue) => setWeekday(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Monday" value="0" />
        <Picker.Item label="Tuesday" value="1" />
        <Picker.Item label="Wednesday" value="2" />
        <Picker.Item label="Thursday" value="3" />
        <Picker.Item label="Friday" value="4" />
        <Picker.Item label="Saturday" value="5" />
        <Picker.Item label="Sunday" value="6" />
      </Picker>
      <Button title="Submit" onPress={submitSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
