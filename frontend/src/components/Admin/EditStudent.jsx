import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/get/${id}`);
        console.log("Fetched student:", res.data);

        // Use correct key based on actual response structure
        const fetchedStudent = res.data.user || res.data;

        setStudent({
          username: fetchedStudent.username || "",
          email: fetchedStudent.email || "",
          phone: fetchedStudent.phone || "",
          gender: fetchedStudent.gender || "",
          password: fetchedStudent.password || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch student", error);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting student data:", student);
  
    try {
      await axios.put(`http://localhost:3000/users/update/${id}`, student);
      navigate("/admin/students");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <p className="text-2xl">Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 text-white bg-black">
      <h2 className="mb-10 text-4xl">Edit Student</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded shadow-lg bg-stone-950 border-fuchsia-800"
      >
        <label className="block mb-4">
          <span className="text-xl">Username</span>
          <input
            type="text"
            name="username"
            value={student.username}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-black border border-white rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-xl">Email</span>
          <input
            type="email"
            name="email"
            value={student.email}
            readOnly
            className="w-full p-2 mt-2 text-gray-400 border border-white rounded cursor-not-allowed bg-stone-900"
          />
        </label>

        <label className="block mb-4">
          <span className="text-xl">Password</span>
          <input
            type="text"
            name="password"
            value={student.password}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-black border border-white rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-xl">Phone</span>
          <input
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-black border border-white rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="text-xl">Gender</span>
          <select
            name="gender"
            value={student.gender}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-black border border-white rounded"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-5 py-2 text-white rounded bg-fuchsia-600 hover:bg-fuchsia-800"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="px-5 py-2 text-white border border-white rounded hover:bg-stone-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
