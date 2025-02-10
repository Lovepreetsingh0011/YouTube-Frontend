import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";

export const VideoSlug = () => {
  const { id } = useParams();
  const [videos, setvideos] = useState([]);
  const [data, setdata] = useState();
  const [showDes, setshowDes] = useState(false);
  const [isvideoliked, setisvideoliked] = useState(false);
  const [issubscribe, setissubscribe] = useState(false);
  const [loading, setloading] = useState(false);
  const [LikeDetails, setLikeDetails] = useState();
  const [Comments, setComments] = useState([]);
  const [getinput, setgetinput] = useState("");
  const getVideo = async () => {
    try {
      const result = await axios.get(`Videos/GetVideoDetails/${id}`);
      const d = await axios.get(`Users/AddWatchHistory/${id}`);
      console.log(d);

      await axios.get(`Videos/AddView/${id}`);
      const checkIfLiked = await axios.post("Likes/CheckIfVideoLiked", {
        Videoid: id,
      });

      const checkIfSubscribe = await axios.post(
        "Subscriptions/CheckIsSubcribe",
        {
          Chanel: result?.data?.Data?.result[0]?.UserDetails?._id,
        }
      );
      setissubscribe(checkIfSubscribe?.data?.Success);

      if (result?.data?.Success) {
        setdata(result?.data?.Data?.result[0]);
      }
      setisvideoliked(checkIfLiked?.data?.Success);
      if (checkIfLiked?.data?.Success) {
        setLikeDetails(checkIfLiked?.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllVideos = async () => {
    try {
      const result = await axios.get(`Videos/GetAllVideos`);
      if (result?.data?.Success) {
        setvideos(result?.data?.Data?.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addlike = async () => {
    try {
      setloading(true);
      const result = await axios.post(`Likes/AddLike`, {
        Videoid: data?._id,
        Commentid: "",
      });
      setLikeDetails(result?.data?.Data?.result);

      setloading(false);

      setisvideoliked(true);
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };
  const Dislike = async () => {
    try {
      setloading(true);
      await axios.post(`Likes/DisLike/${LikeDetails?._id}`);
      setloading(false);

      setisvideoliked(false);
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };

  const subscriberhandler = async () => {
    try {
      const res = await axios.post("Subscriptions/Subscribe", {
        Chanel: data?.UserDetails?._id,
      });
      setissubscribe(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const Unsubscriberhandler = async () => {
    try {
      const res = await axios.post("Subscriptions/UnSubscribe", {
        Chanel: data?.UserDetails?._id,
      });
      setissubscribe(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllComment = async () => {
    try {
      const result = await axios.get(`Comments/GetAllComments/${id}`);
      setComments(result?.data?.Data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const Addcommnethandler = async () => {
    try {
      const result = await axios.post(`Comments/AddComment`, {
        Video: data?._id,
        Content: getinput?.trim(),
      });
      setgetinput("");
      setloading(!loading);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideo();
    getAllVideos();
    GetAllComment();
  }, [id, setisvideoliked, isvideoliked, setissubscribe, issubscribe]);
  useEffect(() => {
    GetAllComment();
  }, [getinput, setgetinput]);
  console.log("run");
  return (
    <>
      <div
        className={`flex flex-col pt-[11vh] lg:flex-row dark:bg-zinc-950 bg-gray-200 dark:text-white text-black min-h-screen `}
      >
        {/* Main Video Section */}
        <div className="w-full lg:w-2/3">
          {/* Video Container */}
          <div className="relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-64 md:h-96 lg:h-[500px] bg-black"
            >
              {/* Placeholder for Video */}
              <iframe
                className="w-full h-full"
                src={data?.VideoFile} // Replace with your video
                title="YouTube video player"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            {/* Video Info */}
            <div className=" pl-6">
              <h1 className="text-xl font-bold mb-2">{data?.Title} </h1>
              <div className="flex items-center dark:bg-gray-600/30 p-4 rounded-xl  justify-between text-gray-400 text-sm">
                <div className="pl-3 flex items-center">
                  <div className="flex flex-col dark:text-white text-black">
                    <p className="font-serif">{data?.UserDetails?.UserName}</p>
                    <p className="font-normal dark:text-red-100 text-red-400 ">
                      {data?.UserDetails?.subscribers?.length}{" "}
                      <span className="dark:text-red-600 text-red-600">
                        Subscribers
                      </span>
                    </p>
                  </div>
                  {/* Set Subscribed button */}
                  {!issubscribe ? (
                    <button
                      onClick={subscriberhandler}
                      disabled={issubscribe}
                      className="flex hover:cursor-pointer bg-black text-white border-2 rounded-full p-2 px-3 font-serif ml-5 dark:bg-white dark:text-black flex-col  "
                    >
                      <p className="">SubsCribe</p>
                    </button>
                  ) : (
                    <button
                      onClick={Unsubscriberhandler}
                      disabled={!issubscribe}
                      className="flex hover:cursor-pointer bg-black text-white border-2 rounded-full p-2 px-3 font-serif ml-5 dark:bg-white dark:text-black flex-col  "
                    >
                      <p className="">UnSubsCribe</p>
                    </button>
                  )}
                </div>

                <div className="flex space-x-4">
                  <p className="hover:text-white">
                    <button
                      onClick={addlike}
                      className="text-xl p-2 hover:cursor-pointer"
                      disabled={isvideoliked}
                    >
                      👍
                    </button>{" "}
                    {data?.TotalLikes}
                  </p>
                  <button
                    onClick={Dislike}
                    disabled={!isvideoliked}
                    className="text-xl p-2 hover:cursor-pointer"
                  >
                    👎
                  </button>
                  <button className="hover:text-white">Share</button>
                </div>
              </div>
              <div className="flex flex-col items-start dark:bg-slate-700/50 dark:text-gray-200 rounded-xl pl-2 pb-3 mt-2 pt-5 text-gray-400 text-sm">
                <span>
                  {data?.TotalViews} views • {data?.createdAt?.slice(0, 10)}
                </span>
                {!showDes ? (
                  <>
                    <div className="flex space-x-4 pt-2">
                      {data?.Description?.slice(0, 45)}
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => setshowDes(!showDes)}
                      >
                        ....
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex space-x-4 dark:text-white text-black">
                      {data?.Description}
                    </div>{" "}
                    <span
                      className="hover:cursor-pointer  dark:text-white text-black pt-3"
                      onClick={() => setshowDes(!showDes)}
                    >
                      Click me to close...
                    </span>
                  </>
                )}
              </div>
              {/* Comment Section */}
              <div className="flex flex-col px-5  dark:bg-zinc-950  rounded-xl pl-2 pb-3 mt-2 pt-5  text-sm ">
                <h2 className="ml-7 text-2xl mb-7">Comments Section</h2>
                <div className="flex  flex-col justify-center ">
                  <input
                    type="text"
                    value={getinput}
                    onChange={(e) => setgetinput(e.target.value)}
                    className=" outline-none pl-2  border-b-[2.3px] mx-7 pb-[6px] dark:bg-zinc-950 cursor-auto border-white "
                    placeholder="Add a Comment"
                  />
                  <div className="flex mx-7 justify-between items-center ">
                    <FaRegComment className="text-3xl" />
                    <div className="pt-4">
                      <button
                        onClick={() => setgetinput("")}
                        className="py-[6px] px-3 font-serif mr-3 dark:bg-zinc-600/50 dark:text-white text-black rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={Addcommnethandler}
                        disabled={getinput?.trim() == "" ? true : false}
                        className="py-[6px] font-serif px-3 mr-3 dark:bg-zinc-600/70 dark:text-white text-black rounded-full"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                {/* Comment Card */}
                {Comments?.map((val) => (
                  <div className="flex flex-col mx-7 my-10" key={val?._id}>
                    <div className="flex   rounded-xl p-4 dark:bg-zinc-700/60">
                      <BiSolidUserCircle className="text-xl" />

                      <div className="flex flex-col pl-4">
                        <div className="flex">
                          <h2>{val?.CommentBy?.UserName}</h2>
                          <span className="pl-4">
                            -{val?.createdAt?.slice(0, 10)}
                          </span>
                        </div>
                        <p className="mt-3">{val?.Content}</p>
                        <div className="flex  mt-2">
                          <button className="dark:bg-zinc-600/30 text-2xl p-1 rounded-xl">
                            <span className="pl-1 text-lg">0</span>
                            👍
                          </button>
                          <button className="dark:bg-zinc-600/30 text-2xl p-1 rounded-xl ml-5">
                            👎
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Suggestions */}
        <div className="w-full lg:w-1/3 dark:bg-zinc-900 dark:text-white text-black bg-gray-200 p-4">
          <h2 className="text-lg font-bold mb-4">Realated Videos..</h2>
          <div className="space-y-4">
            {/* Suggestion Card */}
            {videos?.map((val) => (
              <Link
                to={`/VideoSlug/${val._id}`}
                className="space-x-3  rounded-md"
                key={val?._id}
              >
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  // transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center p-2 space-x-3 hover:bg-gray-700  cursor-pointer"
                >
                  <img
                    src={val?.ThumbNail}
                    className="w-1/3 bg-gray-600 h-20 rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{val?.Title}</h3>
                    <p className="text-xs text-gray-400">
                      {val?.CreatedBy?.UserName} • {val?.Views?.length} views
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
