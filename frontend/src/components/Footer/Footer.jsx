import { House, CircleUserRound, TvMinimalPlay } from "lucide-react";

function Footer({ className = "", ...props }) {
  return (
    <div className={`bg-white border-t-2 border-[#cccccc] h-14 ${className}`} {...props}>
      <ul className="text-2 flex px-10 py-2 justify-between">
        <li>
          <House className="ml-1" />
          <div className="text-xs">Home</div>
        </li>
        <li>
          <div className="flex flex-col items-center  ">
            <TvMinimalPlay style={{ transform: "scaleY(-1)" }} />
            <div className="text-xs">Subscriptions</div>
          </div>
        </li>
        <li>
          <CircleUserRound />
          <div className="text-xs">You</div>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
