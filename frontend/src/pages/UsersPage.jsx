import React, { useEffect, useState } from "react";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import UserDisplay from "../components/UserDisplay";
import { useSearchParams } from "react-router-dom";
import PaginationComp from "../components/PaginationComp";
import { useUserStore } from "../store/userStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ActionButtons from "../components/userPage/ActionButtons";

const UsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchParams.get("searchKey") || "";
  const nameOrder = searchParams.get("nameOrder") || null;
  const lastLoginOrder = searchParams.get("lastLoginOrder") || null;
  const page = searchParams.get("page") || 1;

  const { getAllUsers, isUserLoading, users } = useUserStore();
  const [searchInput, setSearchInput] = useState(searchKey); // Update to use local state for search input

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Only update the local state for now
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    setSearchParams({
      searchKey: searchInput,
      nameOrder,
      lastLoginOrder,
      page,
    });
  };

  useEffect(() => {
    getAllUsers({
      searchKey,
      nameOrder,
      lastLoginOrder,
      page,
    });
  }, [getAllUsers, nameOrder, lastLoginOrder, page, searchKey]);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
    setAllSelected(!allSelected);
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSortChange = (field, currentOrder) => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const newParams = { searchKey, page };
    if (field === "name") {
      newParams.nameOrder = newOrder;
    } else if (field === "lastLogin") {
      newParams.lastLoginOrder = newOrder;
    }
    setSearchParams(newParams);
  };

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-full px-2 py-4 bg-gray-100">
      <div className="w-full mt-10 lg:w-[1200px] bg-white mx-auto rounded-md shadow-md">
        <div className="px-4 py-6">
          <div className="p-4 flex items-center justify-between border-b">
            <p className="text-xl font-semibold text-gray-500">Users</p>
            <div className="w-80 relative hidden md:flex ring-gray-300 rounded-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="w-full rounded-full px-4 py-2 border-none ring-1 outline-none"
              />
              <Search
                onClick={handleSearchSubmit}
                className="absolute top-2 right-4 size-6 text-gray-500 cursor-pointer"
              />
            </div>
            {/* Action buttons */}
            <ActionButtons selectedUsers={selectedUsers} />
          </div>
          {/* Table header */}
          <div className="grid lg:grid-cols-9 grid-cols-5 items-center p-4 border-b bg-gray-100">
            <div className="col-span-1 flex gap-2 items-center font-semibold">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="size-5"
              />
              <p className="lg:inline-block hidden">Select All</p>
            </div>
            <div
              className="col-span-2 font-semibold flex gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange("name", nameOrder)}
            >
              <p>
                <span className="hidden md:inline-block">Avatar &</span> Name
              </p>
              <ArrowDownWideNarrow
                className={`size-4 mt-1 ${
                  nameOrder === "asc" ? "" : "rotate-180"
                }`}
              />
            </div>
            <div className="col-span-2 font-semibold lg:flex hidden gap-1 items-center cursor-pointer">
              <p>Email</p>
            </div>
            <p className="col-span-1 font-semibold hidden md:inline-block">
              Status
            </p>
            <div
              className="hidden lg:flex col-span-2 font-semibold gap-1 items-center cursor-pointer"
              onClick={() => handleSortChange("lastLogin", lastLoginOrder)}
            >
              <p>Last active</p>
              <ArrowDownWideNarrow
                className={`size-4 mt-1 ${
                  lastLoginOrder === "asc" ? "" : "rotate-180"
                }`}
              />
            </div>
            <p className="col-span-1 font-semibold">Action</p>
          </div>

          {/* User rows */}
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserDisplay
                key={user._id}
                user={user}
                selectedUsers={selectedUsers}
                handleSelectUser={handleSelectUser}
              />
            ))
          ) : (
            <p>No users found.</p>
          )}
          <div className="flex items-start justify-center mt-6">
            <PaginationComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
