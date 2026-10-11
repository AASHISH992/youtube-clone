import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import CreatedAccount from "../features/auth/components/CreateAccount.jsx";
import Home from "../features/home/components/Home.jsx";
import SignIn from "../features/auth/components/SignIn.jsx";
import { Watch } from "../features/video/components/index.js";

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
        ]

    },
]);

export { router };
