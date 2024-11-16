import { Outlet } from "react-router-dom"; 
import Sidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1"> {/* Adjust the padding as needed */}
        <Outlet /> {/* Render the matched child route here */}
      </div>
    </div>
  );
};

export default MainLayout;
