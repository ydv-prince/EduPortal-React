import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: "",
    instructor: "",
    price: "",
    image: null,
  });

  const [instructors, setInstructors] = useState([]); // State to store instructors

  // Fetch instructors from the backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("http://localhost:3000/instructors");
        if (response.ok) {
          const data = await response.json();
          setInstructors(data.instructors); // Set the instructors in state
        } else {
          console.error("Failed to fetch instructors");
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCourseData({ ...courseData, image: files[0] });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", courseData.name);
      formData.append("instructorId", courseData.instructor); // Use instructorId
      formData.append("price", courseData.price);
      formData.append("image", courseData.image);
  
      // Send POST request to backend
      const response = await fetch("http://localhost:3000/courses/add", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Course added successfully:", result);
        alert("Course added successfully!");
        navigate("/admin/courses"); // Redirect to courses list
      } else {
        const errorData = await response.json();
        console.error("Error adding course:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      alert("An error occurred while adding the course.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black">
      <div className="w-full max-w-2xl p-8 border rounded-lg shadow-lg border-fuchsia-700 bg-stone-950">
        <h2 className="mb-6 text-3xl font-bold text-center">
          Add <span className="text-fuchsia-500">New Course</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block mb-2 text-lg">Course Name</label>
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              required
              className="w-full p-3 text-black bg-white rounded"
              placeholder="e.g. Data Structures"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Instructor</label>
            <select
              name="instructor"
              value={courseData.instructor}
              onChange={handleChange}
              required
              className="w-full p-3 text-black bg-white rounded"
            >
              <option value="">-- Select Instructor --</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg">Course Price ($)</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-3 text-black bg-white rounded"
              placeholder="e.g. 49.99"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full p-3 text-white rounded bg-stone-900 file:bg-fuchsia-700 file:border-none file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded bg-fuchsia-700 hover:bg-fuchsia-800"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;