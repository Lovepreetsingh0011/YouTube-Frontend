import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserWrapper } from "../UserWrapper";
import axios from "axios";
import { Vite } from "../../../Constanst/APi_Varibles";
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

export const LikedVideos = () => {
  axios.defaults.baseURL = Vite.API_URL;
  const [videos, setvideos] = useState([]);
  //   const videos = [
  //     {
  //       id: 1,
  //       title: "Day 1 Basics of English | बिल्कुल Zero से English सीखें",
  //       thumbnail:
  //         "https://via.placeholder.com/400x200?text=60+Days+English+Course",
  //       duration: "1:33:56",
  //       views: "15M views • 1 year ago",
  //     },
  //     {
  //       id: 2,
  //       title: "What Is Collections In C# | ArrayList Collection In C#",
  //       thumbnail: "https://via.placeholder.com/400x200?text=Collections+in+C%23",
  //       duration: "35:48",
  //       views: "2.1K views • 5 months ago",
  //     },
  //     {
  //       id: 3,
  //       title: "LAMBDA EXPRESSION IN C# - WORKING WITH LAMBDA",
  //       thumbnail: "https://via.placeholder.com/400x200?text=Lambda+Expression",
  //       duration: "27:12",
  //       views: "44K views • 4 years ago",
  //     },
  //   ];

  const GetLikedVideos = async () => {
    try {
      const result = await axios.post("Likes/GetLikedVideos");
      console.log(result);
      setvideos(result?.data?.Data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetLikedVideos();
  }, []);
  return (
    <UserWrapper>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="container mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Liked Videos</h1>
          </div>

          {/* Video List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos?.map((video, index) => (
              <Link
                to={`/VideoSlug/${video?.VideoDetails?._id}`}
                key={video?.VideoDetails?._id}
                className="p-6 rounded-xl dark:border-[0.5px] dark:bg-zinc-900 border-gray-800"
              >
                <motion.div
                  className="relative border-[0.5px] dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <video
                    src={video?.VideoDetails?.VideoFile}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Duration */}
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video?.VideoDetails?.Duration}
                  </span>
                  {/* Details */}
                  <div className="p-4 bg-white dark:bg-zinc-900">
                    <h2 className="font-bold text-lg truncate">
                      {video?.VideoDetails?.Title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {video.views}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </UserWrapper>
  );
};
