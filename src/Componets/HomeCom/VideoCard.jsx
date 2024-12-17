import React from "react";
import { motion } from "framer-motion";

export const VideoCard = ({ title, channel, views, duration, thumbnail }) => {
  return (
    <motion.div
      // Initial and animate props for fade-in animation
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05, // Zoom on hover
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer"
    >
      {/* Video Thumbnail */}
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-full h-44 object-cover"
      />

      {/* Video Details */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
          {channel} • {views} views • {duration}
        </p>
      </div>
    </motion.div>
  );
};
