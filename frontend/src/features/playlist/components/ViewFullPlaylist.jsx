import {
  Container,
  LockupMetadataViewModelAvatar,
  AvatarShapeAvatarSizeExtraSmall,
  ContentMetadataViewModelMetadataRow,
  AttributedStringHost,
  MetaData,
  Button,
  ButtonLink,
} from "../../../shared/components/index.js";
import { VideoList } from "../../video/components/index.js";
import { Link, useParams } from "react-router-dom";
import { useVideos } from "../../home/hooks/useVideos.js";
import { EditPlaylist } from "./index.js";

import { Plus, Pencil, Trash } from "lucide-react";
import defaultThumbnail from "../../../assets/siente_dance.jpeg";
import defaultAvatar from "../../../assets/images2.jpg";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";

import usePlaylist from "../hooks/usePlaylist.js";
import { useState } from "react";

export default function ViewFullPlaylist(channelId, views) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { playlistId } = useParams();
  const { playlist, isLoading, error, deletePlaylist } =
    usePlaylist(playlistId);

  if (isLoading) {
    return <p className="text-center p-8">Loading playlist ... </p>;
  }
  if (error || !playlist) {
    return (
      <p className="text-center text-red-500 p-8">
        {" "}
        {error || "Playlist not found"}{" "}
      </p>
    );
  }
  const totalVideos = playlist.videos?.length || 0;
  const totalViews =
    playlist.videos?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

  const metaItems = [
    "Playlist",
    "Private",
    `${totalVideos} videos`,
    `${formatViews(totalViews)}`,
    `${formatDate(playlist.updateAt || playlist.createdAt)}`,
  ];

  const handleDeletePlaylistButton = () => {
    deletePlaylist;
  };

  const handleCreateButton = () => {
    setShowPlaylistCreateForm(true);
  };

  return (
    <Container className="flex h-full ">
      <div className="w-96 shrink-0 flex items-start justify-start pl-6">
        <div className="h-9/10 w-90 absolute bottom-0 pb-6">
          <div className="bg-blue-400 h-full rounded-2xl p-6">
            <div className="">
              <div className="w-full   ">
                <img
                  src={playlist?.videos?.[0]?.thumbnail || defaultThumbnail}
                  alt="thumbnail"
                  className="rounded-xl  w-full aspect-video object-cover"
                />
              </div>
              <div className="grid grid-cols-1 grid-rows-3 my-4">
                <span className="text-white text-3xl font-medium flex items-center">
                  {playlist.name}
                </span>
                <span className="flex flex-row">
                  <span className="flex items-center">
                    <LockupMetadataViewModelAvatar className="">
                      <Link to={`/channel/${channelId}`}>
                        <AvatarShapeAvatarSizeExtraSmall>
                          <img
                            src={playlist.avatar || defaultAvatar}
                            alt="avatar"
                            className="rounded-xl aspect-square object-cover"
                          />
                        </AvatarShapeAvatarSizeExtraSmall>
                      </Link>
                    </LockupMetadataViewModelAvatar>
                  </span>
                  <span className="text-white flex items-center pl-2 text-xs">
                    <span>{`by ${playlist.fullName || "User"}`}</span>
                  </span>
                </span>
                <div>
                  <MetaData items={metaItems} textColor="text-gray-200" />
                </div>

                {playlist.description && (
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                    {playlist.description}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  bgColor="bg-white/10"
                  textColor="text-white"
                  className="flex items-center justify-center p-2 hover:bg-white/20 active:bg-white/30 text-sm"
                >
                  <Plus />
                </Button>
                <Button
                  bgColor="bg-white/10"
                  textColor="text-white"
                  className="flex items-center justify-center p-2 hover:bg-white/20 active:bg-white/30 text-sm"
                  onClick={() => setShowEditModal(true)}
                >
                  <Pencil />
                </Button>
                <Button
                  bgColor="bg-white/10"
                  textColor="text-white"
                  className="flex items-center justify-center p-2 hover:bg-white/20 active:bg-white/30 text-sm"
                  onClick={handleDeletePlaylistButton}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        {totalVideos === 0 ? (
          <p className="text-gray-500 text-center py-10">
            {" "}
            No videos in this playlist yet.
          </p>
        ) : (
          <VideoList
            isAvatar={false}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            videoList={playlist?.videos.map((v) => ({
              id: v._id,
              channelId: v.owner?._id,
              thumbnail: v.thumbnail,
              title: v.title,
              channel: v.owner?.fullName,
              avatar: v.owner?.avatar,
              views: v.views,
              uploadedTime: v.createdAt,
              duration: v.duration,
            }))}
          />
        )}
      </div>
      {showEditModal && (
        <EditPlaylist
          playlist={playlist}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </Container>
  );
}
