import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import { axiosInstance } from "./lib/axiosInstance";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile", {
          withCredentials: true,
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
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
