import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MyInput } from "../../Pages/MyInput";
import axios from "axios";
import { Vite } from "../../Constanst/APi_Varibles";
import { useDispatch } from "react-redux";
import { SetUser } from "../../Store/Reducers/Authuser";
import { UsePopUp } from "../../Store/Context/PopUpContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
export const Login = () => {
  const [loading, setloading] = useState(false);
  const { SuccessMsg, WarningMsg, ErrorMsg } = UsePopUp();
  const navigate = useNavigate();
  axios.defaults.baseURL = Vite.API_URL;
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    UserName: "",
    Email: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginHandler = async (data) => {
    try {
      setloading(true);
      const result = await axios.post("Users/Login", {
        UserName: state?.UserName?.trim() != "" ? state.UserName : null,
        Email: state?.Email?.trim() != "" ? state.Email : null,
        Password: data?.Password?.trim(),
      });
      setloading(false);
      if (result?.data?.Success) {
        localStorage.setItem("user", JSON.stringify(result?.data?.Data?.User));
        dispatch(SetUser(result?.data?.Data?.User));
        SuccessMsg("Successfully Login");
        navigate("/");
      }

      console.log(result);
    } catch (error) {
      setloading(false);
      ErrorMsg("error will Login Check Credentials");
      console.log(error);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-800 transition-colors duration-300">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 pb-10 shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Login
              </h1>
            </div>
            <motion.form
              onSubmit={handleSubmit(LoginHandler)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* UserName */}
              <div>
                <div className="w-full">
                  <label
                    className={` text-gray-700 dark:text-gray-300 block text-sm font-medium `}
                  >
                    UserName
                  </label>

                  <input
                    type="text"
                    name="UserName"
                    value={state.UserName}
                    onChange={(e) =>
                      setstate({ Email: "", UserName: e.target.value })
                    }
                    className={` block text-sm font-medium text-gray-700 dark:text-gray-300 w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                    placeholder="Your UserName"
                  />
                </div>
              </div>
              <div className="text-center p-0 m-0 dark:text-white text-black">
                Or
              </div>
              <div>
                <div className="w-full">
                  <label className={`block text-sm font-medium `}>
                    UserName
                  </label>

                  <input
                    type="email"
                    value={state.Email}
                    onChange={(e) =>
                      setstate({ UserName: "", Email: e.target.value })
                    }
                    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 focus:outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 `}
                    placeholder="Your Email"
                  />
                </div>
              </div>
              {/* <div className=" p-0 m-0 dark:text-white text-black">
                
            </div> */}
              <div>
                <MyInput
                  label="Password"
                  {...register("Password", {
                    required: "Password is Required",
                  })}
                  labeldesign="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  design="block text-sm font-medium dark:bg-gray-500 placeholder:text-gray-300 text-gray-700 dark:text-gray-200 "
                  placeholder="Your Password"
                  error={errors?.Password?.message}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="submit"
              >
                Login
              </motion.button>
            </motion.form>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {/* </div> */}
    </>
  );
};
