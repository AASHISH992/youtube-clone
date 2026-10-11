import { Container } from "../../../shared/components/index.js";
import { VideoPlayer } from "./VideoPlayer.jsx";
import {
  AvatarShapeAvatarSizeSmall,
  LockupMetadataViewModelAvatar,
  LockupMetadataViewModelTextContainer,
  ContentMetadataViewModelMetadataRow,
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
} from "../../../shared/components/index.js";

import { Videos } from "./index.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";
import { Link } from "react-router-dom";
import {
  SubscribeButton,
  LikeButton,
  Description,
  CommentSection,
} from "./index.js";

import { useParams } from "react-router-dom";
import { useVideo } from "../hooks/useVideo.js";
import { useVideos } from "../../home/hooks/useVideos.js";

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
            channelAvatar={video.owner?.avatar}
            channelName={video.owner?.fullName}
            description={video.description}
            uploadDate={formatDate(video.createdAt)}
            views={formatViews(video.views)}
          />
        </div>
      </div>

      <div className="w-1/3">
        <div className="w-full h-full">
          <div className="mx-4 pt-4 truncate">
            {recLoading && <p className="text-center">Loading...</p>}
            {recError && <p className="text-center text-red-500">{recError}</p>}
            {!recLoading && !recError && (
              <Videos
                className='flex-col'
                videos={recommendedVideos?.map((v) => ({
                  key: v._id,
                  id: v._id,
                  thumbnail: v.thumbnail,
                  title: v.title,
                  channel: v.owner?.username,
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

function WatchMetadata({ id, channelAvatar, channelName, description, uploadDate, views }) {
  return (
    <div className="h-full">
      <div className="flex justify-between h-1/3">
        <div className="flex">
          <LockupMetadataViewModelAvatar>
            <AvatarShapeAvatarSizeSmall>
              <img
                src={channelAvatar}
                alt="avatar"
                className="rounded-xl w-full h-full"
              />
            </AvatarShapeAvatarSizeSmall>
          </LockupMetadataViewModelAvatar>

          <LockupMetadataViewModelTextContainer className="pr-4">
            {/* Channel Name */}
            <ContentMetadataViewModelMetadataRow className="m-0">
              <AttributedStringHost>
                <AttributedStringWhiteSpacePreWrap>
                  <Link to={`/channel/${id}`}>
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
                  1.2M subscribers
                </AttributedStringHost>
              </AttributedStringWhiteSpacePreWrap>
            </ContentMetadataViewModelMetadataRow>
          </LockupMetadataViewModelTextContainer>

          <div>
            <SubscribeButton />
          </div>
        </div>
        <div>
          <LikeButton />
        </div>
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
