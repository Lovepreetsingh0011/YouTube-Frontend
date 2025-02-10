import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const VideoCard = ({ video }) => {
  const [run, setrun] = useState(false);
  return (
    <Link
      to={`/VideoSlug/${video._id}`}
      className="border-[1px] dark:border-gray-800 p-4 rounded-xl"
    >
      <motion.div
        // Initial and animate props for fade-in animation
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onHoverStart={() => {
          setrun(true);
        }}
        onHoverEnd={() => {
          setrun(false);
        }}
        whileHover={{
          scale: 1.05, // Zoom on hover
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        className="bg-white dark:bg-zinc-950 border-[1px] dark:border-gray-700  shadow-md rounded-lg overflow-hidden cursor-pointer"
      >
        {/* Video Thumbnail */}
        {!run ? (
          <img
            src={video?.ThumbNail}
            alt={video?.Title}
            className="w-full h-44 object-cover"
          />
        ) : (
          <video
            src={video?.VideoFile}
            alt={video?.Title}
            autoPlay={true}
            className="w-full h-44 object-cover "
          />
        )}

        {/* Video Details */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {video?.Title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            {video?.CreatedBy?.UserName} • {video?.Views?.length} views •{" "}
            {video?.Duration}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
