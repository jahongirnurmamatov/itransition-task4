import {
  ChartNoAxesCombined,
  ContactRound,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldEllipsis,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCompact, setIsCompact] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div
      className={`h-screen bg-slate-800 p-3 flex flex-col justify-between transition-all duration-300 ${
        isCompact ? "w-20" : "w-64"
      }`}
      onMouseEnter={() => setIsCompact(false)}
      onMouseLeave={() => setIsCompact(true)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-4 mb-6">
        <ShieldEllipsis
          className={`h-8 w-8 text-white ${isCompact ? "mx-2" : ""}`}
        />
        {!isCompact && (
          <p className="text-xl font-semibold text-white">
            Admin<span className="text-gray-300 font-extrabold">PANEL</span>
          </p>
        )}
      </div>

      <hr className="h-0.5 bg-gray-300 w-full mb-6" />

      {/* Main Menu */}
      <div className=" flex flex-col gap-3">
        <p
          className={`text-lg font-semibold text-white my-4 ${
            isCompact ? "hidden" : "block"
          }`}
        >
          Main Menu
        </p>
        <div className="flex flex-col items-start gap-3 justify-start">
          <Link
            to={"/"}
            className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
          >
            <LayoutDashboard className="h-6 w-6" />
            {!isCompact && <p>Dashboard</p>}
          </Link>
          <Link
            to={"/users"}
            className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
          >
            <Users className="h-6 w-6" />
            {!isCompact && <p>Users</p>}
          </Link>
          <Link
            to={"/analytics"}
            className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
          >
            <ChartNoAxesCombined className="h-6 w-6" />
            {!isCompact && <p>Analytics</p>}
          </Link>
        </div>
      </div>

      {/* Account Section */}
      <div className="mt-6 flex flex-col gap-3">
        <p
          className={`text-lg font-semibold text-white my-4 ${
            isCompact ? "hidden" : "block"
          }`}
        >
          Account
        </p>
        <div className="flex flex-col items-start gap-3 justify-start">
          <Link
            to={"/my-profile"}
            className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
          >
            <ContactRound className="h-6 w-6" />
            {!isCompact && <p>Profile</p>}
          </Link>
          <Link
            to={"/settings"}
            className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
          >
            <Settings className="h-6 w-6" />
            {!isCompact && <p>Settings</p>}
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div onClick={logout} className="flex items-center gap-4 text-gray-200 w-full px-3 py-2 mt-auto mb-5 rounded-md hover:bg-slate-700 cursor-pointer">
        <LogOut className="size-6"/>
        {!isCompact && <p>Logout</p>}
      </div>
    </div>
  );
};

export default Sidebar;
