import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto p-4 bg-gray-100">
      <div className="w-full max-w-md px-8 sm:px-12 py-8 sm:py-16 bg-white border border-gray-300 rounded-xl shadow-lg">
        <h2 className="lg:text-3xl font-semibold text-center text-gray-700 mb-4 sm:text-2xl text-xs">
          Log In
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm text-xs"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm text-xs"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 text-xs"
            >
              Log In
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p className="text-xs sm:text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-800">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
