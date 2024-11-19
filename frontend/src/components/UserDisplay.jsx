import { Lock, LockOpenIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { useUserStore } from "../store/userStore";

const UserDisplay = ({ user, selectedUsers, handleSelectUser }) => {
  const {
    blockById,
    deleteById,
  } = useUserStore();
  const [status, setStatus] = useState(user.status);

  const handleBlock = () => {
    setStatus(status === "Active" ? "Blocked" : "Active");
    blockById(user._id);
  };
  const handleDelete = () => {
    deleteById(user._id);
    setStatus("Deleted");
  };
  if(status==='Deleted'){
    return null;
  }
  return (
    <div className="grid lg:grid-cols-9 grid-cols-5 items-center p-4 border-b hover:bg-gray-100">
      <div className="col-span-1 lg:grid-cols-4 flex items-center justify-center">
        <input
          type="checkbox"
          className="size-5"
          checked={selectedUsers.includes(user._id)}
          onChange={() => handleSelectUser(user._id)}
        />
      </div>
      <div className="flex items-center gap-4 col-span-2">
        <img
          className="size-12 hidden md:inline-block"
          src={user.image || "https://avatar.iran.liara.run/public/boy"}
          alt=""
        />
        <p className={status === "Blocked" ? "text-red-500" : ""}>
          {user.name}
        </p>
      </div>
      <div className=" hidden lg:inline-block col-span-2">
        <p className={status === "Blocked" ? "text-red-500 " : ""}>
          {user.email}
        </p>
      </div>
      <div
        className={`col-span-1 w-24 hidden md:inline-block rounded-full text-sm text-center px-2 py-1 text-gray-100 ${
          status === "Blocked" ? "bg-red-700 " : "bg-green-700"
        }`}
      >
        {status}
      </div>
      <div className="hidden lg:inline-block col-span-2">
        {formatDistance(user.lastLogin, new Date(), { addSuffix: true })}
      </div>
      {status !== "Deleted" && (
        <div className="col-span-1 flex gap-4">
          {status !== "Blocked" ? (
            <LockOpenIcon
              onClick={handleBlock}
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-600 hover:scale-105"
            />
          ) : (
            <Lock
              onClick={handleBlock}
              className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 hover:scale-105"
            />
          )}

          <Trash
            onClick={handleDelete}
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
