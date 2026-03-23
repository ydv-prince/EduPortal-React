import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditInstructor = () => {
  const { id } = useParams(); // Get the instructor ID from the URL
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch instructor details from the backend
  useEffect(() => {
    console.log("Fetching instructor with ID:", id); // Log the ID being fetched

    const fetchInstructor = async () => {
      try {
        const response = await fetch(`http://localhost:3000/instructors/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched instructor data:", data); // Log the fetched data
          setInstructor(data.instructor); // Set the instructor data
        } else {
          console.error("Failed to fetch instructor details");
        }
      } catch (error) {
        console.error("Error fetching instructor:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchInstructor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting data:", instructor); // Log the data being sent
  
      // Exclude the email field from the request body
      const { name } = instructor;
  
      const response = await fetch(`http://localhost:3000/instructors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }), // Only send the name field
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result); // Log the server response
        alert("Instructor updated successfully!");
        navigate("/admin/instructors"); // Redirect to the instructors list
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData); // Log the error response
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating instructor:", error);
      alert("An error occurred while updating the instructor.");
    }
  };
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 text-white bg-black">
      <h2 className="mb-10 text-4xl">Edit Instructor</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded shadow-lg bg-stone-950 border-fuchsia-800"
      >
        <label className="block mb-4">
          <span className="text-xl">Name</span>
          <input
            type="text"
            name="name"
            value={instructor.name}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-black border border-white rounded"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-xl">Email</span>
          <input
            type="email"
            name="email"
            value={instructor.email}
            readOnly
            className="w-full p-2 mt-2 text-gray-400 border border-white rounded cursor-not-allowed bg-stone-900"
          />
        </label>

        <div className="flex justify-between">
          <button
            type="submit"
            onClick={() => console.log("Save Changes button clicked")} // Log the button click
            className="px-5 py-2 text-white rounded bg-fuchsia-600 hover:bg-fuchsia-800"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/instructors")}
            className="px-5 py-2 text-white border border-white rounded hover:bg-stone-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInstructor;
