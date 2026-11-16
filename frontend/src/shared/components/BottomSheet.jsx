import { Bookmark, Plus } from "lucide-react";
import defaultThumbnail from "../../assets/default_thumbnail.png";
import historyImg from "../../assets/siente_dance.jpeg";

const samplePlaylists = [
  {
    id: "watch-later",
    title: "Watch later",
    isPrivate: true,
    image: historyImg,
    hasVideo: false,
  },
  {
    id: "linux",
    title: "Linux",
    isPrivate: true,
    image: defaultThumbnail,
    hasVideo: true,
  },
];

export default function BottomSheet({
  playlists = samplePlaylists,
  onTogglePlaylist,
  onNewPlaylist,
  onClose,
}) {
  return (
    <div className="w-72 sm:w-80 p-3 bg-white">
      {/* 1. Header */}
      <div className="px-2 pt-1 pb-2">
        <h3 className="text-base font-semibold text-gray-900">Save to...</h3>
      </div>

      {/* 2. Playlists List */}
      <div className="max-h-64 overflow-y-auto divide-y divide-transparent">
        {playlists.map((playlist) => {
          return (
            <div
              key={playlist.id || playlist._id}
              onClick={() => onTogglePlaylist?.(playlist.id)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {/* Left: Stacked Thumbnail & Title */}
              <div className="flex items-center space-x-3 min-w-0">
                {/* YouTube Playlist Thumbnail Stack Effect */}
                <div className="relative w-14 shrink-0 aspect-video">
                  {/* Top stacked card border */}
                  <div
                    className="absolute inset-x-1 -top-1 h-2 rounded-t-sm bg-neutral-600/80"
                    style={{ zIndex: 1 }}
                  />
                  {/* Base Thumbnail */}
                  <img
                    src={playlist.image || defaultThumbnail}
                    alt="playlistImage"
                    className="relative z-10 w-full h-full rounded-md object-cover bg-neutral-800"
                  />
                </div>

                {/* Title & Privacy status */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {playlist.title || playlist.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {playlist.isPrivate ? "Private" : "Public"}
                  </p>
                </div>
              </div>

              {/* Right: Bookmark / Saved Indicator */}
              <div className="pl-2 shrink-0">
                <Bookmark
                  className={`w-5 h-5 transition-colors ${
                    playlist.hasVideo
                      ? "fill-black text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Pill Button: + New playlist */}
      <div className="pt-2 mt-1 border-t border-gray-100">
        <button
          type="button"
          onClick={() => {
            onClose?.();
            onNewPlaylist?.();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 font-medium text-sm rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New playlist</span>
        </button>
      </div>
    </div>
  );
}

export { BottomSheet };
