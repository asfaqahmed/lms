'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function NonAcademicRecordPage() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('nonacademic/', {
        student: parseInt(studentId),
        date,
        category,
        notes,
      });

      alert('Record submitted!');
      setStudentId('');
      setDate('');
      setCategory('');
      setNotes('');
    } catch (err) {
      alert('Failed to submit record');
      console.error(err);
    }
  };

  const categories = [
    'Behavior',
    'Goals',
    'Skills',
    'Interests',
    'Quran',
    'Language',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold">Add Non-Academic Record</h1>

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
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 rounded w-full h-32"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
