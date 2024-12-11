import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import { ChangeTheme } from "../../Store/Reducers/Theme";
export const NavBar = () => {
  const val = useSelector((state) => state.Theme);
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, settheme] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const themehandler = () => {
    document.querySelector("html").classList.remove("dark", "light");
    dispatch(ChangeTheme());
    settheme(!theme);
    if (theme) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.add("light");
    }
  };

  return (
    <>
      <div>
        {/* Top Navbar */}
        <nav className="flex items-center justify-between bg-slate-50 dark:bg-gray-900 text-white p-4">
          {/* Left: Logo & Menu */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-xl dark:text-white text-black rounded-md md:hidden"
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <div className="text-2xl font-bold dark:text-white text-black">
              <span className="text-red-600 ">You</span>Tube
            </div>
          </div>

          {/* Middle: Search Bar */}
          <div className="hidden md:flex  w-[50%] mx-4">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="px-4 py-2 bg-gray-700 border-l border-gray-700 rounded-r-md hover:bg-gray-600">
              🔍
            </button>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4  ">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-700 rounded-full  border-black ">
                <FaUserCircle className="dark:text-white  text-black text-xl " />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full  border-black ">
                <IoNotificationsOutline className="dark:text-white  text-black text-xl " />
              </button>
              {/* <button className="p-2 hover:bg-gray-700 rounded-full">👤</button> */}
            </div>
            <div
              className={`box-content hidden sm:flex sm:h-4 sm:w-[4vw] md:h-4 md:w-[3.7vw] lg:h-5 lg:w-[2.6vw] xl:max-h-6 xl:max-w-[3vw] ${
                theme ? "justify-start  " : "justify-end   "
              } border-black  border-2  rounded-full bg-white  items-center space-x-4  dark:bg-black dark:border-white`}
            >
              <button
                onClick={themehandler}
                className="w-[50%]   rounded-full bg-slate-800 h-full"
              >
                {theme ? (
                  <MdOutlineDarkMode />
                ) : (
                  <MdOutlineLightMode className="" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-6 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <button
            className="mb-6 text-xl hover:text-gray-400"
            onClick={toggleSidebar}
          >
            ✖
          </button>
          <ul className="space-y-4">
            <li className="hover:text-gray-400">Home</li>
            <li className="hover:text-gray-400">Trending</li>
            <li className="hover:text-gray-400">Subscriptions</li>
            <li className="hover:text-gray-400">Library</li>
          </ul>
        </div>
      </div>
    </>
  );
};
