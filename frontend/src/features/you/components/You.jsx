import {
  Container,
  Button,
  ButtonShape,
} from "../../../shared/components/index.js";
import {
  EllipsisVertical,
  Dot,
  SquarePlay,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import sign_in_promo from "../../../assets/sign_in_promo.png";
import avatar from "../../../assets/images2.jpg";
import history from "../../../assets/siente_dance.jpeg";
import {
  CreatePlaylist,
  PlaylistList,
} from "../../../features/playlist/components/index.js";
import { VideoList } from "../../video/components/index.js";
import { useWatchHistory } from "../../user/hooks/useWatchHistory.js";
import { useVideos } from "../../home/hooks/useVideos.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import usePlaylist from "../../playlist/hooks/usePlaylist.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function You() {
  const { playlistId } = useParams();
  const {
    history: watchHistory,
    isLoading: historyLoading,
    error: historyError,
  } = useWatchHistory();
  const {
    playlists,
    isLoading: isLoadingPlaylist,
    error: errorPlaylist,
  } = usePlaylist();
  const { user } = useAuth();
  const [showPlaylistCreateForm, setShowPlaylistCreateForm] = useState(false);

  const handleCreateButton = () => {
    setShowPlaylistCreateForm(true);
  };

  return (
    <Container>
      <div className="flex flex-col size-full bg-white">
        <div className="flex items-center gap-2 p-4">
          <img
            src={user?.avatar || avatar}
            alt="avatar"
            className="rounded-full size-32 shadow-lg"
          />
          <div>
            <span className="text-4xl font-bold text-black">
              {" "}
              {user?.fullName || "User"}
            </span>
            <div className="flex">
              <p className="text-sm text-gray-600">
                @{user?.username || "username"}
              </p>
              <div className="pt-1">
                <Dot size={14} className="text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">View channel</p>
            </div>
          </div>
        </div>

        <div className="w-auto h-auto">
          <div className="mb-4 border-y border-gray-300 py-3">
            <div className="flex mb-2 items-center px-3 justify-between ">
              <h3 className="">History</h3>
              <div className="flex items-center justify-center gap-3">
                <ViewAllButton />
                <Button
                  bgColor="bg-transparent"
                  textColor="text-black"
                  className="flex items-center justify-center p-2 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-sm"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  bgColor="bg-transparent"
                  textColor="text-black"
                  className="flex items-center justify-center p-2 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-sm"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <div className="flex flex-row  px-3">
              <div className="overflow-x-auto">
                {!historyLoading &&
                  !historyError &&
                  watchHistory?.length === 0 && (
                    <p className="text-gray-500 text-sm p-4">
                      No watch history yet.
                    </p>
                  )}
                {historyError && (
                  <p className="text-center text-red-500">{historyError}</p>
                )}
                {!historyLoading &&
                  !historyError &&
                  watchHistory.length > 0 && (
                    <VideoList
                      isScroll={true}
                      className="flex flex-row flex-nowrap overflow-x-auto scrollbar-none"
                      videoList={watchHistory.map((video) => ({
                        isAvatar: false,
                        id: video._id,
                        channelId: video.owner?._id,
                        thumbnail: video.thumbnail,
                        title: video.title,
                        channel: video.owner?.fullName,
                        avatar: video.owner?.avatar,
                        views: video.views,
                        uploadedTime: video.createdAt,
                        duration: video.duration,
                      }))}
                    />
                  )}
              </div>
            </div>
          </div>

          <div className="flex mb-2 items-center px-3 justify-between ">
            <h3 className="">Playlists</h3>
            <div className="flex items-center justify-center gap-3">
              <Button
                bgColor="bg-transparent"
                textColor="text-black"
                className="flex items-center justify-center p-2 hover:bg-gray-300 active:bg-gray-400 text-sm"
                onClick={handleCreateButton}
              >
                <Plus />
              </Button>
              {showPlaylistCreateForm && (
                <CreatePlaylist
                  onClose={() => setShowPlaylistCreateForm(false)}
                />
              )}
              <ViewAllButton />
              <Button
                bgColor="bg-transparent"
                textColor="text-black"
                className="flex items-center justify-center p-2 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-sm"
              >
                <ChevronLeft />
              </Button>
              <Button
                bgColor="bg-transparent"
                textColor="text-black"
                className="flex items-center justify-center p-2 border border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-sm"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-4 px-3">
            <PlaylistList playlists={playlists} />
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

function ViewAllButton() {
  return (
    <Button
      type="button"
      bgColor="bg-transparent"
      textColor="text-black"
      className=" px-2 flex items-center justify-center border border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-sm w-20 h-10"
    >
      View all
    </Button>
  );
}

export { You };
