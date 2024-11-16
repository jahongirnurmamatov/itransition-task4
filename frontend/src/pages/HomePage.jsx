import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      HomePage
      <button
        onClick={logout}
        className="px-4 py-2 border bg-purple-500 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
