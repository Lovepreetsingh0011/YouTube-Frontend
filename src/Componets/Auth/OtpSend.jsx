import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UsePopUp } from "../../Store/Context/PopUpContext";

export function OtpSend() {
  axios.defaults.withCredentials = true;
  const { SuccessMsg, ErrorMsg } = UsePopUp();
  const [loading, setloading] = useState(false);
  const [Email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  // Functions

  const LoginOTPhandler = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}Users/SendOTP`,
        {
          Email,
        }
      );
      console.log(res);

      if (res?.data?.Success) {
        SuccessMsg("OTP send Successfully");
        setshow(true);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);

      ErrorMsg("error try Again");
    }
  };
  const LoginCheckHandler = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}Users/CheckOTP`,
        {
          Email,
          OTP,
        }
      );

      console.log(res);
      if (res?.data?.Success) {
        SuccessMsg("Login Successfully");

        navigate(`/ChangePassword/${Email}`);
        setloading(false);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      ErrorMsg("Error Check Again");
      setloading(false);
    }
  };
  return (
    <>
      <div
        className={`${
          loading ? "opacity-50 cursor-wait" : ""
        }  relative min-h-screen flex items-center justify-center dark:bg-gradient-to-b from-gray-950 via-gray-900   to-slate-950`}
      >
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-white/10 bg-opacity-20 backdrop-blur-0"></div>

        {/* Glassmorphism Form */}
        <motion.div
          className="relative z-10 w-full pb-[6vh] max-w-sm bg-black  dark:bg-white/30 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10 text-white "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </div>
          </div>

          <div className="w-full text-center mt-1 mb-10">
            <h2 className="text-white text-3xl font-serif ">Forget Password</h2>
          </div>

          {/* Email Input */}
          <div className="mb-4 ">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-white/50 rounded-md">
              <i className="fas fa-envelope text-white mr-3"></i>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full font-serif placeholder-black text-black focus:outline-none"
                placeholder="Email ID"
                disabled={!show ? false : true}
              />
            </div>
          </div>

          {/* OTP Input */}
          <div className={` ${!show ? "hidden" : "visible"}  mb-4`}>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-white/50 rounded-md">
              <i className="fas fa-lock text-white mr-3"></i>
              <input
                onChange={(e) => setOTP(e.target.value)}
                type="password"
                className="bg-transparent w-full font-serif placeholder-black text-black focus:outline-none"
                placeholder="OTP"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={!show ? LoginOTPhandler : LoginCheckHandler}
            className="w-full p-3 mt-1 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-md hover:shadow-lg transition-all"
            disabled={Email == "" ? true : false}
          >
            {!show ? <>GEN OTP</> : <>LOGIN</>}
          </motion.button>
          <div className=" mt-5  flex justify-between  px-2">
            <Link to={"/"} className="text-gray-200  ">
              Back
            </Link>
            <Link className="text-gray-200  " to={"/SignUp"}>
              create new account
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
