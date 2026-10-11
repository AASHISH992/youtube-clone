import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import {Header, SideBar } from "./shared/layouts/index.js";
import Button from "./shared/components/Button.jsx";
import Home from "./features/home/components/Home.jsx";
import OpenPlaylists from "./features/playlist/components/OpenPlaylists.jsx";
import CreatePlaylist from "./features/playlist/components/CreatePlaylist.jsx";
import CreatedAccount from "./features/auth/components/CreateAccount.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./features/auth/components/SignIn.jsx";
import { Watch } from "./features/video/components/index.js";


function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">   <Outlet />
      </main>
    </div>
  );
}

export default App;
