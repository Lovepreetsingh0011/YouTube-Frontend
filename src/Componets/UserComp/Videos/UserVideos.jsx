import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";
import { img } from "framer-motion/client";
import { Link } from "react-router-dom";

export const UserVideos = () => {
  axios.defaults.withCredentials = true;

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch videos from API
  const GetUserAllVideos = async () => {
    try {
      const result = await axios.get("Videos/GetUserVideos");
      if (result?.data?.Success) {
        setVideos(result?.data?.Data?.videos);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deletehandler = async (id) => {
    console.log(id);
  };

  // DataTable columns
  const columns = [
    {
      name: "Video",
      cell: (row) => (
        <img
          src={row?.ThumbNail}
          alt="Thumbnail"
          className="w-[15vw] max-w-[150px] h-auto rounded-lg shadow-md"
        />
      ),
      grow: 0,
    },
    {
      name: "Title",
      selector: (row) => row?.Title?.slice(0, 15),
      sortable: true,
    },
    {
      name: "Published",
      cell: (row) => (
        <span
          className={`font-semibold ${
            row?.IsPublished ? "text-green-500" : "text-red-500"
          }`}
        >
          {row?.IsPublished ? "True" : "False"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row?.Duration,
    },
    {
      name: "Views",
      selector: (row) => row?.Views?.length || 0,
    },
    {
      name: "Created At",
      selector: (row) => row?.createdAt?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Delete",
      selector: (row) => {
        return (
          <img
            src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000"
            // src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000"
            onClick={() => deletehandler(row?._id)}
            className="w-[3vw]  hover:cursor-pointer hover:w-[3.5vw] transform  duration-300"
          />
        );
      },
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Link to={`/VideoDetailsUpdate/${row?._id}`} className="">
          <img
            src="https://img.icons8.com/?size=100&id=64058&format=png&color=000000"
            className="w-[6vw] pr-3  hover:cursor-pointer hover:w-[7vw] transform  duration-300"
          />
        </Link>
      ),
      grow: 0,
    },
  ];

  useEffect(() => {
    GetUserAllVideos();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto min-h-screen bg-white dark:bg-zinc-950"
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        User Uploaded Videos
      </h1>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="shadow-lg rounded-lg overflow-hidden border dark:border-gray-700"
      >
        <DataTable
          columns={columns}
          data={videos}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
        />
      </motion.div>
    </motion.div>
  );
};

// Custom Styles for the DataTable (optional)
const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "14px",
      backgroundColor: "#f1f5f9",
      color: "#1e293b",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      borderBottom: "1px solid #e2e8f0",
    },
  },
};
