import { useState } from "react";
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
  BottomSheet,
  CustomSelect,
} from "../../../shared/components/index.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";

import ThreeDotMenu from "../../../shared/components/ThreeDotMenu.jsx";

import { Bookmark } from "lucide-react";
import usePlaylist from "../../playlist/hooks/usePlaylist.js";
import {
  CreatePlaylist,
} from "../../../features/playlist/components/index.js";

function VideoCard({
  isFlex,
  isAvatar,
  isScroll,
  id,
  channelId,
  thumbnail,
  title,
  channel,
  avatar,
  views,
  uploadedTime,
  duration,
}) {
  const { playlists, addVideo, removeVideo } = usePlaylist();
  const metaItems = [`${formatViews(views)}`, formatDate(uploadedTime)];
  const [showPlaylistCreateForm, setShowPlaylistCreateForm] = useState(false);

  const handlePlaylistCreateButton = () => {
    setShowPlaylistCreateForm(true);
  };

  const formattedPlaylists =
    playlists?.map((playlist) => ({
      id: playlist._id,
      title: playlist.name,
      isPrivate: true,
      image: playlist.videos?.[0]?.thumbnail,
      hasVideo: playlist.videos?.some((video) => (video._id || video) === id),
    })) || [];

  const menuItems = [
    {
      label: "Save to playlist",
      icon: <Bookmark className="w-4 h-4" />,
      // Provide submenu view to be rendered in-place:
      submenu: ({ onClose }) => (
        <BottomSheet
          playlists={formattedPlaylists}
          onClose={onClose}
          onNewPlaylist={handlePlaylistCreateButton}
          onTogglePlaylist={async (playlistId) => {
            const targetPlaylist = formattedPlaylists.find(
              (playlist) => playlist.id === playlistId,
            );

            if (targetPlaylist?.hasVideo) {
              await removeVideo({ playlistId, videoId: id });
            } else {
              await addVideo({ playlistId, videoId: id });
            }
          }}
        />
      ),
    },
  ];
  const [isHover, setIsHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`p-2 rounded-xl ${isHover ? "z-30 bg-red-100" : "z-0"} ${isFlex ? "w-full" : isScroll ? "w-56 sm:w-64 lg:w-80 xl:w-96 shrink-0 " : "w-full"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={`${isFlex && "flex"}`}>
        <div className="relative mb-2">
          {/* Video Thumbnail */}
          {/* id: videoId */}
          <Link to={`/watch/${id}`}>
            <img
              src={thumbnail}
              alt="thumbnail"
              className="rounded-xl w-full aspect-video object-cover"
            />
          </Link>
          {/* Video Duration */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-md pointer-events-none">
            {formatDuration(duration)}
          </span>
        </div>
        <LockupViewModelMetadata>
          {/* Channel Avatar */}
          {(isFlex || isAvatar) && (
            <LockupMetadataViewModelAvatar>
              <Link to={`/channel/${channelId}`}>
                <AvatarShapeAvatarSizeSmall>
                  <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-xl w-full aspect-square object-cover"
                  />
                </AvatarShapeAvatarSizeSmall>
              </Link>
            </LockupMetadataViewModelAvatar>
          )}

          {/* Video Metadata */}
          {isAvatar ? (
            <LockupMetadataViewModelTextContainer>
              {/* Video Title */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-start">
                <AttributedStringHost className="text-sm font-medium antialiased line-clamp-2">
                  <Link to={`/watch/${id}`}>{title}</Link>
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
              {/* Video Views & Uploaded Time */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden mt-1 min-w-0">
                {/* Channel Name Link */}
                <Link to={`/channel/${channelId}`}>
                  <AttributedStringHost className=" hover:text-black text-xs text-gray-600 whitespace-nowrap block ">
                    {channel}
                  </AttributedStringHost>
                </Link>

                <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden whitespace-nowrap min-w-0">
                  <AttributedStringHost className="shrink flex items-center overflow-hidden text-xs  text-gray-600">
                    <MetaData items={metaItems} />
                  </AttributedStringHost>
                </ContentMetadataViewModelMetadataRow>
              </ContentMetadataViewModelMetadataRow>
            </LockupMetadataViewModelTextContainer>
          ) : (
            <LockupMetadataViewModelTextContainer>
              {/* Video Title */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-start">
                <AttributedStringHost className="text-sm font-medium antialiased line-clamp-2">
                  <Link to={`/watch/${id}`}>{title}</Link>
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
              {/* Video Views & Uploaded Time */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden mt-1 min-w-0">
                {/* Channel Name Link */}
                <Link to={`/channel/${channelId}`}>
                  <AttributedStringHost className=" hover:text-black text-xs text-gray-600 whitespace-nowrap block ">
                    {channel}
                  </AttributedStringHost>
                </Link>
              </ContentMetadataViewModelMetadataRow>
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden whitespace-nowrap min-w-0">
                <AttributedStringHost className="shrink flex items-center overflow-hidden text-xs  text-gray-600">
                  <MetaData items={metaItems} />
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
            </LockupMetadataViewModelTextContainer>
          )}
          {(isHover || isMenuOpen) && (
            <div className="shrink-0 self-start">
              <ThreeDotMenu items={menuItems} onOpenChange={setIsMenuOpen} />
            </div>
          )}
          {showPlaylistCreateForm && (
            <CreatePlaylist onClose={() => setShowPlaylistCreateForm(false)} />
          )}
        </LockupViewModelMetadata>
      </div>
    </div>
  );
}

export { VideoCard };
