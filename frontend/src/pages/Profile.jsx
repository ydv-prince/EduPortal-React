import React from "react";
import profile from "/images/profile.png";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        alert("Logout successful");
        localStorage.removeItem("token"); // Clear token if stored in localStorage
        navigate("/login"); // Redirect to login page
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 text-white"
      style={{
        background:
          "radial-gradient(circle at top center, #410640 5%, #000000 50%)",
      }}
    >
      <Navbar1 />
      <main className="w-full min-h-screen py-12">
        {/* Profile Section */}
        <section className="relative max-w-[500px] mx-auto bg-stone-900 p-10 rounded-lg shadow-md mt-12">
          {/* Profile Info */}
          <div className="flex items-center gap-8">
            <img
              src={profile}
              alt="Profile"
              className="w-[110px] h-[110px] rounded-full border-4 border-fuchsia-700"
            />
            <div className="text-white">
              <h2 className="text-3xl">Profile</h2>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mt-8">
            <h3 className="text-2xl text-fuchsia-500">Personal Details</h3>
            <div className="grid grid-cols-2 gap-6 mt-4 text-white">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <div className="p-4 text-lg border rounded-lg bg-stone-800 border-fuchsia-700">
                  Raj Vardhan singh
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <div className="p-4 text-lg border rounded-lg bg-stone-800 border-fuchsia-700">
                rajsingh@gmail.com
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Password</label>
                <div className="p-4 text-lg border rounded-lg bg-stone-800 border-fuchsia-700">
                  00000
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Phone</label>
                <div className="p-4 text-lg border rounded-lg bg-stone-800 border-fuchsia-700">
                  9934622433
                </div>
              </div>
            </div>
          </div>

          {/* Edit and Logout Buttons */}
          <div className="flex justify-between mt-8">
            {/* Edit Button */}
            <button
              onClick={() => navigate("/editprofile")}
              className="px-10 py-3 text-white transition rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600"
            >
              Edit
            </button>
            
            {/* Logout Button */}
            <button
              className="px-10 py-3 text-white transition rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;