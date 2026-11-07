import { Container, TouchFeedback } from "../../../shared/components/index.js";
import logo from "../../../assets/logo.svg";
import { Search, EllipsisVertical, Dot, Pencil, Trash } from "lucide-react";
import history from "../../../assets/siente_dance.jpeg";
import usePlaylist from "../hooks/usePlaylist.js";
import { PlaylistList } from "./index.js";

export default function Playlists() {
  const {
    playlists,
    isLoading: isLoadingPlaylist,
    error: errorPlaylist,
  } = usePlaylist();

  return (
    <Container>
      <div className=" p-4">
        <span className="text-4xl font-semibold"> Playlists </span>
      </div>
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
        <div className="flex flex-col mt-4 px-3">
          <PlaylistList isScroll={false} playlists={playlists} />
        </div>
      </div>
    </Container>
  );
}

export { Playlists };
