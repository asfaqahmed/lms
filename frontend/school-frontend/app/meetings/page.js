'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function MeetingLogPage() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [actionPoints, setActionPoints] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('meetings/', {
        student: parseInt(studentId),
        date,
        participants,
        action_points: actionPoints,
      });

      alert('Meeting log submitted!');
      setStudentId('');
      setDate('');
      setParticipants('');
      setActionPoints('');
    } catch (err) {
      alert('Failed to submit meeting log');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold">Log a Meeting</h1>

      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <textarea
        placeholder="Participants (e.g. Teacher: Mr. A, Parent: Mrs. B)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        className="border p-2 rounded w-full h-24"
        required
      />

      <textarea
        placeholder="Action Points"
        value={actionPoints}
        onChange={(e) => setActionPoints(e.target.value)}
        className="border p-2 rounded w-full h-32"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
