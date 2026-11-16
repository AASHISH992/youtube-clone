import coverImage from "../../../assets/siente_dance.jpeg";
import avatar from "../../../assets/images2.jpg";
import {
  MetaData,
  AttributedStringWhiteSpacePreWrap,
} from "../../../shared/components/index.js";
import { SubscribeButton, VideoList } from "../../video/components/index.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";
import { useChannel } from "../hooks/useChannel.js";
import { useParams } from "react-router-dom";

function ChannelProfile() {
  const { channelId } = useParams();
  const {
    videos,
    isLoading,
    error,
    stats: channelStats,
  } = useChannel(channelId);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="w-full aspect-[3/1] sm:aspect-[4/1] md:h-52 overflow-hidden rounded-xl">
          <img
            src={channelStats?.channel?.coverImage}
            alt="channel cover image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <img
              src={channelStats?.channel?.avatar}
              alt="channel avatar"
              className="size-28 sm:size-36 md:size-40 rounded-full border-4 border-white"
            />
          </div>

          <div className="flex-1 min-w-0 w-full py-1">
            <div className="min-h-10 flex items-center justify-center md:justify-start">
              <AttributedStringWhiteSpacePreWrap>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 block truncate">
                  {channelStats?.channel?.fullName}
                </span>
              </AttributedStringWhiteSpacePreWrap>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start sm:gap-3 text-sm text-gray-600">
              <AttributedStringWhiteSpacePreWrap>
                <span className="font-medium text-gray-900">
                  @{channelStats?.channel?.username}
                </span>
              </AttributedStringWhiteSpacePreWrap>
              <MetaData
                className="text-sm text-gray-500"
                items={[
                  `${channelStats?.totalSubscribers || 0} subscribers`,
                  `${channelStats?.totalVideos || 0} videos`,
                ]}
              />
            </div>

            <div className="mt-3 flex justify-center md:justify-start">
              <div className="h-10 w-full max-w-[200px] sm:w-28">
                <SubscribeButton channelOwnerId={channelId} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12">
            <button className="border-b-2 border-black h-full px-1 flex items-center text-sm font-semibold text-gray-900 cursor-pointer">
              Videos
            </button>
            <button className="border-b-2 border-transparent hover:border-gray-300 h-full px-1 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
              Playlists
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading && (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        )}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}
        {!isLoading && !error && (
          <VideoList
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            videoList={videos.map((video) => ({
              id: video._id,
              channelId: channelId,
              thumbnail: video.thumbnail,
              title: video.title,
              channel: channelStats?.channel?.fullName,
              avatar: channelStats?.channel?.avatar,
              views: video.views,
              uploadedTime: video.createdAt,
              duration: video.duration,
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default ChannelProfile;
export { ChannelProfile };
