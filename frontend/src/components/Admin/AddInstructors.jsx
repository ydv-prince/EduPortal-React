      import React, { useState } from "react";
      import { useNavigate } from "react-router-dom";

      const AddInstructor = () => {
        const navigate = useNavigate();
      const [instructorData, setInstructorData] = useState({
          name: "",
          email: "",
          password: "",
        });

        const handleChange = (e) => {
          const { name, value } = e.target;
          setInstructorData({ ...instructorData, [name]: value });
        };

        const handleSubmit = async (e) => {
          e.preventDefault();

          try {
            // Send POST request to backend
            const response = await fetch("http://localhost:3000/instructors/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(instructorData),
            });

            if (response.ok) {
              const result = await response.json();
              console.log("Instructor added successfully:", result);

              // Redirect to instructors list page
              navigate("/admin/instructors");
            } else {
              const errorData = await response.json();
              console.error("Error adding instructor:", errorData.message);
              alert(`Error: ${errorData.message}`);
            }
          } catch (error) {
            console.error("Error submitting instructor:", error);
            alert("An error occurred while adding the instructor.");
          }
        };

        return (
          <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black">
            <div className="w-full max-w-2xl p-8 border rounded-lg shadow-lg border-fuchsia-700 bg-stone-950">
              <h2 className="mb-6 text-3xl font-bold text-center">
                Add <span className="text-fuchsia-500">Instructor</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-lg">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={instructorData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-black bg-white rounded"
                    placeholder="e.g. Prof. Aditi Rao"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={instructorData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-black bg-white rounded"
                    placeholder="e.g. aditi@domain.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={instructorData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 text-black bg-white rounded"
                    placeholder="Enter password"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/instructors")}
                    className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded bg-fuchsia-700 hover:bg-fuchsia-800"
            >
              Save Instructor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstructor;