import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";
const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user: ", user);
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center gap-4">
        <Loader size={40} className="animate-spin" /> <span className="text-semibold text-2xl text-gray-600">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : <HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
