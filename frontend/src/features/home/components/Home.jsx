import { SideBar } from "../../../shared/layouts/index.js";
import { Container } from "../../../shared/components/index.js";
import { Videos } from "../../video/components/index.js";
import { useVideos } from "../hooks/useVideos.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";

function Home() {
  const { videos, isLoading, error } = useVideos();

  return (
    <Container className="flex flex-row h-full">
      <SideBar />
      <div className="w-full h-full">
        <div className="mx-4 pt-4 truncate">
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && (
            <Videos
              videos={videos.map((video) => ({
                key: video._id,
                id: video._id,
                thumbnail: video.thumbnail,
                title: video.title,
                channel: video.owner?.username,
                avatar: video.owner?.avatar,
                views: formatViews(video.views),
                uploadedTime: formatDate(video.createdAt),
                duration: formatDuration(video.duration),
              }))}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Home;
