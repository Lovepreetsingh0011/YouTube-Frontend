import React from "react";
import { MdSubscriptions } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  return (
    <>
      <ul className="space-y-4 ">
        <Link
          to={"/"}
          className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <FaHome className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">Home</li>
        </Link>
        <div className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center">
          <SiYoutubeshorts className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            Shorts
          </li>
        </div>
        <div className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center">
          <MdSubscriptions className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            Subscriptions
          </li>
        </div>
        <div className="h-[0.3px]  bg-slate-50 w-full"></div>
        <Link
          to={"Dashboard"}
          className=" mx-2 py-2 flex pt-7  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <MdDashboardCustomize className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            DashBoard
          </li>
        </Link>
        <Link
          to="/WatchHistory"
          className=" mx-2 py-2 flex pt-7  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <FaHistory className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            History
          </li>
        </Link>
        <Link
          to={"/UserPostDashboard/UserPlayList"}
          className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <RiPlayListAddLine className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            Playlist
          </li>
        </Link>
        <Link
          to={"/UserPostDashboard"}
          className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <MdOndemandVideo className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            Your Video
          </li>
        </Link>
        <Link
          to={"/LikedVideos"}
          className=" mx-2 py-2 flex  hover:bg-gray-300 hover:text-black  rounded-lg items-center"
        >
          <BiSolidLike className="text-3xl ml-4 " />
          <li className="hover:text-black mt-1 pl-3  mr-4 font-serif">
            Liked Videos
          </li>
        </Link>
        <div className="h-[0.3px]  bg-slate-50 w-full"></div>
      </ul>
    </>
  );
};
