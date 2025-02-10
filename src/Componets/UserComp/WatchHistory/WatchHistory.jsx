import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { div } from "framer-motion/client";

export default function WatchHistory() {
  const [history, sethistory] = useState([]);
  const [value, setvalue] = useState([]);
  const gethistory = async () => {
    try {
      const result = await axios.get("Users/GetHistory");
      sethistory(result?.data?.History);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const SelectIdhandler = (e) => {
    try {
      e.stopPropagation();
      if (e?.target?.checked) {
        setvalue([...value, e.target.value]);
      } else {
        setvalue(value.filter((val) => val !== e.target.value));
      }
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const removehistory = async () => {
    try {
      const result = await axios.put("Users/RemoveSelectedHistory", {
        Values: value,
      });
      console.log(result);
      setvalue([]);
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveAllHistory = async () => {
    try {
      const result = await axios.put("Users/RemoveAllHistory");
      console.log(result);
      setvalue([]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gethistory();
  }, [setvalue, value]);
  return (
    <div className="dark:bg-zinc-950  bg-gray-200 text-black  dark:text-white min-h-screen  md:p-6">
      {/* Page Title */}
      <h1 className="text-3xl md:text-3xl pt-[12vh] font-bold mb-4 text-center md:text-left">
        Watch History
      </h1>

      <div className="flex flex-col  lg:flex-row justify-between gap-6">
        {/* Left Section - Video List */}
        <div className="w-full lg:w-3/4 space-y-4">
          {history?.map((video) => (
            <div
              className="flex justify-between md:flex-row items-start md:items-center space-x-0 md:space-x-4  bg-gray-800  rounded-md shadow"
              key={video._id}
            >
              <Link
                to={`/VideoSlug/${video?._id}`}
                className="flex justify-between md:flex-row items-start md:items-center space-x-0 md:space-x-4  bg-gray-800  rounded-md shadow"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4  bg-gray-800 p-4 rounded-lg shadow"
                >
                  {/* Thumbnail */}
                  <img
                    src={video?.ThumbNail}
                    alt={video?.Title}
                    className="w-full md:w-44 h-24 object-cover rounded"
                  />

                  {/* Video Details */}
                  <div className="flex-1 mt-2 md:mt-0">
                    <h2 className="text-base md:text-lg font-semibold truncate">
                      {video.Title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {video?.Owner?.FullName} • {video?.TotalViews}
                    </p>
                  </div>

                  {/* Video Duration */}
                  <span className="text-gray-300 text-xs self-end md:self-auto">
                    {video?.Duration}
                  </span>
                </motion.div>
                {/* <input
                  type="checkbox"
                  value={video?._id}
                  onChange={SelectIdhandler}
                /> */}
              </Link>
              <div className="pr-3 flex items-center justify-center">
                <label htmlFor={video?._id} className="pr-3 font-serif">
                  Select{" "}
                </label>
                <input
                  id={video?._id}
                  type="checkbox"
                  className=""
                  value={video?._id}
                  onChange={SelectIdhandler}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - Options */}
        <div className="w-full lg:w-1/4 space-y-4 flex flex-col">
          <motion.button
            onClick={RemoveAllHistory}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-red-600 p-2 rounded hover:bg-red-500 transition"
          >
            Clear All Watch History
          </motion.button>
          <motion.button
            onClick={removehistory}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-yellow-600 p-2 rounded hover:bg-yellow-500 transition"
          >
            Clear Selected History
          </motion.button>
        </div>
      </div>
    </div>
  );
}
