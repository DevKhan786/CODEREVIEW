import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? "w-16 md:w-22" : "w-12"
        } bg-gray-100 text-black border-r border-black p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="w-full mb-8 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </div>

        <div className={`space-y-4 ${isOpen ? "block" : "hidden"}`}>
          {/* Always show home link */}
          <Link to="/" className="flex items-center">
            <Button
              variant="ghost"
              className="w-full mb-4 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
            >
              <FaHome className="text-xl" />
            </Button>
          </Link>

          {/* If no user, show signup and login links */}
          {!user && (
            <>
              <Link to="/signup" className="flex items-center">
                <Button
                  variant="ghost"
                  className="w-full mb-4 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
                >
                  <FaUserPlus className="text-xl" />
                </Button>
              </Link>
              <Link to="/login" className="flex items-center">
                <Button
                  variant="ghost"
                  className="w-full mb-4 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
                >
                  <FaSignInAlt className="text-xl" />
                </Button>
              </Link>
            </>
          )}

          {/* If user is logged in, show profile and logout buttons */}
          {user && (
            <>
              <Link to="/profile" className="flex items-center">
                <Button
                  variant="ghost"
                  className="w-full mb-4 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
                >
                  <FaUser className="text-xl" />
                </Button>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full mb-4 border border-gray-500 hover:border-black transition-all duration-150 hover:bg-gray-300"
              >
                <FaSignOutAlt className="text-xl" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
