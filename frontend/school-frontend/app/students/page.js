"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api"; // Axios instance with baseURL

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch students
  useEffect(() => {
    api
      .get("students/") // Axios request
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Failed to load students:", err));
  }, []);

  // Delete student
  const deleteStudent = async (id) => {
    if (!confirm("Are you sure to delete this student?")) return;

    try {
      await api.delete(`students/${id}/`); // Use api.delete with trailing slash
      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  // Open edit form
  const editStudent = (student) => {
    setEditingStudent(student.id);
    setFormData(student);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form for create or update
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editingStudent) {
        res = await api.put(`students/${editingStudent}/`, formData);
        setStudents(
          students.map((s) => (s.id === editingStudent ? res.data : s))
        );
      } else {
        res = await api.post("students/", formData);
        setStudents([...students, res.data]);
      }
      setEditingStudent(null);
      setFormData({});
    } catch (error) {
      // Log full error response data if available
      console.error("Failed to save student:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Students</h1>

      {/* Create / Edit form */}
      <form
        onSubmit={submitForm}
        className="border p-4 mb-6 rounded space-y-2 bg-gray-50"
      >
        <h2 className="text-lg font-semibold">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>

        <input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name || ""}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name || ""}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="date_of_birth"
          placeholder="Date of Birth"
          value={formData.date_of_birth || ""}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="reg_number"
          placeholder="Registration Number"
          value={formData.reg_number || ""}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="grade"
          placeholder="Grade"
          value={formData.grade || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
        {editingStudent && (
          <button
            type="button"
            onClick={() => {
              setEditingStudent(null);
              setFormData({});
            }}
            className="ml-2 px-4 py-2 rounded border"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Student List */}
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="border p-4 rounded space-y-2 bg-white shadow-sm"
          >
            <div>
              <strong>Full Name:</strong> {student.first_name}{" "}
              {student.last_name}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => editStudent(student)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(student.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
