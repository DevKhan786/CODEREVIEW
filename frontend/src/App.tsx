import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import { axiosInstance } from "./lib/axiosInstance";

function App() {
  const { setUser } = useAuthStore((state) => state);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    getProfile();
  }, [setUser]);

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
