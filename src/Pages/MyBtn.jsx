import React from "react";

export const MyBtn = ({
  children,
  type = "button",
  design = "",
  click,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        className={`py-2 px-3 rounded-md ${design}`}
        onClick={click}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
