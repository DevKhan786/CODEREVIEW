import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-6">
      <h1 className="text-3xl">{user ? `Welcome, ${user.name}` : "Home"}</h1>
      <div className="mt-4">
        {user ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => useAuthStore.getState().logout()}
          >
            Log Out
          </button>
        ) : (
          <a href="/login" className="text-blue-600">
            Log in
          </a>
        )}
      </div>
    </div>
  );
};

export default HomePage;
