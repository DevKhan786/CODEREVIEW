import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfilePic: (updatedUser: User) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  user: null,
  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", { email, password });

      if (res.status === 200) {
        set({ user: res.data.user });
        toast.success("Login successful!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage); // Display specific error message
      throw error; // Rethrow to handle failure in the component
    } finally {
      set({ loading: false });
    }
  },

  signup: async ({ name, email, password }) => {
    try {
      set({ loading: true });
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
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => set({ user: null }),
  updateProfilePic: (updatedUser) => set({ user: updatedUser }),
  setUser: (user) => set({ user }),
}));
