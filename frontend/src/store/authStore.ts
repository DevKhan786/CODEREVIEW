import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";
import { toast } from "react-hot-toast";

interface AuthState {
  loading: boolean;
  user: { id: string; name: string; email: string } | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  user: null,
  login: async ({ email, password }) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      if (res.status === 200) {
        set({ user: res.data.user });
        toast.success("Login successful!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login Error", error.response || error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage); // Display specific error message
      throw error; // Rethrow to handle failure in the component
    }
  },

  signup: async ({ name, email, password }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        set({ user: res.data.user });
        toast.success("Signup successful!");
      } else {
        throw new Error("Signup failed.");
      }
    } catch (error: any) {
      console.error("Signup Error", error.response || error);

      // Check if the error has a specific message from the backend response
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage); // Display specific error message
      throw error; // Rethrow to handle failure in the component
    }
  },

  logout: () => set({ user: null }),
}));
