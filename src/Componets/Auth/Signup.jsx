import React, { useState } from "react";
import { motion } from "framer-motion";
import { MyInput } from "../../Pages/MyInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { header } from "framer-motion/client";
import { Vite } from "../../Constanst/APi_Varibles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { UsePopUp } from "../../Store/Context/PopUpContext";
export const Signup = () => {
  axios.defaults.baseURL = Vite.API_URL;

  axios.defaults.withCredentials = true;
  const [loding, setloading] = useState(false);
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formhandler = async (data) => {
    try {
      setloading(true);
      const result = await axios.post(
        "Users/Register",
        {
          UserName: data?.UserName,
          Email: data?.Email,
          FullName: data?.FullName,
          Password: data?.Password,
          Avatar: data?.Avatar[0],
          CoverImage: data?.CoverImage[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",

            withCredentials: true,
          },
        }
      );

      setloading(false);
      if (result?.data?.Success) {
        SuccessMsg("Register Successfully");
        navigate("/Login");
      }
      console.log(result);
    } catch (error) {
      setloading(false);

      console.log(error);
      ErrorMsg(error?.response?.data?.Msg);
    }
  };
  return (
    <>
      {!loding ? (
        <div
          className={`flex justify-center items-center pt-[9vh] min-h-screen 
          dark:bg-zinc-800 bg-gray-100
        `}
        >
          <motion.div
            className="bg-white dark:bg-zinc-950 dark:text-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit(formhandler)}>
              <div>
                <MyInput
                  {...register("UserName", {
                    required: "UserName is Required",
                    minLength: {
                      value: 5,
                      message: "Min Length 5 is Required",
                    },
                  })}
                  error={errors.UserName?.message}
                  // error={errors?errors.UserName?.message:errors?.UserName.}
                  placeholder="Enter UserName"
                  label="UserName"
                />
              </div>
              <div>
                <MyInput
                  type="email"
                  {...register("Email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "enter valid email",
                    },
                  })}
                  error={errors.Email?.message}
                  placeholder="Enter Email"
                  label="Email"
                />
              </div>
              <div>
                <MyInput
                  placeholder="Enter FullName"
                  {...register("FullName", {
                    required: "FullName is Required",
                    minLength: {
                      value: 5,
                      message: "Min Length 5 is Required",
                    },
                  })}
                  error={errors.FullName?.message}
                  label="FullName"
                />
              </div>
              <div>
                <MyInput
                  placeholder="Enter Password"
                  {...register("Password", {
                    required: "Password is Required",
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message: "Choose strong Password Num/Sym/Char",
                    },
                  })}
                  error={errors.Password?.message}
                  label="Password"
                />
              </div>
              <div>
                <MyInput
                  type="file"
                  {...register("Avatar", {
                    required: "Avatar Image is Required",
                  })}
                  error={errors.Avatar?.message}
                  label="Avatar"
                />
              </div>
              <div>
                <MyInput
                  type="file"
                  {...register("CoverImage")}
                  error={errors.CoverImage?.message}
                  label="CoverImage"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md dark:bg-yellow-500 dark:text-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
