import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
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
