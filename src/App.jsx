import { Provider } from "react-redux";
import { NavBar } from "./Componets/MainComp/NavIndex";
import { store } from "./Store/Store";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Vite } from "./Constanst/APi_Varibles";
import { PopUpContextProvider } from "./Store/Context/PopUpContext";
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = Vite.API_URL;
  return (
    <>
      <PopUpContextProvider>
        <Provider store={store}>
          <NavBar />

          <Outlet />
        </Provider>
        <ToastContainer />
      </PopUpContextProvider>
    </>
  );
}

export default App;
