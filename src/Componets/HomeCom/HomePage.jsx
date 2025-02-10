import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoCard } from "./VideoCard";
import Vite from "../../Constanst/APi_Varibles";
import axios from "axios";
export const HomePage = () => {
  axios.defaults.withCredentials = true;
  const [videos, setvideos] = useState([]);
  axios.defaults.baseURL = Vite.API_URL;

  const GetAllVideos = async () => {
    try {
      const result = await axios.get("Videos/GetAllVideos");
      if (result?.data?.Success) {
        setvideos(result?.data?.Data?.videos);
      } else {
        localStorage.removeItem("user");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const videoData = [
    {
      title: "Day 2 Spoken English Course",
      channel: "Mass Study",
      views: "3.6M",
      duration: "1:25:32",
      thumbnail: "https://via.placeholder.com/600x350",
    },
    {
      title: "React Data Table Component Tutorial",
      channel: "Learn To Code",
      views: "70K",
      duration: "25:41",
      thumbnail: "https://via.placeholder.com/600x350",
    },
    {
      title: "React Data Table Component Tutorial",
      channel: "Learn To Code",
      views: "70K",
      duration: "25:41",
      thumbnail: "https://via.placeholder.com/600x350",
    },
    {
      title: "React Data Table Component Tutorial",
      channel: "Learn To Code",
      views: "70K",
      duration: "25:41",
      thumbnail: "https://via.placeholder.com/600x350",
    },
    {
      title: "Mix – Sher Gobind Singh De",
      channel: "R Guru & Naaz Deep",
      views: "Updated Today",
      duration: "",
      thumbnail: "https://via.placeholder.com/600x350",
    },
  ];
  useEffect(() => {
    GetAllVideos();
  }, []);

  return (
    <>
      <div className="min-h-screen px-[5vw] bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        {/* Header */}
        <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold">Video Grid</h1>
        </header>

        {/* Video Grid with Stagger Animation */}
        <motion.main
          className="p-6 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }, // Stagger animation
            },
          }}
        >
          {videos?.map((video, index) => (
            <VideoCard key={video?._id} video={video} />
          ))}
        </motion.main>
      </div>
    </>
  );
};
