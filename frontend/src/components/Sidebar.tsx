import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Navigation</h2>
        <Link to="/">
          <Button variant="ghost" className="w-full mb-4 border">
            Home
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="ghost" className="w-full mb-4 border">
            Signup
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="ghost" className="w-full mb-4 border">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
