import React, { useState } from "react";
import {
  ArrowDownWideNarrow,
  Lock,
  LockOpen,
  Search,
  Trash,
} from "lucide-react";
import UserDisplay from "../components/UserDisplay";
import PaginationComp from "../components/PaginationComp";

const UsersPage = () => {
  const [isSelected, setIsSelected] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  // Sample user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      gender: "male",
      email: "john.doe@gmail.com",
      status: "Deleted",
      lastActive: "4 weeks ago",
    },
    {
      id: 2,
      name: "Jane Doe",
      gender: "female",
      email: "jane.doe@gmail.com",
      status: "Blocked",
      lastActive: "4 min ago",
    },
    {
      id: 3,
      name: "Adam Kane",
      email: "adam.kane@gmail.com",
      status: "Active",
      gender: "male",
      lastActive: "4 hour ago",
    },
    // Add more sample users as needed
  ];

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setAllSelected(!allSelected);
  };

  console.log(selectedUsers);
  // Handle individual user selection
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="min-h-screen w-full px-2 py-4 bg-gray-100">
      <div className="w-full mt-10 lg:w-[1200px] bg-white mx-auto rounded-md shadow-md">
        <div className="px-4 py-6">
          {/* Header with "Users" title and icons */}
          <div className="p-4 flex items-center justify-between border-b">
            <p className="text-xl font-semibold text-gray-500">Users</p>
            <div className="w-80  relative hidden lg:flex ring-gray-300  rounded-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full px-4 py-2 border-none ring-1  outline-none"
              />
              <Search className="absolute top-2 right-4 size-6 text-gray-500" />
            </div>
            <div className={`${isSelected ? "" : "hidden"}`}>
              <div className="flex md:gap-4 gap-0 ">
                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full">
                  <Lock className="w-6 h-6 text-blue-700" />
                  <p className="font-semibold hidden lg:inline-block text-blue-400">
                    Block
                  </p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full">
                  <LockOpen className="w-6 h-6 text-green-700" />
                  <p className="font-semibold hidden lg:inline-block text-green-400">
                    Unblock
                  </p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full">
                  <Trash className="w-6 h-6 text-red-500" />
                  <p className="font-semibold hidden lg:inline-block text-red-400">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="grid lg:grid-cols-9 grid-cols-5 items-center p-4 border-b bg-gray-100">
            <div className="col-span-1 flex gap-2 items-center font-semibold ">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="size-5"
              />
              <p className="lg:inline-block hidden">Select All</p>
            </div>
            <div className="col-span-2 font-semibold flex gap-1 items-center cursor-pointer">
              <p>
                <span className="hidden md:inline-block">Avatar &</span> Name
              </p>{" "}
              <ArrowDownWideNarrow className="size-4 mt-1" />
            </div>
            <div className=" col-span-2 font-semibold lg:flex hidden gap-1 items-center cursor-pointer">
              <p>Email</p> <ArrowDownWideNarrow className="size-4 mt-1" />
            </div>
            <p className="col-span-1 font-semibold hidden md:inline-block">
              Status
            </p>
            <div className="hidden lg:flex col-span-2 font-semibold gap-1 items-center">
              <p>Last active</p> <ArrowDownWideNarrow className="size-4 mt-1" />
            </div>
            <p className="col-span-1 font-semibold">Action</p>
          </div>

          {/* User rows */}
          {users.map((user) => (
            <UserDisplay
              user={user}
              selectedUsers={selectedUsers}
              handleSelectUser={handleSelectUser}
            />
          ))}
          <div className="flex items-start justify-center mt-6">
            <PaginationComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
