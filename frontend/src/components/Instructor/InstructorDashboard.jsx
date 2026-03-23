import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    activeCourses: 0,
  });

  // Fetch stats data when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch courses (filter client-side for demo, or add backend filter)
        const instructorId = localStorage.getItem('instructorId');
        const courseRes = await axios.get(`http://localhost:3000/courses/instructor/${instructorId}`);

        setStats({
          totalCourses: courseRes.data.courses.length,
          totalStudents: 0,
          activeCourses: courseRes.data.courses.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/instructor/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/instructor/dashboard" },
    { name: "My Courses", path: "/instructor/courses" },
    { name: "Students", path: "/instructor/students" }, // Placeholder
  ];

  return (
    <div className="flex min-h-screen text-white bg-black">
      {/* Sidebar */}
      <nav className="w-64 min-h-screen p-6 border-r bg-stone-950 border-fuchsia-900 max-sm:hidden">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Instructor<span className="text-fuchsia-500">Panel</span>
          </h2>
        </div>

        <ul className="space-y-6">
          {menuItems.map((item) => (
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

        {/* Dashboard Content */}
        <main className="relative flex-1 p-7 max-sm:p-4">
          <h2 className="text-4xl mb-9">Dashboard</h2>
          <section className="flex gap-12 mt-10 max-md:flex-wrap max-sm:flex-col max-sm:gap-5">
            <div
              className="text-2xl text-center bg-fuchsia-900 rounded-3xl h-[71px] w-[300px] max-md:w-[calc(50%_-_24px)] max-sm:w-full flex items-center justify-center"
            >
              Total Courses = {stats.totalCourses}
            </div>
            <div
              className="text-2xl text-center bg-fuchsia-900 rounded-3xl h-[71px] w-[300px] max-md:w-[calc(50%_-_24px)] max-sm:w-full flex items-center justify-center"
            >
              Total Students = {stats.totalStudents}
            </div>
            <div
              className="text-2xl text-center bg-fuchsia-900 rounded-3xl h-[71px] w-[300px] max-md:w-[calc(50%_-_24px)] max-sm:w-full flex items-center justify-center"
            >
              Active Courses = {stats.activeCourses}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
