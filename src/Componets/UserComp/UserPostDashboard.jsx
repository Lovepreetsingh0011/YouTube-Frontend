import React from "react";
import { UserWrapper } from "./UserWrapper";
import { UserNavi } from "./UserNavi";
import { Outlet } from "react-router-dom";

export const UserPostDashboard = () => {
  return (
    <UserWrapper>
      <div className="min-h-screen  bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-100 p-4">
        <div className="container mx-auto">
          {/* Header */}
          <UserNavi />

          <Outlet />
        </div>
      </div>
    </UserWrapper>
  );
};
