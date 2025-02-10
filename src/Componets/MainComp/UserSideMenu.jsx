import React, { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export const UserSideMenu = ({
  UserMenu,
  SetUserMenu,
  UserDetails,
  logoutHandler,
}) => {
  return (
    <>
      <div
        onMouseLeave={() => SetUserMenu(!UserMenu)}
        className={`fixed top-[2vh] rounded-xl z-50 bg-neutral-800 right-[10vw] h-auto  min-w-[20vw] tranform ${
          UserMenu ? "translate-x-0 visible" : "hidden -translate-x-full"
        } transition-transform duration-300 text-white ease-in-out  flex flex-col items-center  pb-10 px-4 pt-[2vh]`}
      >
        <div className="flex w-full   ">
          <FaCircleUser className="text-5xl mr-2" />
          <div className="flex flex-col pl-2">
            <h2 className="font-bold">
              {UserDetails?.UserName ? UserDetails?.UserName : "UserName"}
            </h2>
            <p className="pt-1">
              {UserDetails?.Email ? UserDetails?.Email : "UserEmail"}
            </p>
          </div>
        </div>
        <div className="w-full h-[0.2px] bg-gray-400 my-5"></div>
        {/* SignOut */}

        {UserDetails?.UserName ? (
          <>
            {/* Logout */}
            <button
              onClick={logoutHandler}
              className="flex pl-2 w-full mt-3  items-center  "
            >
              <RiLogoutBoxLine className=" text-xl mr-2" />
              <h2 className="font-serif pl-2">LogOut</h2>
            </button>
            {/* Forgot Password */}
            <Link
              to={"/OtpSend"}
              className="flex pl-2 w-full mt-5  items-center  "
            >
              <FaExchangeAlt className=" text-xl mr-2" />
              <h2 className="font-serif pl-2">ChangePassword</h2>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/Login"} className="flex pl-2 w-full  items-center  ">
              <GoSignOut className=" text-xl mr-2" />
              <h2 className="font-serif pl-2">SignIn</h2>
            </Link>

            {/* Register */}
            <Link
              to={"/SignUp"}
              className="flex pl-2 w-full mt-5  items-center  "
            >
              <SiGnuprivacyguard className=" text-xl mr-2" />
              <h2 className="font-serif pl-2">SignUp</h2>
            </Link>
            <Link
              to={"/OtpSend"}
              className="flex pl-2 w-full mt-5  items-center  "
            >
              <FaExchangeAlt className=" text-xl mr-2" />
              <h2 className="font-serif pl-2">ChangePassword</h2>
            </Link>
          </>
        )}
      </div>
    </>
  );
};
