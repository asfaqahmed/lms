'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function SchedulePage() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weekday, setWeekday] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('schedules/', {
        title,
        start_time: startTime,
        end_time: endTime,
        weekday: parseInt(weekday),
      });

      alert('Schedule created!');
      setTitle('');
      setStartTime('');
      setEndTime('');
      setWeekday('');
    } catch (err) {
      alert('Failed to create schedule');
      console.error(err);
    }
  };

  const weekdays = [
    { value: 0, label: 'Mon' },
    { value: 1, label: 'Tue' },
    { value: 2, label: 'Wed' },
    { value: 3, label: 'Thu' },
    { value: 4, label: 'Fri' },
    { value: 5, label: 'Sat' },
    { value: 6, label: 'Sun' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold">Create Schedule</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <select
        value={weekday}
        onChange={(e) => setWeekday(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select Weekday</option>
        {weekdays.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
