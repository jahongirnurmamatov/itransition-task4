import React from "react";

const TableHeader = () => {
  return (
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
      <p className="col-span-1 font-semibold hidden md:inline-block">Status</p>
      <div className="hidden lg:flex col-span-2 font-semibold gap-1 items-center">
        <p>Last active</p> <ArrowDownWideNarrow className="size-4 mt-1" />
      </div>
      <p className="col-span-1 font-semibold">Action</p>
    </div>
  );
};

export default TableHeader;
