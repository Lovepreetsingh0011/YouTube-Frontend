import React, { useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

export const PostDashBoardHomePage = () => {
  return (
    <>
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Channel Dashboard</h1>
        <Link
          to={"/"}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md focus:outline-none"
        >
          Go To Home
        </Link>
      </nav>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Channel Overview */}
        <div className="border-gray-700 border-[0.2px]   rounded-xl p-6">
          <motion.div
            className="bg-white border-gray-700 border-[0.2px] min-h-[60vh]   rounded-xl p-6 dark:bg-zinc-900   shadow-md "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="public/UploadLogo.svg" alt="" />
            <h2 className="text-lg font-semibold mb-2">Channel Overview</h2>
            <p className="mb-3">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </p>
            <Link
              to={"/VideoUpload"}
              className="mt-4 px-4 py-2 bg-blue-500 rounded-full dark:bg-blue-700 text-white "
            >
              Upload Videos
            </Link>
          </motion.div>
        </div>
        {/* Channel Analytics */}
        <div className="border-gray-700 border-[0.2px]   rounded-xl p-6">
          <motion.div
            className="bg-white border-gray-700 border-[0.2px] min-h-[60vh]   rounded-xl p-6 dark:bg-zinc-900   shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">Channel Analytics</h2>
            <p>Current Subscribers</p>
            <p className="text-2xl  font-bold">0</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 rounded-full dark:bg-gray-500 font-bold dark:hover:bg-gray-600 text-white ">
              Go to chanele analytics
            </button>
          </motion.div>
        </div>
        {/* Add PlayList */}
        <div className="border-gray-700 border-[0.2px]   rounded-xl p-6">
          <motion.div
            className="bg-white border-gray-700 border-[0.2px] min-h-[60vh]   rounded-xl p-6 dark:bg-zinc-900   shadow-md "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=124067&format=png&color=000000"
              alt=""
            />
            <h2 className="text-lg font-semibold mb-2">Channel Overview</h2>
            <p className="mb-7">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </p>
            <Link
              to={"/UserPostDashboard/AddPlayList"}
              className=" px-4 py-3 bg-blue-500 rounded-full dark:bg-blue-600 font-serif  text-white "
            >
              Add PlayList
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};
