import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/users/register", {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
      });

      console.log("Registered:", res.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen text-white bg-black-900">
      {/* Header */}
      <header className="flex items-center justify-between px-7 py-0 border-b border-solid bg-stone-950 border-b-fuchsia-900 h-[95px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:px-4 max-sm:py-0 max-sm:h-[70px]">
        <h1 className="text-3xl font-bold">
          <span>Code</span>
          <span className="text-purple-900">Hub</span>
        </h1>

        <nav className="hidden space-x-10 text-lg lg:flex">
          <Link to="/" className="text-white transition hover:text-fuchsia-500">Home</Link>
          <Link to="/course" className="text-white transition hover:text-fuchsia-500">Course</Link>
          <Link to="/about" className="text-white transition hover:text-fuchsia-500">About</Link>
          <Link to="/admin/login" className="text-white transition hover:text-fuchsia-500">Admin</Link>
        </nav>

        <button
          className="px-5 py-1.5 text-xl bg-fuchsia-700 cursor-pointer rounded-[32px] max-sm:px-4 max-sm:py-1 max-sm:text-base transition-colors duration-300 hover:bg-fuchsia-500"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      {/* Signup Form */}
      <form className="relative flex justify-center pt-12" onSubmit={handleSubmit}>
        <div className="absolute bg-fuchsia-700 blur-[50px] h-[500px] top-[70px] w-[200px] z-[1]" />
        <div className="relative px-0 py-14 border border-fuchsia-700 border-solid shadow-[0_4px_400px_#000] w-[500px] z-[2] max-sm:px-4 max-sm:py-6 max-sm:w-[85%] rounded-2xl">
          <h2 className="mb-6 text-3xl font-semibold text-center">Signup</h2>

          {/* Full Name */}
          <div className="mx-auto my-0 mb-4 w-[380px] max-sm:w-[90%]">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="px-4 text-xl border border-solid rounded-full border-fuchsia-700 bg-stone-950 h-[50px] w-full max-sm:text-lg max-sm:h-[40px]"
            />
          </div>

          {/* Email */}
          <div className="mx-auto my-0 mb-4 w-[380px] max-sm:w-[90%]">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 text-xl border border-solid rounded-full border-fuchsia-700 bg-stone-950 h-[50px] w-full max-sm:text-lg max-sm:h-[40px]"
            />
          </div>

          {/* Password with Eye */}
          <div className="mx-auto relative my-0 mb-4 w-[380px] max-sm:w-[90%]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 pr-12 text-xl border border-solid rounded-full border-fuchsia-700 bg-stone-950 h-[50px] w-full max-sm:text-lg max-sm:h-[40px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute transform -translate-y-1/2 right-4 top-1/2"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-6-10-6s2.388-3.332 6.132-5.261M15 12a3 3 0 11-6 0 3 3 0 016 0zm5.618 5.618A9.956 9.956 0 0022 13s-2.388-3.332-6.132-5.261M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="mx-auto my-0 mb-4 w-[380px] max-sm:w-[90%]">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 text-xl border border-solid rounded-full border-fuchsia-700 bg-stone-950 h-[50px] w-full max-sm:text-lg max-sm:h-[40px]"
            />
          </div>

          {/* Gender */}
          <div className="mx-auto my-0 mb-4 w-[380px] max-sm:w-[90%]">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 text-xl border border-solid rounded-full border-fuchsia-700 bg-stone-950 h-[50px] w-full max-sm:text-lg max-sm:h-[40px]"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 text-xl rounded-full border border-fuchsia-700 bg-stone-950 bg-opacity-90 h-[45px] w-[150px] max-sm:text-lg max-sm:h-[40px] max-sm:w-[130px] hover:bg-fuchsia-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
