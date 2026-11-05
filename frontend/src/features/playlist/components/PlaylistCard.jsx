import { Link } from "react-router-dom";
import {
  MetaData,
  ContentMetadataViewModelMetadataRow,
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
  LockupViewModelMetadata,
  AvatarShapeAvatarSizeSmall,
  LockupMetadataViewModelAvatar,
  LockupMetadataViewModelTextContainer,
} from "../../../shared/components/index.js";
import history from "../../../assets/siente_dance.jpeg";
import { ListVideo } from "lucide-react";
import { formatDate } from "../../../shared/utils/index.js";

function PlaylistCard({
  isFlex = false,
  isScroll = true,
  id,
  playlistId,
  thumbnail,
  title = "Liked Video",
  playlistOwner = "Private",
  updateTime,
  totalVideos = 0,
}) {
  return (
    <div
      className={`p-2 ${isFlex ? "w-full" : isScroll ? "w-56 sm:w-64 lg:w-80 xl:w-96 shrink-0 " : "w-full"}`}
    >
      <div className={`${isFlex && "flex"}`}>
        <div className="relative mb-2">
          {/* Video Thumbnail */}

          <div
            className="absolute inset-x-2 -top-2 h-full rounded-t-lg "
            style={{ backgroundColor: "rgba(110, 95, 90, 0.5)", zIndex: 1 }}
          />
          <div
            className="absolute inset-x-1 -top-1 h-full rounded-t-lg"
            style={{ backgroundColor: "rgba(110, 95, 90 )", zIndex: 2 }}
          />
          <div className="relative z-10 rounded-lg overflow-hidden aspect-video bg-neutral-800">
            {/* id: videoId */}
            <Link to={`/watch/${id}`}>
              <img
                src={thumbnail}
                alt="thumbnail"
                className="rounded-xl  w-full aspect-video object-cover"
              />
            </Link>
            {/* Video Duration */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-md pointer-events-none">
              <ListVideo className="size-4" />
              <span>{totalVideos} videos</span>
            </div>
          </div>
        </div>
        <LockupViewModelMetadata>
          {/* Video Metadata */}
          <LockupMetadataViewModelTextContainer>
            {/* Video Title */}
            <div className="grid grid-cols-1 grid-rows-4 gap-1 text-sm text-gray-600">
              <span className="text-base font-semibold text-black">
                {title}
              </span>
              <span className=" ">{playlistOwner} Playlist</span>
              <span className="">Updated {formatDate(updateTime)}</span>
              <span className="text-gray-700 font-medium hover:text-black">
                <Link to={`/playlist/${playlistId}`}>View full playlist</Link>
              </span>
            </div>
          </LockupMetadataViewModelTextContainer>
        </LockupViewModelMetadata>
      </div>
    </div>
  );
}

function PlaylistList({ playlists = [], isFlex = false, isScroll = true }) {
  return (
    <div className={isScroll ? "flex flex-row flex-nowrap overflow-x-auto scrollbar-none" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          isFlex={isFlex}
          isScroll={isScroll}
          id={playlist._id}
          playlistId={playlist._id}
          title={playlist.name || playlist.title}
          totalVideos={playlist.videos?.length || 0}
          playlistOwner={playlist.fullName || "Private"}
          thumbnail={playlist.videos?.[0]?.thumbnail}
          updateTime={playlist.updatedAt}
        />
      ))}
    </div>
  );
}

export { PlaylistCard, PlaylistList };
