import { Lock, LockOpen, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useUserStore } from "../../store/userStore";

const ActionButtons = ({
  selectedUsers,
}) => {
  const {getAllUsers, isBlocking, isDeleting, blockUnblockInBulk, deleteInBulk } =
    useUserStore();

  useEffect(() => {
    if(isDeleting||isBlocking){
        getAllUsers();
    }
  }, [isDeleting,isBlocking]);

  return (
    <div className={`${selectedUsers.length ? "" : "hidden"}`}>
      <div className="flex md:gap-4 gap-0">
        {/* Block, Unblock, Delete buttons */}
        <div onClick={()=>blockUnblockInBulk(selectedUsers,"block")} className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full">
          <Lock className="w-6 h-6 text-blue-700" />
          <p className="font-semibold hidden lg:inline-block text-blue-400">
            Block
          </p>
        </div>
        <div onClick={()=>blockUnblockInBulk(selectedUsers,"unblock")} className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full">
          <LockOpen className="w-6 h-6 text-green-700" />
          <p className="font-semibold hidden lg:inline-block text-green-400">
            Unblock
          </p>
        </div>
        <div
          onClick={() => deleteInBulk(selectedUsers)}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-200 rounded-full"
        >
          <Trash className="w-6 h-6 text-red-500" />
          <p className="font-semibold hidden lg:inline-block text-red-400">
            {isDeleting ? "Deleting..." : "Delete"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
