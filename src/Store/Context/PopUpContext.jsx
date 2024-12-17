import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PopUpContext = createContext();

export const PopUpContextProvider = ({ children }) => {
  const SuccessMsg = (msg = "Success") => {
    toast?.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  };
  const WarningMsg = (msg = "Wanring Msg") => {
    toast?.warn(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  };
  const ErrorMsg = (msg = "Error Msg") => {
    toast?.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  };

  return (
    <>
      <PopUpContext.Provider value={{ SuccessMsg, WarningMsg, ErrorMsg }}>
        {children}
      </PopUpContext.Provider>
    </>
  );
};

export const UsePopUp = () => {
  return useContext(PopUpContext);
};
