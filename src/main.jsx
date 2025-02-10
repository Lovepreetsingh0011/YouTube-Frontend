import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  ChangePassword,
  Login,
  OtpSend,
  Signup,
} from "./Componets/Auth/AuthIndex.js";
import {
  Dashboard,
  UserPlayList,
  UserPostDashboard,
  UserVideos,
  VideoUpload,
  PostDashBoardHomePage,
  AddPlayList,
  AddVideoInPlayList,
  VideoDetailsUpdate,
  LikedVideos,
} from "./Componets/UserComp/UserIndex.js";
import { Loader } from "./Componets/Loader.jsx";
import { HomePage, VideoSlug } from "./Componets/HomeCom/HomeIndex.jsx";
import WatchHistory from "./Componets/UserComp/WatchHistory/WatchHistory.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="Login" element={<Login />} />
      <Route path="OtpSend" element={<OtpSend />} />
      <Route path="ChangePassword/:Email" element={<ChangePassword />} />
      <Route path="SignUp" element={<Signup />} />
      {/* User */}
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="VideoUpload" element={<VideoUpload />} />
      <Route path="LikedVideos" element={<LikedVideos />} />
      <Route path="VideoSlug/:id" element={<VideoSlug />} />
      <Route path="WatchHistory" element={<WatchHistory />} />
      <Route path="VideoDetailsUpdate/:id" element={<VideoDetailsUpdate />} />
      <Route path="UserPostDashboard" element={<UserPostDashboard />}>
        <Route path="" element={<PostDashBoardHomePage />} />
        <Route path="Videos" element={<UserVideos />} />
        <Route path="UserPlayList" element={<UserPlayList />} />
        <Route path="AddPlayList" element={<AddPlayList />} />
        <Route
          path="AddVideosInPlayList/:id"
          element={<AddVideoInPlayList />}
        />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
