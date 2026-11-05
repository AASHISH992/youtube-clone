import { VideoCard } from "./index.js";

function VideoList({
  videoList,
  videos,
  className = "flex-wrap",
  isFlex = false,
  isAvatar = false,
  isScroll = false,
}) {
  const items = videoList || videos || [];
  return (
    <div className={` flex w-full ${className}`}>
      {items.map((video) => (
        <VideoCard
          key={video.id}
          isFlex={video.isFlex || isFlex}
          isAvatar={video.isAvatar || isAvatar}
          isScroll={isScroll}
          {...video}
        />
      ))}
    </div>
  );
}
export default VideoList;
