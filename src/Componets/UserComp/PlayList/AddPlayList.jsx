import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserWrapper } from "../UserWrapper";
import { Link, useNavigate } from "react-router-dom";
import { MyInput } from "../../../Pages/MyInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Vite } from "../../../Constanst/APi_Varibles";
import { Loader } from "../../Loader";
import { UsePopUp } from "../../../Store/Context/PopUpContext";

export const AddPlayList = () => {
  const navigate = useNavigate();
  axios.defaults.baseURL = Vite.API_URL;
  const [loding, setloading] = useState(false);
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const UploadPlaylist = async (data) => {
    try {
      setloading(true);
      const result = await axios.post("PlayList/AddPlaylist", {
        Title: data?.Name,
        Description: data?.Description,
      });
      console.log(result);

      if (result?.data?.Success) {
        SuccessMsg("PlayList Added Successfully");
        navigate("/UserPostDashboard/UserPlayList");
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
  return (
    <>
      {!loding ? (
        <div className={` min-h-screen`}>
          <div className="bg-gray-100 dark:bg-zinc-900 p-10 min-h-screen transition-colors">
            {/* Toggle Dark/Light Mode */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Upload PlayList
              </h1>
              <Link
                to={"/"}
                className="px-2 text-center py-1 md:px-4 md:py-2  bg-blue-500 text-sm md:text-lg dark:bg-blue-700 text-white rounded-lg"
              >
                Go to Home{" "}
              </Link>
            </div>

            {/* Upload Form */}
            <motion.form
              onSubmit={handleSubmit(UploadPlaylist)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-zinc-900 p-6 border-gray-600  border-[0.2px] rounded-lg shadow-md"
            >
              {/* Name */}
              <div className="mb-4">
                <MyInput
                  label="PlayList Name"
                  labeldesign="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  design="mt-1 w-full p-2 border  rounded-lg dark:bg-zinc-600 dark:border-gray-600 dark:text-gray-200"
                  placeholder="Enter PlayList Name"
                  {...register("Name", { required: "Name is Required" })}
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
                  placeholder="Enter PlayList description"
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

              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Upload
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
