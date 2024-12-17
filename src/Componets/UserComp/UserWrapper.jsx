import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

export const UserWrapper = ({ children }) => {
  return (
    <>
      <div className={` min-h-[100vh] bg-zinc-950 flex `}>
        {/* Sidebar */}
        <aside className="w-[20vw] box-content sm:w-[23vw] lg:w-[16vw] fixed top-[9vh] text-center  bg-gray-200 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 min-h-screen p-4">
          <h2 className="text-xl font-bold mb-6">Your Channel</h2>
          <ul className="space-y-4 mt-10">
            <Link
              to={"/UserPostDashboard"}
              className="flex items-center hover:bg-slate-100 py-2  dark:hover:text-black rounded-lg"
            >
              <MdDashboardCustomize className=" text-lg lg:ml-2 lg:text-2xl   dark:text-white" />
              <span className=" pl-2 text-sm md:text-xl  font-serif">
                Dashboard
              </span>
            </Link>
            <li className="flex items-center hover:bg-slate-100 py-2  dark:hover:text-black rounded-lg">
              <MdOutlineVideoLibrary className=" text-lg lg:ml-2 lg:text-2xl   dark:text-white" />
              <span className=" pl-2 text-sm md:text-xl  font-serif">
                Content
              </span>
            </li>
            <li className="flex items-center hover:bg-slate-100 py-2  dark:hover:text-black rounded-lg">
              <VscGraph className=" text-lg lg:ml-2 lg:text-2xl   dark:text-white" />
              <span className=" pl-2 text-sm md:text-xl  font-serif">
                Analytics
              </span>
            </li>
            <li className="flex items-center hover:bg-slate-100 py-2  dark:hover:text-black rounded-lg">
              <IoSettings className=" text-lg lg:ml-2 lg:text-2xl   dark:text-white" />
              <span className=" pl-2 text-sm md:text-xl  font-serif">
                Setting
              </span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-[22vw]  sm:ml-[25vw] mt-[9vh] lg:ml-[18vw]   bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-6">
          {children}
        </div>
      </div>
    </>
  );
};
