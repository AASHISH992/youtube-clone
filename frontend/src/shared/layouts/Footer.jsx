import { House, CircleUserRound, TvMinimalPlay } from "lucide-react";

function Footer({ className = "", ...props }) {
  return (
    <div
      className={`bg-white h-full w-22 px-2 ${className}`}
      {...props}
    >
      <ul className="flex flex-col justify-between gap-2">
        <li className="hover:bg-gray-100 rounded-lg py-6 flex justify-center items-center">
          <div className='flex flex-col justify-center items-center '>
            <House />

            <div className="text-xs">Home</div>
          </div>
        </li>
        <li className="hover:bg-gray-100 rounded-lg py-6 flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <TvMinimalPlay style={{ transform: "scaleY(-1)" }} />
              <div className="text-[0.7rem]">Subscriptions</div>
            </div>
          </div>
        </li>
        <li className="hover:bg-gray-100 py-6 rounded-lg flex justify-center items-center">
          <div>
            <CircleUserRound />
            <div className="text-xs">You</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
