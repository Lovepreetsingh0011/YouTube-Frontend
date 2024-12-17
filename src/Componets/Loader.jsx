import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="w-full cursor-wait bg-zinc-950 h-[100vh] flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      </div>
    </>
  );
};
