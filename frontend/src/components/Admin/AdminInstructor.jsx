import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminInstructor = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]); // State to store instructors

  // Fetch instructors from the backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("http://localhost:3000/instructors");
        if (response.ok) {
          const data = await response.json();
          setInstructors(data.instructors); // Update state with fetched instructors
        } else {
          console.error("Failed to fetch instructors");
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []); // Empty dependency array ensures this runs only once

  // Handle delete instructor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this instructor?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/instructors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Instructor deleted successfully!");
        setInstructors((prevInstructors) =>
          prevInstructors.filter((instructor) => instructor._id !== id)
        );
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting instructor:", error);
      alert("An error occurred while deleting the instructor.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        alert("Logout successful");
        localStorage.removeItem("token"); // Clear token if stored in localStorage
        navigate("/admin/login"); // Redirect to login page
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <div className="flex min-h-screen text-white bg-black">
      {/* Sidebar */}
      <nav className="w-64 min-h-screen p-6 border-r bg-stone-950 border-fuchsia-900 max-sm:hidden">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Admin<span className="text-fuchsia-500">Panel</span>
          </h2>
        </div>
        <ul className="space-y-6">
          {[
            { name: "Dashboard", path: "/admin/dashboard" },
            { name: "Courses", path: "/admin/courses" },
            { name: "Students", path: "/admin/students" },
            { name: "Instructors", path: "/admin/instructors" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="block px-4 py-2 text-xl transition duration-200 rounded hover:bg-fuchsia-700 hover:text-black"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-xl text-left transition duration-200 rounded hover:bg-fuchsia-700 hover:text-black"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navigation Bar */}
        <header className="flex items-center justify-center px-10 py-5 border-b border-solid bg-stone-950 border-b-fuchsia-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-sm:p-4">
          <h1 className="text-3xl font-bold text-white">
            <span>Code</span>
            <span className="text-fuchsia-500">Hub</span>
          </h1>
        </header>

        {/* Main Section */}
        <div className="relative flex-1 p-8 max-sm:p-4">
          <h1 className="mb-6 text-5xl text-white max-sm:text-4xl">
            Instructors
          </h1>
          <button
            className="mb-8 h-16 text-xl text-white border rounded-lg border-fuchsia-700 border-solid cursor-pointer bg-stone-950 w-[228px] max-sm:w-full transition-colors duration-300 hover:bg-fuchsia-700 hover:text-black"
            onClick={() => navigate("/admin/addinstructors")}
          >
            Add new instructor
          </button>

          {/* Table with rounded corners */}
          <div className="overflow-x-auto border border-white rounded-lg">
            <table className="w-full text-left bg-stone-950">
              <thead>
                <tr className="text-xl text-white bg-fuchsia-900 bg-opacity-20">
                  <th className="px-6 py-4">Instructor ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructor) => (
                  <tr
                    key={instructor._id}
                    className="transition-colors duration-200 border-t border-white hover:bg-stone-900"
                  >
                    <td className="px-6 py-4 text-base">{instructor._id}</td>
                    <td className="px-6 py-4 text-base">{instructor.name}</td>
                    <td className="px-6 py-4 text-base">{instructor.email}</td>
                    <td className="px-6 py-4 text-base">
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/admin/editinstructor/${instructor._id}`)}
                          className="px-4 py-2 text-sm text-white transition-colors rounded bg-stone-800 hover:bg-fuchsia-700 hover:text-black"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(instructor._id)}
                          className="px-4 py-2 text-sm text-white transition-colors rounded bg-stone-800 hover:bg-red-600 hover:text-black"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructor;