'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function AttendancePage() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState('');
  const [method, setMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('attendance/', {
        student: parseInt(studentId),
        date, // expects YYYY-MM-DD format
        present: present === 'true', // convert string to boolean
        method,
      });

      alert('Attendance recorded!');
      setStudentId('');
      setDate('');
      setPresent('');
      setMethod('');
    } catch (err) {
      alert('Failed to submit');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold">Record Attendance</h1>

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

      <select
        value={present}
        onChange={(e) => setPresent(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select status</option>
        <option value="true">Present</option>
        <option value="false">Absent</option>
      </select>

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select method</option>
        <option value="QR">QR</option>
        <option value="Fingerprint">Fingerprint</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
