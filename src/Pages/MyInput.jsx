import React, { forwardRef, useId } from "react";

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
  const id = useId();
  return (
    <>
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={`block text-sm font-medium ${labeldesign}`}
          >
            {label}
          </label>
        )}

        <input
          type={type}
          id={id}
          className={`w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${design}`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
      <div>{error && <span className="text-red-600">{error}</span>}</div>
    </>
  );
});
