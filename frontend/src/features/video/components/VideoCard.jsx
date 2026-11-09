import { Link } from "react-router-dom";
import {
  MetaData,
  ContentMetadataViewModelMetadataRow,
  AttributedStringWhiteSpacePreWrap,
  AttributedStringHost,
  LockupViewModelMetadata,
  AvatarShapeAvatarSizeSmall,
  LockupMetadataViewModelAvatar,
  LockupMetadataViewModelTextContainer,
} from "../../../shared/components/index.js";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../shared/utils/index.js";

import ThreeDotMenu from "../../../shared/components/ThreeDotMenu.jsx";

import { Bookmark  } from "lucide-react";
import { useState } from 'react'

function VideoCard({
  isFlex,
  isAvatar,
  isScroll,
  id,
  channelId,
  thumbnail,
  title,
  channel,
  avatar,
  views,
  uploadedTime,
  duration,
}) {
  const metaItems = [`${formatViews(views)}`, formatDate(uploadedTime)];
  const menuItems = [];
  const [isHover, setIsHover] = useState(false);

  menuItems.push({
    label: "Save to playlist",
    icon: <Bookmark className="size-4 mr-2 inline" />,
    onClick: () => {
      const newText = prompt("Edit your comment:", comment.content);
      if (newText && newText.trim() !== comment.content) {
        onUpdateComment(comment._id, newText.trim());
      }
    },
  });

  return (
    <div
      className={`p-2 rounded-xl ${isHover && 'bg-red-100' } ${isFlex ? "w-full" : isScroll ? "w-56 sm:w-64 lg:w-80 xl:w-96 shrink-0 " : "w-full"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={`${isFlex && "flex"}`}>
        <div className="relative mb-2">
          {/* Video Thumbnail */}
          {/* id: videoId */}
          <Link to={`/watch/${id}`}>
            <div className="w-full   ">
              <img
                src={thumbnail}
                alt="thumbnail"
                className="rounded-xl  w-full aspect-video object-cover"
              />
            </div>
          </Link>
          {/* Video Duration */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-md pointer-events-none">
            {formatDuration(duration)}
          </span>
        </div>
        <LockupViewModelMetadata>
          {/* Channel Avatar */}
          {(isFlex || isAvatar) && (
            <LockupMetadataViewModelAvatar>
              <Link to={`/channel/${channelId}`}>
                <AvatarShapeAvatarSizeSmall>
                  <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-xl w-full aspect-square object-cover"
                  />
                </AvatarShapeAvatarSizeSmall>
              </Link>
            </LockupMetadataViewModelAvatar>
          )}

          {/* Video Metadata */}
          {isAvatar ? (
            <LockupMetadataViewModelTextContainer>
              {/* Video Title */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-start">
                <AttributedStringHost className="text-sm font-medium antialiased line-clamp-2">
                  <Link to={`/watch/${id}`}>{title}</Link>
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
              {/* Video Views & Uploaded Time */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden mt-1 min-w-0">
                {/* Channel Name Link */}
                <Link to={`/channel/${channelId}`}>
                  <AttributedStringHost className=" hover:text-black text-xs text-gray-600 whitespace-nowrap block ">
                    {channel}
                  </AttributedStringHost>
                </Link>

                <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden whitespace-nowrap min-w-0">
                  <AttributedStringHost className="shrink flex items-center overflow-hidden text-xs  text-gray-600">
                    <MetaData items={metaItems} />
                  </AttributedStringHost>
                </ContentMetadataViewModelMetadataRow>
              </ContentMetadataViewModelMetadataRow>
            </LockupMetadataViewModelTextContainer>
          ) : (
            <LockupMetadataViewModelTextContainer>
              {/* Video Title */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-start">
                <AttributedStringHost className="text-sm font-medium antialiased line-clamp-2">
                  <Link to={`/watch/${id}`}>{title}</Link>
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
              {/* Video Views & Uploaded Time */}
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden mt-1 min-w-0">
                {/* Channel Name Link */}
                <Link to={`/channel/${channelId}`}>
                  <AttributedStringHost className=" hover:text-black text-xs text-gray-600 whitespace-nowrap block ">
                    {channel}
                  </AttributedStringHost>
                </Link>
              </ContentMetadataViewModelMetadataRow>
              <ContentMetadataViewModelMetadataRow className="h-auto flex items-center overflow-hidden whitespace-nowrap min-w-0">
                <AttributedStringHost className="shrink flex items-center overflow-hidden text-xs  text-gray-600">
                  <MetaData items={metaItems} />
                </AttributedStringHost>
              </ContentMetadataViewModelMetadataRow>
            </LockupMetadataViewModelTextContainer>
          )}
          {isHover && <ThreeDotMenu items={menuItems} />}
        </LockupViewModelMetadata>
      </div>
    </div>
  );
}

export { VideoCard };
