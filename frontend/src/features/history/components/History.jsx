import { Container } from "../../../shared/components/index.js";
import { useHistory } from "../hooks/useHistory.js";
import { VideoList } from "../../video/components/index.js";

function getDayLabel(dateString) {
  if (!dateString) return "Earlier";
  const date = new Date(dateString);
  const today = new Date();
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diffDays = Math.round((current - target) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function History() {
  const {
    history: watchHistory,
    isLoading: historyLoading,
    error: historyError,
  } = useHistory();

  const groupedHistory = watchHistory.reduce((acc, video) => {
    const label = getDayLabel(video.watchedAt);
    if (!acc[label]) acc[label] = [];
    acc[label].push(video);
    return acc;
  }, {});

  return (
    <Container className="p-6">
      <div className="flex pb-6">
        <span className="text-4xl font-semibold"> History </span>
      </div>

      <div>
        <div className="flex flex-row  px-3">
          <div className="overflow-x-auto">
            {!historyLoading && !historyError && watchHistory?.length === 0 && (
              <p className="text-gray-500 text-sm p-4">No watch history yet.</p>
            )}
            {historyError && (
              <p className="text-center text-red-500">{historyError}</p>
            )}

            {!historyLoading &&
              !historyError &&
              Object.entries(groupedHistory).map(([dateLabel, videos]) => (
                <div key={dateLabel} className="mb-8">
                    <span className="text-xl font-semibold text-gray-800">
                      {dateLabel}
                    </span>
                  <VideoList
                    isScroll={false}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3"
                    videoList={videos.map((video) => ({
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default History;
