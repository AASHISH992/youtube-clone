import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import CreatedAccount from "../features/auth/components/CreateAccount.jsx";
import Home from "../features/home/components/Home.jsx";
import SignIn from "../features/auth/components/SignIn.jsx";
import { Watch } from "../features/video/components/index.js";
import Upload from "../features/upload/components/Upload.jsx";
import { ChannelProfile } from "../features/channel/components/ChannelProfile.jsx";
import  History  from "../features/history/components/History.jsx";
import { You } from "../features/you/components/You.jsx";
import {
  ViewFullPlaylist,
  Playlists,
} from "../features/playlist/components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <CreatedAccount />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/watch/:videoId",
        element: <Watch />,
      },
      {
        path: "upload/",
        element: <Upload />,
      },
      {
        path: "channel/:channelId",
        element: <ChannelProfile />,
      },
      {
        path: "feed/you",
        element: <You />,
      },
      {
        path: "playlist/:playlistId",
        element: <ViewFullPlaylist />,
      },
      {
        path: "playlist",
        element: <Playlists />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);

export { router };
