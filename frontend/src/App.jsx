import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer, Button } from "./components";

import {
  Home
} from "./pages";

import {OpenPlaylists, CreatePlaylist } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col h-screen">
      <OpenPlaylists children="Linux" />
      <Footer className="flex-0 fixed bottom-0 w-full" />
      <main className="flex-grow"> {/* <Outlet /> */} </main>
    </div>
  );
}

export default App;
