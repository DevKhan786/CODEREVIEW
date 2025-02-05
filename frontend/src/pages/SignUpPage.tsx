import React, { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Handle the sign-up logic here (e.g., API call)
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto bg-gray-100">
      <div className="w-full max-w-md px-12 py-16 bg-white border border-gray-300 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password..."
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-800">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
