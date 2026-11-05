import { Container } from "../../../shared/components/index.js";
import { VideoPlayer } from "./VideoPlayer.jsx";
import {
  LockupMetadataViewModelTextContainer,
  ContentMetadataViewModelMetadataRow,
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
} from "../../../shared/components/index.js";

import { VideoList } from "./index.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";
import { Link } from "react-router-dom";
import {
  SubscribeButton,
  LikeButton,
  DislikeButton,
  Description,
  CommentSection,
} from "./index.js";

import { useParams } from "react-router-dom";
import { useVideo } from "../hooks/useVideo.js";
import { useVideos } from "../../home/hooks/useVideos.js";
import { useLike } from "../hooks/useLike.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { useSubscription } from "../hooks/useSubscription.js";

function Watch() {
  const { videoId } = useParams();
  const {
    video,
    isLoading: videoLoading,
    error: videoError,
  } = useVideo(videoId);
  const {
    videos: recommendedVideos,
    isLoading: recLoading,
    error: recError,
  } = useVideos();

  const {
    isLiked: isVideoLiked,
    like: likeVideo,
    likeCount: videoLikeCount,
  } = useLike({ videoId });

  async function handleLike() {
    likeVideo(videoId);
  }

  function handleDislike(e) {
    e.preventDefault();
    console.log("disliked");
  }

  if (videoLoading)
    return <p className="p-4 text-center"> Loading video... </p>;
  if (!video) return <p className="p-4 text-center">Video not found</p>;

  return (
    <Container className=" w-full flex">
      {/* Left Side: Main Video */}
      <div className="w-2/3">
        <div className="flex flex-col h-fit w-full pt-4 pr-4 ml-4">
          <VideoPlayer
            videoFile={video.videoFile}
            thumbnail={video.thumbnail}
          />
          <h3 className="py-4">{video.title}</h3>
          <WatchMetadata
            key={video._id}
            id={video._id}
            channelOwnerId={video.owner?._id}
            channelAvatar={video.owner?.avatar}
            channelName={video.owner?.fullName}
            description={video.description}
            uploadDate={formatDate(video.createdAt)}
            views={formatViews(video.views)}
            handleLike={handleLike}
            handleDislike={handleDislike}
            isVideoLiked={isVideoLiked}
            videoLikeCount={videoLikeCount}
          />
        </div>
      </div>

      <div className="w-1/3">
        <div className="w-full h-full">
          <div className="mx-4 pt-4 truncate">
            {recLoading && <p className="text-center">Loading...</p>}
            {recError && <p className="text-center text-red-500">{recError}</p>}
            {!recLoading && !recError && (
              <VideoList
                className="flex-col overflow-y-auto"
                videoList={recommendedVideos?.filter((v) => v._id !== videoId).map((v) => ({
                  isFlex: false,
                  id: v._id,
                  channelId: v.owner?._id,
                  thumbnail: v.thumbnail,
                  title: v.title,
                  channel: v.owner?.fullName,
                  avatar: v.owner?.avatar,
                  views: formatViews(v.views),
                  uploadedTime: formatDate(v.createdAt),
                  duration: formatDuration(v.duration),
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

function WatchMetadata({
  id,
  channelOwnerId,
  channelAvatar,
  channelName,
  description,
  uploadDate,
  views,
  handleLike,
  handleDislike,
  isVideoLiked,
  videoLikeCount,
}) {
  const { user } = useAuthStore();
  const isOwner = user?._id === channelOwnerId;
  const { subscriberCount } = useSubscription({ channelId: channelOwnerId });

  return (
    <div className="h-full">
      <div className="flex justify-between h-1/3">
        <div className="flex ">
          <Link to={`/channel/${channelOwnerId}`} className='size-12' >
            <img
              src={channelAvatar}
              alt="avatar"
              className="rounded-full w-full aspect-square object-cover"
            />
          </Link>

          <LockupMetadataViewModelTextContainer className="pr-4">
            {/* Channel Name */}
            <ContentMetadataViewModelMetadataRow className="m-0">
              <AttributedStringHost>
                <AttributedStringWhiteSpacePreWrap>
                  <Link to={`/channel/${channelOwnerId}`}>
                    <p className="text-sm font-medium antialiased line-clamp-2">
                      {channelName}
                    </p>
                  </Link>
                </AttributedStringWhiteSpacePreWrap>
              </AttributedStringHost>
            </ContentMetadataViewModelMetadataRow>
            <ContentMetadataViewModelMetadataRow className="p-0 m-0">
              <AttributedStringWhiteSpacePreWrap>
                {/* Channel Subscribers */}
                <AttributedStringHost className=" text-xs text-gray-600 truncate">
                  {subscriberCount}
                </AttributedStringHost>
              </AttributedStringWhiteSpacePreWrap>
            </ContentMetadataViewModelMetadataRow>
          </LockupMetadataViewModelTextContainer>

          <div className="ml-4 h-11">
            <SubscribeButton channelOwnerId={channelOwnerId} />
          </div>
        </div>
        {!isOwner && (
          <div className="flex items-center justify-center h-11 w-32 bg-gray-100 rounded-full">
            <button
              className="w-2/3 hover:bg-gray-200 h-full rounded-l-full "
              onClick={handleLike}
              type="button"
            >
              <LikeButton
                isLiked={isVideoLiked}
                likeCount={videoLikeCount}
                isTouchFeedback={false}
                className="h-full"
              />
            </button>
            <button
              type="button"
              onClick={handleDislike}
              className="h-full flex justify-center items-center pr-1  border-gray-400 w-1/3 hover:bg-gray-300 my-1 rounded-r-full"
            >
              <div className="border-l h-1/2 w-full border-gray-400">
                <DislikeButton className="h-full" />
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="h-2/3">
        <Description
          uploadDate={uploadDate}
          views={views}
          description={description}
        />
      </div>
      <CommentSection videoId={id} />
    </div>
  );
}

export { Watch, WatchMetadata };
