import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`flex justify-center items-center text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`px-4 py-2 w-[80%] max-w-[300px] text-xl rounded-full 
                  border border-fuchsia-700 border-solid bg-stone-950 h-[50px] 
                  max-sm:text-lg max-sm:h-[40px] mx-auto block ${className}`}
      {...props}
    />
  );
};

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b shadow-lg bg-stone-950 border-fuchsia-900">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto lg:px-12">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white">
          <span>Code</span>
          <span className="text-fuchsia-500 ">Hub</span>
        </h1>

        {/* Centered Navigation */}
        <nav className="flex justify-center flex-1 space-x-10 text-lg">
          <Link to="/" className="text-white transition hover:text-fuchsia-500">
            Home
          </Link>
          <Link to="/course" className="text-white transition hover:text-fuchsia-500">
            Course
          </Link>
          <Link to="/about" className="text-white transition hover:text-fuchsia-500">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/instructor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        alert(data.message);
        localStorage.setItem('instructorId', data.instructorId);
        localStorage.setItem('token', data.token);
        navigate("/instructor/dashboard");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex justify-center pt-20 mt-12">
        <form onSubmit={handleSubmit} className="relative flex justify-center">
          {/* Background Blur Effect */}
          <div className="absolute bg-fuchsia-700 blur-[80px] h-[400px] top-[80px] w-[200px] z-[1]" />

          {/* Login Form Container */}
          <div
            className="relative px-0 py-14 border border-fuchsia-700 border-solid 
                        shadow-[0_4px_400px_#000] w-[500px] z-[2] max-sm:px-4 
                        max-sm:py-6 max-sm:w-[85%] rounded-2xl"
          >
            <h2 className="mb-4 text-3xl font-semibold text-center">Instructor</h2>

            {/* Inputs */}
            <div className="flex flex-col items-center w-full gap-6">
              <Input
                type="text"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-center text-red-500">{error}</p>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="mx-auto mt-6 text-2xl rounded-full border border-fuchsia-700 
                        border-solid bg-stone-950 bg-opacity-90 h-[50px] w-[140px] 
                        max-sm:text-xl max-sm:h-[40px] max-sm:w-[110px] hover:bg-fuchsia-900"
            >
              Login
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

const InstructorLogin = () => {
  return (
    <div className="min-h-screen text-white">
      <NavigationHeader />
      <LoginForm />
    </div>
  );
};

export default InstructorLogin;
