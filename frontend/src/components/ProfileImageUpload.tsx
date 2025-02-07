import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";

const ProfileImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateProfilePic } = useAuthStore();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const response = await axiosInstance.post(
          "/auth/upload-profile-pic",
          { image: base64Image }, // Send as JSON
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          toast.success("Profile picture updated successfully");
          updateProfilePic(response.data.user);
        }
        setLoading(false);
      };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload image");
      setLoading(false);
    }
  };

  return (
    <div className="flex text-center ">
      <div className="flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-8 lg:p-12 border border-black rounded-3xl">
        <label className="block mb-2 text-sm font-medium text-center text-gray-900">
          Profile Picture
        </label>
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div>
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        )}
        <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          {loading ? "Uploading..." : "Change Profile Picture"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
