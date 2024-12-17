import React from "react";
import { NavLink } from "react-router-dom";

export const UserNavi = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center mb-5 md:mb-7 px-4">
        <nav className="flex flex-col md:flex-row gap-4 md:gap-9 font-serif w-full justify-center items-center">
          {[
            { Name: "Inspiration", link: "/" },
            { Name: "Videos", link: "/UserPostDashboard/Videos" },
            { Name: "Posts", link: "/UserPostDashboard/Posts" },
            { Name: "PlayList", link: "/UserPostDashboard/UserPlayList" },
            { Name: "Liked-Videos", link: "/LikedVideos" },
          ].map((tab) => (
            <NavLink
              to={tab.link}
              key={tab.Name}
              className={({ isActive }) => {
                return `${
                  isActive
                    ? "text-red-800 border-b-2 border-red-800"
                    : "text-black dark:text-white"
                } 
                cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 
                hover:border-b-2 hover:border-blue-400 
                transform duration-200 text-lg md:text-2xl`;
              }}
            >
              {tab?.Name}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Responsive Divider */}
      <div className="bg-gray-400 w-full h-[1px] mb-6 md:mb-10"></div>
    </>
  );
};
