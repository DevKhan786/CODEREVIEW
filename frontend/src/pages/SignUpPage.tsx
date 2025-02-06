import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { signup } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      await signup(formData);
      toast.success("Sign-up successful!");
      navigate("/"); // Navigation handled here
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto bg-gray-100">
      <div className="w-full max-w-md px-12 py-16 bg-white border border-gray-300 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password..."
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>

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
