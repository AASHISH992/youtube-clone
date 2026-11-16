import { SideBar } from "../../../shared/layouts/index.js";
import { Container } from "../../../shared/components/index.js";
import { VideoList } from "../../video/components/index.js";
import { useVideos } from "../hooks/useVideos.js";

function Home() {
  const { videos, isLoading, error } = useVideos();

  return (
    <Container className="flex flex-row h-full">
      <SideBar />
      <div>
        <div className="mx-4 pt-4">
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && (
            <VideoList
              isAvatar={true}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              videos={videos.map((video) => ({
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
    </Container>
  );
}

export default Home;
