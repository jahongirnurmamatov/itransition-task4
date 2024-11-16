import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import MainLayout from "./components/layout/MainLayout";

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
        <Route
          element={
            isAuthenticated ? <MainLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
