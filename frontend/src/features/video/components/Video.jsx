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
  ThumbnailBottomOverlayViewModel,
  ThumbnailBottomOverlayViewModelHost,
  ThumbnailBottomOverlayViewModelBadgeContainer,
  BadgeShapeText,
  BadgeShape,
} from "../../../shared/components/index.js";

function Video({
  id,
  thumbnail,
  title,
  channel,
  avatar,
  views,
  uploadedTime,
  duration,
}) {
  const metaItems = [`${views}`, uploadedTime];
  return (
    <div className="sm:w-100 w-120 p-3 ">
      <div className=" ">
        <div className=" py-4 relative">
          {/* Video Thumbnail */}
          <Link to={`/watch/${id}`}>
            <div className="w-full ">
              <img
                src={thumbnail}
                alt="thumbnail"
                className="rounded-xl w-full h-full"
              />
            </div>
          </Link>
          {/* Video Duration */}
          <ThumbnailBottomOverlayViewModel>
            <ThumbnailBottomOverlayViewModelHost>
              <ThumbnailBottomOverlayViewModelBadgeContainer>
                <BadgeShape>
                  <BadgeShapeText>{duration}</BadgeShapeText>
                </BadgeShape>
              </ThumbnailBottomOverlayViewModelBadgeContainer>
            </ThumbnailBottomOverlayViewModelHost>
          </ThumbnailBottomOverlayViewModel>
        </div>
        <LockupViewModelMetadata>
          {/* Channel Avatar */}
          <LockupMetadataViewModelAvatar>
            <AvatarShapeAvatarSizeSmall>
              <img
                src={avatar}
                alt="avatar"
                className="rounded-xl w-full h-full"
              />
            </AvatarShapeAvatarSizeSmall>
          </LockupMetadataViewModelAvatar>

          {/* Video Metadata */}
          <LockupMetadataViewModelTextContainer>
            {/* Video Title */}
            <ContentMetadataViewModelMetadataRow>
              <AttributedStringHost>
                <AttributedStringWhiteSpacePreWrap>
                  <Link to={`/watch/${id}`}>
                    <p className="text-sm font-medium antialiased line-clamp-2">
                      {title}
                    </p>
                  </Link>
                </AttributedStringWhiteSpacePreWrap>
              </AttributedStringHost>
            </ContentMetadataViewModelMetadataRow>
            {/* Video Views & Uploaded Time */}
            <ContentMetadataViewModelMetadataRow className="flex-row">
              <AttributedStringWhiteSpacePreWrap>
                {/* Channel Name Link */}
                <Link to="/#">
                  <AttributedStringHost className="hover:text-black text-xs text-gray-600 truncate">
                    {channel}
                  </AttributedStringHost>
                </Link>
              </AttributedStringWhiteSpacePreWrap>

              <AttributedStringWhiteSpacePreWrap>
                <AttributedStringHost className="text-xs text-gray-600 truncate">
                  <MetaData items={metaItems} />
                </AttributedStringHost>
              </AttributedStringWhiteSpacePreWrap>
            </ContentMetadataViewModelMetadataRow>
          </LockupMetadataViewModelTextContainer>
        </LockupViewModelMetadata>
      </div>
    </div>
  );
}


export { Video };
