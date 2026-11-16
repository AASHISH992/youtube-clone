import { House, CircleUserRound, TvMinimalPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth.js";

function SideBar({ className = "", ...props }) {
  const { user, isLoggedIn } = useAuth();
  return (
    <div className={`bg-white h-full w-20 px-2  ${className}`} {...props}>
      <ul className="flex flex-col justify-between gap-2">
        <Link to="/">
          <li className="hover:bg-gray-100 active:bg-gray-200 rounded-lg py-4 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
              <House />

              <div className="text-xs">Home</div>
            </div>
          </li>
        </Link>
        <li className="hover:bg-gray-100 rounded-lg py-5 flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <TvMinimalPlay style={{ transform: "scaleY(-1)" }} />
              <div className="text-[0.6rem]">Subscriptions</div>
            </div>
          </div>
        </li>
        {isLoggedIn ? (
          <Link to="/feed/you">
            <li className="hover:bg-gray-100  active:bg-gray-200 py-4 rounded-lg flex justify-center items-center">
              <div>
                <CircleUserRound />
                <div className="text-xs">You</div>
              </div>
            </li>
          </Link>
        ) : (
          <Link to="/signin">
            <li className="hover:bg-gray-100  active:bg-gray-200 py-4 rounded-lg flex justify-center items-center">
              <div>
                <CircleUserRound />
                <div className="text-xs">You</div>
              </div>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
