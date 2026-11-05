import { Container, TouchFeedback } from "../../../shared/components/index.js";
import logo from "../../../assets/logo.svg";
import { Search, EllipsisVertical, Dot, Pencil, Trash } from "lucide-react";
import history from "../../../assets/siente_dance.jpeg";

export default function Playlists() {
  return (
    <Container>
      <div className="flex sticky top-0 justify-between items-center p-3">
        {/* Playlists Navbar */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7">
            <img
              src={logo}
              alt="Company Logo"
              className="w-7 h-7 object-contain"
              style={{
                filter:
                  "invert(31%) sepia(94%) saturate(7191%) hue-rotate(357deg) brightness(105%) contrast(128%)",
              }}
            />
          </div>
          <div>
            {" "}
            <h3>Playlists </h3>{" "}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search />
          <TouchFeedback />
        </div>
      </div>

      <div className=" p-4">
        <h1> Playlists </h1>
      </div>
      {/* Filters */}
      <div className="p-4">
        <select
          className="bg-[#cccccc4D] flex-1 flex rounded-lg p-2 "
          name="filter"
          id="playlists-select"
        >
          <option value="Alphabetically">A-Z</option>
          <option value="Recently added">Recently added</option>
        </select>
      </div>

      <div>
        <div className="flex flex-row mt-4 gap-2 px-3">
          <div className="relative w-40 h-25 group cursor-pointer">
            {/* 1. Background Stack Card (Sits perfectly behind) */}
            <div
              className="absolute inset-x-2 -top-2 h-full rounded-t-lg"
              style={{ backgroundColor: "rgba(110, 95, 90, 0.5)", zIndex: 1 }}
            />
            <div
              className="absolute inset-x-1 -top-1 h-full rounded-t-lg"
              style={{ backgroundColor: "rgb(110, 95, 90)", zIndex: 2 }}
            />

            {/* 2. Main Foreground Container (Controls the layout shadow) */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden bg-neutral-800  "
              style={{
                zIndex: 3,
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
          <div className="">
            <p className="text-sm">Liked videos</p>
            <div className="flex">
              <p className="text-xs text-gray-600">Private</p>
              <div>
                <Dot size={20} className="text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">Playlist </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { Playlists };
