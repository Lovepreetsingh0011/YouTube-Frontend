import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ChangeTheme } from "../../Store/Reducers/Theme";
import { SideMenu, UserSideMenu } from "./NavIndex";
import { SetUser, LogOutUser } from "../../Store/Reducers/Authuser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  // axios.defaults.withCredentials = true;
  const val = useSelector((state) => state.Theme);
  const user = useSelector((st) => st.AuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [UserMenu, SetUserMenu] = useState(false);
  const [theme, settheme] = useState(false);
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
  const logoutHandler = async () => {
    try {
      const result = await axios.get("Users/LogOut");
      if (result?.data?.Success) {
        localStorage.removeItem("user");
        dispatch(LogOutUser());
        // SuccessMsg("User LogOut Successfully");
        navigate("/Login");
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("user");
    if (result) {
      dispatch(SetUser(JSON.parse(result)));
    }
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      <div>
        {/* Top Navbar */}
        <nav className="flex fixed w-full items-center overflow-hidden z-10 justify-between h-[9vh] bg-slate-50 dark:bg-black text-white p-4">
          {/* Left: Logo & Menu */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-xl dark:text-white text-black rounded-md "
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
              <button
                onClick={() => SetUserMenu(!UserMenu)}
                className="p-2 hover:bg-gray-700 rounded-full  border-black "
              >
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
          className={`fixed top-0 left-0 z-20   h-full bg-black text-white p-2 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out `}
        >
          <div className="text-center   hover:text-gray-400 px-4 py-2 mt-[3vh]">
            <button className="mb-6 text-xl " onClick={toggleSidebar}>
              <ImCross />
            </button>
          </div>

          <SideMenu />
          {/* ThemeMode for SideBar */}
          <div className="flex flex-col items-center mt-3 ">
            <h3 className="text-lg font-serif ">Theme-Mode</h3>
            <div
              className={`box-content mt-3 hidden sm:flex sm:h-4 sm:w-[4vw] md:h-4 md:w-[3.7vw] lg:h-5 lg:w-[2.6vw] xl:max-h-6 xl:max-w-[3vw] ${
                theme ? "justify-start  " : "justify-end   "
              }   border-2  rounded-full bg-black  border-white items-center space-x-4  dark:bg-black dark:border-white`}
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
            <p className="mt-1">{theme ? "Light" : "Dark"}</p>
          </div>
        </div>
        {/* User Menu On Click */}
        <UserSideMenu
          UserMenu={UserMenu}
          SetUserMenu={SetUserMenu}
          UserDetails={user?.user}
          logoutHandler={logoutHandler}
        />
      </div>
    </>
  );
};
