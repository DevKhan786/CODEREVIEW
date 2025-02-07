import { useAuthStore } from "../store/authStore";
import ProfileImageUpload from "../components/ProfileImageUpload";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <ProfileImageUpload />
    </div>
  );
};

export default HomePage;
