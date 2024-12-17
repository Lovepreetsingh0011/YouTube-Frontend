import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserWrapper } from "../UserWrapper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MyInput } from "../../../Pages/MyInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Vite } from "../../../Constanst/APi_Varibles";
import { Loader } from "../../Loader";
import { UsePopUp } from "../../../Store/Context/PopUpContext";

export const VideoDetailsUpdate = () => {
  axios.defaults.baseURL = Vite.API_URL;
  const [loding, setloading] = useState(false);
  const { id } = useParams();
  const [video, setvideo] = useState();
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const GetVideo = async () => {
    try {
      const result = await axios.get(`Videos/GetVideoById/${id}`);
      console.log(result);
      if (result?.data?.Success) {
        setValue("Title", result?.data?.Data?.video?.Title);
        setValue("Description", result?.data?.Data?.video?.Description);
      } else {
        navigate("/UserPostDashboard/Videos");
        ErrorMsg("Error Will get Video");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDetails = async (data) => {
    try {
      setloading(true);
      const result = await axios.put(`Videos/UpdateDetails/${id}`, {
        Title: data?.Title,
        Description: data?.Description,
      });
      if (result?.data?.Success) {
        SuccessMsg("Video Update Successfully");
        navigate("/UserPostDashboard/Videos");
        reset();
      }
      setloading(false);
      console.log(result);
    } catch (error) {
      setloading(false);
      ErrorMsg("Error Occur will video Upload");
      console.log(error);
    }
  };

  useEffect(() => {
    GetVideo();
  }, []);
  return (
    <>
      {!loding ? (
        <UserWrapper>
          <div className={` min-h-screen`}>
            <div className="bg-gray-100 dark:bg-zinc-900 p-6 min-h-screen transition-colors">
              {/* Toggle Dark/Light Mode */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  UpDate Video Details
                </h1>
                <Link
                  to={"/"}
                  className="px-1 text-center py-1 md:px-4 md:py-2  bg-blue-500 text-sm md:text-lg dark:bg-blue-700 text-white rounded-lg"
                >
                  Go to Home{" "}
                </Link>
              </div>

              {/* Upload Form */}
              <motion.form
                onSubmit={handleSubmit(UpdateDetails)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-zinc-900 p-6 border-gray-600  border-[0.2px] rounded-lg shadow-md"
              >
                {/* Title */}
                <div className="mb-4">
                  <MyInput
                    label="Title"
                    labeldesign="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    design="mt-1 w-full p-2 border  rounded-lg dark:bg-zinc-600 dark:border-gray-600 dark:text-gray-200"
                    placeholder="Enter video title"
                    {...register("Title", { required: "Title is Required" })}
                    error={errors?.Title?.message}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="mt-1 w-full p-2 border rounded-lg  dark:bg-zinc-600 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-300 outline-none"
                    placeholder="Enter video description"
                    {...register("Description", {
                      required: "Description is Required",
                    })}
                  ></textarea>
                  <p className="text-red-500">
                    {errors?.Description?.message
                      ? errors?.Description?.message
                      : null}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Link to={"/UserPostDashboard/Videos"} className="">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6  mr-2 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    >
                      Back
                    </motion.button>
                  </Link>
                  <div className="flex justify-end gap-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    >
                      Upate Now
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </UserWrapper>
      ) : (
        <Loader />
      )}
    </>
  );
};
