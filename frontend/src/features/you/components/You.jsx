import { Container, Button } from "../../../shared/components/index.js";
import {
  CircleUserRound,
  EllipsisVertical,
  Dot,
  SquarePlay,
} from "lucide-react";
import sign_in_promo from "../../../assets/sign_in_promo.png";
import avatar from "../../../assets/images2.jpg";
import history from "../../../assets/siente_dance.jpeg";

export default function You() {
  return (
    <Container>
      <div className="flex flex-col h-dvh w-full bg-white">
        <div className="flex  text-[#cccccc] items-center gap-2 p-4">
          <img src={avatar} alt="avatar" className="rounded-full w-22" />
          <div>
            <h2 className="text-2xl text-bold text-[#0f0f0f]"> NAME </h2>
            <div className="flex">
              <p className="text-xs text-[#606060]">@username</p>
              <div className="pt-1">
                <Dot size={10} className="text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">View channel</p>
            </div>
          </div>
        </div>

        <div className="w-auto h-auto">
          <div className="mb-4 border-y border-[#cccccc] py-3">
            <div className="flex mb-2 items-center px-3 justify-between ">
              <h3 className="">History</h3>
              <Button
                type="submit"
                bgColor="bg-transparent"
                textColor="text-black"
                className="mt-2 border border-[#cccccc] text-sm w-15 h-10 self-center"
              >
                View all
              </Button>
            </div>
            <div className="flex flex-row px-3">
              <img src={history} alt="history" className="w-40 rounded-lg" />
              <div className="px-2">
                <h4>15 Books That Helped Make Me My First Million</h4>
                <p className="text-xs text-gray-600"> Channel Name</p>
                <p className="text-xs text-gray-600"> views </p>
              </div>
              <div>
                <EllipsisVertical className="h-full pb-8" size={24} />
              </div>
            </div>
          </div>

          <div className="flex mb-2 items-center px-3 justify-between ">
            <h3 className="">Playlists</h3>
            <Button
              type="submit"
              bgColor="bg-transparent"
              textColor="text-black"
              className="mt-2 border border-[#cccccc] text-sm w-15 h-10 self-center"
            >
              View all
            </Button>
          </div>
          <div className="flex flex-col mt-4 px-3">
            <div className="relative w-40 h-25 group cursor-pointer">
              {/* 1. Background Stack Card (Sits perfectly behind) */}
              <div
                className="absolute inset-x-1 -top-1 h-full rounded-t-lg"
                style={{ backgroundColor: "rgb(110, 95, 90)", zIndex: 1 }}
              />

              {/* 2. Main Foreground Container (Controls the layout shadow) */}
              <div
                className="absolute inset-0 rounded-lg overflow-hidden bg-neutral-800  "
                style={{
                  zIndex: 2,
                }}
              >
                {/* 3. The actual thumbnail image stretched to fit perfectly */}
                <img
                  src={history}
                  alt="history"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="my-2">
              <p className="text-sm">Liked videos</p>
              <div className="flex">
                <p className="text-xs text-gray-600">Private</p>
                <div className="pt-1">
                  <Dot size={10} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600">Playlist </p>
              </div>
            </div>
          </div>

          <div className="flex mt-4 p-3">
            <div className="pr-4">
              <SquarePlay />
            </div>
            <div>
              <p> Your videos </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
