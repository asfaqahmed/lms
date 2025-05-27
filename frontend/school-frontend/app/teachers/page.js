"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api"; // Axios instance with baseURL

export default function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [formData, setFormData] = useState({
    teacher: "", // 👈 Store user ID only
    subject: "",
  });

  // Fetch teachers
  useEffect(() => {
    api
      .get("teachers/")
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Failed to load teachers:", err));
  }, []);

  

  const deleteTeacher = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await api.delete(`teachers/${id}/`);
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  };

  const editTeacher = (teacher) => {
    setEditingTeacherId(teacher.id);
    setFormData({
      user: teacher.user.id, // 👈 store user ID for editing
      subject_name: teacher.subject_name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editingTeacherId) {
        res = await api.put(`teachers/${editingTeacherId}/`, formData);
        setTeachers(
          teachers.map((t) => (t.id === editingTeacherId ? res.data : t))
        );
      } else {
        res = await api.post("teachers/", formData);
        setTeachers([...teachers, res.data]);
      }

      // Reset
      setEditingTeacherId(null);
      setFormData({ user: "", subject_name: "" });
    } catch (error) {
      console.error("Failed to save teacher:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <div>
      {/* Form */}
      <form
        onSubmit={submitForm}
        className="border p-4 mb-6 rounded space-y-2 bg-gray-50"
      >
        <h2 className="text-lg font-semibold">
          {editingTeacherId ? "Edit Teacher" : "Add New Teacher"}
        </h2>

        <input
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
         
        <input
          name="subject"
          placeholder="Subject Name"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingTeacherId ? "Update Teacher" : "Add Teacher"}
        </button>

        {editingTeacherId && (
          <button
            type="button"
            onClick={() => {
              setEditingTeacherId(null);
              setFormData({ user: "", subject_name: "" });
            }}
            className="ml-2 px-4 py-2 rounded border"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List */}
      <ul className="space-y-4">
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="border p-4 rounded bg-white shadow-sm space-y-1"
          >
            <div>
              <strong>Teacher:</strong>{" "}
              {teacher.teacher}
            </div>
            <div>
              <strong>Subject:</strong> {teacher.subject}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => editTeacher(teacher)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTeacher(teacher.id)}
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
