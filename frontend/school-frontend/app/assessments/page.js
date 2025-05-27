"use client";
import { useState } from 'react';
import api from '@/lib/api';

export default function AssessmentPage() {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [score, setScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('assessments/', {
        student: parseInt(studentId),
        subject,
        title,
        score: parseFloat(score),
        max_score: parseFloat(maxScore),
        date,
      });

      alert('Assessment recorded!');
      setStudentId('');
      setSubject('');
      setTitle('');
      setScore('');
      setMaxScore('');
      setDate('');
    } catch (err) {
      alert('Failed to submit');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold">Record Assessment</h1>

      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        className="border p-2 rounded w-full"
        step="0.01"
        required
      />

      <input
        type="number"
        placeholder="Max Score"
        value={maxScore}
        onChange={(e) => setMaxScore(e.target.value)}
        className="border p-2 rounded w-full"
        step="0.01"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
