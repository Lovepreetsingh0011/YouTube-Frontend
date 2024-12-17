import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UsePopUp } from "../../../Store/Context/PopUpContext";

export const UserPlayList = () => {
  axios.defaults.withCredentials = true;
  const [resfresh, setrefresh] = useState("resfresh");
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();
  const [videos, setVideos] = useState([]);

  // Fetch videos from API
  const GetUserAllVideos = async () => {
    try {
      const result = await axios.post("PlayList/GetUserPlayLists");
      console.log(result);

      if (result?.data?.Success) {
        setVideos(result?.data?.Data?.platlist);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deletevideo = async (data) => {
    try {
      const result = await axios.post(`PlayList/DeletePlayList/${data}`);
      if (result?.data?.Success) {
        WarningMsg("PlayList Deleted Successfully");
        setrefresh("refreshPage");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      ErrorMsg("Error Will Delete Playlist");
    }
  };
  // DataTable columns
  const columns = [
    {
      name: "PlayList Name",
      selector: (row) => (
        <h2 className="text-lg font-serif pl-2"> {row?.Title?.slice(0, 15)}</h2>
      ),
      sortable: true,
    },
    {
      name: "Published",
      cell: (row) => (
        <span
          className={`font-semibold text-green-500
          }`}
        >
          True
        </span>
      ),
      sortable: true,
    },
    {
      name: "Videos",
      selector: (row) => (
        <span className="text-xl font-bold"> {row?.Videos?.length}</span>
      ),
    },

    {
      name: "Created At",
      selector: (row) => row?.createdAt?.slice(0, 10),
      sortable: true,
    },
    {
      name: "ADD Videos",
      cell: (row) => (
        <>
          {" "}
          <Link
            to={`/UserPostDashboard/AddVideosInPlayList/${row?._id}`}
            className="dark:text-zinc-950 font-serif"
          >
            <img
              src="https://img.icons8.com/?size=100&id=104152&format=png&color=000000"
              alt="video add in playlist"
            />{" "}
          </Link>
        </>
      ),
      grow: 0.5,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {" "}
          <button
            onClick={() => deletevideo(row._id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <img
              src="https://img.icons8.com/?size=100&id=KtLdJpNivpcV&format=png&color=000000"
              alt=""
            />
          </button>
        </>
      ),
      grow: 0,
    },
  ];

  useEffect(() => {
    GetUserAllVideos();
  }, [setrefresh, resfresh]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto min-h-screen bg-white dark:bg-zinc-950"
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        User PlayList Videos
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
