import { Container } from "../../../shared/components/index.js";
import { ArrowLeft, Search, EllipsisVertical } from "lucide-react";
import history from "../../../assets/siente_dance.jpeg";
import { useHistory } from "../hooks/useHistory.js";
import { VideoList } from "../../video/components/index.js";

function History() {
  const {
    history: watchHistory,
    isLoading: historyLoading,
    error: historyError,
  } = useHistory();
  return (
    <Container className="p-6">
      <div className="flex">
        <span className="text-4xl font-semibold"> History </span>
      </div>
      <div>
        <div className="p-4">
          <span className="text-xl font-semibold"> Date </span>
        </div>
        <div className="flex flex-row  px-3">
          <div className="overflow-x-auto">
            {!historyLoading && !historyError && watchHistory?.length === 0 && (
              <p className="text-gray-500 text-sm p-4">No watch history yet.</p>
            )}
            {historyError && (
              <p className="text-center text-red-500">{historyError}</p>
            )}
            {!historyLoading && !historyError && watchHistory.length > 0 && (
              <VideoList
                isScroll={false}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
    </Container>
  );
}

export default History;
