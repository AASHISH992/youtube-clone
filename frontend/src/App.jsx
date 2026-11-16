import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, SideBar } from "./shared/layouts/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./features/auth/hooks/useAuth.js";
import { Playlists, PlaylistDialogBox } from "./features/playlist/components/index.js";
import { BottomSheet } from "./shared/components/index.js";

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">
        {" "}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
