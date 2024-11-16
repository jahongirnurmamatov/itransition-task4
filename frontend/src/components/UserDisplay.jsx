import { Lock, LockOpenIcon, Trash } from "lucide-react";
import React from "react";

const UserDisplay = ({ user, selectedUsers, handleSelectUser }) => {
  return (
    <div
      key={user.id}
      className="grid lg:grid-cols-9 grid-cols-5 items-center p-4 border-b hover:bg-gray-100"
    >
      <div className="col-span-1 lg:grid-cols-4 flex items-center justify-center">
        <input
          type="checkbox"
          className="size-5"
          checked={selectedUsers.includes(user.id)}
          onChange={() => handleSelectUser(user.id)}
        />
      </div>
      <div className="flex items-center gap-4 col-span-2">
        <img
          className="size-12 hidden md:inline-block"
          src={
            user.image || user.gender === "male"
              ? "https://avatar.iran.liara.run/public/boy"
              : "https://avatar.iran.liara.run/public/girl"
          }
          alt=""
        />
        <p
          className={
            user.status === "Deleted" ? "text-gray-400 line-through" : ""
          }
        >
          {user.name}
        </p>
      </div>
      <div className=" hidden lg:inline-block col-span-2">
        <p
          className={
            user.status === "Deleted" ? "text-gray-400 line-through" : ""
          }
        >
          {user.email}
        </p>
      </div>
      <div
        className={`col-span-1 w-24 hidden md:inline-block rounded-full text-sm text-center px-2 py-1 text-gray-100 ${
          user.status === "Blocked"
            ? "bg-red-700 "
            : user.status === "Active"
            ? "bg-green-700"
            : "bg-gray-600"
        }`}
      >
        {user.status}
      </div>
      <div className="hidden lg:inline-block col-span-2">{user.lastActive}</div>
      <div className="col-span-1 flex gap-4">
        {user.status !== "Blocked" ? (
          <LockOpenIcon className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-600 hover:scale-105" />
        ) : (
          <Lock className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 hover:scale-105" />
        )}

        <Trash className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600 hover:scale-105" />
      </div>
    </div>
  );
};

export default UserDisplay;
