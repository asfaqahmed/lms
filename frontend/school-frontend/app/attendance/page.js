'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function AttendancePage() {
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('attendance/', {
        student: parseInt(studentId),
        status,
      });
      alert('Attendance recorded!');
    } catch (err) {
      alert('Failed to submit');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Record Attendance</h1>
      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select status</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
