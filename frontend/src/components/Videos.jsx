import {
  MetaData,
  TouchFeedback,
  ContentMetadataViewModel,
  ContentMetadataViewModelMetadataRow,
  AttributedStringHost,
  AttributedSTringWhiteSpacePreWrap,
} from "./";
import { EllipsisVertical } from "lucide-react";

function Video({ thumbnail, title, channel, views, uploadedDate }) {
  const metaItems = [`${views} views`, uploadedDate];

  return (
    <div className="flex mb-2 flex-row justify-between items-start w-full">
      <div className="flex flex-row min-w-0 flex-1">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-40 h-24 object-cover rounded-lg flex-none"
        />

        <ContentMetadataViewModel>
          <ContentMetadataViewModelMetadataRow>
            <AttributedStringHost>
              <AttributedSTringWhiteSpacePreWrap>
                <h4 className="text-sm font-medium">
                  {title}
                </h4>
              </AttributedSTringWhiteSpacePreWrap>
            </AttributedStringHost>
          </ContentMetadataViewModelMetadataRow>

          <ContentMetadataViewModelMetadataRow>
            <AttributedStringHost className="text-xs text-gray-600 truncate text-ellipsis">
              {channel}
            </AttributedStringHost>
            <MetaData items={metaItems} />
          </ContentMetadataViewModelMetadataRow>
        </ContentMetadataViewModel>
      </div>

      <TouchFeedback>
        {" "}
        <EllipsisVertical />{" "}
      </TouchFeedback>
    </div>
  );
}

function AllVideos({ videos = [] }) {
  return (
    <div className="flex flex-col w-full">
      {videos.map((video) => (
        <Video
          key={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          channel={video.channel}
          views={video.views}
          uploadedDate={video.uploadedDate}
        />
      ))}
    </div>
  );
}

export { Video, AllVideos };
