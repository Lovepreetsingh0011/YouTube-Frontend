import React, { forwardRef } from "react";

export const MyInput = forwardRef(function MyInput(
  {
    type = "text",
    design = "",
    label,
    labeldesign = "",
    placeholder = "",
    error = "",
    ...props
  },
  ref
) {
  return (
    <>
      <div className="w-full">
        {label && (
          <label className={`mr-2 font-serif ${labeldesign}`}>{label}</label>
        )}

        <input
          type={type}
          className={`pl-3  outline-none ${design}`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
      <div>{error && <span className="text-red-600">{error}</span>}</div>
    </>
  );
});
