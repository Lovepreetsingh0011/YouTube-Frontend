import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";
import { UsePopUp } from "../../../Store/Context/PopUpContext";

export const AddVideoInPlayList = () => {
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const naviget = useNavigate();
  const [videos, setVideos] = useState([]);
  const [playlistvideos, setplaylistvideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();

  // Fetch videos from API
  const GetUserAllVideos = async () => {
    try {
      const playlistresult = await axios.get(`PlayList/GetPlayListById/${id}`);
      const result = await axios.get("Videos/GetUserVideos");

      if (result?.data?.Success) {
        const videos = result?.data?.Data?.videos || [];
        const playlistVideos =
          playlistresult?.data?.Data?.platlist?.Videos || [];

        const filteredVideos = videos.filter((val) => {
          // Ensure the current video is not in the playlist videos
          return !playlistVideos.some((playlistVideo) => {
            return playlistVideo?._id && val?._id === playlistVideo?._id;
          });
        });

        setVideos(filteredVideos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle individual checkbox selection
  const handleVideoSelection = (e, videoId) => {
    if (e.target.checked) {
      setSelectedVideos([...selectedVideos, videoId]); // Add video ID
      console.log(selectedVideos);
    } else {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId)); // Remove video ID
    }
  };
  const AddVideosHandler = async () => {
    try {
      const result = await axios.post(`PlayList/AddVideosInPlaylist/${id}`, {
        Videos: selectedVideos,
      });
      if (result?.data?.Success) {
        SuccessMsg("Videos Added Successfullt");
        naviget("/UserPostDashboard/UserPlayList");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // DataTable columns
  const columns = [
    {
      name: "Video",
      selector: (row) => (
        <img src={row?.ThumbNail} className="w-[11vw]" alt="thumbnail" />
      ),
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => <span>{row?.Title?.slice(0, 20)}...</span>,
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
      name: "Views",
      selector: (row) => (
        <span className="text-xl font-bold"> {row?.Views?.length}</span>
      ),
    },
    {
      name: "Created At",
      selector: (row) => row?.createdAt?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          //   checked={selectedVideos.includes(row._id)} // Set checkbox state
          onChange={(e) => handleVideoSelection(e, row._id)}
        />
      ),
      grow: 0.5,
    },
  ];

  useEffect(() => {
    GetUserAllVideos();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-7xl mx-auto min-h-screen bg-white dark:bg-zinc-950"
      >
        <div className="flex justify-between items-center mb-6">
          <Link
            to={"/"}
            className="px-1 text-center py-1 md:px-4 md:py-2  bg-blue-500 text-sm md:text-lg dark:bg-blue-700 text-white rounded-lg"
          >
            Go to Home
          </Link>
          <button
            onClick={AddVideosHandler}
            className="px-1 text-center py-1 md:px-4 md:py-2  bg-blue-500 text-sm md:text-lg dark:bg-blue-700 text-white rounded-lg"
          >
            Add Video{" "}
          </button>
        </div>

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
    </>
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
